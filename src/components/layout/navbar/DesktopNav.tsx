
import React from 'react';
import NavLink from './NavLink';
import AuthButtons from './AuthButtons';
import { NavLinkType } from './types';

interface DesktopNavProps {
  filteredLinks: NavLinkType[];
  session: any;
}

const DesktopNav = ({ filteredLinks, session }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {filteredLinks.map((link) => (
        <NavLink 
          key={link.path}
          path={link.path}
          name={link.name}
          icon={link.icon}
        />
      ))}
      
      <AuthButtons session={session} />
    </nav>
  );
};

export default DesktopNav;
