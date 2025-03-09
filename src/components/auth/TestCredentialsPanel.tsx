
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
      
      toast.loading(`Creating ${role} account directly...`);
      
      // Check if user exists first
      console.log(`Checking if user ${email} exists...`);
      const { data: userData, error: userCheckError } = await supabase.auth.admin
        .listUsers();
        
      if (userCheckError) {
        console.error("User check error:", userCheckError);
      } else {
        console.log("All users:", userData);
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
      toast.dismiss();
      toast.success(`${role} account created successfully! You can now log in.`);
      
      // Fill in the credentials for immediate login
      fillTestCredentials(role);
      
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss();
      toast.error(`Failed to create ${role} account: ${error.message}`);
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
          disabled={isLoading || isCreatingAccount}
        >
          {isCreatingAccount ? "Creating Account..." : "Create Doctor Account Directly"}
        </Button>
      </div>
    </>
  );
};

export default TestCredentialsPanel;
