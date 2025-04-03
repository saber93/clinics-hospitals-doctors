
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FileText, 
  Layers, 
  Settings,
  BarChart4,
  MessageSquare,
  Ticket,
  Palette
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const getDashboardNavData = (): NavSection[] => {
  const dashboardItems: NavItem[] = [
    { 
      to: "/admin-dashboard", 
      icon: LayoutDashboard, 
      label: "Overview" 
    },
    { 
      to: "/admin/analytics", 
      icon: BarChart4, 
      label: "Analytics" 
    }
  ];

  const contentItems: NavItem[] = [
    { 
      to: "/admin/blogs", 
      icon: FileText, 
      label: "Blog Posts" 
    },
    { 
      to: "/admin/services", 
      icon: Layers, 
      label: "Services" 
    },
    { 
      to: "/admin/themes", 
      icon: Palette, 
      label: "Theme Management" 
    }
  ];

  const usersProductsItems: NavItem[] = [
    { 
      to: "/vendors", 
      icon: Users, 
      label: "Vendors" 
    },
    { 
      to: "/clients", 
      icon: Users, 
      label: "Clients" 
    },
    { 
      to: "/products-management", 
      icon: ShoppingBag, 
      label: "Products" 
    },
    { 
      to: "/seller-vouchers", 
      icon: Ticket, 
      label: "Vouchers" 
    }
  ];
  
  const communicationItems: NavItem[] = [
    { 
      to: "/admin/contact-messages", 
      icon: MessageSquare, 
      label: "Contact Messages" 
    }
  ];

  const systemItems: NavItem[] = [
    { 
      to: "/admin/settings", 
      icon: Settings, 
      label: "Settings" 
    }
  ];

  return [
    { title: "Dashboard", items: dashboardItems },
    { title: "Content", items: contentItems },
    { title: "Users & Products", items: usersProductsItems },
    { title: "Communication", items: communicationItems },
    { title: "System", items: systemItems }
  ];
};
