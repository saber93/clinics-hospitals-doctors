
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavLink from './NavLink';
import AuthButtons from './AuthButtons';
import { NavLinkType } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  filteredLinks: NavLinkType[];
  session: any;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, filteredLinks, session, onClose }: MobileMenuProps) => {
  return (
    <div
      className={cn(
        'md:hidden fixed inset-0 top-0 left-0 w-full h-screen z-40 transition-transform duration-300 ease-in-out',
        'backdrop-blur-xl bg-white/95 dark:bg-black/95 shadow-lg border border-white/10 dark:border-white/5',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        
        {filteredLinks.map((link) => (
          <NavLink
            key={link.path}
            path={link.path}
            name={link.name}
            icon={link.icon}
            className="text-lg font-medium"
          />
        ))}
        
        <AuthButtons session={session} isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
