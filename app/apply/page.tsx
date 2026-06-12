"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [employment, setEmployment] = useState("");

  return (
    <div className="min-h-screen bg-sacco-blue/5 pt-24 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-md">

        <h1 className="text-4xl font-bold text-sacco-blue mb-6">
          Loan Application
        </h1>

        <p className="text-gray-700 mb-8">
          Fill in your details below to begin your loan application.
        </p>

        <form className="space-y-6">

          {/* FULL NAME */}
          <div>
            <label className="block font-semibold text-sacco-blue">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          {/* ID NUMBER */}
          <div>
            <label className="block font-semibold text-sacco-blue">ID Number</label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
              placeholder="Enter your South African ID"
            />
          </div>

          {/* LOAN AMOUNT */}
          <div>
            <label className="block font-semibold text-sacco-blue">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
              placeholder="e.g. 5000"
            />
          </div>

          {/* EMPLOYMENT STATUS */}
          <div>
            <label className="block font-semibold text-sacco-blue">Employment Status</label>
            <select
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
            >
              <option value="">Select an option</option>
              <option>Employed</option>
              <option>Self‑Employed</option>
              <option>Unemployed</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full bg-sacco-blue text-white py-3 rounded-lg font-semibold hover:bg-[#00264d] transition"
          >
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}