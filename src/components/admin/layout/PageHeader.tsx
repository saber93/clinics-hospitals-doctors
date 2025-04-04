
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const PageHeader: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin-dashboard":
        return t('admin.dashboard');
      case "/admin/blogs":
        return "Blog Management";
      case "/admin/services":
        return t('common.services');
      case "/admin/themes":
        return "Theme Management";
      case "/admin/contact-messages":
        return "Contact Messages";
      case "/admin/settings":
        return t('common.settings');
      case "/vendors":
        return "Vendor Management";
      case "/clients":
        return "Client Management";
      case "/admin/analytics":
        return "Analytics Dashboard";
      default:
        return t('admin.dashboard');
    }
  };

  return (
    <header className={cn("bg-white border-b h-16 flex items-center px-6 shrink-0 w-full", isRTL && "rtl")}>
      <SidebarTrigger />
      <h1 className={cn("text-xl font-semibold", isRTL ? "mr-4" : "ml-4")}>{getPageTitle()}</h1>
    </header>
  );
};

export default PageHeader;
