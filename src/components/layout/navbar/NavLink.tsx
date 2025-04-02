
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  name: string;
  path: string;
  icon?: React.ElementType | ReactNode;
  className?: string;
}

const NavLink = ({ name, path, icon, className }: NavLinkProps) => {
  const location = useLocation();
  
  return (
    <Link
      to={path}
      className={cn(
        'text-foreground/90 hover:text-primary transition-colors duration-300 flex items-center',
        location.pathname === path && 'text-primary font-medium',
        className
      )}
    >
      {icon && typeof icon === 'function' ? (
        // If icon is a component/function (like a Lucide icon component), render it with props
        React.createElement(icon as React.ElementType, { size: 18, className: "mr-1" })
      ) : (
        // If icon is already a ReactNode, render it directly
        icon && <span className="mr-1">{icon}</span>
      )}
      {name}
    </Link>
  );
};

export default NavLink;
