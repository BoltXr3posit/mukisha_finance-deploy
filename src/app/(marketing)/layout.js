import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mukisha Finance Services",
  description: "Empowering your growth with digital financial services.",
};

export default function MarketingLayout({ children }) {
  return (
    // We removed <html>, <body>, and the Inter font, 
    // because the main RootLayout handles that now!
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-white">
        {children}
      </div>
      
      <Footer />
    </div>
  );
}