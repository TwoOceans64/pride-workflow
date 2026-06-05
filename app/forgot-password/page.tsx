"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Later we can connect this to n8n or email service
    alert("If this email exists, a reset link has been sent.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-sacco-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-sacco-blue/20">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-16 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">
            SACCO Loans
          </h2>
        </div>

        <h1 className="text-3xl font-semibold text-sacco-blue mb-6 text-center">
          Reset Password
        </h1>

        <form className="space-y-5" onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm"
          >
            Send Reset Link
          </button>
        </form>

        <p
          onClick={() => router.push("/login")}
          className="text-sacco-blue text-sm font-medium hover:underline cursor-pointer text-center mt-4"
        >
          Back to Login
        </p>

        <p className="text-center text-sm text-gray-500 mt-6">
          Powered by <span className="text-sacco-gold font-semibold">SACCO Smart Systems</span>
        </p>
      </div>
    </div>
  );
}