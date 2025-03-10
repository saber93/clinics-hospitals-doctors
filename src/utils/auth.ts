
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Export the logout function to be used throughout the app
export const logoutUser = async () => {
  try {
    const loadingToast = toast.loading("Logging out...");
    
    // First, try a complete logout (both local and server-side)
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error in supabase logout:", error);
    }
    
    // Clear any stored tokens manually to ensure a clean logout
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
    sessionStorage.clear();
    
    toast.dismiss(loadingToast);
    toast.success("Logged out successfully");
    
    // Force a full page reload to clear any React state
    setTimeout(() => {
      window.location.href = "/auth";
    }, 500);
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Failed to log out. Please try again.");
    
    // Emergency fallback - try to clear everything
    try {
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
      sessionStorage.clear();
      setTimeout(() => {
        window.location.href = "/auth";
      }, 500);
    } catch (e) {
      console.error("Failed to clear local storage:", e);
    }
  }
};

// Make the logout function available on the window object
if (typeof window !== 'undefined') {
  window.logoutUser = logoutUser;
}

// Extend the Window interface to include our custom function
declare global {
  interface Window {
    logoutUser: typeof logoutUser;
  }
}
