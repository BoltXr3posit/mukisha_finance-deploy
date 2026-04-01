'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ApplicationWizard({ onClose }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    purpose: 'Business',
    months: '6',
  });

  // Calculate monthly repayment (Assuming a 5% flat interest rate for the platform)
  const principal = Number(formData.amount) || 0;
  const interest = principal * 0.05; 
  const totalRepayment = principal + interest;
  const monthlyRepayment = formData.months ? (totalRepayment / Number(formData.months)) : 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Double check who is securely logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to apply for a loan.");
      }

      // 2. Send the exact loan details to the 'loans' table
      const { error: insertError } = await supabase
        .from('loans')
        .insert([
          {
            user_id: user.id,
            amount: Number(formData.amount),
            months: Number(formData.months),
            purpose: formData.purpose,
            monthly_repayment: monthlyRepayment,
            status: 'pending' // All new loans start as pending!
          }
        ]);

      if (insertError) throw insertError;

      // 3. Trigger the Success UI
      setIsSuccess(true);

      // 4. Wait 2 seconds, then close the modal and refresh the dashboard data!
      setTimeout(() => {
        onClose();
        router.refresh(); // This magically tells Next.js to fetch the new table data
      }, 2000);

    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center">
          <h2 className="text-xl font-black text-white">New Loan Application</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition font-bold text-xl">
            ×
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-[#60CF38] transition-all duration-300" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        <div className="p-8">
          
          {/* Error Banner */}
          {error && (
            <div className="mb-6 bg-rose-50 text-rose-500 p-3 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          {/* SUCCESS STATE */}
          {isSuccess ? (
            <div className="text-center py-10 animate-in zoom-in">
              <div className="w-20 h-20 bg-[#60CF38]/20 text-[#60CF38] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                ✓
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Application Submitted!</h3>
              <p className="text-slate-500">Your loan is now pending review. Updating your dashboard...</p>
            </div>
          ) : (
            <>
              {/* STEP 1: Amount & Purpose */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">How much do you need?</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-slate-400 font-bold">K</span>
                      <input 
                        type="number" 
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60CF38] text-lg font-bold text-slate-900 bg-white" 
                        placeholder="5000"
                        min="500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Loan Purpose</label>
                    <select 
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60CF38] text-slate-900 bg-white font-medium"
                    >
                      <option value="Business">Business Inventory / Scaling</option>
                      <option value="Personal">Personal Emergency</option>
                      <option value="Education">School Fees</option>
                      <option value="Agriculture">Farming Inputs</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: Duration */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-4">Repayment Duration</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['3', '6', '12'].map((monthOption) => (
                        <button
                          key={monthOption}
                          onClick={() => setFormData({ ...formData, months: monthOption })}
                          className={`py-4 rounded-xl border-2 font-bold transition-all ${
                            formData.months === monthOption 
                            ? 'border-[#60CF38] bg-[#60CF38]/10 text-[#60CF38]' 
                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          {monthOption} Months
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Review */}
              {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                      <span className="text-slate-500 font-medium">Principal Amount</span>
                      <span className="text-xl font-black text-slate-900">K{principal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                      <span className="text-slate-500 font-medium">Interest (5%)</span>
                      <span className="text-lg font-bold text-slate-700">K{interest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-900 font-bold">Estimated Monthly Payment</span>
                      <span className="text-2xl font-black text-[#60CF38]">K{monthlyRepayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 text-center px-4">
                    By submitting this application, you agree to the Mukisha Finance terms of service and authorize a credit check.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex space-x-4 mt-8 pt-6 border-t border-slate-100">
                {step > 1 && (
                  <button 
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="px-6 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                )}
                
                {step < 3 ? (
                  <button 
                    onClick={handleNext}
                    disabled={!formData.amount} // Force them to enter an amount
                    className="flex-1 bg-slate-900 text-white font-bold rounded-xl py-3 hover:bg-slate-800 transition disabled:opacity-50"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-[#60CF38] text-white font-bold rounded-xl py-3 hover:bg-[#4eac2c] transition shadow-lg shadow-[#60CF38]/30 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Submitting securely...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}