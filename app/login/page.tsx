"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // ⭐ Normalize email before saving
    const normalizedEmail = email.trim().toLowerCase();

    // ⭐ Save normalized email for dashboard
    localStorage.setItem("userEmail", normalizedEmail);

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-sacco-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-sacco-blue/20">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-16 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">SACCO Loans</h2>
        </div>

        <h1 className="text-3xl font-semibold text-sacco-blue mb-6 text-center">
          Applicant Login
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password */}
          <p
            onClick={() => router.push("/forgot-password")}
            className="text-sacco-blue text-sm font-medium hover:underline cursor-pointer text-right"
          >
            Forgot Password
          </p>

          <button
            type="submit"
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Powered by <span className="text-sacco-gold font-semibold">SACCO Smart Systems</span>
        </p>
      </div>
    </div>
  );
}