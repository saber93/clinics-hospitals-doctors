
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from './navbar/Logo';
import DesktopMenu from './navbar/DesktopMenu';
import MobileMenu from './navbar/MobileMenu';
import UserDropdownMenu from './navbar/UserDropdownMenu';
import AuthButtons from './navbar/AuthButtons';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Create a filteredLinks array for the mobile menu
  const filteredLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopMenu />

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <UserDropdownMenu handleLogout={handleLogout} />
            ) : (
              <AuthButtons session={user} />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu} 
          filteredLinks={filteredLinks}
          session={user}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
