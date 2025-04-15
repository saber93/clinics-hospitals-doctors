
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
    
    // Track the current route for error reporting
    const currentPath = location.pathname;
    console.log(`Loading route: ${currentPath}`);
    
    // Hide loading indicator after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log(`Route loaded: ${currentPath}`);
    }, 800); // Timeout balances between showing loader for too short/long time
    
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  // Add enhanced error handling for dynamic imports with better debugging info
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Expanded check for errors related to dynamic imports
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
        console.error('Current path:', location.pathname);
        console.error('Error stack:', event.error?.stack);
        
        const error = new Error(event.message) as LoadingError;
        error.code = 'CHUNK_LOAD_ERROR';
        error.details = `Path: ${location.pathname}, Time: ${new Date().toISOString()}, File: ${event.filename || 'unknown'}`;
        
        setLoadingError(error);
        setIsLoading(false); // Stop loading indicator if module fails to load
        
        // Attempt to clear cached data
        try {
          localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
          sessionStorage.clear();
        } catch (e) {
          console.error('Failed to clear storage:', e);
        }
        
        // Display a toast with clearer instructions
        toast.error("Failed to load page component", {
          description: "Clearing your browser cache and refreshing the page may fix this issue",
          duration: 8000,
          action: {
            label: "Refresh",
            onClick: () => {
              // Try to clear any cached data that might be causing the issue
              if (window.caches && 'delete' in window.caches) {
                try {
                  caches.keys().then(names => {
                    names.forEach(name => {
                      caches.delete(name);
                    });
                  });
                } catch (e) {
                  console.error('Failed to clear cache:', e);
                }
              }
              window.location.reload();
            }
          }
        });
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [location.pathname]);

  // Add a handler for unhandled promise rejections that might be related to page loading
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      if (event.reason && typeof event.reason === 'object' && 
          (event.reason.message?.includes('chunk') || 
           event.reason.message?.includes('import') ||
           event.reason.message?.includes('module'))) {
        
        // Try to clear potentially corrupted browser caches
        if (window.caches && 'delete' in window.caches) {
          try {
            caches.keys().then(names => {
              names.forEach(name => {
                caches.delete(name);
              });
            });
          } catch (e) {
            console.error('Failed to clear cache:', e);
          }
        }
        
        toast.error("Failed to load page", {
          description: "There was a problem loading resources. Try refreshing.",
          duration: 8000,
          action: {
            label: "Refresh",
            onClick: () => window.location.reload()
          }
        });
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (loadingError) {
    console.error('Loading error in GlobalLoadingIndicator:', loadingError);
    // We don't show the error here because it will be handled by the error boundary
    return null;
  }

  if (!isLoading) return null;
  
  return <LoadingSpinner fullScreen message="Loading page..." />;
};

export default GlobalLoadingIndicator;
