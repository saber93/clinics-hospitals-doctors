
import { useAppAuth } from "./hooks/useAppAuth";
import AppRoutes from "./components/routing/AppRoutes";
import GlassyNavbar from "./components/layout/GlassyNavbar";
import ModernFooter from "./components/layout/ModernFooter";
import { CartProvider } from "./contexts/CartContext";
import { useLocation } from "react-router-dom";
import { useTranslation } from "./hooks/useTranslation";
import { useLanguage } from "./contexts/LanguageContext";
import { cn } from "./lib/utils";

const App = () => {
  const { loading } = useAppAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();

  // Check if current route is an admin route to hide footer
  const isAdminRoute = 
    location.pathname.startsWith('/admin') || 
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/vendors' ||
    location.pathname === '/clients';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-2">{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className={cn("min-h-screen flex flex-col", isRTL && "rtl-content")}>
        <GlassyNavbar />
        <div className="flex-grow">
          <AppRoutes />
        </div>
        {!isAdminRoute && <ModernFooter />}
      </div>
    </CartProvider>
  );
};

export default App;
