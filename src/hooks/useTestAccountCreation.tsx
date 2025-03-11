
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { capitalizeFirstLetter } from "@/utils/testCredentials";

export const useTestAccountCreation = (
  onAccountCreated: (email: string, password: string) => void,
  isLoading: boolean
) => {
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
      
      // Use a different email format for doctor
      let email;
      if (role === 'doctor') {
        email = `dr.skin@skinnect.com`; // More professional doctor email
      } else {
        email = `${role}@skinnect.com`;
      }
      
      const password = `${capitalizeFirstLetter(role)}123!`;
      
      // Generate a unique name with timestamp to avoid any conflicts 
      const timestamp = new Date().getTime();
      let name;
      if (role === 'doctor') {
        name = `Dr. Skin (Demo-${timestamp})`;
      } else if (role === 'center') {
        name = `Medical Center (Demo-${timestamp})`;
      } else {
        name = `${capitalizeFirstLetter(role)} User (Demo-${timestamp})`;
      }
      
      // Show detailed logs
      console.log(`Creating account with email: ${email}, role: ${role}, name: ${name}`);
      
      // Call edge function with retries and better error handling
      const { data, error } = await supabase.functions.invoke('create-test-user', {
        body: {
          email,
          password,
          role,
          name
        }
      });
      
      if (error) {
        throw error;
      }

      if (!data || !data.success) {
        throw new Error(data?.error || 'Failed to create account');
      }
      
      console.log(`${role} account created successfully:`, data);
      toast.dismiss(loadingToast);
      toast.success(`${role} account created successfully! You can now log in.`);
      
      // Fill in credentials for immediate login
      onAccountCreated(email, password);
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss(loadingToast);
      
      let errorMessage = `Failed to create account: ${error.message}`;
      if (error.message?.includes('Edge Function')) {
        errorMessage = 'Server error. Please try again in a few moments.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsCreatingAccount(false);
      setCurrentRole(null);
    }
  };

  return {
    isCreatingAccount,
    currentRole,
    createTestAccount
  };
};
