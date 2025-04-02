
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import TestCredentialsPanel from "./TestCredentialsPanel";

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const navigate = useNavigate();
  
  const { isLoading, loginError, setLoginError, handleLogin, handleRegister } = useAuth();
  
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

  const handleFillCredentials = (email: string, password: string) => {
    setFormData(prev => ({
      ...prev,
      email,
      password
    }));
    setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    if (mode === "register") {
      if (!formData.name) {
        toast.error("Please enter your name");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setLoginError("Passwords do not match");
        return;
      }

      await handleRegister(formData.email, formData.password, formData.name);
    } else {
      await handleLogin(formData.email, formData.password);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">
          {mode === "login" ? "Welcome Back" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {mode === "login" 
            ? "Sign in to access your account" 
            : "Fill in your details to create an account"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
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
              <p>{loginError}</p>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        
        {mode === "login" && (
          <TestCredentialsPanel 
            mode={mode}
            onFillCredentials={handleFillCredentials} 
            isLoading={isLoading}
          />
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center">
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
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
