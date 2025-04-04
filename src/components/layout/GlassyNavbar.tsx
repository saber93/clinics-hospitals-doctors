
import React from 'react';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavbar } from './navbar/useNavbar';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileMenu from './navbar/MobileMenu';
import UserDropdownMenu from './navbar/UserDropdownMenu';
import AuthButtons from './navbar/AuthButtons';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './navbar/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const GlassyNavbar = () => {
  const { isOpen, scrolled, filteredLinks, handleToggleMenu, handleLogout } = useNavbar();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [session, setSession] = useState<any>(null);
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Check current auth status
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Determine if user is authenticated
  const isAuthenticated = !!session;

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth?mode=login');
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b',
        scrolled 
          ? 'py-2 backdrop-blur-xl bg-white/30 dark:bg-black/30 shadow-lg border-white/10 dark:border-white/5' 
          : 'py-3 backdrop-blur-md bg-white/10 dark:bg-black/10 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <NavLogo />
        <DesktopNav filteredLinks={filteredLinks} session={session} />

        {/* Auth Buttons / User Menu - Make logout button more visible */}
        <div className={`hidden md:flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
          <LanguageSwitcher />
          
          <Button variant="ghost" size="icon" onClick={handleAccountClick}>
            <User size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" onClick={handleCartClick}>
            <ShoppingCart size={20} />
            <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center`}>
              {totalItems}
            </span>
          </Button>
          
          {isAuthenticated ? (
            <UserDropdownMenu handleLogout={handleLogout} />
          ) : (
            <AuthButtons session={session} />
          )}
        </div>

        <div className={`md:hidden flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          <LanguageSwitcher />
          
          <Button variant="ghost" size="icon" onClick={handleAccountClick}>
            <User size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" onClick={handleCartClick}>
            <ShoppingCart size={20} />
            <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center`}>
              {totalItems}
            </span>
          </Button>
          
          <button
            onClick={handleToggleMenu}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? null : <Menu size={24} />}
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isOpen} 
        filteredLinks={filteredLinks} 
        session={session} 
        onClose={handleToggleMenu}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default GlassyNavbar;
