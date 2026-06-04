import { NextResponse } from "next/server";
import { getDb, writeDb, getCachedDb } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function GET() {
  const db = await getCachedDb();
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDb();

    if (body.teamMembers) db.teamMembers = body.teamMembers;
    if (body.blogPosts) db.blogPosts = body.blogPosts;
    if (body.showcaseItems) db.showcaseItems = body.showcaseItems;
    if (body.leads) db.leads = body.leads;
    if (body.websiteDetails) db.websiteDetails = body.websiteDetails;

    const success = await writeDb(db);
    if (!success) {
      return NextResponse.json({ error: "Failed to write database." }, { status: 500 });
    }

    // Invalidate the cache on-demand
    revalidateTag("db-content", "max");

    return NextResponse.json(db);
  } catch (error: any) {
    console.error("Error in content API POST handler:", error);
    return NextResponse.json({ error: "Invalid request data: " + error.message }, { status: 400 });
  }
}
