"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PDFButton from "./PDFButton";

export default function LoanStatusPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    const loadStatus = async () => {
      try {
        const res = await fetch(`/api/loan-status?email=${email}`);
        const data = await res.json();

        if (data.success) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error("Loan status load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue text-lg">
        Loading loan status…
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue text-lg">
        No user session found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sacco-bg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-sacco-blue">
          Loan Status
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-sacco-blue text-white px-4 py-2 rounded-lg shadow hover:bg-[#00264d] transition"
        >
          Back to Dashboard
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-600">No loan applications found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((loan, index) => (
            <div
              key={index}
              className="relative bg-white p-5 rounded-xl shadow border border-sacco-blue/20 overflow-hidden"
            >
              {/* Watermark background */}
              <img
                src="/sacco-watermark.png"
                alt="SACCO Watermark"
                className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none"
              />

              {/* Content */}
              <div className="relative z-10">
                <p className="text-sm text-gray-500">Reference No:</p>
                <p className="text-lg font-semibold text-sacco-blue">
                  {loan.reference_number || "N/A"}
                </p>

                <div className="flex justify-between items-center mt-3 mb-2">
                  <h2 className="text-lg font-semibold text-sacco-blue">
                    KES {loan.loan_amount}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      loan.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : loan.status === "Declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm">
                  <strong>Purpose:</strong> {loan.purpose}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  Submitted: {loan.timestamp}
                </p>

                {loan.risk_score && (
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Risk Score:</strong> {loan.risk_score}
                  </p>
                )}

                {loan.decision && (
                  <p className="text-gray-700 text-sm">
                    <strong>Reason:</strong> {loan.decision}
                  </p>
                )}

                {/* PDF Button Component */}
                <PDFButton loan={loan} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}