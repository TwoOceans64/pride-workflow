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
    // READ Pending (Loan Applicants)
    // -------------------------------
    const pendingRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Loan Applicants!A2:E",
    });

    const pendingRows = pendingRes.data.values || [];

    const pendingLoans = pendingRows
      .filter((r) => r[1]?.toLowerCase() === email.toLowerCase())
      .map((r) => ({
        email: r[1],
        loan_amount: r[2],
        purpose: r[3],
        timestamp: r[4],
        decision: "PENDING",
      }));

    // -------------------------------
    // READ Approved
    // -------------------------------
    const approvedRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Log Approved!A2:I",
    });

    const approvedRows = approvedRes.data.values || [];

    const approvedLoans = approvedRows
      .filter((r) => r[1]?.toLowerCase() === email.toLowerCase())
      .map((r) => ({
        email: r[1],            // B
        loan_amount: r[2],      // C
        purpose: r[3],          // D
        risk_score: r[4],       // E
        decision: r[5],         // F
        timestamp: r[6],        // G
        reference_number: r[7], // H
        id_number: r[8],        // I
      }));

    // -------------------------------
    // READ Declined
    // -------------------------------
    const declinedRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Log Declined!A2:I",
    });

    const declinedRows = declinedRes.data.values || [];

    const declinedLoans = declinedRows
      .filter((r) => r[1]?.toLowerCase() === email.toLowerCase())
      .map((r) => ({
        email: r[1],            // B
        loan_amount: r[2],      // C
        purpose: r[3],          // D
        risk_score: r[4],       // E
        decision: r[5],         // F
        timestamp: r[6],        // G
        reference_number: r[7], // H
        id_number: r[8],        // I
      }));

    // -------------------------------
    // COMBINE + DEDUPLICATE
    // -------------------------------
    const combined = [...pendingLoans, ...approvedLoans, ...declinedLoans];

    const uniqueMap = new Map();

    for (const loan of combined) {
      const key = `${loan.email}-${loan.loan_amount}-${loan.purpose}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, loan);
      } else {
        const existing = uniqueMap.get(key);

        // Replace pending with approved/declined
        if (
          existing.decision === "PENDING" &&
          loan.decision !== "PENDING"
        ) {
          uniqueMap.set(key, loan);
        }
      }
    }

    const finalLoans = Array.from(uniqueMap.values());

    // -------------------------------
    // ANALYTICS
    // -------------------------------
    const analytics = {
      totalLoans: finalLoans.length,
      pending: finalLoans.filter(
        (l) => l.decision?.toUpperCase() === "PENDING"
      ).length,
      approved: finalLoans.filter(
        (l) => l.decision?.toUpperCase() === "APPROVED"
      ).length,
      declined: finalLoans.filter(
        (l) => l.decision?.toUpperCase() === "DECLINED"
      ).length,
    };

    // -------------------------------
    // RECENT ACTIVITY
    // -------------------------------
    const recentActivity = finalLoans
      .map(
        (l) =>
          `${l.decision} loan of KES ${l.loan_amount} on ${l.timestamp}`
      )
      .sort((a, b) => {
        const dateA = new Date(a.split(" on ")[1]).getTime();
        const dateB = new Date(b.split(" on ")[1]).getTime();
        return dateB - dateA;
      });

    return NextResponse.json({
      success: true,
      analytics,
      recentActivity,
      notifications: [],
    });
  } catch (error: any) {
    console.error("Dashboard Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard analytics", details: error.message },
      { status: 500 }
    );
  }
}