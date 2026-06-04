"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Signup successful! Please log in.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sacco-bg p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-sacco-blue/20">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-16 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">
            SACCO Loans
          </h2>
        </div>

        <h1 className="text-3xl font-semibold text-sacco-blue mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">
              Password / ID Number
            </label>
            <input
              type="password"
              placeholder="Create a password or use ID"
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-sacco-blue font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}