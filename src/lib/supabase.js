// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// This exports the 'supabase' object so we can use it anywhere in our app!
export const supabase = createClient(supabaseUrl, supabaseAnonKey);