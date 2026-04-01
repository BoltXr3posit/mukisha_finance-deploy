'use client';
import { useState } from 'react';

// 1. THE DATA: A simple list of questions and answers.
const faqs = [
  {
    question: "What are the requirements for a personal loan?",
    answer: "You need to be a Zambian citizen, have a valid NRC, an active mobile money account (Airtel or MTN), and proof of steady income."
  },
  {
    question: "How long does it take to get approved?",
    answer: "Our AI-driven system processes applications instantly. If approved, funds are disbursed to your mobile money wallet within 30 seconds."
  },
  {
    question: "Can I pay off my loan early?",
    answer: "Yes! We encourage early repayments and there are absolutely no penalties for clearing your balance before your due date."
  },
  {
    question: "What happens if I miss a payment?",
    answer: "If you miss a payment, a late fee may be applied. We encourage you to contact our support team beforehand to discuss restructuring your repayment plan."
  }
];

export default function FaqSection() {
  // 2. THE STATE: We store a NUMBER here, not just true/false. 
  // 'null' means nothing is open. '0' means the first question is open.
  const [openIndex, setOpenIndex] = useState(null);

  // 3. THE TOGGLE FUNCTION
  const toggleFaq = (index) => {
    // If the one they clicked is already open, close it (set to null). 
    // Otherwise, open the one they clicked.
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-[#60CF38] font-bold tracking-wider uppercase text-sm mb-2 block">Support</span>
          <h2 className="text-3xl font-black text-slate-900">Got Questions? We can help</h2>
        </div>

        <div className="space-y-4">
          {/* 4. THE MAP FUNCTION: Looping through our questions */}
          {faqs.map((faq, index) => {
            
            // A simple variable to check if THIS specific accordion should be open
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-[#60CF38] shadow-md bg-emerald-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                {/* The Question (Clickable Header) */}
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className={`font-bold text-lg ${isOpen ? 'text-[#60CF38]' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  
                  {/* The Plus/Minus Icon */}
                  <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#60CF38]' : 'text-slate-400'}`}>
                    +
                  </span>
                </button>

                {/* The Answer (Conditionally Rendered) */}
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}