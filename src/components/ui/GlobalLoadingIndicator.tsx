
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'sonner';

interface LoadingError extends Error {
  code?: string;
  details?: string;
}

const GlobalLoadingIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<LoadingError | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Reset error state on route change
    setLoadingError(null);
    
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

  // Add enhanced error handling for dynamic imports
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if the error is related to dynamic imports with expanded patterns
      if (event.message && (
        event.message.includes('Failed to fetch dynamically imported module') ||
        event.message.includes('ChunkLoadError') ||
        event.message.includes('Loading chunk') ||
        event.message.includes('importing module') ||
        event.message.includes('chunk ') ||
        event.message.includes('import(') ||
        event.message.includes('module specifier') ||
        event.message.includes('@/pages/') ||
        event.filename?.includes('chunk-')
      )) {
        console.error('Module loading error detected in GlobalLoadingIndicator:', event.message);
        console.error('Error filename:', event.filename);
        
        const error = new Error(event.message) as LoadingError;
        error.code = 'CHUNK_LOAD_ERROR';
        error.details = `Path: ${location.pathname}, Time: ${new Date().toISOString()}, File: ${event.filename || 'unknown'}`;
        
        setLoadingError(error);
        setIsLoading(false); // Stop loading indicator if module fails to load
        
        // Display a toast for better user experience with a refresh action
        toast.error("Failed to load page component", {
          description: "Try refreshing the page to fix the issue",
          duration: 8000,
          action: {
            label: "Refresh",
            onClick: () => window.location.reload()
          }
        });
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [location.pathname]);

  if (loadingError) {
    console.error('Loading error in GlobalLoadingIndicator:', loadingError);
    // We don't show the error here because it will be handled by the error boundary
    return null;
  }

  if (!isLoading) return null;
  
  return <LoadingSpinner fullScreen message="Loading page..." />;
};

export default GlobalLoadingIndicator;
