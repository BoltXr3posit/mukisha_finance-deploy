
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Look! We just reused your exact Navbar component! */}
      
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black text-slate-900 mb-6">
          Our Mission
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          At Mukisha Finance LTD, we believe that access to fair, transparent credit is a human right. 
          We are on a mission to bridge the financial inclusion gap in Zambia and beyond.
        </p>
        
        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Why we do it</h2>
          <p className="text-emerald-800">
            Traditional banking leaves too many people behind. By leveraging technology, 
            we can approve loans in minutes, not weeks, empowering everyday people to 
            build their futures.
          </p>
        </div>
      </div>
    </main>
  );
}