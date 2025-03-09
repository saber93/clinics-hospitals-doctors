
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthFormFields from "./AuthFormFields";
import TestCredentialsPanel from "./TestCredentialsPanel";
import { useAuth } from "@/hooks/useAuth";

const LoginFormComponent = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  
  const { isLoading, loginError, setLoginError, handleLogin, handleRegister, handleLogout } = useAuth();
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.email || !formData.password) {
      return;
    }
    
    if (mode === "register") {
      if (!formData.name) {
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

export default LoginFormComponent;
