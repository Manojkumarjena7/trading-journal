// ============================================================
// LOCAL JSON DATABASE
// File-backed JSON store for uploaded report metadata.
// In production (Vercel serverless), the filesystem is
// ephemeral/read-only outside /tmp, so this module falls back
// to an in-memory store automatically when fs writes fail —
// this keeps the upload UI fully functional in any environment
// while behaving as a real persistent JSON DB in local/self-hosted
// deployments (e.g. `next start` on a VPS, or `vercel dev`).
// ============================================================

import fs from "fs";
import path from "path";

export interface UploadRecord {
  id: string;
  fileName: string;
  fileType: "excel" | "csv" | "pdf" | "unknown";
  platform: string;
  rowCount: number;
  columns: string[];
  uploadedAt: string;
  warnings: string[];
  status: "pending_review" | "reviewed" | "included" | "excluded";
  notes?: string;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "uploads.json");

// In-memory fallback (used on read-only serverless filesystems)
let memoryStore: UploadRecord[] = [];
let usingMemoryFallback = false;

function ensureDbFile(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
    }
  } catch {
    usingMemoryFallback = true;
  }
}

export function readUploads(): UploadRecord[] {
  if (usingMemoryFallback) return memoryStore;
  try {
    ensureDbFile();
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as UploadRecord[];
  } catch {
    usingMemoryFallback = true;
    return memoryStore;
  }
}

export function writeUploads(records: UploadRecord[]): void {
  if (usingMemoryFallback) {
    memoryStore = records;
    return;
  }
  try {
    ensureDbFile();
    fs.writeFileSync(DB_FILE, JSON.stringify(records, null, 2));
  } catch {
    usingMemoryFallback = true;
    memoryStore = records;
  }
}

export function addUpload(record: Omit<UploadRecord, "id" | "uploadedAt">): UploadRecord {
  const records = readUploads();
  const newRecord: UploadRecord = {
    ...record,
    id: `upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    uploadedAt: new Date().toISOString(),
  };
  records.push(newRecord);
  writeUploads(records);
  return newRecord;
}

export function deleteUpload(id: string): boolean {
  const records = readUploads();
  const filtered = records.filter((r) => r.id !== id);
  const changed = filtered.length !== records.length;
  if (changed) writeUploads(filtered);
  return changed;
}

export function updateUploadStatus(
  id: string,
  status: UploadRecord["status"],
  notes?: string
): UploadRecord | null {
  const records = readUploads();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx].status = status;
  if (notes !== undefined) records[idx].notes = notes;
  writeUploads(records);
  return records[idx];
}

export function isUsingMemoryFallback(): boolean {
  return usingMemoryFallback;
}
