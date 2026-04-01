import Calculator from '@/components/Calculator';
import FaqSection from '@/components/FaqSection';

// 1. THIS IS OUR DATA: Instead of writing HTML 4 times, we make a list.
const loanOptions = [
  { 
    id: 1, 
    title: 'Personal Loans', 
    desc: 'Quick funds for your personal needs, emergencies, or projects.', 
    icon: '👤' 
  },
  { 
    id: 2, 
    title: 'Business Loans', 
    desc: 'Capital to help your SME grow, buy stock, or expand operations.', 
    icon: '💼' 
  },
  { 
    id: 3, 
    title: 'Agri Loans', 
    desc: 'Empowering farmers with financing for seeds, equipment, and labor.', 
    icon: '🌱' 
  },
  { 
    id: 4, 
    title: 'Bill Credit', 
    desc: 'Pay your utilities, TV, and water bills even when your balance is zero.', 
    icon: '🛡️' 
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      

      {/* HERO SECTION (Updated to dark background like the screenshot) */}
      <header className="bg-slate-900 pt-16 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              Empowering <br />
              <span className="text-[#60CF38]">your growth.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-md leading-relaxed">
              We are building the next generation of financial services for Africa.
            </p>
          </div>
          {/* The Calculator you already built! */}
          <Calculator />
        </div>
      </header>

      {/* SECTION 1: Easy Steps (Flexbox Layout) */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-16">Easy Steps to Get Your Loan</h2>
        
        {/* 'md:grid-cols-3' makes it 3 columns on desktop, 1 on mobile */}
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-[#60CF38] rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-[#60CF38]/20">
              📱
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Application</h3>
            <p className="text-slate-500">Apply for a loan in minutes. No paperwork required, entirely online.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-[#60CF38] rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-[#60CF38]/20">
              ⚙️
            </div>
            <h3 className="text-xl font-bold mb-3">Flexible Options</h3>
            <p className="text-slate-500">Select your loan amount and repayment terms that suit you.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-[#60CF38] rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-[#60CF38]/20">
              💸
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Disbursement</h3>
            <p className="text-slate-500">Money is sent straight to your mobile money or bank account.</p>
          </div>

        </div>
      </section>

      {/* SECTION 2: Loan Options (The Map Function) */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
            Flexible Loan Options, Made for You
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 2. THE MAGIC LOOP: This replaces writing 4 separate HTML blocks */}
            {loanOptions.map((loan) => (
              <div key={loan.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-6">{loan.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{loan.title}</h3>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                  {loan.desc}
                </p>
                <button className="bg-[#60CF38] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#5a851d] transition">
                  Apply now
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>

{/* SECTION 3: The FAQ */}
      <FaqSection />

    </main>
  );
}