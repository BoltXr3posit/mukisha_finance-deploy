'use client';
import { useState } from 'react';
import ApplicationModal from './ApplicationModal'; // <-- ADD THIS

export default function Calculator() {
  const [amount, setAmount] = useState(500);
  const [months, setMonths] = useState(3);
  const [loanType, setLoanType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- ADD THIS

  // 1. DYNAMIC INTEREST RATE LOGIC (The new feature!)
  let rate = 0.08; // Default 8%
  if (amount >= 10000) {
    rate = 0.05; // 5% for big loans
  } else if (amount >= 5000) {
    rate = 0.06; // 6% for medium loans
  }

  // 2. The Financial Math
  const serviceFee = amount * 0.10; 
  const amountReceived = amount - serviceFee;
  
  let monthlyRepayment = 0;
  if (amount > 0 && months > 0) {
    // Amortization Formula
    monthlyRepayment = amount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  }

  // 3. Date Calculation
  const nextPaymentDate = new Date();
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
  const formattedDate = nextPaymentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full mx-auto">
      
      {/* AMOUNT SLIDER (Brought back and upgraded!) */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <label className="block text-slate-700 font-bold">How much would you like?</label>
            {/* Dynamic Interest Rate Badge */}
            <span className="inline-block mt-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
              Current Rate: {(rate * 100).toFixed(0)}% / mo
            </span>
          </div>
          <span className="text-3xl font-black text-[#60CF38]">K{amount}</span>
        </div>
        
        <input 
          type="range" 
          min="500" 
          max="20000" 
          step="500"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#60CF38]"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
          <span>K500</span>
          <span>K20,000</span>
        </div>
      </div>

      {/* Months Input */}
      <div className="mb-6">
        <label className="block text-slate-700 font-bold mb-2">For how many months?</label>
        <input 
          type="number" 
          min="1" /* THE HTML FIX: Stops the down arrow at 1 */
          value={months}
          onChange={(e) => {
            // THE REACT FIX: Handle manual typing
            const val = e.target.value;
            
            // Allow them to delete the number to type a new one (empty string)
            if (val === '') {
              setMonths('');
            } 
            // Only update the state if the number is 1 or greater
            else if (Number(val) >= 1) {
              setMonths(Number(val));
            }
          }}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#60CF38] focus:ring-1 focus:ring-[#60CF38] transition text-slate-800"
        />
      </div>

      {/* Loan Type Dropdown */}
      <div className="mb-6">
        <label className="block text-slate-700 font-bold mb-2">What type of loan would you like?</label>
        <select 
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#60CF38] bg-white text-slate-600 appearance-none"
        >
          <option value="">Select Loan Type</option>
          <option value="personal">Personal Loan</option>
          <option value="business">Business Loan</option>
          <option value="civil">Civil Servant Loan</option>
        </select>
      </div>

      {/* The Summary Box */}
      <div className="bg-slate-50 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Loan Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Service Fee</span>
            <span className="font-bold text-[#60CF38]">K{serviceFee.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Amount You Receive</span>
            <span className="font-bold text-[#60CF38]">K{amountReceived.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Monthly Repayment</span>
            <span className="font-bold text-[#60CF38]">K{monthlyRepayment.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200 mt-2">
            <span className="text-slate-500">Next Payment Date</span>
            <span className="font-bold text-[#60CF38]">{formattedDate}</span>
          </div>
        </div>
      </div>

{/* Apply Button */}
      <button 
        onClick={() => setIsModalOpen(true)} // <-- ADD THIS ONCLICK
        className="w-full bg-[#60CF38] text-white py-4 rounded-xl font-bold hover:bg-[#5a851d] transition"
      >
        Apply
      </button>

      {/* THE MODAL COMPONENT (Hidden until isModalOpen is true) */}
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        amount={amount}
        months={months}
        monthlyRepayment={monthlyRepayment.toFixed(2)}
      />

    </div> // This is the closing div of your calculator
  );
}