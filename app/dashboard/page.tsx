"use client";

export const dynamic = "force-dynamic";

export default function ApplicantDashboard() {
  return (
    <div className="min-h-screen bg-sacco-bg p-6">
      <div className="flex flex-col items-center mb-4">
        <img src="/sacco-logo.png" alt="SACCO Logo" className="h-14 w-auto opacity-90" />
        <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">SACCO Loans</h2>
      </div>

      <h1 className="text-3xl font-semibold text-sacco-blue mb-6">
        Welcome Applicant
      </h1>

      <div className="grid gap-4">
        <a href="/new-loan" className="block bg-white p-6 rounded-xl shadow border border-sacco-blue/20 hover:border-sacco-blue hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-sacco-blue">New Loan Application</h2>
          <p className="text-gray-600">Apply for a new SACCO loan</p>
        </a>

        <a href="/loan-status" className="block bg-white p-6 rounded-xl shadow border border-sacco-blue/20 hover:border-sacco-blue hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-sacco-blue">My Loan Status</h2>
          <p className="text-gray-600">Check your loan progress</p>
        </a>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        Powered by <span className="text-sacco-gold font-semibold">SACCO Smart Systems</span>
      </p>
    </div>
  );
}
