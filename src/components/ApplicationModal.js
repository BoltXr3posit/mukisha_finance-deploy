export default function ApplicationModal({ isOpen, onClose, amount, months, monthlyRepayment }) {
  // 1. CONDITIONAL RENDERING: If 'isOpen' is false, render absolutely nothing.
  if (!isOpen) return null;

  return (
    // 2. THE OVERLAY: Fixed position, covers the whole screen, semi-transparent black background.
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      
      {/* 3. THE MODAL BOX: White background, centered. */}
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-slate-900 mb-2">Almost there!</h2>
        <p className="text-slate-600 mb-8">
          Complete your application for <span className="font-bold text-[#60CF38]">K{amount}</span> over {months} months.
        </p>

        {/* The Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#60CF38]" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#60CF38]" placeholder="Banda" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">NRC Number</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#60CF38]" placeholder="123456/78/1" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Mobile Money Number (Airtel/MTN)</label>
            <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#60CF38]" placeholder="09..." />
          </div>

          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-[#60CF38] transition mt-4">
            Submit Application
          </button>
          
          <p className="text-xs text-center text-slate-500 mt-4">
            By submitting, you agree to pay K{monthlyRepayment} monthly.
          </p>
        </form>

      </div>
    </div>
  );
}