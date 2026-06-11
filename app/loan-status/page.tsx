"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

export default function LoanStatusPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    const loadStatus = async () => {
      try {
        const res = await fetch(`/api/loan-status?email=${email}`);
        const data = await res.json();

        if (data.success) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error("Loan status load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [email]);

  // ⭐ UPDATED PDF GENERATOR (Watermark + QR Code)
  const downloadPDF = async (loan: any) => {
    const doc = new jsPDF();

    // Load watermark
    const watermark = await fetch("/sacco-watermark.png")
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

    // Load SACCO logo
    const logo = await fetch("/sacco-logo.png")
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

    // Load Verified Stamp
    const stamp = await fetch("/sacco-verified-stamp.png")
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

    // Generate QR Code
    const qrData = encodeURIComponent(
      `Reference: ${loan.reference_number}\nName: ${loan.full_name}\nAmount: ${loan.loan_amount}`
    );
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${qrData}`;
    const qrCode = await fetch(qrUrl)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

    // Add watermark (center)
    doc.addImage(watermark, "PNG", 35, 60, 140, 140, "", "FAST");

    // Add SACCO Logo
    doc.addImage(logo, "PNG", 20, 10, 30, 30);

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text("SACCO Loan Receipt", 60, 25);

    // Divider
    doc.setDrawColor(0, 51, 102);
    doc.line(20, 45, 190, 45);

    // Loan Details
    doc.setFontSize(12);
    doc.setTextColor(50);

    doc.text(`Reference No: ${loan.reference_number || "N/A"}`, 20, 60);
    doc.text(`Name: ${loan.full_name}`, 20, 75);
    doc.text(`Email: ${loan.email}`, 20, 85);
    doc.text(`Loan Amount: KES ${loan.loan_amount}`, 20, 95);
    doc.text(`Purpose: ${loan.purpose}`, 20, 105);
    doc.text(`Status: ${loan.status}`, 20, 115);
    doc.text(`Timestamp: ${loan.timestamp}`, 20, 125);

    if (loan.risk_score) {
      doc.text(`Risk Score: ${loan.risk_score}`, 20, 135);
    }

    if (loan.decision) {
      doc.text(`Decision Reason: ${loan.decision}`, 20, 145);
    }

    // Add QR Code (top-right)
    doc.addImage(qrCode, "PNG", 150, 55, 40, 40);

    // Add Verified Stamp (bottom right)
    doc.addImage(stamp, "PNG", 140, 150, 50, 50);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("Thank you for using our SACCO services.", 20, 190);

    doc.save(`Loan-Receipt-${loan.reference_number || loan.loan_amount}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue text-lg">
        Loading loan status…
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue text-lg">
        No user session found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sacco-bg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-sacco-blue">
          Loan Status
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-sacco-blue text-white px-4 py-2 rounded-lg shadow hover:bg-[#00264d] transition"
        >
          Back to Dashboard
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-600">No loan applications found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((loan, index) => (
            <div
              key={index}
              className="relative bg-white p-5 rounded-xl shadow border border-sacco-blue/20 overflow-hidden"
            >
              {/* Watermark background */}
              <img
                src="/sacco-watermark.png"
                alt="SACCO Watermark"
                className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none"
              />

              {/* Content */}
              <div className="relative z-10">
                <p className="text-sm text-gray-500">Reference No:</p>
                <p className="text-lg font-semibold text-sacco-blue">
                  {loan.reference_number || "N/A"}
                </p>

                <div className="flex justify-between items-center mt-3 mb-2">
                  <h2 className="text-lg font-semibold text-sacco-blue">
                    KES {loan.loan_amount}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      loan.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : loan.status === "Declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm">
                  <strong>Purpose:</strong> {loan.purpose}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  Submitted: {loan.timestamp}
                </p>

                {loan.risk_score && (
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Risk Score:</strong> {loan.risk_score}
                  </p>
                )}

                {loan.decision && (
                  <p className="text-gray-700 text-sm">
                    <strong>Reason:</strong> {loan.decision}
                  </p>
                )}

                <button
                  onClick={() => downloadPDF(loan)}
                  className="mt-4 w-full bg-sacco-blue text-white p-2 rounded-lg text-sm font-medium hover:bg-[#00264d] transition"
                >
                  Download PDF Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}