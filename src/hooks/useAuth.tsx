
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Function to handle user login
  const handleLogin = async (email: string, password: string) => {
    setLoginError(null);
    setIsLoading(true);
    const loadingToast = toast.loading("Signing in...");

    try {
      console.log(`Attempting to log in with email: ${email}`);
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      console.log("Login successful:", data);
      
      // Check if this user has a profile record
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error("Error checking profile:", profileError);
        }
        
        // If user ID is the problematic one or profile doesn't exist
        if (data.user.id === '00000000-0000-0000-0000-000000000099' || (!profileData && !profileError)) {
          console.error("Found problematic account or missing profile:", data.user.id);
          throw new Error("Account is corrupted. Please contact support or create a new account.");
        }
      }

      toast.dismiss(loadingToast);
      toast.success("Logged in successfully!");
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.dismiss(loadingToast);
      
      // Provide more specific error messages
      if (error.message.includes("Invalid login credentials")) {
        setLoginError("Invalid email or password. Please check your credentials and try again.");
        toast.error("Invalid email or password. Please check your credentials and try again.");
      } else if (error.message.includes("Email not confirmed")) {
        setLoginError("Please confirm your email before logging in.");
        toast.error("Please confirm your email before logging in.");
      } else if (error.message.includes("corrupted")) {
        setLoginError("This account is corrupted. Please create a new account or contact support.");
        toast.error("This account is corrupted. Please create a new account or contact support.");
      } else {
        setLoginError(error.message || "Authentication failed. Please try again.");
        toast.error(error.message || "Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user registration
  const handleRegister = async (email: string, password: string, name: string) => {
    setLoginError(null);
    setIsLoading(true);
    const loadingToast = toast.loading("Creating account...");

    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name,
            role: 'client', // Default role
          },
        },
      });

      if (error) {
        throw error;
      }

      toast.dismiss(loadingToast);
      toast.success("Account created successfully! Please check your email for verification.");
      // Redirect to login page after successful registration
      navigate("/auth?mode=login");
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.dismiss(loadingToast);
      
      if (error.message.includes("already registered")) {
        setLoginError("An account with this email already exists. Please try logging in instead.");
        toast.error("An account with this email already exists. Please try logging in instead.");
      } else {
        setLoginError(error.message || "Failed to create account. Please try again.");
        toast.error(error.message || "Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user logout - IMPROVED with better error handling
  const handleLogout = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Logging out...");
    
    try {
      // Get the current session first to check validity
      const { data: sessionData } = await supabase.auth.getSession();
      
      // If there's an issue with the session, just clear it locally
      if (!sessionData.session || sessionData.session.user.id === '00000000-0000-0000-0000-000000000099') {
        console.log("Invalid session detected, performing local logout only");
        // Force clear session locally
        await supabase.auth.signOut({ scope: 'local' });
        localStorage.removeItem('supabase.auth.token');
        
        toast.dismiss(loadingToast);
        toast.success("Logged out successfully");
        setTimeout(() => {
          window.location.href = "/auth"; // Use full page refresh to ensure clean state
        }, 500);
        return;
      }
      
      // Regular logout flow
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout API error:", error);
        
        if (error.message.includes("User from sub claim in JWT does not exist")) {
          console.log("User not found in auth system, performing local logout");
          // Force clear session locally
          await supabase.auth.signOut({ scope: 'local' });
          localStorage.removeItem('supabase.auth.token');
          sessionStorage.clear();
          
          toast.dismiss(loadingToast);
          toast.success("Logged out successfully");
          setTimeout(() => {
            window.location.href = "/auth";
          }, 500);
          return;
        }
        
        throw error;
      }
      
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.dismiss(loadingToast);
      toast.error(error.message || "Error logging out");
      
      // As a last resort, try to clear local storage and reload
      try {
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.clear();
        setTimeout(() => {
          window.location.href = "/auth";
        }, 1000);
      } catch (e) {
        console.error("Failed to clear local storage:", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loginError,
    setLoginError,
    handleLogin,
    handleRegister,
    handleLogout
  };
};
