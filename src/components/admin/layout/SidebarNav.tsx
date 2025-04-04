
import React from 'react';
import { 
  SidebarContent, 
  SidebarHeader 
} from '@/components/ui/sidebar';
import SidebarNavGroup from './SidebarNavGroup';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Users, 
  MessageSquare, 
  Settings, 
  BarChart4, 
  Palette 
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const SidebarNav: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const dashboardNavItems = [
    { path: "/admin-dashboard", icon: LayoutDashboard, label: t('common.dashboard') },
    { path: "/admin/analytics", icon: BarChart4, label: "Analytics" }
  ];

  const contentNavItems = [
    { path: "/admin/blogs", icon: FileText, label: "Blog Posts" },
    { path: "/admin/services", icon: Layers, label: t('common.services') },
    { path: "/admin/themes", icon: Palette, label: "Theme Management" }
  ];

  const usersNavItems = [
    { path: "/vendors", icon: Users, label: "Vendors" },
    { path: "/clients", icon: Users, label: "Clients" },
    { path: "/admin/contact-messages", icon: MessageSquare, label: "Contact Messages" }
  ];

  const systemNavItems = [
    { path: "/admin/settings", icon: Settings, label: t('common.settings') }
  ];

  return (
    <>
      <SidebarHeader className={cn("bg-background relative", isRTL && "rtl")}>
        <div className="px-4 py-3">
          <h2 className="text-lg font-semibold">{t('admin.dashboard')}</h2>
          <p className="text-xs text-muted-foreground">Manage your application</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent className={isRTL ? "rtl" : ""}>
        <SidebarNavGroup label={t('common.dashboard')} items={dashboardNavItems} />
        <SidebarNavGroup label="Content" items={contentNavItems} />
        <SidebarNavGroup label={t('admin.manageUsers')} items={usersNavItems} />
        <SidebarNavGroup label="System" items={systemNavItems} />
      </SidebarContent>
    </>
  );
};

export default SidebarNav;
