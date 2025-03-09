
import { useSearchParams, Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { seedTestData } from "@/utils/seedTestData";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCreatingTestAccounts, setIsCreatingTestAccounts] = useState(false);

  useEffect(() => {
    // Check current auth status
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking session:", error);
          toast.error(`Authentication error: ${error.message}`);
        }
        setSession(data.session);
      } catch (error) {
        console.error("Error checking session:", error);
        toast.error(`Authentication error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session ? "User logged in" : "No session");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSeedTestData = async () => {
    setIsCreatingTestAccounts(true);
    try {
      await seedTestData();
      toast.success("Test accounts created successfully! You can now log in with any of the test credentials.");
    } catch (error: any) {
      console.error("Error creating test accounts:", error);
      toast.error(`Failed to create test accounts: ${error.message}`);
    } finally {
      setIsCreatingTestAccounts(false);
    }
  };

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (session) {
    console.log("User is authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold mt-6">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === "login" 
              ? "Enter your credentials to access your account" 
              : "Fill in your details to create an account"}
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              Development Tools
            </p>
            <Button 
              onClick={handleSeedTestData} 
              variant="outline" 
              className="w-full"
              disabled={isCreatingTestAccounts}
            >
              {isCreatingTestAccounts ? "Creating Test Accounts..." : "Create Test Accounts"}
            </Button>
            
            {mode === "login" && (
              <div className="mt-4 text-center text-sm">
                <p className="text-gray-600">Test Credentials:</p>
                <div className="mt-2 p-3 bg-gray-50 rounded text-left space-y-1">
                  <p><strong>Admin:</strong> admin@skinnect.com / Admin123!</p>
                  <p><strong>Vendor:</strong> vendor@skinnect.com / Vendor123!</p>
                  <p><strong>Doctor:</strong> doctor@skinnect.com / Doctor123!</p>
                  <p><strong>Client:</strong> client@skinnect.com / Client123!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
