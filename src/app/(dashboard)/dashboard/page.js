import RecentActivityTable from '@/components/RecentActivityTable';
export default function DashboardHome() {
  return (
    <main>
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome back, John!</h1>
          <p className="text-slate-500">Here is what's happening with your finances today.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-slate-800 transition">
          + New Application
        </button>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Wallet Balance</p>
          <p className="text-4xl font-black text-slate-900">K12,450<span className="text-lg text-slate-400">.00</span></p>
        </div>
        <div className="bg-[#60CF38] p-6 rounded-2xl shadow-md shadow-[#60CF38]/20 text-white">
          <p className="text-sm font-bold text-emerald-100 uppercase tracking-wider mb-2">Next Payment Due</p>
          <p className="text-4xl font-black mb-1">K958.33</p>
          <p className="text-sm text-emerald-100">Due on May 1, 2026</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Credit Score</p>
          <p className="text-4xl font-black text-emerald-600">Excellent</p>
        </div>
      </div>

      {/* Recent Activity Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
          <button className="text-sm font-bold text-[#60CF38] hover:underline">View All</button>
        </div>
        
        {/* This replaces the dashed empty box! */}
        <RecentActivityTable />
        
      </div>
    </main>
  );
}