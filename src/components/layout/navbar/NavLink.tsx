
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, MessageSquare, LucideIcon } from 'lucide-react';

interface NavLinkProps {
  name: string;
  path: string;
  icon?: string;
  className?: string;
}

const NavLink = ({ name, path, icon, className }: NavLinkProps) => {
  const location = useLocation();
  
  const renderIcon = () => {
    if (!icon) return null;
    
    switch (icon) {
      case 'search':
        return <Search className="h-4 w-4 mr-1" />;
      case 'message-square':
        return <MessageSquare className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  return (
    <Link
      to={path}
      className={cn(
        'text-foreground/90 hover:text-primary transition-colors duration-300 flex items-center',
        location.pathname === path && 'text-primary font-medium',
        className
      )}
    >
      {renderIcon()}
      {name}
    </Link>
  );
};

export default NavLink;
