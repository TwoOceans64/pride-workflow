import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Check Approved sheet
    const approved = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Log Approved!A:Z",
    });

    const approvedRows = approved.data.values || [];

    const approvedMatch = approvedRows.find(
      (row: string[]) => row[1] === email
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

    // Check Declined sheet
    const declined = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Log Declined!A:Z",
    });

    const declinedRows = declined.data.values || [];

    const declinedMatch = declinedRows.find(
      (row: string[]) => row[1] === email
    );

    if (declinedMatch) {
      return NextResponse.json({
        status: "DECLINED",
        full_name: declinedMatch[0],
        email: declinedMatch[1],
        loan_amount: declinedMatch[2],
        purpose: declinedMatch[3],
        risk_score: declinedMatch[4],
        guardian_reason: declinedMatch[6],
        timestamp: declinedMatch[5],
      });
    }

    return NextResponse.json({
      status: "NO_APPLICATION",
      message: "No loan application found for this email.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
