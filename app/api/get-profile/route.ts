import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Applicants!A2:F",
    });

    const rows = res.data.values || [];

    const row = rows.find((r) => r[1]?.toLowerCase() === email.toLowerCase());

    if (!row) {
      return NextResponse.json({ success: false, profile: null });
    }

    const [full_name, mail, phone, county, password, profile_picture_url] = row;

    return NextResponse.json({
      success: true,
      profile: {
        full_name: full_name || "",
        email: mail || "",
        phone: phone || "",
        county: county || "",
        password: password || "",
        profile_picture_url: profile_picture_url || "",
      },
    });
  } catch (error: any) {
    console.error("Get Profile Error:", error);
    return NextResponse.json(
      { error: "Failed to load profile", details: error.message },
      { status: 500 }
    );
  }
}