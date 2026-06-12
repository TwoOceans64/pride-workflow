import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const clean = (value: any) =>
      (value || "")
        .toString()
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim();

    // Read all three logs
    const ranges = [
      "Loan Applicants!A2:F", // Pending
      "Log Approved!A2:I",    // Approved
      "Log Declined!A2:I",    // Declined
    ];

    const responses = await Promise.all(
      ranges.map((range) =>
        sheets.spreadsheets.values.get({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range,
        })
      )
    );

    const [pendingRows, approvedRows, declinedRows] = responses.map(
      (res) => res.data.values || []
    );

    // -------------------------------
    // NORMALIZE PENDING ROWS
    // -------------------------------
    const pending = pendingRows.map((r) => ({
      full_name: clean(r[0]),
      email: clean(r[1]),
      loan_amount: clean(r[2]),
      purpose: clean(r[3]),
      risk_score: "", // pending has no risk score
      decision: "PENDING",
      timestamp: clean(r[4]), // pending timestamp is column E
      reference_number: clean(r[5] || ""), // optional
      id_number: "",
    }));

    // -------------------------------
    // NORMALIZE APPROVED ROWS
    // -------------------------------
    const approved = approvedRows.map((r) => ({
      full_name: clean(r[0]),
      email: clean(r[1]),
      loan_amount: clean(r[2]),
      purpose: clean(r[3]),
      risk_score: clean(r[4]),
      decision: clean(r[5]),
      timestamp: clean(r[6]),
      reference_number: clean(r[7]),
      id_number: clean(r[8]),
    }));

    // -------------------------------
    // NORMALIZE DECLINED ROWS
    // -------------------------------
    const declined = declinedRows.map((r) => ({
      full_name: clean(r[0]),
      email: clean(r[1]),
      loan_amount: clean(r[2]),
      purpose: clean(r[3]),
      risk_score: clean(r[4]),
      decision: clean(r[5]),
      timestamp: clean(r[6]),
      reference_number: clean(r[7]),
      id_number: clean(r[8]),
    }));

    // Combine all
    const all = [...pending, ...approved, ...declined];

    // Filter by sanitized email
    const history = all.filter(
      (row) => row.email.toLowerCase() === cleanEmail
    );

    return NextResponse.json({ success: true, history });
  } catch (err) {
    console.error("Loan status API error:", err);
    return NextResponse.json(
      { error: "Failed to load loan status" },
      { status: 500 }
    );
  }
}