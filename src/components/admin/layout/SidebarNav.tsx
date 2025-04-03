
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

const SidebarNav: React.FC = () => {
  const dashboardNavItems = [
    { path: "/admin-dashboard", icon: LayoutDashboard, label: "Overview" },
    { path: "/admin/analytics", icon: BarChart4, label: "Analytics" }
  ];

  const contentNavItems = [
    { path: "/admin/blogs", icon: FileText, label: "Blog Posts" },
    { path: "/admin/services", icon: Layers, label: "Services" },
    { path: "/admin/themes", icon: Palette, label: "Theme Management" }
  ];

  const usersNavItems = [
    { path: "/vendors", icon: Users, label: "Vendors" },
    { path: "/clients", icon: Users, label: "Clients" },
    { path: "/admin/contact-messages", icon: MessageSquare, label: "Contact Messages" }
  ];

  const systemNavItems = [
    { path: "/admin/settings", icon: Settings, label: "Settings" }
  ];

  return (
    <>
      <SidebarHeader className="bg-background relative">
        <div className="px-4 py-3">
          <h2 className="text-lg font-semibold">Admin Portal</h2>
          <p className="text-xs text-muted-foreground">Manage your application</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarNavGroup label="Dashboard" items={dashboardNavItems} />
        <SidebarNavGroup label="Content" items={contentNavItems} />
        <SidebarNavGroup label="Users & Communication" items={usersNavItems} />
        <SidebarNavGroup label="System" items={systemNavItems} />
      </SidebarContent>
    </>
  );
};

export default SidebarNav;
