
import { supabase } from "@/integrations/supabase/client";

/**
 * Checks for existing session and validates it
 * Returns a valid session or null if invalid
 */
export const checkSession = async () => {
  try {
    console.log("Checking for existing session...");
    
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Error checking session:", error);
      localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
      sessionStorage.clear();
      return null;
    }
    
    if (!data.session || data.session.user?.id === '00000000-0000-0000-0000-000000000099') {
      if (data.session) {
        console.error("Found problematic user ID, clearing session");
        await supabase.auth.signOut({ scope: 'local' });
        localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
        sessionStorage.clear();
      }
      
      return null;
    } else {
      return data.session;
    }
  } catch (error) {
    console.error("Error checking session:", error);
    return null;
  }
};

/**
 * Sets up auth state change subscription and handler
 * Returns the unsubscribe function
 */
export const setupAuthStateChangeListener = (
  setSession: (session: any) => void
) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth state changed:", event, session ? "Has session" : "No session");
    
    if (event === 'SIGNED_OUT') {
      setSession(null);
      localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
      sessionStorage.clear();
      return;
    }
    
    if (session && session.user?.id !== '00000000-0000-0000-0000-000000000099') {
      setSession(session);
    } else if (session) {
      console.error("Auth state change detected problematic user ID");
      await supabase.auth.signOut({ scope: 'local' });
      localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
      sessionStorage.clear();
      setSession(null);
    } else {
      setSession(null);
    }
  });

  return subscription;
};
