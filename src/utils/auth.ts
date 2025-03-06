
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Export the logout function to be used throughout the app
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    toast.success("Logged out successfully");
    window.location.href = "/auth";
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Failed to log out");
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
