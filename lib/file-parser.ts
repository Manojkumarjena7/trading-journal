// ============================================================
// FILE PARSER — Excel / CSV / PDF
// Client-side parsing for future report uploads
// ============================================================

import * as XLSX from "xlsx";
import Papa from "papaparse";

export interface ParsedRow {
  [key: string]: string | number | null;
}

export interface ParseResult {
  fileName: string;
  fileType: "excel" | "csv" | "pdf" | "unknown";
  sheets?: string[];
  rows: ParsedRow[];
  rowCount: number;
  columns: string[];
  parsedAt: string;
  warnings: string[];
}

// ============================================================
// EXCEL PARSER
// ============================================================
export async function parseExcel(file: File): Promise<ParseResult> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const warnings: string[] = [];

  const sheets = workbook.SheetNames;
  if (sheets.length === 0) {
    warnings.push("No sheets found in workbook.");
  }

  // Use first sheet by default, or one matching common Upstox/report patterns
  const preferredSheet =
    sheets.find((s) => /realized|gain|loss|p&l|pnl/i.test(s)) ?? sheets[0];

  const worksheet = workbook.Sheets[preferredSheet];
  const json = XLSX.utils.sheet_to_json<ParsedRow>(worksheet, {
    defval: null,
    raw: true,
  });

  const columns = json.length > 0 ? Object.keys(json[0]) : [];

  if (json.length === 0) {
    warnings.push("No data rows extracted. Sheet may use a non-standard header layout.");
  }

  return {
    fileName: file.name,
    fileType: "excel",
    sheets,
    rows: json,
    rowCount: json.length,
    columns,
    parsedAt: new Date().toISOString(),
    warnings,
  };
}

// ============================================================
// CSV PARSER
// ============================================================
export function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const warnings: string[] = [];
    Papa.parse<ParsedRow>(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          results.errors.forEach((e) => warnings.push(`Row ${e.row}: ${e.message}`));
        }
        const columns = results.meta.fields ?? [];
        resolve({
          fileName: file.name,
          fileType: "csv",
          rows: results.data,
          rowCount: results.data.length,
          columns,
          parsedAt: new Date().toISOString(),
          warnings,
        });
      },
      error: (err) => reject(err),
    });
  });
}

// ============================================================
// PDF PARSER (text extraction — basic)
// ============================================================
export async function parsePDF(file: File): Promise<ParseResult> {
  const warnings: string[] = [
    "PDF parsing extracts raw text only. Tabular P&L data inside PDFs may require manual review.",
  ];

  // Lightweight text extraction without external PDF.js dependency issues in this env.
  // We read the raw bytes and attempt a best-effort text scan for numeric/financial patterns.
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoder = new TextDecoder("utf-8", { fatal: false });
  const rawText = decoder.decode(bytes);

  // Very basic stream text extraction (looks for text between BT/ET markers is non-trivial
  // without a full PDF parser — so we flag this file for manual review instead of guessing).
  const looksLikeText = /[A-Za-z0-9]{20,}/.test(rawText);
  if (!looksLikeText) {
    warnings.push("Could not reliably extract readable text from this PDF. Manual review recommended.");
  }

  return {
    fileName: file.name,
    fileType: "pdf",
    rows: [],
    rowCount: 0,
    columns: [],
    parsedAt: new Date().toISOString(),
    warnings: [
      ...warnings,
      "This PDF has been logged in the vault. Automatic P&L extraction from PDF is limited — please cross-check extracted figures manually before including them in totals.",
    ],
  };
}

// ============================================================
// MAIN DISPATCH
// ============================================================
export async function parseFile(file: File): Promise<ParseResult> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  try {
    if (ext === "xlsx" || ext === "xls") {
      return await parseExcel(file);
    }
    if (ext === "csv") {
      return await parseCSV(file);
    }
    if (ext === "pdf") {
      return await parsePDF(file);
    }
    return {
      fileName: file.name,
      fileType: "unknown",
      rows: [],
      rowCount: 0,
      columns: [],
      parsedAt: new Date().toISOString(),
      warnings: [`Unsupported file type: .${ext}. Supported types: .xlsx, .xls, .csv, .pdf`],
    };
  } catch (err) {
    return {
      fileName: file.name,
      fileType: "unknown",
      rows: [],
      rowCount: 0,
      columns: [],
      parsedAt: new Date().toISOString(),
      warnings: [`Failed to parse file: ${err instanceof Error ? err.message : "Unknown error"}`],
    };
  }
}

// ============================================================
// HEURISTIC: detect likely platform from filename/columns
// ============================================================
export function detectPlatform(result: ParseResult): string {
  const name = result.fileName.toLowerCase();
  if (name.includes("delta")) return "Delta Exchange";
  if (name.includes("upstox") || name.includes("gain_loss") || name.includes("xu6k2")) return "Upstox";
  if (name.includes("paytm")) return "Paytm Money";
  if (name.includes("kotak")) return "Kotak Securities";
  if (name.includes("zerodha")) return "Zerodha";
  if (name.includes("groww")) return "Groww";

  // Check column headers for hints
  const colsStr = result.columns.join(" ").toLowerCase();
  if (colsStr.includes("transaction type") && colsStr.includes("asset symbol")) return "Delta Exchange (likely)";
  if (colsStr.includes("realized") || colsStr.includes("isin")) return "Upstox (likely)";

  return "Unknown — please categorize manually";
}
