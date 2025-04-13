
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  const spinner = (
    <div className={`animate-spin ${sizeClasses[size]} border-primary border-t-transparent rounded-full`}></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          {spinner}
          {message && <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      {spinner}
      {message && <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
