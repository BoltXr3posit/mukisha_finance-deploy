'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Sidebar() {
  const [name, setName] = useState('Loading...');
  const [initials, setInitials] = useState('');
  
  // --- NEW: Mobile Menu State ---
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile, error } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .single();

        if (error) {
          setName("User");
          setInitials("U");
        } else if (profile && profile.full_name) {
          setName(profile.full_name);
          const nameParts = profile.full_name.split(' ');
          const calculatedInitials = nameParts
            .map((part) => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2); 
            
          setInitials(calculatedInitials);
        }
      }
    }
    fetchProfile();
  }, []);

  return (
    <>
      {/* --- NEW: Floating Hamburger Button for Mobile --- */}
      {/* This button only shows on small screens (md:hidden) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-6 left-6 z-40 p-2 rounded-xl bg-white shadow-md text-slate-900 border border-slate-100 hover:bg-slate-50 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* --- NEW: Dark Overlay Background --- */}
      {/* When the menu is open on mobile, this darkens the background and allows you to click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- UPDATED: The Sidebar Itself --- */}
      {/* We added transition-transform and translate-x to slide it in and out */}
      <aside className={`w-64 bg-slate-900 text-slate-300 min-h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        
        {/* Dashboard Logo & Mobile Close Button */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-[#60CF38] tracking-tighter">
            MUKISHA<span className="text-white font-light text-sm tracking-normal ml-2">OS</span>
          </Link>
          
          {/* The 'X' close button only shows on mobile */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {/* Notice we pass setIsOpen to the links so clicking one closes the menu automatically! */}
          <SidebarLink icon="📊" label="Overview" href="/dashboard" active onClick={() => setIsOpen(false)} />
          <SidebarLink icon="💳" label="My Loans" href="#" onClick={() => setIsOpen(false)} />
          <SidebarLink icon="💸" label="Transfers" href="#" onClick={() => setIsOpen(false)} />
          <SidebarLink icon="📈" label="Investments" href="#" onClick={() => setIsOpen(false)} />
        </nav>

        {/* User Profile at the bottom */}
        <div className="p-4 border-t border-slate-800 m-4 rounded-xl bg-slate-800/50 flex items-center space-x-3 hover:bg-slate-800 transition">
          <div className="w-10 h-10 rounded-full bg-[#60CF38] flex shrink-0 items-center justify-center text-white font-bold">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{name}</p>
            <p className="text-xs text-slate-400">Verified User</p>
          </div>
        </div>

      </aside>
    </>
  );
}

// Updated SidebarLink to accept onClick so the menu closes when a user navigates
function SidebarLink({ icon, label, href, active, onClick }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active 
        ? 'bg-[#60CF38] text-white shadow-md' 
        : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}