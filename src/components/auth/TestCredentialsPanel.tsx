
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

  // Function to create test account directly using edge function
  const createTestAccount = async (role: string) => {
    if (isCreatingAccount || isLoading) return;
    
    setIsCreatingAccount(true);
    const loadingToast = toast.loading(`Creating ${role} account...`);
    
    try {
      // Instead of trying to create the account directly with supabase.auth,
      // we'll use the edge function which has proper error handling
      const { data, error } = await supabase.functions.invoke('create-test-user', {
        body: {
          email: `${role}@skinnect.com`,
          password: `${capitalizeFirstLetter(role)}123!`,
          role: role,
          name: role === 'doctor' ? 'Dr. Sarah Johnson' : `${capitalizeFirstLetter(role)} User`
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error creating account');
      }
      
      console.log(`${role} account created or updated successfully:`, data);
      toast.dismiss(loadingToast);
      toast.success(`${role} account created successfully! You can now log in.`);
      
      // Fill in credentials for immediate login
      fillTestCredentials(role);
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to create account: ${error.message || 'Unknown error'}`);
    } finally {
      setIsCreatingAccount(false);
    }
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
          {isCreatingAccount ? "Creating Account..." : "Create Doctor Account"}
        </Button>
      </div>
    </>
  );
};

export default TestCredentialsPanel;
