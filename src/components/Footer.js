import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Column 1: Brand & Mission (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2">
          <div className="text-2xl font-black text-[#60CF38] tracking-tighter mb-6">
            MUKISHA FINANCE
          </div>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
            Empowering Zambia's growth through accessible, transparent, and digital financial services. Your partner in wealth creation.
          </p>
          
          {/* Social Icons (Using SVG paths directly in React) */}
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#60CF38] hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#60CF38] hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Products */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Products</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-[#60CF38] transition">Personal Loans</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Business Financing</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Agri-Loans</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Investments</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/about" className="hover:text-[#60CF38] transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Careers</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Press & Media</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Legal</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-[#60CF38] transition">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:text-[#60CF38] transition">Security</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>© 2026 Mukisha Finance Services. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Regulated by the Bank of Zambia.</p>
      </div>
    </footer>
  );
}