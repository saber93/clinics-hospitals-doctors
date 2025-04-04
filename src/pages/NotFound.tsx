
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={cn("text-center", isRTL && "rtl")}>
        <h1 className="text-4xl font-bold mb-4">{t('notFound.title')}</h1>
        <p className="text-xl text-gray-600 mb-4">{t('notFound.subtitle')}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {t('notFound.returnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
