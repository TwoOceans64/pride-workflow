import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      full_name,
      phone,
      county,
      password,
      profile_picture_url,
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Applicants!A2:F",
    });

    const rows = res.data.values || [];

    const rowIndex = rows.findIndex(
      (r) => r[1]?.toLowerCase() === email.toLowerCase()
    );

    const rowValues = [
      full_name || "",
      email,
      phone || "",
      county || "",
      password || "",
      profile_picture_url || "",
    ];

    if (rowIndex === -1) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Applicants!A2",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [rowValues],
        },
      });
    } else {
      const rowNumber = rowIndex + 2;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Applicants!A${rowNumber}:F${rowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [rowValues],
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Profile Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update profile", details: error.message },
      { status: 500 }
    );
  }
}