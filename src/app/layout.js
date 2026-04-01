// 1. Import the fonts from Next.js
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// 2. Configure them
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // We create a CSS variable for Tailwind
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta', // We create a CSS variable for Tailwind
});

export const metadata = {
  title: "Majid Finance Services",
  description: "Empowering your growth with digital financial services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 3. Apply BOTH fonts to the body */}
      <body className={`${inter.variable} ${jakarta.variable} font-sans bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}