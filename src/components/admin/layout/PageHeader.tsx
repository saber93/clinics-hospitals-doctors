
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTranslation } from '@/hooks/useTranslation';

const PageHeader: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
    <header className="bg-white border-b h-16 flex items-center px-6 shrink-0 w-full">
      <SidebarTrigger />
      <h1 className="text-xl font-semibold ml-4">{getPageTitle()}</h1>
    </header>
  );
};

export default PageHeader;
