"use client";

import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function PDFButton({ loan }: { loan: any }) {
  const downloadPDF = async () => {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

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
    const watermarkPremium = await loadImage("/sacco-watermark-faded.png");
    const watermarkSeal = await loadImage("/sacco-seal.png");
    const stamp = await loadImage("/sacco-verified-stamp.png");

    // ================= QR CODE =================
    const qrText = `
Reference: ${loan.reference_number}
Name: ${loan.full_name}
Amount: ${loan.loan_amount}
Decision: ${loan.decision}
    `;
    const qrCode = await QRCode.toDataURL(qrText);

    // ================= PAGE TRACKING =================
    let y = 15;
    const margin = 15;
    const pageHeight = doc.internal.pageSize.height;

    const addPageNumber = () => {
      const pageCount = (doc.internal as any).getNumberOfPages();
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(`Page ${pageCount}`, pageHeight / 2, pageHeight - 10, {
        align: "center",
      });
    };

    const checkPage = (heightNeeded = 10) => {
      if (y + heightNeeded > pageHeight - 20) {
        addPageNumber();
        doc.addPage();
        y = margin;

        // Reapply watermarks on new page
        doc.addImage(watermarkPremium, "PNG", 25, 120, 160, 160);
        doc.addImage(watermarkSeal, "PNG", 70, 140, 70, 70);
      }
    };

    // ================= BLUE BORDER =================
    doc.setDrawColor(0, 51, 153);
    doc.setLineWidth(2);
    doc.rect(5, 5, 200, 287);

    // ================= HEADER =================
    doc.setFillColor(0, 51, 153);
    doc.rect(5, 5, 200, 25, "F");

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("SACCO SMART SYSTEMS", 15, 22);

    // ================= LOGO =================
    doc.addImage(logo, "PNG", 15, 35, 40, 40);

    // ================= QR CODE =================
    doc.addImage(qrCode, "PNG", 150, 35, 40, 40);

    // ================= APPLICANT DETAILS =================
    y = 85;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const addLine = (text: string) => {
      checkPage(10);
      doc.text(text, margin, y);
      y += 8;
    };

    addLine(`Full Name: ${loan.full_name}`);
    addLine(`ID Number: ${loan.id_number || "N/A"}`);
    if (loan.county) addLine(`County: ${loan.county}`);
    if (loan.phone) addLine(`Phone: ${loan.phone}`);

    // ================= TITLE =================
    y += 10;
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 153);
    doc.text("Loan Application Receipt", margin, y);
    y += 5;

    doc.setDrawColor(0, 51, 153);
    doc.line(margin, y, 195, y);
    y += 10;

    // ================= DUAL WATERMARKS =================
    doc.addImage(watermarkPremium, "PNG", 25, 120, 160, 160);
    doc.addImage(watermarkSeal, "PNG", 70, 140, 70, 70);

    // ================= LOAN DETAILS =================
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    addLine(`Reference Number: ${loan.reference_number}`);
    addLine(`Loan Amount: KES ${loan.loan_amount}`);
    addLine(`Purpose: ${loan.purpose}`);
    addLine(`Risk Score: ${loan.risk_score || "N/A"}`);
    addLine(`Decision: ${loan.decision}`);
    addLine(`Date Issued: ${loan.timestamp}`);

    // ================= DIGITAL SIGNATURE (GENERATED) =================
    y += 15;
    checkPage(30);

    doc.setFontSize(12);
    doc.text("Authorized By:", margin, y);
    y += 10;

    // Premium banking signature style
    doc.setFontSize(26);
    doc.setTextColor(0, 51, 153);
    doc.text("M. J. Browers", margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Chief Loan / Liaison Officer", margin, y);
    y += 20;

    // ================= VERIFIED STAMP =================
    doc.addImage(stamp, "PNG", 140, y - 30, 50, 50);

    // ================= FOOTER =================
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(
      "SACCO Smart Systems • Kimberley, Northern Cape, South Africa 8301",
      margin,
      pageHeight - 10
    );

    // ================= FINAL PAGE NUMBER =================
    addPageNumber();

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