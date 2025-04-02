
import { useState, useEffect } from 'react';
import { LucideIcon, Home, Info, Phone, Building2, Heart, User, Stethoscope } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { logoutUser } from '@/utils/auth';

interface NavLink {
  name: string;
  path: string;
  icon?: LucideIcon;
  roles?: string[];
}

export const useNavbar = () => {
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links: NavLink[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Clinics', path: '/clinics', icon: Building2 },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

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

  // Filter links based on user roles if needed
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
