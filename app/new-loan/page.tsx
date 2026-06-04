"use client";

export default function NewLoanPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl border max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold text-[#003366] mb-4">
          New Loan Application
        </h1>

        <p className="text-gray-600 mb-6">
          Click below to start your loan application.
        </p>

        <a
          href="/loan-form"
          className="inline-block bg-[#003366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00264d] transition"
        >
          Start Loan Application
        </a>
      </div>
    </div>
  );
}
