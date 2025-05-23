// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } from '@env';

const SUPABASE_URL = NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // disable this in mobile apps
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });