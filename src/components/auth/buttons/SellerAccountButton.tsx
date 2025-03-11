
import React from "react";
import { Button } from "@/components/ui/button";

interface SellerAccountButtonProps {
  isCreatingAccount: boolean;
  isLoading: boolean;
  currentRole: string | null;
  onClick: () => void;
}

const SellerAccountButton = ({
  isCreatingAccount,
  isLoading,
  currentRole,
  onClick
}: SellerAccountButtonProps) => {
  const isCreating = isCreatingAccount && currentRole === "seller";

  return (
    <Button 
      type="button" 
      variant="secondary" 
      size="sm" 
      onClick={onClick}
      className="text-xs"
      disabled={isLoading || isCreatingAccount}
    >
      {isCreating ? "Creating Seller Account..." : "Create Seller Account"}
    </Button>
  );
};

export default SellerAccountButton;
