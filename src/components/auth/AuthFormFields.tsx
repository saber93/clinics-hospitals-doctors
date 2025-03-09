
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormFieldsProps {
  mode: string;
  formData: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  loginError: string | null;
}

const AuthFormFields = ({ mode, formData, onChange, isLoading, loginError }: AuthFormFieldsProps) => {
  return (
    <>
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={onChange}
            disabled={isLoading}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={onChange}
          disabled={isLoading}
          autoComplete="email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={onChange}
          disabled={isLoading}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
      </div>
      
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={onChange}
            disabled={isLoading}
            autoComplete="new-password"
          />
        </div>
      )}
      
      {loginError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          <p className="font-medium">Error:</p>
          <p>{loginError}</p>
        </div>
      )}
    </>
  );
};

export default AuthFormFields;
