import { NextRequest, NextResponse } from "next/server";
import { addUpload, readUploads, deleteUpload, updateUploadStatus } from "@/lib/db";

// ============================================================
// GET — list all uploaded report records
// ============================================================
export async function GET() {
  const records = readUploads();
  return NextResponse.json({ records });
}

// ============================================================
// POST — register a newly-parsed file's metadata
// (actual parsing happens client-side via lib/file-parser.ts;
//  this endpoint persists the resulting metadata to the JSON DB)
// ============================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileName, fileType, platform, rowCount, columns, warnings } = body;

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "fileName and fileType are required" }, { status: 400 });
    }

    const record = addUpload({
      fileName,
      fileType,
      platform: platform ?? "Unknown",
      rowCount: rowCount ?? 0,
      columns: columns ?? [],
      warnings: warnings ?? [],
      status: "pending_review",
    });

    return NextResponse.json({ record }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// ============================================================
// PATCH — update status/notes of an existing record
// ============================================================
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }
    const updated = updateUploadStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }
    return NextResponse.json({ record: updated });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// ============================================================
// DELETE — remove a record by id (?id=...)
// ============================================================
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id query param is required" }, { status: 400 });
  }
  const deleted = deleteUpload(id);
  if (!deleted) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
