import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      {/* The 'ml-64' pushes the main content to the right so the sidebar doesn't cover it */}
      <div className="flex-1 ml-64 p-10">
        {children}
      </div>
    </div>
  );
}