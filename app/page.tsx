"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-sacco-bg flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-sacco-blue/20 max-w-lg w-full text-center">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-20 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">
            SACCO Loans
          </h2>
        </div>

        <h1 className="text-4xl font-bold text-sacco-blue mb-4">
          SACCO Smart Systems
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Welcome to your digital loan application and status portal.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-sacco-blue text-white px-6 py-3 rounded-lg font-medium 
                       hover:bg-[#00264d] transition shadow-sm w-full"
          >
            Continue to Sign In
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-sacco-gold text-sacco-blue px-6 py-3 rounded-lg font-medium 
                       hover:bg-[#e0a200] transition shadow-sm w-full"
          >
            Create a New Account
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Powered by{" Michaela J Browers "}
          <span className="text-sacco-gold font-semibold">
            SACCO Smart Systems
          </span>
        </p>
      </div>
    </div>
  );
}