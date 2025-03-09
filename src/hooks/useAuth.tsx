
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

  // Function to handle user logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message || "Error logging out");
      console.error("Logout error:", error);
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
