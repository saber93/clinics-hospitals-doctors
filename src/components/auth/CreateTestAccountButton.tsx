
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
  
  // Function to create test account directly using edge function
  const createTestAccount = async (role: string) => {
    if (isCreatingAccount || isLoading) return;
    
    setIsCreatingAccount(true);
    const loadingToast = toast.loading(`Creating ${role} account...`);
    
    try {
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
      onAccountCreated(`${role}@skinnect.com`, `${capitalizeFirstLetter(role)}123!`);
    } catch (error: any) {
      console.error(`Error creating ${role} account:`, error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to create account: ${error.message || 'Unknown error'}`);
    } finally {
      setIsCreatingAccount(false);
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
        {isCreatingAccount ? "Creating Account..." : "Create Doctor Account"}
      </Button>
    </div>
  );
};

export default CreateTestAccountButton;
