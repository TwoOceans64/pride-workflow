"use client";

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-[#003366] mb-6 text-center">
          Submit Loan Request
        </h1>

        <form
          action="https://jmbrowers93.app.n8n.cloud/webhook/sacco-loan-review"
          method="POST"
          className="space-y-5"
        >
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition"
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
              name="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition"
              required
            />
          </div>

          {/* OCCUPATION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              placeholder="E.g., Farmer, Teacher, Trader"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition"
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
              name="county"
              placeholder="Enter your county"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition"
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
              name="loan_amount"
              placeholder="E.g., 50000"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition"
              required
            />
          </div>

          {/* PURPOSE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose of Loan
            </label>
            <input
              type="text"
              name="purpose"
              placeholder="E.g., School Fees, Business Capital"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition"
              required
            />
          </div>

          {/* HARVEST MONTH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harvest Month
            </label>
            <input
              type="text"
              name="harvest_month"
              placeholder="E.g., October"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#003366] text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm"
          >
            Submit Request
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Powered by{" Michael J. Browers -"}
            <span className="text-[#F4B400] font-semibold">
              SACCO Smart Systems
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
