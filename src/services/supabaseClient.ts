import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Missing Supabase environment variables. Using mock data for development."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple response type
export interface ServiceResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export default supabase;
