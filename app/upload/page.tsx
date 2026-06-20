"use client";

import { useState, useCallback, useEffect } from "react";
import { PageWrapper, SectionHeader, InfoBox, Badge } from "@/components/ui/index";
import { parseFile, detectPlatform, ParseResult } from "@/lib/file-parser";
import { UploadCloud, FileSpreadsheet, FileText, File as FileIcon, Trash2, Loader2 } from "lucide-react";

interface UploadRecord {
  id: string;
  fileName: string;
  fileType: string;
  platform: string;
  rowCount: number;
  columns: string[];
  uploadedAt: string;
  warnings: string[];
  status: string;
}

const FILE_ICONS: Record<string, React.ReactNode> = {
  excel: <FileSpreadsheet size={18} />,
  csv: <FileSpreadsheet size={18} />,
  pdf: <FileText size={18} />,
  unknown: <FileIcon size={18} />,
};

export default function UploadPage() {
  const [records, setRecords] = useState<UploadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [lastParsed, setLastParsed] = useState<ParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    try {
      const res = await fetch("/api/upload");
      const data = await res.json();
      setRecords(data.records ?? []);
    } catch {
      // silent — vault may be empty on first load
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setLoading(true);
      setError(null);

      for (const file of Array.from(files)) {
        try {
          const result = await parseFile(file);
          const platform = detectPlatform(result);
          setLastParsed(result);

          await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: result.fileName,
              fileType: result.fileType,
              platform,
              rowCount: result.rowCount,
              columns: result.columns,
              warnings: result.warnings,
            }),
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to parse file");
        }
      }
      await fetchRecords();
      setLoading(false);
    },
    [fetchRecords]
  );

  const handleDelete = async (id: string) => {
    await fetch(`/api/upload?id=${id}`, { method: "DELETE" });
    fetchRecords();
  };

  return (
    <PageWrapper>
      <SectionHeader
        index="13 — Upload Center"
        title="Add Future Reports"
        subtitle="Upload Excel, CSV, or PDF reports for automatic parsing. Files are logged to a local JSON database for review — they do not automatically change the numbers shown elsewhere on this site."
      />

      <InfoBox variant="amber">
        <strong>How this works:</strong> Uploaded files are parsed client-side (Excel via SheetJS,
        CSV via PapaParse, PDF via text extraction) and their metadata is saved to a local JSON
        database (<code>/data/uploads.json</code>). This keeps a permanent record of every report
        ever added to the archive. To actually update the lifetime totals shown across the site,
        review parsed data here and manually merge verified figures into{" "}
        <code>/data/trading-data.ts</code> — this manual step preserves the "no double-counting,
        no silent number changes" guarantee from the Data Audit page.
      </InfoBox>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-md p-12 text-center mb-8 transition-colors ${
          dragging ? "border-loss bg-loss-subtle" : "border-default"
        }`}
      >
        <UploadCloud size={32} className="mx-auto mb-3 text-muted" />
        <p className="text-sm mb-1">Drag & drop files here, or</p>
        <label className="inline-block cursor-pointer font-mono text-xs tracking-wider uppercase border border-default px-4 py-2 mt-2 hover:border-loss hover:text-loss transition-colors">
          Browse Files
          <input
            type="file"
            multiple
            accept=".xlsx,.xls,.csv,.pdf"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
        <p className="font-mono text-[10px] text-muted mt-4">
          Supported: .xlsx · .xls · .csv · .pdf
        </p>
        {loading && (
          <div className="flex items-center justify-center gap-2 mt-4 text-muted">
            <Loader2 size={14} className="animate-spin" />
            <span className="font-mono text-xs">Parsing...</span>
          </div>
        )}
        {error && <p className="font-mono text-xs text-loss mt-3">{error}</p>}
      </div>

      {/* Last parsed preview */}
      {lastParsed && (
        <div className="border border-default p-5 mb-8">
          <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">
            Last Parsed File — Preview
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 font-mono text-xs">
            <div>
              <span className="block text-muted text-[9px] uppercase">File</span>
              {lastParsed.fileName}
            </div>
            <div>
              <span className="block text-muted text-[9px] uppercase">Type</span>
              {lastParsed.fileType}
            </div>
            <div>
              <span className="block text-muted text-[9px] uppercase">Rows</span>
              {lastParsed.rowCount}
            </div>
            <div>
              <span className="block text-muted text-[9px] uppercase">Columns</span>
              {lastParsed.columns.length}
            </div>
          </div>
          {lastParsed.warnings.length > 0 && (
            <div className="font-mono text-[11px] text-amber bg-amber-500/8 border border-amber-500/20 p-2.5 rounded-sm">
              {lastParsed.warnings.map((w, i) => (
                <p key={i}>⚠ {w}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload history / vault */}
      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-4">
        Upload History ({records.length})
      </h3>
      {records.length === 0 ? (
        <p className="text-sm text-muted">No files uploaded yet via this center.</p>
      ) : (
        <div className="border border-default divide-y divide-default">
          {records.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-muted flex-shrink-0">{FILE_ICONS[r.fileType] ?? FILE_ICONS.unknown}</span>
                <div className="min-w-0">
                  <p className="font-mono text-xs truncate">{r.fileName}</p>
                  <p className="text-[11px] text-muted">
                    {r.platform} · {r.rowCount} rows · {new Date(r.uploadedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge level={r.status === "included" ? "VERIFIED" : r.warnings?.length ? "ESTIMATED" : "DERIVED"} />
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-muted hover:text-loss transition-colors p-1"
                  title="Remove from vault"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
