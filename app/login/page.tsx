"use client";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-[#003366] mb-6 text-center">
          Applicant Login
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded-lg 
                         text-gray-900 placeholder-gray-700 placeholder-opacity-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password / ID Number
            </label>
            <input
              type="password"
              placeholder="Enter your password or ID"
              className="w-full border border-gray-300 p-3 rounded-lg 
                         text-gray-900 placeholder-gray-700 placeholder-opacity-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#003366] text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
