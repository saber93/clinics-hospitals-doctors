
import { supabase } from "@/integrations/supabase/client";

/**
 * Cleans up invalid or problematic auth tokens
 */
export const cleanupInvalidAuth = async () => {
  try {
    const problematicAuthTokenKey = 'sb-rghakqvaawoopcoeowir-auth-token';
    const authToken = localStorage.getItem(problematicAuthTokenKey);
    
    if (authToken) {
      try {
        const parsed = JSON.parse(authToken);
        if (parsed?.user?.id === '00000000-0000-0000-0000-000000000099') {
          console.log("Found problematic auth token, clearing it");
          localStorage.removeItem(problematicAuthTokenKey);
          sessionStorage.clear();
          await supabase.auth.signOut({ scope: 'local' });
        }
      } catch (e) {
        console.error("Error parsing auth token:", e);
      }
    }
  } catch (e) {
    console.error("Error in auth cleanup:", e);
  }
};
