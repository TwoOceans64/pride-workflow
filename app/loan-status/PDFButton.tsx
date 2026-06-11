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
    `;
    const qrCode = await QRCode.toDataURL(qrText);

    // ================= BLUE BORDER =================
    doc.setDrawColor(0, 51, 153);
    doc.setLineWidth(2);
    doc.rect(5, 5, 200, 287);

    // ================= LETTERHEAD BANNER =================
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
    doc.text(`ID Number: ${loan.id_number}`, 15, 92);
    doc.text(`County: ${loan.county}`, 15, 99);
    doc.text(`Phone: ${loan.phone}`, 15, 106);

    // ================= QR CODE (TOP RIGHT) =================
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
    doc.text(`Decision: ${loan.decision || "Pending"}`, 15, 195);
    doc.text(`Date Issued: ${loan.timestamp}`, 15, 205);

    // ================= SIGNATURE BLOCK =================
    doc.setDrawColor(0, 0, 0);
    doc.line(15, 255, 100, 255);

    doc.setFontSize(12);
    doc.text("Chief Loan/Liaison Officer", 15, 263);
    doc.text("MJ Browers", 15, 271);

    // ================= VERIFIED STAMP =================
    doc.addImage(stamp, "PNG", 140, 230, 50, 50);

    // ================= HOLOGRAM SEAL =================
    const centerX = 165;
    const centerY = 245;
    const radius = 25;

    doc.setDrawColor(0, 120, 255);
    doc.setLineWidth(1.2);
    doc.circle(centerX, centerY, radius);

    for (let i = 0; i < 6; i++) {
      const opacity = 0.15 - i * 0.02;
      doc.setFillColor(0, 120 + i * 20, 255 - i * 30, opacity * 255);
      doc.circle(centerX, centerY, radius - i * 3, "F");
    }

    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("VERIFIED", centerX - 14, centerY - 2);
    doc.text("SACCO SMART", centerX - 18, centerY + 5);
    doc.text("SYSTEMS", centerX - 14, centerY + 12);

    // ================= MICROTEXT ANTI-FORGERY RING =================
    doc.setFontSize(4);
    doc.setTextColor(80, 80, 80);

    const microText = "SACCO SMART SYSTEMS VERIFIED • ";
    const repeated = microText.repeat(40);

    const ringX = 105;
    const ringY = 275;
    const ringRadius = 35;

    for (let angle = 0; angle < 360; angle += 10) {
      const rad = (angle * Math.PI) / 180;
      const x = ringX + ringRadius * Math.cos(rad);
      const y = ringY + ringRadius * Math.sin(rad);

      doc.text(repeated, x, y, { angle: angle + 90 });
    }

    // ================= BARCODE (ENCODED LOAN REFERENCE) =================
    const ref = loan.reference_number || "NO-REF";

    let startX = 40;
    const startY = 285;
    const barHeight = 20;

    for (let i = 0; i < ref.length; i++) {
      const charCode = ref.charCodeAt(i);
      const barWidth = (charCode % 5) + 1;

      doc.setFillColor(0, 0, 0);
      doc.rect(startX, startY, barWidth, barHeight, "F");

      startX += barWidth + 1;
    }

    doc.setFontSize(8);
    doc.text(`REF: ${ref}`, 40, 282);

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