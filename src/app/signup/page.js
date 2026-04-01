'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; 

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null); // <-- NEW: Success state
  
  // The Memory for our form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nrc: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null); // Clear previous messages

    try {
      // 1. Create the secure login account in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. If successful, take their new secure ID and create their business profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id, 
              full_name: formData.fullName,
              phone_number: formData.phone,
              nrc_number: formData.nrc,
              role: 'customer'
            }
          ]);

        if (profileError) throw profileError;
        
        // 3. NEW: Show a beautiful success message instead of an alert!
        setSuccessMsg("Account created successfully! Redirecting to login...");
        
        // 4. NEW: Wait 2 seconds so they can read it, then route to login
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }

    } catch (err) {
      setError(err.message);
      setIsLoading(false); // Only turn off loading if there's an error, otherwise let it spin during redirect
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="text-3xl font-black text-[#60CF38] tracking-tighter hover:opacity-80 transition">
          MUKISHA<span className="text-slate-900 font-light text-xl tracking-normal ml-2">FINANCE</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-black text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#60CF38] hover:text-[#4eac2c]">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          <form className="space-y-5" onSubmit={handleSignUp}>
            
            {/* Error Message Display */}
            {error && (
              <div className="bg-rose-50 text-rose-500 p-3 rounded-lg text-sm font-bold text-center">
                {error}
              </div>
            )}

            {/* NEW: Success Message Display */}
            {successMsg && (
              <div className="bg-[#60CF38]/10 text-[#4eac2c] p-3 rounded-lg text-sm font-bold text-center border border-[#60CF38]/20 animate-in fade-in slide-in-from-top-2">
                {successMsg}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-[#60CF38] focus:border-[#60CF38]" placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-[#60CF38] focus:border-[#60CF38]" placeholder="john@example.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-[#60CF38] focus:border-[#60CF38]" placeholder="0970000000" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">NRC Number</label>
                <input type="text" name="nrc" required value={formData.nrc} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-[#60CF38] focus:border-[#60CF38]" placeholder="123456/78/9" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-[#60CF38] focus:border-[#60CF38]" placeholder="Create a strong password" />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || successMsg} // Disable button while redirecting
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#60CF38] hover:bg-[#4eac2c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#60CF38] disabled:opacity-70 transition-all mt-6"
            >
              {isLoading && !successMsg ? 'Creating Account...' : successMsg ? 'Redirecting...' : 'Create Account'}
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}