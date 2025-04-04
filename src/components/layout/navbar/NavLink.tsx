
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  name: string;
  path: string;
  icon?: React.ElementType | React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ name, path, icon, className, children, onClick }: NavLinkProps) => {
  const location = useLocation();
  
  return (
    <Link
      to={path}
      className={cn(
        'text-foreground/90 hover:text-primary transition-colors duration-300 flex items-center',
        location.pathname === path && 'text-primary font-medium',
        className
      )}
      onClick={onClick}
    >
      {icon && React.isValidElement(icon) ? (
        <span className="mr-1">{icon}</span>
      ) : icon && typeof icon === 'function' ? (
        React.createElement(icon as React.ElementType, { size: 18, className: "mr-1" })
      ) : null}
      {name}
      {children}
    </Link>
  );
};

export default NavLink;
