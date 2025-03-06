
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
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          throw error;
        }

        toast.success("Logged in successfully!");
      } else {
        // Register with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
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

        toast.success("Account created successfully! Please check your email for verification.");
      }

      // Redirect to dashboard after successful authentication
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.message || "Authentication failed. Please try again.");
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
          />
        </div>
      )}
      
      <Button type="submit" className="w-full skinnect-button-primary" disabled={isLoading}>
        {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
      </Button>
      
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
