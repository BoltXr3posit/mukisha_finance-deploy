'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      // The real authentication call to Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      // If the password is wrong or user doesn't exist, throw the error
      if (authError) throw authError;

      // If successful, route them to the dashboard!
      if (data.user) {
        router.push('/dashboard');
      }

    } catch (err) {
      // Display the error message to the user (e.g., "Invalid login credentials")
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="text-3xl font-black text-[#60CF38] tracking-tighter hover:opacity-80 transition">
          MUKISHA<span className="text-slate-900 font-light text-xl tracking-normal ml-2">FINANCE</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-black text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link href="/signup" className="font-bold text-[#60CF38] hover:text-[#4eac2c]">
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Error Message Display */}
            {error && (
              <div className="bg-rose-50 text-rose-500 p-3 rounded-lg text-sm font-bold text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700">Email address</label>
              <div className="mt-1">
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#60CF38] focus:border-[#60CF38] sm:text-sm" 
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <div className="mt-1">
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#60CF38] focus:border-[#60CF38] sm:text-sm" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-[#60CF38] focus:ring-[#60CF38] border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-bold text-[#60CF38] hover:text-[#4eac2c]">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-70 transition-all"
              >
                {isLoading ? 'Authenticating...' : 'Sign in'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}