"use client";

import { useState, useEffect } from "react";

export default function NewLoanPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [county, setCounty] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [harvestMonth, setHarvestMonth] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      full_name: fullName,
      email,
      occupation,
      county,
      loan_amount: loanAmount,
      purpose,
      harvest_month: harvestMonth,
    };

    try {
      const response = await fetch(
        "https://jmbrowers93.app.n8n.cloud/webhook/sacco-loan-review",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Webhook error");
      }

      alert("Loan request submitted successfully!");
    } catch (err) {
      console.error("Loan submission error:", err);
      alert("Failed to submit loan request.");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-sacco-bg p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-xl border border-sacco-blue/20">
        <h1 className="text-3xl font-semibold text-sacco-blue mb-6 text-center">
          New Loan Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 text-gray-800"
              value={email}
              readOnly
            />
          </div>

          {/* OCCUPATION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <input
              type="text"
              placeholder="E.g., Farmer, Teacher, Trader"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            />
          </div>

          {/* COUNTY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              County
            </label>
            <input
              type="text"
              placeholder="Enter your county"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              required
            />
          </div>

          {/* LOAN AMOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount (KES)
            </label>
            <input
              type="number"
              placeholder="E.g., 50000"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
            />
          </div>

          {/* PURPOSE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose of Loan
            </label>
            <textarea
              placeholder="E.g., School Fees, Business Capital"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </div>

          {/* HARVEST MONTH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harvest Month
            </label>
            <input
              type="month"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={harvestMonth}
              onChange={(e) => setHarvestMonth(e.target.value)}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm"
          >
            {submitting ? "Submitting..." : "Submit Loan Request"}
          </button>
        </form>
      </div>
    </div>
  );
}