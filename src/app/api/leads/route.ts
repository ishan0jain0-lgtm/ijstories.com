import { NextResponse } from "next/server";
import { dbConnect, LeadModel } from "@/lib/db";
import { revalidateTag } from "next/cache";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { name, email, interest, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await dbConnect();
    const newLead = await LeadModel.create({
      id: crypto.randomUUID(),
      name,
      email,
      interest: interest || "General Inquiry",
      message,
      timestamp: new Date().toISOString()
    });

    // Invalidate the content cache so the admin panel shows the new lead
    revalidateTag("db-content", "max");

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error("Error in leads API POST handler:", error);
    return NextResponse.json({ error: "Failed to save lead: " + error.message }, { status: 500 });
  }
}
