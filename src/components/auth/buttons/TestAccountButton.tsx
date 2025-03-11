
import React from "react";
import { Button } from "@/components/ui/button";

interface TestAccountButtonProps {
  role: string;
  currentRole: string | null;
  isCreatingAccount: boolean;
  isLoading: boolean;
  onClick: () => void;
  label?: string;
}

const TestAccountButton = ({
  role,
  currentRole,
  isCreatingAccount,
  isLoading,
  onClick,
  label
}: TestAccountButtonProps) => {
  const displayLabel = label || `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`;
  const isCreating = isCreatingAccount && currentRole === role;

  return (
    <Button 
      type="button" 
      variant="secondary" 
      size="sm" 
      onClick={onClick}
      className="text-xs"
      disabled={isLoading || isCreatingAccount}
    >
      {isCreating ? `Creating ${role.charAt(0).toUpperCase() + role.slice(1)} Account...` : displayLabel}
    </Button>
  );
};

export default TestAccountButton;
