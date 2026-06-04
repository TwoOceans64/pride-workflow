"use client";

import { useState } from "react";

export default function LoanStatusPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const checkStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/loan-status?email=${email}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sacco-bg p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-sacco-blue/20">

        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-16 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">
            SACCO Loans
          </h2>
        </div>

        <h1 className="text-3xl font-semibold text-sacco-blue mb-6 text-center">
          Check Loan Status
        </h1>

        <form onSubmit={checkStatus} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">
              Enter your email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 p-3 rounded-lg 
                         focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue 
                         outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium 
                       hover:bg-[#00264d] transition shadow-sm"
          >
            {loading ? "Checking..." : "Check Status"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        {result && (
          <div className="mt-6 p-5 rounded-xl border shadow bg-sacco-bg">
            {result.status === "APPROVED" && (
              <div>
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  ✔ Loan Approved
                </h2>
                <p><strong>Name:</strong> {result.full_name}</p>
                <p><strong>Email:</strong> {result.email}</p>
                <p><strong>Amount:</strong> KES {result.loan_amount}</p>
                <p><strong>Purpose:</strong> {result.purpose}</p>
                <p><strong>Risk Score:</strong> {result.risk_score}</p>
                <p><strong>Timestamp:</strong> {result.timestamp}</p>
              </div>
            )}

            {result.status === "DECLINED" && (
              <div>
                <h2 className="text-xl font-semibold text-red-700 mb-2">
                  ✖ Loan Declined
                </h2>
                <p><strong>Name:</strong> {result.full_name}</p>
                <p><strong>Email:</strong> {result.email}</p>
                <p><strong>Amount:</strong> KES {result.loan_amount}</p>
                <p><strong>Purpose:</strong> {result.purpose}</p>
                <p><strong>Risk Score:</strong> {result.risk_score}</p>
                <p><strong>Reason:</strong> {result.guardian_reason}</p>
                <p><strong>Timestamp:</strong> {result.timestamp}</p>
              </div>
            )}

            {result.status === "NO_APPLICATION" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  No Application Found
                </h2>
                <p>{result.message}</p>
              </div>
            )}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Powered by{"Michaela J Browers "}
          <span className="text-sacco-gold font-semibold">
            SACCO Smart Systems
          </span>
        </p>
      </div>
    </div>
  );
}
