
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
        toast.error("Passwords do not match");
        return;
      }
    }
    
    setIsLoading(true);

    try {
      if (mode === "login") {
        const email = formData.email.trim();
        const password = formData.password;
        
        console.log(`Attempting to log in with email: ${email} and password length: ${password.length}`);
        
        // First, check if the user exists
        const { data: userData, error: userCheckError } = await supabase.auth.admin
          .listUsers();
          
        if (userCheckError) {
          console.error("User check error:", userCheckError);
        } else {
          console.log("All users:", userData);
        }
        
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          setLoginError(error.message);
          throw error;
        }

        console.log("Login successful:", data);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
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
          setLoginError(error.message);
          throw error;
        }

        toast.success("Account created successfully! Please check your email for verification.");
        // Redirect to login page after successful registration
        navigate("/auth?mode=login");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      // Provide more specific error messages
      if (error.message.includes("Invalid login credentials")) {
        setLoginError("Invalid email or password. Please check your credentials and try again.");
        toast.error("Invalid email or password. Please check your credentials and try again.");
      } else if (error.message.includes("Email not confirmed")) {
        setLoginError("Please confirm your email before logging in.");
        toast.error("Please confirm your email before logging in.");
      } else {
        setLoginError(error.message || "Authentication failed. Please try again.");
        toast.error(error.message || "Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to fill in test credentials
  const fillTestCredentials = (role: string) => {
    let email = "";
    let password = "";
    
    switch(role) {
      case "admin":
        email = "admin@skinnect.com";
        password = "Admin123!";
        break;
      case "vendor":
        email = "vendor@skinnect.com";
        password = "Vendor123!";
        break;
      case "doctor":
        email = "doctor@skinnect.com";
        password = "Doctor123!";
        break;
      case "client":
        email = "client@skinnect.com";
        password = "Client123!";
        break;
      default:
        return;
    }
    
    setFormData(prev => ({
      ...prev,
      email,
      password
    }));
    setLoginError(null);
  };

  // Make logout function globally available
  window.logoutUser = handleLogout;

  // Function to create test account directly
  const createTestAccount = async (role: string) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      let email, password, name;
      
      switch(role) {
        case "doctor":
          email = "doctor@skinnect.com";
          password = "Doctor123!";
          name = "Dr. Sarah Johnson";
          break;
        default:
          throw new Error("Invalid role specified");
      }
      
      toast.loading(`Creating ${role} account directly...`);
      
      // Check if user exists first and delete if needed
      const { data: userData, error: userCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();
        
      if (userCheckError) {
        console.error("User check error:", userCheckError);
      }
      
      if (userData?.id) {
        console.log(`User ${email} already exists, attempting to delete...`);
        // Delete existing user logic would go here
      }
      
      // Create the user account directly
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      console.log(`${role} account created successfully:`, data);
      toast.dismiss();
      toast.success(`${role} account created successfully! You can now log in.`);
      
      // Fill in the credentials for immediate login
      fillTestCredentials(role);
      
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss();
      toast.error(`Failed to create ${role} account: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
      </div>
      
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="new-password"
          />
        </div>
      )}
      
      {loginError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          <p className="font-medium">Error:</p>
          <p>{loginError}</p>
        </div>
      )}
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
      </Button>
      
      {mode === "login" && (
        <>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => fillTestCredentials("admin")}
              className="text-xs"
            >
              Use Admin
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => fillTestCredentials("vendor")}
              className="text-xs"
            >
              Use Vendor
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => fillTestCredentials("doctor")}
              className="text-xs"
            >
              Use Doctor
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => fillTestCredentials("client")}
              className="text-xs"
            >
              Use Client
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-2 mt-2">
            <Button 
              type="button" 
              variant="secondary" 
              size="sm" 
              onClick={() => createTestAccount("doctor")}
              className="text-xs"
              disabled={isLoading}
            >
              Create Doctor Account Directly
            </Button>
          </div>
        </>
      )}
      
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
