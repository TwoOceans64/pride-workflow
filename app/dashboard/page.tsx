"use client";

import { useEffect, useState, useMemo } from "react";

export const dynamic = "force-dynamic";

export default function ApplicantDashboard() {
  // TODO: Replace this with your login system later
  const userEmail = typeof window !== "undefined"
    ? localStorage.getItem("userEmail") || ""
    : "";

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Fetch dashboard data from your real API
  useEffect(() => {
    if (!userEmail) return;

    const loadData = async () => {
      try {
        const res = await fetch(
          `/api/applicant-dashboard?email=${encodeURIComponent(userEmail)}`
        );
        const data = await res.json();

        if (data.success) {
          setAnalytics(data.analytics);
          setLoans(data.loans);
          setNotifications(data.notifications);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userEmail]);

  const userName = loans[0]?.full_name || "Applicant";

  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-sacco-bg flex items-center justify-center">
        <p className="text-sacco-blue text-lg font-medium">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sacco-bg p-6 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src="/sacco-logo.png"
            alt="SACCO Logo"
            className="h-12 w-auto opacity-90"
          />
          <div>
            <h2 className="text-sacco-blue font-semibold text-lg tracking-wide">
              SACCO Loans
            </h2>
            <p className="text-xs text-gray-500">Applicant Dashboard</p>
          </div>
        </div>

        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative bg-white border border-sacco-blue/30 rounded-full px-4 py-2 text-sm text-sacco-blue font-medium shadow-sm hover:border-sacco-blue transition"
        >
          Notifications
          {notifications.some((n) => !n.read) && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
          )}
        </button>
      </div>

      {/* Main layout */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr] flex-1">
        {/* Left: Analytics + Recent Activity */}
        <div className="space-y-6">
          {/* Welcome + Analytics cards */}
          <div className="bg-white rounded-xl shadow-xl border border-sacco-blue/20 p-6">
            <h1 className="text-2xl font-semibold text-sacco-blue mb-4">
              Welcome, {userName.split(" ")[0]}
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Here’s a quick overview of your SACCO loan activity.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-sacco-bg rounded-lg p-3 border border-sacco-blue/20">
                <p className="text-xs text-gray-500">Total Loans</p>
                <p className="text-xl font-semibold text-sacco-blue">
                  {analytics?.totalLoans || 0}
                </p>
              </div>
              <div className="bg-sacco-bg rounded-lg p-3 border border-green-600/20">
                <p className="text-xs text-gray-500">Approved</p>
                <p className="text-xl font-semibold text-green-700">
                  {analytics?.approvedCount || 0}
                </p>
              </div>
              <div className="bg-sacco-bg rounded-lg p-3 border border-red-600/20">
                <p className="text-xs text-gray-500">Declined</p>
                <p className="text-xl font-semibold text-red-700">
                  {analytics?.declinedCount || 0}
                </p>
              </div>
              <div className="bg-sacco-bg rounded-lg p-3 border border-sacco-gold/40">
                <p className="text-xs text-gray-500">Avg Risk Score</p>
                <p className="text-xl font-semibold text-sacco-blue">
                  {(analytics?.avgRisk || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl shadow-xl border border-sacco-blue/20 p-6">
            <h2 className="text-lg font-semibold text-sacco-blue mb-4">
              Recent Loan Activity
            </h2>

            {loans.length === 0 ? (
              <p className="text-sm text-gray-500">
                No loan activity found yet.
              </p>
            ) : (
              <div className="space-y-3">
                {loans.map((loan, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start border-b last:border-b-0 pb-3 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-sacco-blue">
                        {loan.purpose}
                      </p>
                      <p className="text-xs text-gray-500">
                        KES {loan.loan_amount.toLocaleString()} • Risk:{" "}
                        {loan.risk_score.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">{loan.timestamp}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        loan.decision === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {loan.decision}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Profile + Quick actions */}
        <div className="space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-xl shadow-xl border border-sacco-blue/20 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-sacco-blue text-white flex items-center justify-center text-lg font-semibold">
                {initials}
              </div>
              <div>
                <p className="text-sm text-gray-500">Applicant Profile</p>
                <p className="text-lg font-semibold text-sacco-blue">
                  {userName}
                </p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Account Type</span>
                <span className="font-medium text-sacco-blue">
                  Standard Applicant
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Preferred Contact</span>
                <span className="font-medium text-sacco-blue">Email</span>
              </div>
            </div>

            <button className="mt-4 w-full bg-sacco-bg text-sacco-blue border border-sacco-blue/30 rounded-lg py-2 text-sm font-medium hover:border-sacco-blue transition">
              Edit Profile (coming soon)
            </button>

            <button className="mt-2 w-full bg-white text-red-600 border border-red-200 rounded-lg py-2 text-sm font-medium hover:bg-red-50 transition">
              Security & Settings (coming soon)
            </button>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl shadow-xl border border-sacco-blue/20 p-6 space-y-3">
            <h2 className="text-lg font-semibold text-sacco-blue mb-2">
              Quick Actions
            </h2>
            <a
              href="/new-loan"
              className="block w-full bg-sacco-blue text-white p-2 rounded-lg text-center text-sm font-medium hover:bg-[#00264d] transition"
            >
              Apply for a New Loan
            </a>
            <a
              href="/loan-status"
              className="block w-full bg-sacco-gold text-sacco-blue p-2 rounded-lg text-center text-sm font-medium hover:bg-[#e0a200] transition"
            >
              Check Loan Status
            </a>
            <a
              href="/"
              className="block w-full bg-gray-200 text-sacco-blue p-2 rounded-lg text-center text-sm font-medium hover:bg-gray-300 transition"
            >
              Logout
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Powered by{" "}
        <span className="text-sacco-gold font-semibold">
          SACCO Smart Systems
        </span>
      </p>

      {/* Notification Drawer */}
      {notificationsOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full max-w-sm bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-sacco-blue">
                Notifications
              </h2>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`border rounded-lg p-3 text-sm ${
                    n.type === "APPROVED"
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sacco-blue">
                      {n.type === "APPROVED" ? "Loan Approved" : "Loan Declined"}
                    </span>
                    {!n.read && (
                      <span className="text-[10px] uppercase text-sacco-blue font-semibold">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}