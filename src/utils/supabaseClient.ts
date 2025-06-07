import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase URL from .env
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Supabase anon key from .env

export const supabase = createClient(supabaseUrl!, supabaseKey!);