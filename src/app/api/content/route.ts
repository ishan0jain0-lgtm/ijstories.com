import { NextResponse } from "next/server";
import { getDb, writeDb } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDb();

    if (body.teamMembers) db.teamMembers = body.teamMembers;
    if (body.notebookNotes) db.notebookNotes = body.notebookNotes;
    if (body.showcaseItems) db.showcaseItems = body.showcaseItems;
    if (body.leads) db.leads = body.leads;

    const success = await writeDb(db);
    if (!success) {
      return NextResponse.json({ error: "Failed to write database." }, { status: 500 });
    }

    return NextResponse.json(db);
  } catch (error: any) {
    console.error("Error in content API POST handler:", error);
    return NextResponse.json({ error: "Invalid request data: " + error.message }, { status: 400 });
  }
}
