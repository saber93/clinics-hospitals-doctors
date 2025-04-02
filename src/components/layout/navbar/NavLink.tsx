
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  name: string;
  path: string;
  icon?: React.ElementType | React.ReactNode;
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
      {icon && React.isValidElement(icon) ? (
        // If icon is already a ReactElement, render it directly
        <span className="mr-1">{icon}</span>
      ) : icon && typeof icon === 'function' ? (
        // If icon is a component/function (like a Lucide icon component), render it
        React.createElement(icon as React.ElementType, { size: 18, className: "mr-1" })
      ) : null}
      {name}
    </Link>
  );
};

export default NavLink;
