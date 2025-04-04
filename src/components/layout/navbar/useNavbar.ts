
import { useState, useEffect } from 'react';
import { Info, Phone, Building2, Stethoscope, Hospital, ShoppingBag } from 'lucide-react';
import { logoutUser } from '@/utils/auth';
import { supabase } from '@/integrations/supabase/client';

export interface NavLinkType {
  name: string;
  path: string;
  icon?: React.ElementType;
  roles?: string[];
}

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);

  const links: NavLinkType[] = [
    // Home link removed from here
    { name: 'Clinics', path: '/clinics', icon: Building2 },
    { name: 'Hospitals', path: '/hospitals', icon: Hospital },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Products', path: '/products', icon: ShoppingBag },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

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

  const handleScrollListener = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollListener);
    return () => window.removeEventListener('scroll', handleScrollListener);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logoutUser();
  };

  const filteredLinks = links.filter(link => {
    if (!link.roles) return true;
    if (!session) return false;
    
    const userRole = session.user?.user_metadata?.role || 'client';
    return link.roles.includes(userRole);
  });

  return {
    isOpen,
    scrolled,
    filteredLinks,
    session,
    handleToggleMenu,
    handleLogout
  };
};
