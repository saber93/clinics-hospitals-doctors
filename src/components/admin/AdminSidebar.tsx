
import React from 'react';
import { NavLink } from 'react-router-dom';
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

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ to, icon, label }: SidebarItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-2 rounded-lg text-sm ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted transition-colors'
      }`
    }
  >
    <span className="mr-3">{icon}</span>
    {label}
  </NavLink>
);

const AdminSidebar = () => {
  return (
    <div className="w-full md:w-64 border-r bg-card p-4 space-y-6">
      <div className="py-2">
        <h2 className="font-semibold px-3 mb-2 text-muted-foreground text-xs tracking-wider uppercase">
          Dashboard
        </h2>
        <nav className="space-y-1">
          <SidebarItem 
            to="/admin-dashboard" 
            icon={<LayoutDashboard className="h-4 w-4" />} 
            label="Overview" 
          />
          <SidebarItem 
            to="/admin/analytics" 
            icon={<BarChart4 className="h-4 w-4" />} 
            label="Analytics" 
          />
        </nav>
      </div>

      <div className="py-2">
        <h2 className="font-semibold px-3 mb-2 text-muted-foreground text-xs tracking-wider uppercase">
          Content
        </h2>
        <nav className="space-y-1">
          <SidebarItem 
            to="/admin/blogs" 
            icon={<FileText className="h-4 w-4" />} 
            label="Blog Posts" 
          />
          <SidebarItem 
            to="/admin/services" 
            icon={<Layers className="h-4 w-4" />} 
            label="Services" 
          />
          <SidebarItem 
            to="/admin/themes" 
            icon={<Palette className="h-4 w-4" />} 
            label="Theme Management" 
          />
        </nav>
      </div>

      <div className="py-2">
        <h2 className="font-semibold px-3 mb-2 text-muted-foreground text-xs tracking-wider uppercase">
          Users & Products
        </h2>
        <nav className="space-y-1">
          <SidebarItem 
            to="/vendors" 
            icon={<Users className="h-4 w-4" />} 
            label="Vendors" 
          />
          <SidebarItem 
            to="/clients" 
            icon={<Users className="h-4 w-4" />} 
            label="Clients" 
          />
          <SidebarItem 
            to="/products-management" 
            icon={<ShoppingBag className="h-4 w-4" />} 
            label="Products" 
          />
          <SidebarItem 
            to="/seller-vouchers" 
            icon={<Ticket className="h-4 w-4" />} 
            label="Vouchers" 
          />
        </nav>
      </div>
      
      <div className="py-2">
        <h2 className="font-semibold px-3 mb-2 text-muted-foreground text-xs tracking-wider uppercase">
          Communication
        </h2>
        <nav className="space-y-1">
          <SidebarItem 
            to="/admin/contact-messages" 
            icon={<MessageSquare className="h-4 w-4" />} 
            label="Contact Messages" 
          />
        </nav>
      </div>

      <div className="py-2">
        <h2 className="font-semibold px-3 mb-2 text-muted-foreground text-xs tracking-wider uppercase">
          System
        </h2>
        <nav className="space-y-1">
          <SidebarItem 
            to="/admin/settings" 
            icon={<Settings className="h-4 w-4" />} 
            label="Settings" 
          />
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
