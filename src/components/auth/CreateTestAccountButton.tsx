
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { capitalizeFirstLetter } from "@/utils/testCredentials";

interface CreateTestAccountButtonProps {
  onAccountCreated: (email: string, password: string) => void;
  isLoading: boolean;
}

const CreateTestAccountButton = ({ onAccountCreated, isLoading }: CreateTestAccountButtonProps) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  
  // Function to create test account directly using edge function
  const createTestAccount = async (role: string) => {
    if (isCreatingAccount || isLoading) return;
    
    setIsCreatingAccount(true);
    setCurrentRole(role);
    const loadingToast = toast.loading(`Creating ${role} account...`, { duration: 60000 });
    
    try {
      console.log(`Attempting to create ${role} account...`);
      
      const email = `${role}@skinnect.com`;
      const password = `${capitalizeFirstLetter(role)}123!`;
      
      // Generate a unique name with timestamp to avoid any conflicts
      const timestamp = new Date().getTime();
      let name;
      if (role === 'doctor') {
        name = `Dr. Sarah Johnson (Demo-${timestamp})`;
      } else {
        name = `${capitalizeFirstLetter(role)} User`;
      }
      
      // Show detailed logs
      console.log(`Creating account with email: ${email}, role: ${role}, name: ${name}`);
      
      // Implement retries for edge function call
      let retries = 0;
      const maxRetries = 2;
      let data = null;
      let error = null;
      
      while (retries <= maxRetries) {
        try {
          console.log(`Calling edge function (attempt ${retries + 1})`);
          const response = await supabase.functions.invoke('create-test-user', {
            body: {
              email,
              password,
              role,
              name
            }
          });
          
          data = response.data;
          error = response.error;
          
          if (data && !error) {
            console.log(`Edge function response successful:`, data);
            break;  // Success, exit retry loop
          }
          
          console.error(`Error response from edge function (attempt ${retries + 1}):`, error || 'No error object, but response failed');
          console.error(`Response data:`, data);
          retries++;
          
          if (retries <= maxRetries) {
            console.log(`Retrying in 1 second...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (callError) {
          console.error(`Exception calling edge function (attempt ${retries + 1}):`, callError);
          error = callError;
          retries++;
          
          if (retries <= maxRetries) {
            console.log(`Retrying in 1 second...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
      
      if (error || !data) {
        console.error(`All edge function attempts failed:`, error);
        const errorMessage = error?.message || (data?.error || 'Unknown error calling edge function');
        throw new Error(errorMessage);
      }
      
      if (!data.success) {
        const errorMsg = data.error || 'Unknown error creating account';
        console.error(`Account creation failed:`, errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log(`${role} account created or updated successfully:`, data);
      toast.dismiss(loadingToast);
      toast.success(`${role} account created successfully! You can now log in.`);
      
      // Fill in credentials for immediate login
      onAccountCreated(email, password);
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss(loadingToast);
      
      // Special case for the invalid UUID
      if (error.message && error.message.includes('00000000-0000-0000-0000-000000000099')) {
        toast.error(`Failed to create account: User ID conflict. Please contact support.`);
      } else {
        toast.error(`Failed to create account: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsCreatingAccount(false);
      setCurrentRole(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 mt-2">
      <Button 
        type="button" 
        variant="secondary" 
        size="sm" 
        onClick={() => createTestAccount("doctor")}
        className="text-xs"
        disabled={isLoading || isCreatingAccount}
      >
        {isCreatingAccount && currentRole === "doctor" ? "Creating Doctor Account..." : "Create Doctor Account"}
      </Button>
      
      <Button 
        type="button" 
        variant="secondary" 
        size="sm" 
        onClick={() => createTestAccount("client")}
        className="text-xs"
        disabled={isLoading || isCreatingAccount}
      >
        {isCreatingAccount && currentRole === "client" ? "Creating Client Account..." : "Create Client Account"}
      </Button>
    </div>
  );
};

export default CreateTestAccountButton;
