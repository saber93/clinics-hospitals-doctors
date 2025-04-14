
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="mt-4 text-lg font-medium text-gray-700">Loading content...</span>
      <p className="text-sm text-gray-500 mt-2">Please wait while we load the page</p>
    </div>
  );
};

export default Loading;
