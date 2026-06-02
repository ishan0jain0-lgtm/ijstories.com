import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json(
      { error: "IMAGEKIT_PRIVATE_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const authHeader = "Basic " + Buffer.from(privateKey + ":").toString("base64");

  try {
    // List files from ImageKit under /ijstories_uploads/ folder
    const res = await fetch("https://api.imagekit.io/v1/files?path=/ijstories_uploads/&limit=1000", {
      headers: {
        Authorization: authHeader,
      },
      next: { revalidate: 0 } // disable cache to fetch fresh files
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `ImageKit API error: ${errText}` },
        { status: res.status }
      );
    }

    const files = await res.json();
    return NextResponse.json(files);
  } catch (error: any) {
    console.error("Error fetching ImageKit files:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json(
      { error: "IMAGEKIT_PRIVATE_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const authHeader = "Basic " + Buffer.from(privateKey + ":").toString("base64");

  try {
    const { searchParams } = new URL(request.url);
    let fileId = searchParams.get("fileId");

    if (!fileId) {
      try {
        const body = await request.json();
        fileId = body.fileId;
      } catch (e) {}
    }

    if (!fileId) {
      return NextResponse.json({ error: "fileId is required to delete a resource" }, { status: 400 });
    }

    const res = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `Failed to delete file from ImageKit: ${errText}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting ImageKit file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
