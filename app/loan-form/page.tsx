"use client";

import { useState, useEffect } from "react";

export default function LoanFormPage() {
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
      harvest_month: harvestMonth
    };

    try {
      await fetch("https://jmbrowers93.app.n8n.cloud/webhook/sacco-loan-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Loan request submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit loan request.");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-sacco-bg p-6">
      <h1 className="text-3xl font-semibold text-sacco-blue mb-6">
        New Loan Application
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border border-sacco-blue/20 space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded bg-gray-100"
            value={email}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Occupation</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">County</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Loan Amount (KES)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Purpose</label>
          <textarea
            className="w-full p-2 border rounded"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Harvest Month</label>
          <input
            type="month"
            className="w-full p-2 border rounded"
            value={harvestMonth}
            onChange={(e) => setHarvestMonth(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-sacco-blue text-white rounded-lg shadow"
        >
          {submitting ? "Submitting..." : "Submit Loan Request"}
        </button>
      </form>
    </div>
  );
}

