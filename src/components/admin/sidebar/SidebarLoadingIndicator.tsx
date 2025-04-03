
import React from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface SidebarLoadingIndicatorProps {
  message?: string;
}

const SidebarLoadingIndicator: React.FC<SidebarLoadingIndicatorProps> = ({ 
  message = 'Loading navigation...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <LoadingSpinner size="sm" className="p-0" />
      <p className="text-sm text-muted-foreground mt-2">{message}</p>
    </div>
  );
};

export default SidebarLoadingIndicator;
