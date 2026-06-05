"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function NewLoanPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [loan_amount, setLoanAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  // Load email + profile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);

    const loadProfile = async () => {
      if (!storedEmail) return;

      const res = await fetch(`/api/get-profile?email=${storedEmail}`);
      const data = await res.json();

      if (data.success) {
        setFullName(data.profile.full_name || "");
      }
    };

    loadProfile();
  }, []);

  const submitLoan = async (e: any) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const res = await fetch("/api/new-loan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullName,
        email,
        loan_amount,
        purpose,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Loan application submitted successfully!");
      router.push("/dashboard");
    } else {
      alert("Failed to submit loan.");
    }
  };

  return (
    <div className="min-h-screen bg-sacco-bg p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-xl border border-sacco-blue/20">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-16 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">
            SACCO Loans
          </h2>
        </div>

        <h1 className="text-2xl font-semibold text-sacco-blue mb-4 text-center">
          Apply for a Loan
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={submitLoan}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Loan Amount (KES)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={loan_amount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />

          <textarea
            placeholder="Purpose of the loan"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            rows={4}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 bg-gray-200 text-sacco-blue p-3 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Back to Dashboard
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Powered by Michaela J Browers{" "}
          <span className="text-sacco-gold font-semibold">SACCO Smart Systems</span>
        </p>
      </div>
    </div>
  );
}