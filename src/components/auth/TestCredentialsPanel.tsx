
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
      
      const loadingToast = toast.loading(`Creating ${role} account directly...`);
      
      // Instead of using the admin.listUsers (which requires higher permissions),
      // first check if we can log in with these credentials
      console.log(`Trying to sign in with ${email} to check if user exists...`);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (!signInError) {
        // User exists and credentials are valid
        console.log(`User ${email} already exists and credentials are valid`);
        toast.dismiss(loadingToast);
        toast.success(`${role} account already exists. Credentials filled in for login.`);
        // Sign out the user since we just wanted to check
        await supabase.auth.signOut();
        // Fill in credentials
        fillTestCredentials(role);
        return;
      }
      
      // Create the user account directly
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
        throw error;
      }
      
      console.log(`${role} account created successfully:`, data);
      toast.dismiss(loadingToast);
      toast.success(`${role} account created successfully! You can now log in.`);
      
      // Fill in the credentials for immediate login
      fillTestCredentials(role);
      
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss();
      
      // More user-friendly error message
      if (error.message.includes("already registered")) {
        toast.error(`An account with this email already exists. Try logging in instead.`);
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
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("admin")}
          className="text-xs"
          disabled={isLoading}
        >
          Use Admin
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("vendor")}
          className="text-xs"
          disabled={isLoading}
        >
          Use Vendor
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("doctor")}
          className="text-xs"
          disabled={isLoading}
        >
          Use Doctor
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials("client")}
          className="text-xs"
          disabled={isLoading}
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
