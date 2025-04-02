
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  name: string;
  path: string;
  icon?: ReactNode;
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
      {icon && <span className="mr-1">{icon}</span>}
      {name}
    </Link>
  );
};

export default NavLink;
