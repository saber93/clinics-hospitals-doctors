
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AuthFormFields from "./AuthFormFields";
import TestCredentialsPanel from "./TestCredentialsPanel";

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear any previous login errors when the user types
    if (loginError) setLoginError(null);
  };

  // Function to handle credentials filled from test buttons
  const handleFillCredentials = (email: string, password: string) => {
    setFormData(prev => ({
      ...prev,
      email,
      password
    }));
    setLoginError(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    
    // Basic form validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (mode === "register") {
      if (!formData.name) {
        toast.error("Please enter your name");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setLoginError("Passwords do not match");
        toast.error("Passwords do not match");
        return;
      }
    }
    
    setIsLoading(true);
    const loadingToast = toast.loading(mode === "login" ? "Signing in..." : "Creating account...");

    try {
      if (mode === "login") {
        const email = formData.email.trim();
        const password = formData.password;
        
        console.log(`Attempting to log in with email: ${email}`);
        
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          throw error;
        }

        console.log("Login successful:", data);
        toast.dismiss(loadingToast);
        toast.success("Logged in successfully!");
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        // Register with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
          options: {
            data: {
              name: formData.name,
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
      }
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
      } else if (error.message.includes("already registered")) {
        setLoginError("An account with this email already exists. Please try logging in instead.");
        toast.error("An account with this email already exists. Please try logging in instead.");
      } else {
        setLoginError(error.message || "Authentication failed. Please try again.");
        toast.error(error.message || "Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Make logout function globally available
  if (typeof window !== 'undefined') {
    (window as any).logoutUser = handleLogout;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthFormFields 
        mode={mode}
        formData={formData}
        onChange={handleChange}
        isLoading={isLoading}
        loginError={loginError}
      />
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
      </Button>
      
      <TestCredentialsPanel 
        mode={mode}
        onFillCredentials={handleFillCredentials}
        isLoading={isLoading}
      />
      
      <div className="text-center text-sm">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link to="/auth?mode=register" className="text-primary hover:underline font-medium">
              Create one here
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/auth?mode=login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
