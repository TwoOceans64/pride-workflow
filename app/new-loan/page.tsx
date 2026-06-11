"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewLoanPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [county, setCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [harvestMonth, setHarvestMonth] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      full_name: fullName,
      id_number: idNumber,
      email,
      occupation,
      county,
      phone,
      loan_amount: loanAmount,
      purpose,
      harvest_month: harvestMonth,
    };

    try {
      const response = await fetch(
        "https://mjtechsolutions72.app.n8n.cloud/webhook/sacco-loan-review",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Webhook error");
      }

      const ref = "LN-" + Date.now();
      setReference(ref);
      setSuccess(true);
    } catch (err) {
      console.error("Loan submission error:", err);
      alert("Failed to submit loan request.");
    }

    setSubmitting(false);
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

          <p className="text-gray-600 mb-4">
            Thank you, {fullName}. Your loan request has been received and is now under review.
          </p>

          <p className="text-gray-700 font-medium mb-6">
            Reference Number: <span className="text-sacco-blue">{reference}</span>
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-200 text-sacco-blue p-3 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Submit Another Loan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ⭐ NORMAL FORM ⭐
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

          {/* ID NUMBER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Number
            </label>
            <input
              type="text"
              placeholder="Enter your ID number"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
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

          {/* PHONE NUMBER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue transition"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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