
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import { preloadCriticalImages } from './utils/imageOptimization';
import { toast } from 'sonner';
import { supabase } from './integrations/supabase/client';

// Create a custom error handler for chunk loading errors
const handleChunkError = (event: ErrorEvent) => {
  // Check if the error is related to loading a chunk with more specific patterns
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
    console.error('🚨 Chunk loading error detected:', event.message);
    console.error('Error details:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
    
    // Try to recover by clearing cached resources
    try {
      console.log('Attempting to clear cached resources...');
      localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
      sessionStorage.clear();
      
      if (window.caches) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
            console.log(`Cache ${cacheName} deleted`);
          });
        });
      }
    } catch (e) {
      console.error('Failed to clear caches:', e);
    }
    
    // Show a user-friendly toast message
    toast.error("Failed to load page", {
      description: "Please try refreshing the page",
      duration: 10000,
      action: {
        label: "Refresh",
        onClick: () => window.location.reload()
      }
    });
    
    // Don't show the default browser error dialog
    event.preventDefault();
  }
};

// Add global error handler
window.addEventListener('error', handleChunkError);

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // If it seems related to a chunk loading issue, handle it
  if (event.reason && (
      typeof event.reason.message === 'string' && 
      (event.reason.message.includes('chunk') || 
       event.reason.message.includes('import') ||
       event.reason.message.includes('module')))) {
    
    toast.error("Failed to load resources", {
      description: "Please try refreshing the page",
      duration: 10000,
      action: {
        label: "Refresh",
        onClick: () => window.location.reload()
      }
    });
    
    // Mark as handled to prevent default browser handling
    event.preventDefault();
  }
});

// Configure query client with improved caching and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch data when the window regains focus
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes (replaces cacheTime)
      retry: 3, // Increase retry attempts for network issues
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max 30s
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
          toast.error('Failed to load data', {
            description: 'Please try again later',
            duration: 5000
          });
        }
      }
    },
  },
});

// Preload critical images
preloadCriticalImages([
  '/lovable-uploads/f538345f-52aa-4960-a4a2-c377edde5280.png', // Hero image
]);

// Expose logout function globally for error recovery
window.logoutUser = async (): Promise<void> => {
  try {
    // Add this function to help users recover from auth-related issues
    await supabase.auth.signOut();
    localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
    sessionStorage.clear();
    window.location.href = '/';
    
    console.log('User logged out successfully for recovery');
  } catch (error) {
    console.error('Error during recovery logout:', error);
    window.location.href = '/';
  }
};

// Use createRoot instead of ReactDOM.render for better performance
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <App />
          <Toaster position="bottom-right" />
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
