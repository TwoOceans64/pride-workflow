import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email")?.toLowerCase() || "";
    const fullName = searchParams.get("full_name")?.toLowerCase() || "";

    if (!email && !fullName) {
      return NextResponse.json(
        { error: "Missing email or full_name" },
        { status: 400 }
      );
    }

    // Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

    // Read Log Approved
    const approvedRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Log Approved!A2:G",
    });

    // Read Log Declined
    const declinedRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Log Declined!A2:H",
    });

    const approvedRows = approvedRes.data.values || [];
    const declinedRows = declinedRes.data.values || [];

    // Convert rows → objects
    const approvedLoans = approvedRows.map((r) => ({
      full_name: r[0],
      email: r[1],
      loan_amount: Number(r[2]),
      purpose: r[3],
      risk_score: Number(r[4]),
      decision: "APPROVED",
      timestamp: r[5],
      guardian_reason: null,
    }));

    const declinedLoans = declinedRows.map((r) => ({
      full_name: r[0],
      email: r[1],
      loan_amount: Number(r[2]),
      purpose: r[3],
      risk_score: Number(r[4]),
      decision: "DECLINED",
      timestamp: r[5],
      guardian_reason: r[6] || "Not provided",
    }));

    const allLoans = [...approvedLoans, ...declinedLoans];

    // Filter by email → fallback to full_name
    const userLoans = allLoans.filter(
      (l) =>
        l.email.toLowerCase() === email ||
        l.full_name.toLowerCase() === fullName
    );

    // Analytics
    const totalLoans = userLoans.length;
    const approvedCount = userLoans.filter((l) => l.decision === "APPROVED").length;
    const declinedCount = userLoans.filter((l) => l.decision === "DECLINED").length;

    const avgRisk =
      userLoans.length > 0
        ? userLoans.reduce((sum, l) => sum + l.risk_score, 0) / userLoans.length
        : 0;

    // Notifications
    const notifications = userLoans
      .slice()
      .reverse()
      .map((loan, index) => ({
        id: index + 1,
        type: loan.decision,
        message:
          loan.decision === "APPROVED"
            ? "Your loan was approved."
            : "Your loan was declined.",
        timestamp: loan.timestamp,
        read: index !== 0, // newest = unread
      }));

    return NextResponse.json({
      success: true,
      analytics: {
        totalLoans,
        approvedCount,
        declinedCount,
        avgRisk,
      },
      loans: userLoans,
      notifications,
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data", details: error.message },
      { status: 500 }
    );
  }
}