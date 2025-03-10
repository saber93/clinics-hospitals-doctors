
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingState;
