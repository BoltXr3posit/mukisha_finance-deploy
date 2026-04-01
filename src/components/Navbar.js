import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-white border-b sticky top-0 z-50">
      
      {/* Logo (Now a clickable link to the Home page) */}
      <Link href="/" className="text-2xl font-black text-[#60CF38] tracking-tighter hover:opacity-80 transition">
        MUKISHA
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 font-medium text-slate-600 items-center">
        
        {/* ADDED: Explicit Home Link */}
        <Link href="/" className="hover:text-[#60CF38] transition py-2">
          Home
        </Link>
        
        {/* THE MEGA MENU PARENT (Notice the 'group' class here) */}
        <div className="relative group">
          
          <button className="flex items-center hover:text-[#60CF38] transition py-2">
            Loans
            {/* The little dropdown arrow */}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          {/* THE DROPDOWN CONTENT (Hidden by default, shown on group hover) */}
          <div className="absolute top-full left-0 mt-0 pt-4 w-[650px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="bg-white border border-slate-100 shadow-2xl rounded-2xl grid grid-cols-3 gap-8 p-8">
              
              {/* Column 1: Personal Loans */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 text-sm">Personal Loans</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Civil Servant Loan</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Zambia Defence Forces Loan</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Collateral Backed Loan</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Scheme Loan</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Instant Loan</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Salary Advance</Link></li>
                </ul>
              </div>

              {/* Column 2: Business Loans */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 text-sm">Business Loans</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Order Finance</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Invoice Discounting</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Asset Financing</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Agri Loans</Link></li>
                </ul>
              </div>

              {/* Column 3: Apps */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 text-sm">Apps</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><Link href="#" className="hover:text-[#60CF38] transition">Android App</Link></li>
                  <li><Link href="#" className="hover:text-[#60CF38] transition">iOS App</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
        {/* END MEGA MENU */}

        <Link href="#" className="hover:text-[#60CF38] transition py-2">Payments</Link>
        <Link href="#" className="hover:text-[#60CF38] transition py-2">Investments</Link>
        <Link href="/about" className="hover:text-[#60CF38] transition py-2">About</Link>
      </div>

      {/* Action Buttons (Right Side) */}
      <div className="flex items-center space-x-6">
        
        {/* Desktop-only text link */}
        <Link href="/login" className="hidden md:block font-bold text-slate-600 hover:text-[#60CF38] transition">
          Sign In
        </Link>

        {/* The Primary Button (Responsive Text) */}
        <Link href="/login">
          <button className="bg-[#60CF38] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-[#4eac2c] transition">
            {/* Shows ONLY on mobile */}
            <span className="md:hidden">Sign In</span>
            
            {/* Shows ONLY on desktop/tablet */}
            <span className="hidden md:inline">Apply for a Loan</span>
          </button>
        </Link>
        
      </div>
            
    </nav>
  );
}