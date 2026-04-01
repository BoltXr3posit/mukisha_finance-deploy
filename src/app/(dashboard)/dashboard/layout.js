import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* The Sidebar Component */}
      <Sidebar />

      {/* The Main Content Area */}
      {/* FIX: Changed pl-64 to md:pl-64 so it only pushes right on desktop. 
          Added pt-20 on mobile so the hamburger button doesn't cover your text! */}
      <div className="flex-1 md:pl-64 pt-20 md:pt-0 w-full overflow-x-hidden">
        {children}
      </div>

    </div>
  );
}