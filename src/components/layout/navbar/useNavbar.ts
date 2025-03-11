
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { NavLinkType } from './types';

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking session:", error);
          setSession(null);
          return;
        }
        setSession(data.session);
        
        // Get user role if session exists
        if (data.session) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single();
            
          setUserRole(profileData?.role || data.session.user.user_metadata?.role || null);
        }
      } catch (error) {
        console.error("Error in session check:", error);
        setSession(null);
      }
    };
    
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event);
      setSession(session);
      
      // Update user role when auth state changes
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        setUserRole(profileData?.role || session.user.user_metadata?.role || null);
      } else {
        setUserRole(null);
      }
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
    { name: 'Clinics', path: '/clinics', icon: 'search' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact', icon: 'message-square' },
    { name: 'Dashboard', path: '/dashboard', auth: true },
    { name: 'Reservations', path: '/reservations', auth: true },
    { name: 'Offers', path: '/offers', auth: true },
    { name: 'Vouchers', path: '/vouchers', auth: true },
  ];
  
  // Add seller-specific links for seller users
  if (userRole === 'seller') {
    navLinks.push(
      { name: 'Products', path: '/products', auth: true, role: 'seller' },
      { name: 'Seller Dashboard', path: '/seller-dashboard', auth: true, role: 'seller' }
    );
  }

  const filteredLinks = navLinks.filter(link => 
    !link.auth || (link.auth && session) && 
    (!link.role || link.role === userRole)
  );

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    scrolled,
    session,
    userRole,
    filteredLinks,
    handleToggleMenu,
    setIsOpen
  };
};
