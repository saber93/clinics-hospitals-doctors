
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import { preloadCriticalImages } from './utils/imageOptimization';

// Configure query client with caching for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch data when the window regains focus
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
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
