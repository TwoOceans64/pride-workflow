"use client";

import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function PDFButton({ loan }: { loan: any }) {
  const downloadPDF = async () => {
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
    const qrText = `Reference: ${loan.reference_number}
Name: ${loan.full_name}
Amount: ${loan.loan_amount}`;

    const qrCode = await QRCode.toDataURL(qrText);

    // Add watermark
    doc.addImage(watermark, "PNG", 35, 60, 140, 140, "", "FAST");

    // Add logo
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

    // QR Code
    doc.addImage(qrCode, "PNG", 150, 55, 40, 40);

    // Verified Stamp
    doc.addImage(stamp, "PNG", 140, 150, 50, 50);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("Thank you for using our SACCO services.", 20, 190);

    doc.save(`Loan-Receipt-${loan.reference_number || loan.loan_amount}.pdf`);
  };

  return (
    <button
      onClick={downloadPDF}
      className="mt-4 w-full bg-sacco-blue text-white p-2 rounded-lg text-sm font-medium hover:bg-[#00264d] transition"
    >
      Download PDF Receipt
    </button>
  );
}