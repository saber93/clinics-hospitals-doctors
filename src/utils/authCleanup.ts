
import { supabase } from "@/integrations/supabase/client";

/**
 * Cleans up invalid or problematic auth tokens
 * This function is called on application startup to avoid auth-related issues
 */
export const cleanupInvalidAuth = async (): Promise<void> => {
  try {
    // Check if we have a token
    const problematicAuthTokenKey = 'sb-rghakqvaawoopcoeowir-auth-token';
    const authToken = localStorage.getItem(problematicAuthTokenKey);
    
    // If no token exists, nothing to clean up
    if (!authToken) return;
    
    try {
      // Check if the token is valid by parsing it
      const parsed = JSON.parse(authToken);
      
      // If the token exists but appears corrupted or has known problematic values
      if (!parsed || 
          !parsed.access_token || 
          parsed.access_token === 'undefined' ||
          !parsed.refresh_token ||
          parsed.refresh_token === 'undefined' ||
          (parsed?.user?.id === '00000000-0000-0000-0000-000000000099')) {
        
        console.log("Found problematic auth token, clearing it");
        localStorage.removeItem(problematicAuthTokenKey);
        sessionStorage.clear();
        
        // Attempt to sign out just to be safe
        await supabase.auth.signOut({ scope: 'local' });
        
        console.log("Auth token cleared successfully");
      } else {
        // Valid token exists, verify with Supabase
        const { data, error } = await supabase.auth.getSession();
        
        // If there's an error or no session, clear the token
        if (error || !data.session) {
          console.log("Invalid session detected, clearing auth token");
          localStorage.removeItem(problematicAuthTokenKey);
          sessionStorage.clear();
          await supabase.auth.signOut({ scope: 'local' });
        }
      }
    } catch (e) {
      // If we can't parse the token, it's definitely invalid
      console.error("Error parsing auth token:", e);
      localStorage.removeItem(problematicAuthTokenKey);
      sessionStorage.clear();
      await supabase.auth.signOut({ scope: 'local' });
    }
  } catch (e) {
    console.error("Error in auth cleanup:", e);
    // Don't throw error to avoid breaking application startup
  }
};

/**
 * Helper function to check if a string is valid JSON
 */
function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
