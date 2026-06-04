"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-sacco-bg flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-sacco-blue/20 max-w-lg w-full text-center">

        {/* Title */}
        <h1 className="text-4xl font-bold text-sacco-blue mb-4">
          SACCO Smart Systems
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Welcome to your digital loan application and status portal.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/login")}
          className="bg-sacco-blue text-white px-6 py-3 rounded-lg font-medium 
                     hover:bg-[#00264d] transition shadow-sm w-full"
        >
          Continue to Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Powered by{" Michaela J Browers"}
          <span className="text-sacco-gold font-semibold">
            SACCO Smart Systems
          </span>
        </p>
      </div>
    </div>
  );
}
