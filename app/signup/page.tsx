"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation
  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Kenyan phone validation
  const validatePhone = (value: string) => {
    setPhone(value);

    const clean = value.replace(/\s+/g, "");

    const valid =
      /^07\d{8}$/.test(clean) || // 07xxxxxxxx
      /^01\d{8}$/.test(clean) || // 01xxxxxxxx
      /^\+2547\d{8}$/.test(clean); // +2547xxxxxxxx

    if (!valid) {
      setPhoneError("Enter a valid Kenyan phone number (07..., 01..., or +2547...)");
    } else {
      setPhoneError("");
    }
  };

  // Password / Kenyan ID validation + strength meter
  const validatePassword = (value: string) => {
    setPassword(value);

    // If it's all digits → treat as Kenyan ID number
    if (/^\d+$/.test(value)) {
      if (value.length < 7 || value.length > 9) {
        setPasswordError("Kenyan ID number must be 7, 8, or 9 digits");
        setPasswordStrength("");
      } else {
        setPasswordError("");
        setPasswordStrength("Valid Kenyan ID Number");
      }
      return;
    }

    // Otherwise treat as password
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setPasswordStrength("Weak");
      return;
    }

    setPasswordError("");

    if (value.length >= 12 && /[A-Z]/.test(value) && /\d/.test(value)) {
      setPasswordStrength("Strong");
    } else if (value.length >= 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || passwordError || phoneError) {
      alert("Please fix the errors before submitting");
      return;
    }

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
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 
                         focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 
                         focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
              required
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
            />
            {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="07xxxxxxxx or +2547xxxxxxxx"
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 
                         focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
              required
              value={phone}
              onChange={(e) => validatePhone(e.target.value)}
            />
            {phoneError && <p className="text-red-600 text-sm mt-1">{phoneError}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">
              Password / ID Number
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password or use ID"
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 
                           focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
                required
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
              />

              {/* Eye icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-sacco-blue"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}

            {!passwordError && passwordStrength && (
              <p
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : passwordStrength === "Weak"
                    ? "text-red-600"
                    : "text-sacco-blue"
                }`}
              >
                {passwordStrength}
              </p>
            )}
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