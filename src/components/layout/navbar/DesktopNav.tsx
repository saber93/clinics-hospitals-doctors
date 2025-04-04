
import React from 'react';
import { cn } from '@/lib/utils';
import NavLink from './NavLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { NavLinkType } from './types';

interface DesktopNavProps {
  filteredLinks: NavLinkType[];
  session: any;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ filteredLinks, session }) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex">
      <ul className={cn(
        "flex items-center space-x-6", 
        isRTL && "space-x-reverse"
      )}>
        {filteredLinks.map((link) => (
          <li key={link.path}>
            <NavLink 
              name={t(`common.${link.name.toLowerCase()}`)}
              path={link.path} 
              icon={link.icon}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
