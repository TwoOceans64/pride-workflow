"use client";

export const dynamic = "force-dynamic";

export default function NewLoanPage() {
  return (
    <div className="min-h-screen bg-sacco-bg flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-sacco-blue/20 max-w-lg w-full text-center">

        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-16 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">SACCO Loans</h2>
        </div>

        <h1 className="text-3xl font-semibold text-sacco-blue mb-4">
          New Loan Application
        </h1>

        <p className="text-gray-600 mb-6">
          Click below to start your loan application.
        </p>

        <a href="/loan-form" className="inline-block bg-sacco-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm">
          Start Loan Application
        </a>

        <p className="text-center text-sm text-gray-500 mt-10">
          Powered by <span className="text-sacco-gold font-semibold">SACCO Smart Systems</span>
        </p>
      </div>
    </div>
  );
}
