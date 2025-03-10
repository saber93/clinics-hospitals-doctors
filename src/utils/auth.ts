
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Export the logout function to be used throughout the app
export const logoutUser = async () => {
  try {
    const loadingToast = toast.loading("Logging out...");
    
    // Get the current user before logging out
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    
    // Check for the problematic user ID
    if (!userData?.user || userId === '00000000-0000-0000-0000-000000000099') {
      console.warn("Problematic user account or no user, clearing session locally:", userId);
      
      // Clear local session data
      await supabase.auth.signOut({ scope: 'local' });
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully");
      
      // Force reload to clear any state
      window.location.href = "/auth";
      return;
    }
    
    // Regular logout attempt
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error in supabase logout:", error);
      
      if (error.message.includes("User from sub claim in JWT does not exist")) {
        // Fallback to local logout
        await supabase.auth.signOut({ scope: 'local' });
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.clear();
        
        toast.dismiss(loadingToast);
        toast.success("Logged out successfully");
        window.location.href = "/auth";
        return;
      }
      
      throw error;
    }
    
    toast.dismiss(loadingToast);
    toast.success("Logged out successfully");
    window.location.href = "/auth";
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Failed to log out, clearing session locally...");
    
    // Emergency fallback - clear everything
    try {
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      setTimeout(() => {
        window.location.href = "/auth";
      }, 1000);
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
