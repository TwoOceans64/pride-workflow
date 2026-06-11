"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  // 🌍 African countries with flags
  const africanCountries = [
    { name: "South Africa", code: "+27", flag: "https://flagcdn.com/za.svg" },
    { name: "Kenya", code: "+254", flag: "https://flagcdn.com/ke.svg" },
    { name: "Nigeria", code: "+234", flag: "https://flagcdn.com/ng.svg" },
    { name: "Ghana", code: "+233", flag: "https://flagcdn.com/gh.svg" },
    { name: "Uganda", code: "+256", flag: "https://flagcdn.com/ug.svg" },
    { name: "Tanzania", code: "+255", flag: "https://flagcdn.com/tz.svg" },
    { name: "Botswana", code: "+267", flag: "https://flagcdn.com/bw.svg" },
    { name: "Namibia", code: "+264", flag: "https://flagcdn.com/na.svg" },
    { name: "Zimbabwe", code: "+263", flag: "https://flagcdn.com/zw.svg" },
    { name: "Zambia", code: "+260", flag: "https://flagcdn.com/zm.svg" },
    { name: "Lesotho", code: "+266", flag: "https://flagcdn.com/ls.svg" },
    { name: "Eswatini", code: "+268", flag: "https://flagcdn.com/sz.svg" },
    { name: "Mozambique", code: "+258", flag: "https://flagcdn.com/mz.svg" },
    { name: "Angola", code: "+244", flag: "https://flagcdn.com/ao.svg" },
    { name: "Rwanda", code: "+250", flag: "https://flagcdn.com/rw.svg" },
    { name: "Ethiopia", code: "+251", flag: "https://flagcdn.com/et.svg" },
    { name: "Sudan", code: "+249", flag: "https://flagcdn.com/sd.svg" },
    { name: "Egypt", code: "+20", flag: "https://flagcdn.com/eg.svg" },
  ];

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [countryCode, setCountryCode] = useState("+27"); // default SA
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  // Validation state
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fullPhone = `${countryCode}${phone}`;

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

  // Africa phone validation
  const validatePhone = (value: string) => {
    const clean = value.replace(/\D/g, "");
    setPhone(clean);

    if (clean.length < 7) {
      setPhoneError("Enter a valid phone number");
    } else {
      setPhoneError("");
    }
  };

  // Password / Kenyan ID validation + strength meter
  const validatePassword = (value: string) => {
    setPassword(value);

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

  // Submit
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || phoneError || passwordError) {
      alert("Please fix the errors before submitting");
      return;
    }

    const payload = {
      full_name: fullName,
      email,
      phone: fullPhone,
      password,
    };

    await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

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

            {/* Email verification badge */}
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mt-1 inline-block">
              Email not verified
            </span>
          </div>

          {/* 🌍 Africa Phone Number */}
          <div>
            <label className="block text-sm font-medium text-sacco-blue mb-1">Phone Number</label>

            <div className="flex gap-2">
              {/* Country Code Dropdown with Flag */}
              <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 pr-10 bg-white text-sacco-blue appearance-none"
                >
                  {africanCountries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>

                {/* Flag icon */}
                <img
                  src={africanCountries.find((c) => c.code === countryCode)?.flag}
                  className="w-6 h-4 absolute right-3 top-3 rounded shadow-sm pointer-events-none"
                />
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                placeholder="Phone number"
                className="flex-1 border border-gray-300 p-3 rounded-lg text-gray-900 
                           focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
                required
                value={phone}
                onChange={(e) => validatePhone(e.target.value)}
              />
            </div>

            {phoneError && <p className="text-red-600 text-sm mt-1">{phoneError}</p>}

            {/* Phone verification badge */}
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mt-1 inline-block">
              Phone not verified
            </span>
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
          Already have an account{" "}
          <a href="/login" className="text-sacco-blue font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}