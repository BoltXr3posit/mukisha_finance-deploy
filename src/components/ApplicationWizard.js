'use client';
import { useState } from 'react';

export default function ApplicationWizard({ onClose }) {
  // 1. THE BRAIN: Tracks which step we are on (1, 2, or 3)
  const [step, setStep] = useState(1);

  // 2. THE MEMORY: Stores all the inputs from every step
  const [formData, setFormData] = useState({
    amount: '5000',
    months: '3',
    purpose: 'Business Expansion',
    nrc: '',
    phone: '',
  });

  // Helper function to update form data easily
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // The Dark Overlay
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      
      {/* The White Modal Box */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Modal Header & Progress Bar */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-900">New Loan Application</h2>
            <p className="text-sm text-slate-500">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-500 transition text-2xl font-bold">
            ×
          </button>
        </div>

        {/* Progress Indicator (The Green Bar) */}
        <div className="w-full bg-slate-100 h-1.5">
          <div 
            className="bg-[#60CF38] h-1.5 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Modal Body (Where the dynamic steps go) */}
        <div className="p-8">
          
          {/* STEP 1: Loan Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-slate-800">How much do you need?</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Amount (ZMW)</label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#60CF38] focus:ring-1 focus:ring-[#60CF38] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Duration (Months)</label>
                  <input type="number" name="months" value={formData.months} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#60CF38] focus:ring-1 focus:ring-[#60CF38] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Purpose of Loan</label>
                <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#60CF38] outline-none bg-white">
                  <option>Business Expansion</option>
                  <option>Medical Emergency</option>
                  <option>Education / School Fees</option>
                  <option>Personal Project</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Verification Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-slate-800">Identity Verification</h3>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">NRC Number</label>
                <input type="text" name="nrc" placeholder="e.g. 123456/78/9" value={formData.nrc} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#60CF38] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Money Number</label>
                <input type="tel" name="phone" placeholder="e.g. 0970000000" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#60CF38] outline-none" />
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Review Your Application</h3>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Requested Amount</span>
                  <span className="font-bold text-slate-900">K{formData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-bold text-slate-900">{formData.months} Months</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-4 mt-4">
                  <span className="text-slate-500">Estimated Repayment</span>
                  <span className="font-black text-[#60CF38]">
                    K{((Number(formData.amount) * 1.15) / Number(formData.months)).toFixed(2)} / month
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer (Navigation Buttons) */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="px-6 py-2 rounded-lg font-bold text-slate-500 hover:text-slate-900 transition">
              ← Back
            </button>
          ) : (
            <div></div> /* Empty div to push the 'Next' button to the right */
          )}

          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-slate-800 transition">
              Next Step
            </button>
          ) : (
            <button onClick={() => {
              alert("Application Submitted to Mukisha Finance!");
              onClose();
            }} className="bg-[#60CF38] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-[#5a851d] transition">
              Submit Application
            </button>
          )}
        </div>

      </div>
    </div>
  );
}