
import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavbar } from './navbar/useNavbar';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileMenu from './navbar/MobileMenu';

const GlassyNavbar = () => {
  const { isOpen, scrolled, session, filteredLinks, handleToggleMenu } = useNavbar();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b',
        scrolled 
          ? 'py-3 backdrop-blur-xl bg-white/30 dark:bg-black/30 shadow-lg border-white/10 dark:border-white/5' 
          : 'py-5 backdrop-blur-md bg-white/10 dark:bg-black/10 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <NavLogo />
        <DesktopNav filteredLinks={filteredLinks} session={session} />

        <button
          onClick={handleToggleMenu}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? null : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu 
        isOpen={isOpen} 
        filteredLinks={filteredLinks} 
        session={session} 
        onClose={handleToggleMenu} 
      />
    </header>
  );
};

export default GlassyNavbar;
