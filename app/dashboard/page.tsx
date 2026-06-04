"use client";

export default function ApplicantDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <h1 className="text-3xl font-semibold text-[#003366] mb-6">
        Welcome Applicant
      </h1>

      <div className="grid gap-4">
        <a
          href="/loan-form"
          className="block bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#003366]">New Loan Application</h2>
          <p className="text-gray-600">Apply for a new SACCO loan</p>
        </a>

        <a
          href="/loan-status"
          className="block bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#003366]">My Loan Status</h2>
          <p className="text-gray-600">Check your loan progress</p>
        </a>
      </div>
    </div>
  );
}
