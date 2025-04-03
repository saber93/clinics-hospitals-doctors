
import React from 'react';

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  className = "",
  message 
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${message ? 'space-y-2' : ''} ${className}`}>
      <div className={`animate-spin ${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full`}></div>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
