import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // ⭐ Trim incoming email
    const cleanEmail = email.trim().toLowerCase();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const sheetId = process.env.GOOGLE_SHEET_ID;

    // Read Approved sheet
    const approved = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Log Approved!A:Z",
    });

    // Read Declined sheet
    const declined = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Log Declined!A:Z",
    });

    const approvedRows = approved.data.values || [];
    const declinedRows = declined.data.values || [];

    // ⭐ Helper to trim every cell in a row
    const normalizeRow = (row: string[]) =>
      row.map((cell) => (cell ? cell.trim() : ""));

    // ⭐ Normalize all rows (remove whitespace/newlines)
    const normalizedApproved = approvedRows.map(normalizeRow);
    const normalizedDeclined = declinedRows.map(normalizeRow);

    // ⭐ Find match in Approved
    const approvedMatch = normalizedApproved.find(
      (row) => row[1]?.toLowerCase() === cleanEmail
    );

    if (approvedMatch) {
      return NextResponse.json({
        status: "APPROVED",
        full_name: approvedMatch[0],
        email: approvedMatch[1],
        loan_amount: approvedMatch[2],
        purpose: approvedMatch[3],
        risk_score: approvedMatch[4],
        timestamp: approvedMatch[6],
      });
    }

    // ⭐ Find match in Declined
    const declinedMatch = normalizedDeclined.find(
      (row) => row[1]?.toLowerCase() === cleanEmail
    );

    if (declinedMatch) {
      return NextResponse.json({
        status: "DECLINED",
        full_name: declinedMatch[0],
        email: declinedMatch[1],
        loan_amount: declinedMatch[2],
        purpose: declinedMatch[3],
        risk_score: declinedMatch[4],
        guardian_reason: declinedMatch[5],
        timestamp: declinedMatch[6],
      });
    }

    return NextResponse.json({
      status: "NO_APPLICATION",
      message: "No loan application found for this email.",
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
