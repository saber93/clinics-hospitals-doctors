
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

const App = () => {
  const { loading } = useAppAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL, direction } = useLanguage();
  const [error, setError] = useState<Error | null>(null);

  // Add error boundary for dynamic imports
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message && event.message.includes('Failed to fetch dynamically imported module')) {
        console.error('Module loading error detected:', event.message);
        setError(new Error(event.message));
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
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Loading Page</AlertTitle>
                <AlertDescription>
                  There was a problem loading this page. Please try refreshing the browser.
                  <br />
                  <code className="text-xs bg-gray-100 p-1 rounded mt-2 block">
                    {error.message}
                  </code>
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
