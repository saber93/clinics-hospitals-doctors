
import React from 'react';
import NavLink from './NavLink';
import { DesktopNavProps } from './types';

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
    </nav>
  );
};

export default DesktopNav;
