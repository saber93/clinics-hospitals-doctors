
import React from "react";
import { Button } from "@/components/ui/button";
import { getTestCredentialsForRole } from "@/utils/testCredentials";

interface TestCredentialButtonsProps {
  onFillCredentials: (email: string, password: string) => void;
  isLoading: boolean;
  isCreatingAccount: boolean;
}

const TestCredentialButtons = ({ 
  onFillCredentials, 
  isLoading, 
  isCreatingAccount 
}: TestCredentialButtonsProps) => {
  
  const handleFillCredentials = (role: string) => {
    const { email, password } = getTestCredentialsForRole(role);
    if (email && password) {
      onFillCredentials(email, password);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => handleFillCredentials("admin")}
        className="text-xs"
        disabled={isLoading || isCreatingAccount}
      >
        Use Admin
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => handleFillCredentials("vendor")}
        className="text-xs"
        disabled={isLoading || isCreatingAccount}
      >
        Use Vendor
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => handleFillCredentials("doctor")}
        className="text-xs"
        disabled={isLoading || isCreatingAccount}
      >
        Use Doctor
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => handleFillCredentials("client")}
        className="text-xs"
        disabled={isLoading || isCreatingAccount}
      >
        Use Client
      </Button>
    </div>
  );
};

export default TestCredentialButtons;
