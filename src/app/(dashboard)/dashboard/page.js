'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import RecentActivityTable from '@/components/RecentActivityTable';
import ApplicationWizard from '@/components/ApplicationWizard';

export default function DashboardHome() {
  const router = useRouter();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  // --- States for Real Data ---
  const [userName, setUserName] = useState("Loading...");
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  // --- Logout Function ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // This runs automatically the moment the dashboard loads
  useEffect(() => {
    async function fetchUserData() {
      // 1. Get the securely logged-in user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // 2. Fetch profile from the 'users' table
      const { data: profile } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', user.id)
        .single();
        
      if (profile) {
        setUserName(profile.full_name.split(' ')[0]); 
      }

      // 3. Fetch loans from the 'loans' table
      const { data: loans } = await supabase
        .from('loans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (loans && loans.length > 0) {
        const total = loans.reduce((sum, loan) => sum + Number(loan.amount), 0);
        setTotalBalance(total);

        const formattedLoans = loans.map((loan) => ({
          id: loan.id.substring(0, 8).toUpperCase(),
          date: new Date(loan.created_at).toLocaleDateString(),
          purpose: loan.purpose,
          amount: `K${Number(loan.amount).toLocaleString()}`,
          status: loan.status.charAt(0).toUpperCase() + loan.status.slice(1) 
        }));
        setTransactions(formattedLoans);
      } else {
        setTransactions([]);
        setTotalBalance(0);
      }
    }

    fetchUserData();
  }, [router]);

  return (
    <main className="p-8">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Welcome, {userName}!</h1>
          <p className="text-slate-500 mt-1">Here is what is happening with your accounts today.</p>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <button 
            onClick={handleLogout}
            className="text-slate-500 hover:text-rose-600 font-bold px-4 py-2 transition text-sm"
          >
            Sign Out
          </button>
          <button 
            onClick={() => setIsWizardOpen(true)} 
            className="flex-1 md:flex-none bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-slate-800 transition text-sm"
          >
            + New Application
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-[#60CF38]/30 transition-colors">
          <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Total Loan Balance</p>
          <h2 className="text-4xl font-black text-slate-900">K{totalBalance.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Next Payment</p>
          <h2 className="text-4xl font-black text-[#60CF38]">K0.00</h2>
          <p className="text-sm text-slate-400 mt-2 italic">No active repayments due</p>
        </div>
      </div>

      {/* Recent Activity Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Applications</h2>
        </div>
        
        <RecentActivityTable transactions={transactions} />
      </div>

      {/* Application Wizard Modal */}
      {isWizardOpen && (
        <ApplicationWizard onClose={() => setIsWizardOpen(false)} />
      )}
      
    </main>
  );
}