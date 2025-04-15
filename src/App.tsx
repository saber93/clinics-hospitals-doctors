
import { useAppAuth } from "./hooks/useAppAuth";
import AppRoutes from "./components/routing/AppRoutes";
import GlassyNavbar from "./components/layout/GlassyNavbar";
import ModernFooter from "./components/layout/ModernFooter";
import { CartProvider } from "./contexts/CartContext";
import { useLocation } from "react-router-dom";
import { useTranslation } from "./hooks/useTranslation";
import { useLanguage } from "./contexts/LanguageContext";
import { cn } from "./lib/utils";
import { Suspense, useState, useEffect } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

interface AppError extends Error {
  isChunkLoadError?: boolean;
  source?: string;
}

const App = () => {
  const { loading } = useAppAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL, direction } = useLanguage();
  const [error, setError] = useState<AppError | null>(null);

  // Add enhanced error boundary for dynamic imports
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Expanded check for chunk-related errors
      const isChunkError = event.message && (
        event.message.includes('Failed to fetch dynamically imported module') ||
        event.message.includes('ChunkLoadError') ||
        event.message.includes('Loading chunk') ||
        event.message.includes('importing module') ||
        event.message.includes('chunk ') ||
        event.message.includes('import(') ||
        event.message.includes('module specifier') ||
        event.message.includes('@/pages/') ||
        event.filename?.includes('chunk-')
      );
      
      if (isChunkError) {
        console.error('App.tsx: Module loading error detected:', event.message);
        console.error('Error filename:', event.filename);
        
        const appError = new Error(event.message) as AppError;
        appError.isChunkLoadError = true;
        appError.source = 'app-global-handler';
        setError(appError);
        
        // Show toast for better user experience
        toast.error("Page loading failed", {
          description: "There was a problem loading this page. Please try again.",
          duration: 10000,
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
  }, []);

  // Reset error when location changes
  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  // Function to handle manual refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // Function to retry failed page load
  const handleRetry = () => {
    setError(null);
    // Add small delay before navigation to ensure state is updated
    setTimeout(() => {
      window.location.href = location.pathname;
    }, 100);
  };

  // Function to go back to previous page
  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        dir={direction}
        lang={isRTL ? "ar" : "en"}
      >
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className={cn("ml-2", isRTL && "mr-2 ml-0")}>{t('common.loading')}</span>
      </div>
    );
  }

  // Check if current route is an admin route to hide footer
  const isAdminRoute = 
    location.pathname.startsWith('/admin') || 
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/vendors' ||
    location.pathname === '/clients';

  return (
    <CartProvider>
      <div 
        className={cn("min-h-screen flex flex-col", isRTL && "rtl-content")}
        dir={direction}
        lang={isRTL ? "ar" : "en"}
      >
        <GlassyNavbar />
        <div className="flex-grow mt-16">
          {error ? (
            <div className="container mx-auto px-4 py-8">
              <Alert variant="destructive" className="mb-6 border border-destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="text-lg font-semibold">Error Loading Page</AlertTitle>
                <AlertDescription>
                  <p className="mb-4">There was a problem loading this page. This might be due to a network issue or a problem with the application.</p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button onClick={handleRefresh} variant="default" size="lg" className="w-full sm:w-auto">
                      Refresh Page
                    </Button>
                    <Button onClick={handleRetry} variant="outline" size="lg" className="w-full sm:w-auto">
                      Try Again
                    </Button>
                    <Button onClick={handleGoBack} variant="secondary" size="lg" className="w-full sm:w-auto">
                      Go Back
                    </Button>
                  </div>
                  <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                    <code className="break-all whitespace-pre-wrap">
                      {error.message}
                      {error.isChunkLoadError ? ' [Chunk Load Error]' : ''}
                    </code>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Suspense fallback={<LoadingSpinner fullScreen message="Loading page..." />}>
              <AppRoutes />
            </Suspense>
          )}
        </div>
        {!isAdminRoute && <ModernFooter />}
      </div>
    </CartProvider>
  );
};

export default App;
