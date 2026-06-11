"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  // ================= CALCULATOR STATE =================
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(6);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);

  // ================= CALCULATOR LOGIC =================
  useEffect(() => {
    const monthlyRate = 0.075; // 7.5% monthly interest

    const installment =
      (amount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -months));

    const total = installment * months;
    const interest = total - amount;

    setMonthlyInstallment(Math.round(installment));
    setTotalRepayment(Math.round(total));
    setTotalInterest(Math.round(interest));
  }, [amount, months]);

  return (
    <div className="min-h-screen w-full">

      {/* ================= NAVIGATION BAR ================= */}
      <nav className="w-full bg-white shadow-sm border-b border-sacco-blue/20 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/sacco-logo.png" alt="SACCO Logo" className="h-10 w-auto" />
            <span className="text-sacco-blue font-bold text-xl">SACCO Smart</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sacco-blue font-medium">
            <a href="#advantages" className="hover:text-sacco-gold transition">Our Advantages</a>
            <a href="#how" className="hover:text-sacco-gold transition">How to Borrow</a>
            <a href="#calculator" className="hover:text-sacco-gold transition">Loan Calculator</a>
            <a href="#services" className="hover:text-sacco-gold transition">Loan Services</a>
            <a href="#reviews" className="hover:text-sacco-gold transition">Reviews</a>
          </div>

          {/* Contact + Login */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col text-right text-sm text-gray-600">
              <span className="font-semibold text-sacco-blue">+27 64 077 5100</span>
              <span>Mon–Sun: 8am – 6pm</span>
            </div>

            <button
              onClick={() => router.push("/login")}
              className="bg-sacco-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-[#00264d] transition"
            >
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section
        className="min-h-screen bg-sacco-bg bg-cover bg-center flex items-center"
        style={{ paddingTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center md:items-start">

          {/* Left-aligned text */}
          <div className="md:w-1/2 text-left bg-white/80 p-8 rounded-xl shadow-lg border border-sacco-blue/20">
            <h1 className="text-4xl md:text-5xl font-bold text-sacco-blue leading-tight">
              SACCO Smart Systems
            </h1>

            <p className="text-gray-700 text-lg mt-4">
              Your digital loan application and member services portal.
              Fast, secure, and community‑driven.
            </p>

            {/* Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={() => router.push("/login")}
                className="bg-sacco-blue text-white px-6 py-3 rounded-lg font-medium 
                           hover:bg-[#00264d] transition shadow-sm w-full md:w-auto"
              >
                Continue to Sign In
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="bg-sacco-gold text-sacco-blue px-6 py-3 rounded-lg font-medium 
                           hover:bg-[#e0a200] transition shadow-sm w-full md:w-auto"
              >
                Create a New Account
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-6">
              Powered by <span className="font-semibold text-sacco-gold">Michaela J Browers</span>
            </p>
          </div>

        </div>
      </section>

      {/* ================= OUR ADVANTAGES ================= */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-sacco-blue mb-12">Our Advantages</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">Profitable</h3>
              <p className="text-gray-600">
                Low interest rates designed to benefit SACCO members first.
              </p>
            </div>

            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">Reliable</h3>
              <p className="text-gray-600">
                Regulated, transparent, and built on trusted SACCO principles.
              </p>
            </div>

            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">Simple</h3>
              <p className="text-gray-600">
                Apply anywhere, anytime — fast approvals and instant disbursement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW TO BORROW ================= */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-sacco-blue mb-12">How to Borrow</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white border rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">1. Apply Online</h3>
              <p className="text-gray-600">Fill out your loan application in minutes.</p>
            </div>

            <div className="p-8 bg-white border rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">2. Wait for Approval</h3>
              <p className="text-gray-600">Our system processes your request quickly.</p>
            </div>

            <div className="p-8 bg-white border rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">3. Receive Money</h3>
              <p className="text-gray-600">Funds are sent directly to your account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADVANCED LOAN CALCULATOR ================= */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-sacco-blue text-center mb-12">
            Loan Calculator
          </h2>

          <div className="bg-gray-50 p-10 rounded-2xl shadow-md border border-sacco-blue/20 max-w-3xl mx-auto">

            {/* Loan Amount */}
            <div className="mb-10">
              <label className="text-sacco-blue font-semibold text-lg">
                Loan Amount (KES)
              </label>

              <input
                type="range"
                min="1000"
                max="200000"
                value={amount}
                className="w-full mt-3"
                onChange={(e) => setAmount(Number(e.target.value))}
              />

              <p className="text-gray-700 mt-2">
                Selected Amount:{" "}
                <span className="font-bold text-sacco-blue">
                  {amount.toLocaleString()}
                </span>{" "}
                KES
              </p>
            </div>

            {/* Repayment Period */}
            <div className="mb-10">
              <label className="text-sacco-blue font-semibold text-lg">
                Repayment Period (Months)
              </label>

              <input
                type="range"
                min="1"
                max="12"
                value={months}
                className="w-full mt-3"
                onChange={(e) => setMonths(Number(e.target.value))}
              />

              <p className="text-gray-700 mt-2">
                Repayment Period:{" "}
                <span className="font-bold text-sacco-blue">
                  {months}
                </span>{" "}
                months
              </p>
            </div>

            {/* Breakdown */}
            <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">

              <div className="p-6 bg-white rounded-xl border shadow-sm">
                <p className="text-gray-600 text-sm">Monthly Installment</p>
                <p className="text-xl font-bold text-sacco-blue mt-2">
                  KES {monthlyInstallment.toLocaleString()}
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border shadow-sm">
                <p className="text-gray-600 text-sm">Total Interest</p>
                <p className="text-xl font-bold text-sacco-blue mt-2">
                  KES {totalInterest.toLocaleString()}
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border shadow-sm">
                <p className="text-gray-600 text-sm">Total Repayment</p>
                <p className="text-xl font-bold text-sacco-gold mt-2">
                  KES {totalRepayment.toLocaleString()}
                </p>
              </div>

            </div>

            {/* Apply Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => router.push("/login")}
                className="bg-sacco-blue text-white px-8 py-3 rounded-lg font-medium 
                           hover:bg-[#00264d] transition shadow-sm"
              >
                Apply for a Loan
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-sacco-blue mb-12">Loan Services</h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">Personal Loans</h3>
              <p className="text-gray-600">Flexible loans for everyday needs.</p>
            </div>

            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">Emergency Loans</h3>
              <p className="text-gray-600">Fast access to funds when you need them most.</p>
            </div>

            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-sacco-blue mb-3">Education Loans</h3>
              <p className="text-gray-600">Support for school, college, and training.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-sacco-blue mb-12">What Our Members Say</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white border rounded-xl shadow-sm">
              <p className="text-gray-600 italic">
                “Fast approval and great service. My SACCO really cares.”
              </p>
              <p className="text-sacco-blue font-semibold mt-3">— Temitope Bolugan</p>
            </div>

            <div className="p-8 bg-white border rounded-xl shadow-sm">
              <p className="text-gray-600 italic">
                “The online system is easy to use. I got my loan in minutes.”
              </p>
              <p className="text-sacco-blue font-semibold mt-3">— Grace Doe</p>
            </div>

            <div className="p-8 bg-white border rounded-xl shadow-sm">
              <p className="text-gray-600 italic">
                “Transparent, reliable, and community‑focused. Highly recommended.”
              </p>
              <p className="text-sacco-blue font-semibold mt-3">— Elizabeth Diore</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-sacco-blue text-white py-10 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="font-bold text-lg mb-3">SACCO Smart Systems</h3>
            <p className="text-gray-200 text-sm">
              Empowering members with fast, secure, and transparent digital loan services.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <p className="text-gray-200 text-sm">+27 64 077 5100</p>
            <p className="text-gray-200 text-sm">Mon–Sun: 8am – 6pm</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Legal</h3>
            <p className="text-gray-200 text-sm">Privacy Policy</p>
            <p className="text-gray-200 text-sm">Terms & Conditions</p>
            <p className="text-gray-200 text-sm">SACCO Registration No. 000000</p>
          </div>

        </div>

        <p className="text-center text-gray-300 text-sm mt-10">
          © {new Date().getFullYear()} SACCO Smart Systems. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}