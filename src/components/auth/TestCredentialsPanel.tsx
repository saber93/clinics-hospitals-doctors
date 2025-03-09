
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface TestCredentialsPanelProps {
  mode: string;
  onFillCredentials: (email: string, password: string) => void;
  isLoading: boolean;
}

const TestCredentialsPanel = ({ mode, onFillCredentials, isLoading }: TestCredentialsPanelProps) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

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
    
    onFillCredentials(email, password);
  };

  // Function to create test account directly
  const createTestAccount = async (role: string) => {
    if (isCreatingAccount || isLoading) return;
    
    setIsCreatingAccount(true);
    
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
      
      const loadingToast = toast.loading(`Creating ${role} account...`);
      
      // First check if user already exists by trying to sign in
      console.log(`Checking if user ${email} already exists...`);
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      // If login succeeds, user exists - just use the credentials
      if (signInData.session) {
        console.log(`User ${email} already exists and can be logged in`);
        toast.dismiss(loadingToast);
        toast.success(`${role} account already exists. Credentials filled in for login.`);
        // Sign out the user since we just wanted to check
        await supabase.auth.signOut();
        // Fill in credentials
        fillTestCredentials(role);
        return;
      }
      
      // If login fails with a specific error that's not about invalid credentials,
      // there may be another issue
      if (signInError && 
          !signInError.message.includes("Invalid login credentials") && 
          !signInError.message.includes("Email not confirmed")) {
        throw signInError;
      }
      
      // Try creating directly with supabase.auth.signUp
      console.log(`Creating ${role} account with email: ${email}`);
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
        // If the error indicates the user already exists but we couldn't log in,
        // it might be a password issue
        if (error.message.includes("already registered")) {
          toast.dismiss(loadingToast);
          toast.info(`User ${email} already exists but may have a different password. Filling in expected credentials.`);
          fillTestCredentials(role);
          return;
        }
        throw error;
      }
      
      if (data.user) {
        console.log(`${role} account created successfully:`, data.user.id);
        toast.dismiss(loadingToast);
        toast.success(`${role} account created successfully! You can now log in.`);
        
        // Fill in the credentials for immediate login
        fillTestCredentials(role);
      } else {
        throw new Error("No user data returned from signup");
      }
      
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss();
      
      // More user-friendly error message
      if (error.message.includes("already registered")) {
        toast.info(`An account with this email already exists. Try logging in instead.`);
        // Still fill the credentials for convenience
        fillTestCredentials(role);
      } else {
        toast.error(`Failed to create account: ${error.message}`);
      }
    } finally {
      setIsCreatingAccount(false);
    }
  };

  if (mode !== "login") return null;

  return (
    <>
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600">Test Credentials:</p>
        <div className="mt-2 p-3 bg-gray-50 rounded text-left space-y-1">
          <p><strong>Admin:</strong> admin@skinnect.com / Admin123!</p>
          <p><strong>Vendor:</strong> vendor@skinnect.com / Vendor123!</p>
          <p><strong>Doctor:</strong> doctor@skinnect.com / Doctor123!</p>
          <p><strong>Client:</strong> client@skinnect.com / Client123!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("admin")}
          className="text-xs"
          disabled={isLoading || isCreatingAccount}
        >
          Use Admin
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("vendor")}
          className="text-xs"
          disabled={isLoading || isCreatingAccount}
        >
          Use Vendor
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("doctor")}
          className="text-xs"
          disabled={isLoading || isCreatingAccount}
        >
          Use Doctor
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("client")}
          className="text-xs"
          disabled={isLoading || isCreatingAccount}
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
          disabled={isLoading || isCreatingAccount}
        >
          {isCreatingAccount ? "Creating Account..." : "Create Doctor Account Directly"}
        </Button>
      </div>
    </>
  );
};

export default TestCredentialsPanel;
