
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { NavLinkType } from './types';
import { MessageSquare, Search } from 'lucide-react';

export const useNavbar = () => {
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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks: NavLinkType[] = [
    { name: 'Home', path: '/' },
    { name: 'Clinics', path: '/clinics', icon: <Search className="h-4 w-4 mr-1" /> },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact', icon: <MessageSquare className="h-4 w-4 mr-1" /> },
    { name: 'Dashboard', path: '/dashboard', auth: true },
    { name: 'Reservations', path: '/reservations', auth: true },
    { name: 'Offers', path: '/offers', auth: true },
    { name: 'Vouchers', path: '/vouchers', auth: true },
  ];

  const filteredLinks = navLinks.filter(link => !link.auth || (link.auth && session));

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    scrolled,
    session,
    filteredLinks,
    handleToggleMenu,
    setIsOpen
  };
};
