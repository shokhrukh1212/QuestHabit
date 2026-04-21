import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const FALLBACK_SUPABASE_URL = "https://placeholder.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY = "public-anon-key-placeholder";

function isValidHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const rawSupabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = isValidHttpUrl(rawSupabaseUrl)
  ? rawSupabaseUrl
  : FALLBACK_SUPABASE_URL;
const supabaseAnonKey =
  typeof rawSupabaseAnonKey === "string" && rawSupabaseAnonKey.trim().length > 0
    ? rawSupabaseAnonKey
    : FALLBACK_SUPABASE_ANON_KEY;

if (__DEV__ && supabaseUrl === FALLBACK_SUPABASE_URL) {
  console.warn(
    "Missing or invalid EXPO_PUBLIC_SUPABASE_URL. Using fallback URL for local startup.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
