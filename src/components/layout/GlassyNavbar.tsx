
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

const GlassyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard', auth: true },
    { name: 'Reservations', path: '/reservations', auth: true },
    { name: 'Offers', path: '/offers', auth: true },
    { name: 'Vouchers', path: '/vouchers', auth: true },
  ];

  const filteredLinks = navLinks.filter(link => !link.auth || (link.auth && session));

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out',
        scrolled ? 'py-3 backdrop-blur-lg bg-white/70 dark:bg-black/50 shadow-md' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-primary text-xl font-bold">Zams</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {filteredLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-foreground/80 hover:text-primary transition-colors duration-300',
                location.pathname === link.path && 'text-primary font-medium'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {!session ? (
            <div className="flex space-x-4">
              <Button asChild variant="outline" size="sm">
                <Link to="/auth?mode=login">Log In</Link>
              </Button>
              <Button asChild size="sm" className="skinnect-button-primary">
                <Link to="/auth?mode=register">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={async () => await supabase.auth.signOut()}
            >
              Log Out
            </Button>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-lg transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          {filteredLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-lg font-medium hover:text-primary transition-colors duration-300',
                location.pathname === link.path && 'text-primary'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {!session ? (
            <div className="flex flex-col space-y-4 w-full max-w-xs">
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/auth?mode=login">Log In</Link>
              </Button>
              <Button asChild size="lg" className="skinnect-button-primary w-full">
                <Link to="/auth?mode=register">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="w-full max-w-xs"
              onClick={async () => await supabase.auth.signOut()}
            >
              Log Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default GlassyNavbar;
