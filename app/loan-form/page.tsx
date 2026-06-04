"use client";

export const dynamic = "force-dynamic";

export default function LoanFormPage() {
  return (
    <div className="min-h-screen bg-sacco-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-sacco-blue/20">

        <div className="flex flex-col items-center mb-4">
          <img src="/sacco-logo.png" alt="SACCO Logo" className="h-16 w-auto opacity-90" />
          <h2 className="text-sacco-blue font-semibold text-lg mt-2 tracking-wide">SACCO Loans</h2>
        </div>

        <h1 className="text-3xl font-semibold text-sacco-blue mb-6 text-center">
          Submit Loan Request
        </h1>

        <form action="https://jmbrowers93.app.n8n.cloud/webhook/sacco-loan-review" method="POST" className="space-y-5">
          {/* Inputs */}
          {["full_name","email","occupation","county","loan_amount","purpose","harvest_month"].map((field,i)=>(
            <div key={i}>
              <label className="block text-sm font-medium text-sacco-blue mb-1 capitalize">{field.replace("_"," ")}</label>
              <input type={field==="email"?"email":field==="loan_amount"?"number":"text"} name={field} placeholder={`Enter your ${field.replace("_"," ")}`} className="w-full border border-gray-300 p-3 rounded-lg text-sacco-text placeholder:text-gray-400 focus:ring-2 focus:ring-sacco-blue focus:border-sacco-blue outline-none transition" required />
            </div>
          ))}

          <button type="submit" className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm">
            Submit Request
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Powered by <span className="text-sacco-gold font-semibold">SACCO Smart Systems</span>
          </p>
        </form>
      </div>
    </div>
  );
}
