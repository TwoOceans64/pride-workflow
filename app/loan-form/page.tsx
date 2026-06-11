"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function LoanFormPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [county, setCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#003366", "#00AEEF", "#4CAF50"],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/submit-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          id_number: idNumber,
          county,
          phone,
          loan_amount: loanAmount,
          purpose,
          email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => fireConfetti(), 300);
      } else {
        alert("Failed to submit loan");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // ⭐ SUCCESS SCREEN ⭐
  if (success) {
    return (
      <div className="min-h-screen bg-sacco-bg p-6 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-sacco-blue/20 text-center max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl">
              ✓
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-sacco-blue mb-2">
            Loan Submitted Successfully
          </h2>

          <p className="text-gray-600 mb-6">
            Your loan application has been received. You will be notified once it is reviewed.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/loan-status")}
              className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition"
            >
              View Loan Status
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-gray-200 text-sacco-blue p-3 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ⭐ LOAN FORM ⭐
  return (
    <div className="min-h-screen bg-sacco-bg p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-xl border border-sacco-blue/20">
        <h1 className="text-2xl font-semibold text-sacco-blue mb-4">
          Loan Application Form
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="ID Number"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="County"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Loan Amount"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Purpose"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Loan"}
          </button>
        </form>
      </div>
    </div>
  );
}