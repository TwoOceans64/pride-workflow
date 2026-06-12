"use client";

import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function PDFButton({ loan }: { loan: any }) {
  const downloadPDF = async () => {
    const doc = new jsPDF();

    // ================= LOAD IMAGES =================
    const loadImage = async (path: string) => {
      const blob = await fetch(path).then((res) => res.blob());
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    const logo = await loadImage("/sacco-logo.png");
    const watermark = await loadImage("/sacco-watermark-faded.png");
    const stamp = await loadImage("/sacco-verified-stamp.png");

    // ================= QR CODE =================
    const qrText = `
Reference: ${loan.reference_number}
Name: ${loan.full_name}
Amount: ${loan.loan_amount}
Decision: ${loan.decision}
    `;
    const qrCode = await QRCode.toDataURL(qrText);

    // ================= BLUE BORDER =================
    doc.setDrawColor(0, 51, 153);
    doc.setLineWidth(2);
    doc.rect(5, 5, 200, 287);

    // ================= LETTERHEAD =================
    doc.setFillColor(0, 51, 153);
    doc.rect(5, 5, 200, 25, "F");

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("SACCO SMART SYSTEMS", 15, 22);

    // ================= LOGO + APPLICANT DETAILS =================
    doc.addImage(logo, "PNG", 15, 35, 40, 40);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(`Full Name: ${loan.full_name}`, 15, 85);
    doc.text(`ID Number: ${loan.id_number || "N/A"}`, 15, 92);

    if (loan.county) doc.text(`County: ${loan.county}`, 15, 99);
    if (loan.phone) doc.text(`Phone: ${loan.phone}`, 15, 106);

    // ================= QR CODE =================
    doc.addImage(qrCode, "PNG", 150, 35, 40, 40);

    // ================= TITLE =================
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 153);
    doc.text("Loan Application Receipt", 15, 130);

    doc.setDrawColor(0, 51, 153);
    doc.line(15, 135, 195, 135);

    // ================= WATERMARK =================
    doc.addImage(watermark, "PNG", 30, 120, 150, 150);

    // ================= LOAN DETAILS =================
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(`Reference Number: ${loan.reference_number}`, 15, 155);
    doc.text(`Loan Amount: KES ${loan.loan_amount}`, 15, 165);
    doc.text(`Purpose: ${loan.purpose}`, 15, 175);
    doc.text(`Risk Score: ${loan.risk_score || "N/A"}`, 15, 185);
    doc.text(`Decision: ${loan.decision}`, 15, 195);
    doc.text(`Date Issued: ${loan.timestamp}`, 15, 205);

    // ================= SIGNATURE =================
    doc.setDrawColor(0, 0, 0);
    doc.line(15, 255, 100, 255);

    doc.setFontSize(12);
    doc.text("Chief Loan/Liaison Officer", 15, 263);
    doc.text("MJ Browers", 15, 271);

    // ================= VERIFIED STAMP =================
    doc.addImage(stamp, "PNG", 140, 230, 50, 50);

    // ================= FOOTER =================
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(
      "SACCO Smart Systems • Kimberley, Northern Cape, South Africa 8301",
      15,
      300
    );

    // ================= SAVE PDF =================
    doc.save(`Loan_Receipt_${loan.reference_number}.pdf`);
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