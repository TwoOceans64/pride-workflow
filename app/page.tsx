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
    const monthlyRate = 0.075;

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

          <div className="flex items-center gap-2">
            <img src="/sacco-logo.png" alt="SACCO Logo" className="h-10 w-auto" />
            <span className="text-sacco-blue font-bold text-xl">SACCO Smart</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sacco-blue font-medium">
            <a href="#advantages" className="hover:text-sacco-gold transition">Our Advantages</a>
            <a href="#how" className="hover:text-sacco-gold transition">How to Borrow</a>
            <a href="#calculator" className="hover:text-sacco-gold transition">Loan Calculator</a>
            <a href="#services" className="hover:text-sacco-gold transition">Loan Services</a>
            <a href="#reviews" className="hover:text-sacco-gold transition">Reviews</a>
          </div>

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
        id="hero"
        className="min-h-screen bg-sacco-bg bg-cover bg-center flex items-center"
        style={{ paddingTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-sacco-blue leading-tight">
            Fast, Simple & Secure Loans<br />
            <span className="text-sacco-gold">Designed for You</span>
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-2xl">
            SACCO Smart helps you access affordable loans with transparent fees,
            flexible repayment options, and instant approval.
          </p>

          <button
            onClick={() => router.push("/apply")}
            className="mt-8 bg-sacco-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00264d] transition"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* ================= ADVANTAGES SECTION ================= */}
      <section id="advantages" className="py-24 bg-sacco-green/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-sacco-blue mb-12">
            Why Choose SACCO Smart?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-green">
              <h3 className="text-xl font-semibold text-sacco-blue">Low Interest Rates</h3>
              <p className="mt-3 text-gray-700">
                Our loan rates are designed to be affordable and transparent.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-green">
              <h3 className="text-xl font-semibold text-sacco-blue">Fast Approval</h3>
              <p className="mt-3 text-gray-700">
                Get approved within minutes with our automated system.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-green">
              <h3 className="text-xl font-semibold text-sacco-blue">Flexible Repayments</h3>
              <p className="mt-3 text-gray-700">
                Choose repayment terms that fit your financial situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW TO BORROW ================= */}
      <section id="how" className="py-24 bg-sacco-blue/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-sacco-blue mb-12">
            How to Borrow
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-blue">
              <h3 className="text-xl font-semibold text-sacco-blue">1. Apply Online</h3>
              <p className="mt-3 text-gray-700">
                Fill in your details and submit your loan request.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-blue">
              <h3 className="text-xl font-semibold text-sacco-blue">2. Get Approved</h3>
              <p className="mt-3 text-gray-700">
                Our system reviews your application instantly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-blue">
              <h3 className="text-xl font-semibold text-sacco-blue">3. Receive Funds</h3>
              <p className="mt-3 text-gray-700">
                Money is sent directly to your bank account.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-blue">
              <h3 className="text-xl font-semibold text-sacco-blue">4. Repay Monthly</h3>
              <p className="mt-3 text-gray-700">
                Make easy monthly repayments through debit order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOAN CALCULATOR ================= */}
      <section id="calculator" className="py-24 bg-sacco-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-sacco-blue mb-12">
            Loan Calculator
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <label className="block font-semibold text-sacco-blue">Loan Amount</label>
              <input
                type="range"
                min="1000"
                max="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full mt-3"
              />
              <p className="mt-2 text-gray-700">R {amount}</p>

              <label className="block mt-6 font-semibold text-sacco-blue">Repayment Months</label>
              <input
                type="range"
                min="1"
                max="24"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full mt-3"
              />
              <p className="mt-2 text-gray-700">{months} months</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-sacco-blue mb-6">Your Loan Summary</h3>

              <p className="text-lg text-gray-700">
                Monthly Installment:
                <span className="font-bold text-sacco-blue ml-2">
                  R {monthlyInstallment}
                </span>
              </p>

              <p className="text-lg text-gray-700 mt-4">
                Total Interest:
                <span className="font-bold text-sacco-blue ml-2">
                  R {totalInterest}
                </span>
              </p>

              <p className="text-lg text-gray-700 mt-4">
                Total Repayment:
                <span className="font-bold text-sacco-blue ml-2">
                  R {totalRepayment}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOAN SERVICES ================= */}
      <section id="services" className="py-24 bg-sacco-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-sacco-blue mb-12">
            Loan Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-gold">
              <h3 className="text-xl font-semibold text-sacco-blue">Personal Loans</h3>
              <p className="mt-3 text-gray-700">
                Flexible loans for emergencies, bills, or personal needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-gold">
              <h3 className="text-xl font-semibold text-sacco-blue">Business Loans</h3>
              <p className="mt-3 text-gray-700">
                Funding to help your business grow and succeed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-gold">
              <h3 className="text-xl font-semibold text-sacco-blue">Short‑Term Loans</h3>
              <p className="mt-3 text-gray-700">
                Quick loans with fast approval and easy repayment.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= REVIEWS SECTION ================= */}
      <section id="reviews" className="py-24 bg-sacco-beige/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-sacco-blue mb-12">
            What Our Members Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-beige">
              <p className="text-gray-700 italic">
                “SACCO Smart helped me get a loan within minutes. The process was smooth and stress‑free.”
              </p>
              <p className="mt-4 font-semibold text-sacco-blue">— Thabo M.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-beige">
              <p className="text-gray-700 italic">
                “Their interest rates are much lower than other lenders. Highly recommended.”
              </p>
              <p className="mt-4 font-semibold text-sacco-blue">— Lerato K.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-sacco-beige">
              <p className="text-gray-700 italic">
                “I love how transparent and simple everything is. No hidden fees.”
              </p>
              <p className="mt-4 font-semibold text-sacco-blue">— Sipho D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-sacco-blue text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

          <div>
            <h3 className="text-xl font-bold">SACCO Smart</h3>
            <p className="mt-3 text-sacco-beige/90">
              Affordable, transparent and secure loans designed for South Africans.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sacco-beige/90">
              <li><a href="#advantages" className="hover:text-white transition">Our Advantages</a></li>
              <li><a href="#how" className="hover:text-white transition">How to Borrow</a></li>
              <li><a href="#calculator" className="hover:text-white transition">Loan Calculator</a></li>
              <li><a href="#services" className="hover:text-white transition">Loan Services</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p className="mt-3 text-sacco-beige/90">Phone: +27 64 077 5100</p>
            <p className="text-sacco-beige/90">Email: support@saccosmart.co.za</p>
          </div>

        </div>

        <div className="text-center text-sacco-beige/70 mt-12 text-sm">
          © {new Date().getFullYear()} SACCO Smart. All rights reserved.
        </div>
      </footer>

    </div>
  );
}