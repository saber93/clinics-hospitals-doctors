
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoadingIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading indicator when route changes
    setIsLoading(true);
    
    // Hide loading indicator after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Timeout balances between showing loader for too short/long time
    
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  // Add error handling for dynamic imports
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if the error is related to dynamic imports
      if (event.message && event.message.includes('Failed to fetch dynamically imported module')) {
        console.error('Module loading error detected:', event.message);
        setIsLoading(false); // Stop loading indicator if module fails to load
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (!isLoading) return null;
  
  return <LoadingSpinner fullScreen message="Loading page..." />;
};

export default GlobalLoadingIndicator;
