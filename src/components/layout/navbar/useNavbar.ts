
import { useState, useEffect } from 'react';
import { useAppAuth } from '@/hooks/useAppAuth';
import { useNavigate } from 'react-router-dom';

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { session, signOut } = useAppAuth();
  const navigate = useNavigate();

  // Define all nav links
  const allLinks = [
    { name: 'Home', path: '/' },
    { name: 'Clinics', path: '/clinics' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Reservations', path: '/reservations', protected: true },
    { name: 'Products', path: '/products', protected: true },
    { name: 'My Bookings', path: '/all-bookings', protected: true },
  ];

  // Filter links based on authentication
  const filteredLinks = allLinks.filter(link => {
    if (link.protected) {
      return session !== null;
    }
    return true;
  });

  // Handle menu toggle
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogout = () => {
    if (signOut) {
      signOut();
      navigate('/');
    }
  };

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return {
    isOpen,
    scrolled,
    session,
    filteredLinks,
    handleToggleMenu,
    handleLogout
  };
};
