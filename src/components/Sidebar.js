'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Sidebar() {
  const [name, setName] = useState('Loading...');
  const [initials, setInitials] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      // 1. Check who is securely logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. Fetch their profile from the database
        const { data: profile } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .single();

        if (profile && profile.full_name) {
          setName(profile.full_name);
          
          // 3. Automatically calculate initials (e.g., "Obey Simfukwe" -> "OS")
          const nameParts = profile.full_name.split(' ');
          const calculatedInitials = nameParts
            .map((part) => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2); // Ensures we only ever show a max of 2 letters
            
          setInitials(calculatedInitials);
        }
      }
    }
    fetchProfile();
  }, []);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50">
      
      {/* Dashboard Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="text-2xl font-black text-[#60CF38] tracking-tighter">
          MUKISHA<span className="text-white font-light text-sm tracking-normal ml-2">OS</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <SidebarLink icon="📊" label="Overview" href="/dashboard" active />
        <SidebarLink icon="💳" label="My Loans" href="#" />
        <SidebarLink icon="💸" label="Transfers" href="#" />
        <SidebarLink icon="📈" label="Investments" href="#" />
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
  );
}

// A mini-component just for the links to keep code clean
function SidebarLink({ icon, label, href, active }) {
  return (
    <Link 
      href={href} 
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