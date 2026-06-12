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

    // -------------------------------
    // 1️⃣ READ Pending Loans (Loan Applicants)
    // -------------------------------
    const pendingRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Loan Applicants!A2:F",
    });

    const pendingRows = pendingRes.data.values || [];

    const pendingLoans = pendingRows
      .filter((r) => r[1]?.toLowerCase() === email.toLowerCase())
      .map((r) => ({
        full_name: r[0],       // A
        email: r[1],           // B
        loan_amount: r[2],     // C
        purpose: r[3],         // D
        timestamp: r[4],       // E
        reference_number: r[5],// F
        decision: "Pending",
      }));

    // -------------------------------
    // 2️⃣ READ Approved Loans (A:I)
    // -------------------------------
    const approvedRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Log Approved!A2:I",
    });

    const approvedRows = approvedRes.data.values || [];

    const approvedLoans = approvedRows
      .filter((r) => r[1]?.toLowerCase() === email.toLowerCase()) // email is column B
      .map((r) => ({
        full_name: r[0],          // A
        email: r[1],              // B
        loan_amount: r[2],        // C
        purpose: r[3],            // D
        risk_score: r[4],         // E
        decision: r[5],           // F
        timestamp: r[6],          // G
        reference_number: r[7],   // H
        id_number: r[8],          // I
      }));

    // -------------------------------
    // 3️⃣ READ Declined Loans (A:I)
    // -------------------------------
    const declinedRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Log Declined!A2:I",
    });

    const declinedRows = declinedRes.data.values || [];

    const declinedLoans = declinedRows
      .filter((r) => r[1]?.toLowerCase() === email.toLowerCase()) // email is column B
      .map((r) => ({
        full_name: r[0],          // A
        email: r[1],              // B
        loan_amount: r[2],        // C
        purpose: r[3],            // D
        risk_score: r[4],         // E
        decision: r[5],           // F
        timestamp: r[6],          // G
        reference_number: r[7],   // H
        id_number: r[8],          // I
      }));

    // -------------------------------
    // 4️⃣ COMBINE + DEDUPLICATE
    // -------------------------------
    const combined = [...pendingLoans, ...approvedLoans, ...declinedLoans];

    const uniqueMap = new Map<string, any>();

    for (const loan of combined) {
      const key = `${loan.email}-${loan.loan_amount}-${loan.purpose}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, loan);
      } else {
        const existing = uniqueMap.get(key);

        if (
          existing.decision === "Pending" &&
          loan.decision !== "Pending"
        ) {
          uniqueMap.set(key, loan);
        }
      }
    }

    const history = Array.from(uniqueMap.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      success: true,
      history,
    });
  } catch (error: any) {
    console.error("Loan Status Error:", error);
    return NextResponse.json(
      { error: "Failed to load loan status", details: error.message },
      { status: 500 }
    );
  }
}