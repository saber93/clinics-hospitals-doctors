
import React, { useState, useEffect } from 'react';
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
import SidebarSection from './sidebar/SidebarSection';
import SidebarSkeleton from './sidebar/SidebarSkeleton';

const AdminSidebar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <SidebarSkeleton />;
  }
  
  const dashboardItems = [
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

  const contentItems = [
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

  const usersProductsItems = [
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
  
  const communicationItems = [
    { 
      to: "/admin/contact-messages", 
      icon: MessageSquare, 
      label: "Contact Messages" 
    }
  ];

  const systemItems = [
    { 
      to: "/admin/settings", 
      icon: Settings, 
      label: "Settings" 
    }
  ];

  return (
    <div className="w-full md:w-64 border-r bg-card p-4 space-y-6">
      <SidebarSection title="Dashboard" items={dashboardItems} />
      <SidebarSection title="Content" items={contentItems} />
      <SidebarSection title="Users & Products" items={usersProductsItems} />
      <SidebarSection title="Communication" items={communicationItems} />
      <SidebarSection title="System" items={systemItems} />
    </div>
  );
};

export default AdminSidebar;
