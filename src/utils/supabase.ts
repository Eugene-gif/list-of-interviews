import { useAuthStore } from "@/stores/auth";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const authStore = useAuthStore();

  if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
    if (session) {
      authStore.refreshSession(session);
      authStore.refreshUser(session);
    }
  }
})
