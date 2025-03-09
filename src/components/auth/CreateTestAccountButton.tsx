
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
      // Add a suffix to doctor name to avoid conflicts
      const name = role === 'doctor' ? 'Dr. Sarah Johnson (Demo)' : `${capitalizeFirstLetter(role)} User`;
      
      // Show detailed logs
      console.log(`Creating account with email: ${email}, role: ${role}, name: ${name}`);
      
      const { data, error } = await supabase.functions.invoke('create-test-user', {
        body: {
          email,
          password,
          role,
          name
        }
      });
      
      if (error) {
        console.error(`Error response from edge function:`, error);
        throw new Error(error.message || 'Unknown error calling edge function');
      }
      
      console.log(`Edge function response:`, data);
      
      if (!data || !data.success) {
        const errorMsg = data?.error || 'Unknown error creating account';
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
      toast.error(`Failed to create account: ${error.message || 'Unknown error'}`);
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
