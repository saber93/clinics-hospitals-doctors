
import React from "react";
import { useTestAccountCreation } from "@/hooks/useTestAccountCreation";
import TestAccountButton from "./buttons/TestAccountButton";
import SellerAccountButton from "./buttons/SellerAccountButton";

interface CreateTestAccountButtonProps {
  onAccountCreated: (email: string, password: string) => void;
  isLoading: boolean;
}

const CreateTestAccountButton = ({ onAccountCreated, isLoading }: CreateTestAccountButtonProps) => {
  const {
    isCreatingAccount,
    currentRole,
    createTestAccount,
    handleCreateSellerAccount
  } = useTestAccountCreation(onAccountCreated, isLoading);

  return (
    <div className="grid grid-cols-1 gap-2 mt-2">
      <TestAccountButton
        role="doctor"
        currentRole={currentRole}
        isCreatingAccount={isCreatingAccount}
        isLoading={isLoading}
        onClick={() => createTestAccount("doctor")}
      />
      
      <TestAccountButton
        role="client"
        currentRole={currentRole}
        isCreatingAccount={isCreatingAccount}
        isLoading={isLoading}
        onClick={() => createTestAccount("client")}
      />

      <TestAccountButton
        role="center"
        currentRole={currentRole}
        isCreatingAccount={isCreatingAccount}
        isLoading={isLoading}
        onClick={() => createTestAccount("center")}
      />

      <SellerAccountButton
        isCreatingAccount={isCreatingAccount}
        isLoading={isLoading}
        currentRole={currentRole}
        onClick={handleCreateSellerAccount}
      />
    </div>
  );
};

export default CreateTestAccountButton;
