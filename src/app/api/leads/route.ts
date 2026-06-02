import { NextResponse } from "next/server";
import { getDb, writeDb } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { name, email, interest, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const db = await getDb();
    const newLead = {
      id: crypto.randomUUID(),
      name,
      email,
      interest: interest || "General Inquiry",
      message,
      timestamp: new Date().toISOString()
    };

    db.leads.unshift(newLead);
    const success = await writeDb(db);

    if (!success) {
      return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error("Error in leads API POST handler:", error);
    return NextResponse.json({ error: "Invalid request payload: " + error.message }, { status: 400 });
  }
}
