import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const email = formData.get("email") as string | null;

    if (!file || !email) {
      return NextResponse.json({ error: "Missing file or email" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const uploadRes = await drive.files.create({
      requestBody: {
        name: `${email}-profile-${Date.now()}.jpg`,
        parents: [process.env.GOOGLE_DRIVE_PROFILE_FOLDER_ID!],
      },
      media: {
        mimeType: file.type || "image/jpeg",
        body: buffer,
      },
      fields: "id",
    });

    const fileId = uploadRes.data.id;

    if (!fileId) {
      throw new Error("No file ID returned from Drive");
    }

    await drive.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" },
    });

    const publicUrl = `https://drive.google.com/uc?id=${fileId}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}