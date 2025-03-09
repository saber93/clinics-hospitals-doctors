
import React from "react";
import TestCredentialsDisplay from "./TestCredentialsDisplay";
import TestCredentialButtons from "./TestCredentialButtons";
import CreateTestAccountButton from "./CreateTestAccountButton";

interface TestCredentialsPanelProps {
  mode: string;
  onFillCredentials: (email: string, password: string) => void;
  isLoading: boolean;
}

const TestCredentialsPanel = ({ mode, onFillCredentials, isLoading }: TestCredentialsPanelProps) => {
  // Only show the panel in login mode
  if (mode !== "login") return null;

  return (
    <>
      <TestCredentialsDisplay />
      
      <TestCredentialButtons 
        onFillCredentials={onFillCredentials}
        isLoading={isLoading}
        isCreatingAccount={false}
      />
      
      <CreateTestAccountButton 
        onAccountCreated={onFillCredentials}
        isLoading={isLoading}
      />
    </>
  );
};

export default TestCredentialsPanel;
