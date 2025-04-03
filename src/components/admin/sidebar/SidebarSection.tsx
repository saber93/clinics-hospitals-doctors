
import React from 'react';
import { LucideIcon } from 'lucide-react';
import SidebarItem from './SidebarItem';

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarSectionProps {
  title: string;
  items: NavItem[];
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items }) => {
  return (
    <div className="py-2">
      <h2 className="font-semibold px-3 mb-2 text-muted-foreground text-xs tracking-wider uppercase">
        {title}
      </h2>
      <nav className="space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={<item.icon className="h-4 w-4" />}
            label={item.label}
          />
        ))}
      </nav>
    </div>
  );
};

export default SidebarSection;
