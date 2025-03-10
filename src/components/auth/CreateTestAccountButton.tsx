
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
      
      // Implement retries for edge function call with increasing timeouts
      let retries = 0;
      const maxRetries = 3;
      let data = null;
      let error = null;
      
      while (retries <= maxRetries) {
        try {
          console.log(`Calling edge function (attempt ${retries + 1})`);
          
          // Fix: Remove the invalid 'options' property and use 'abortSignal' instead
          // Create an AbortController with the appropriate timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout
          
          const response = await supabase.functions.invoke('create-test-user', {
            body: {
              email,
              password,
              role,
              name
            },
            signal: controller.signal // Use the correct signal property instead of options
          });
          
          // Clear the timeout
          clearTimeout(timeoutId);
          
          data = response.data;
          error = response.error;
          
          // Check both for error object and data.success
          if (!error && data && data.success) {
            console.log(`Edge function response successful:`, data);
            break;  // Success, exit retry loop
          }
          
          // Log detailed information about the failure
          if (error) {
            console.error(`Error response from edge function (attempt ${retries + 1}):`, error);
          } else if (data && !data.success) {
            console.error(`Function returned error (attempt ${retries + 1}):`, data.error);
            error = new Error(data.error);
          } else {
            console.error(`Unexpected response format (attempt ${retries + 1})`, data);
            error = new Error("Invalid response from server");
          }
          
          console.error(`Response data:`, data);
          retries++;
          
          if (retries <= maxRetries) {
            const delay = 1000 * retries; // Increasing delay with each retry
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        } catch (callError) {
          console.error(`Exception calling edge function (attempt ${retries + 1}):`, callError);
          error = callError;
          retries++;
          
          if (retries <= maxRetries) {
            const delay = 1000 * retries; // Increasing delay with each retry
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      if (error || !data || !data.success) {
        console.error(`All edge function attempts failed:`, error);
        const errorMessage = error?.message || (data?.error || 'Unknown error calling edge function');
        throw new Error(errorMessage);
      }
      
      console.log(`${role} account created or updated successfully:`, data);
      toast.dismiss(loadingToast);
      toast.success(`${role} account created successfully! You can now log in.`);
      
      // Fill in credentials for immediate login
      onAccountCreated(email, password);
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss(loadingToast);
      
      // Create a more user-friendly error message
      let errorMessage = "Failed to create account";
      
      // Special case for the invalid UUID
      if (error.message && error.message.includes('00000000-0000-0000-0000-000000000099')) {
        errorMessage = `Account ID conflict detected. Please try again or contact support.`;
      } else if (error.message && error.message.includes('Network')) {
        errorMessage = `Network error. Please check your connection and try again.`;
      } else if (error.message && error.message.includes('timeout')) {
        errorMessage = `Request timed out. The server might be busy, please try again later.`;
      } else if (error.message) {
        errorMessage = `${errorMessage}: ${error.message}`;
      }
      
      toast.error(errorMessage);
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
