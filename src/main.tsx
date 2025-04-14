
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import { preloadCriticalImages } from './utils/imageOptimization';

// Enhanced global error handler for chunk loading errors
window.addEventListener('error', (event) => {
  // Check if the error is related to loading a chunk
  if (event.message && (
    event.message.includes('Failed to fetch dynamically imported module') ||
    event.message.includes('ChunkLoadError') ||
    event.message.includes('Loading chunk')
  )) {
    console.error('Chunk loading error detected:', event.message);
    console.error('Error details:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
    
    // Don't show the default browser error dialog
    event.preventDefault();
    
    // The error will be handled by the error boundaries in App.tsx and AppRoutes.tsx
  }
});

// Configure query client with caching for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch data when the window regains focus
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes (replaces cacheTime)
      retry: 2, // Increase retry attempts for network issues
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max 30s
    },
  },
});

// Preload critical images
preloadCriticalImages([
  '/lovable-uploads/f538345f-52aa-4960-a4a2-c377edde5280.png', // Hero image
]);

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
