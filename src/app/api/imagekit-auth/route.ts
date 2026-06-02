import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || process.env.IMAGEKIT_PUBLIC_KEY;

  if (!privateKey) {
    return NextResponse.json(
      { error: "IMAGEKIT_PRIVATE_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  if (!publicKey) {
    return NextResponse.json(
      { error: "IMAGEKIT_PUBLIC_KEY is not configured." },
      { status: 500 }
    );
  }

  try {
    const token = crypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 1800; // 30 minutes validity

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey
    });
  } catch (error: any) {
    console.error("Error generating ImageKit authentication parameters:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication token generation." },
      { status: 500 }
    );
  }
}
