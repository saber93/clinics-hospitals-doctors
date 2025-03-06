
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Calendar, Gift, Ticket, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { user, logout, isClient, isVendor, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Skinnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
                
                {isClient() && (
                  <>
                    <Link to="/reservations" className="text-gray-600 hover:text-primary transition-colors">
                      My Reservations
                    </Link>
                    <Link to="/offers" className="text-gray-600 hover:text-primary transition-colors">
                      Special Offers
                    </Link>
                  </>
                )}
                
                {isVendor() && (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                      My Services
                    </Link>
                    <Link to="/manage-reservations" className="text-gray-600 hover:text-primary transition-colors">
                      Reservations
                    </Link>
                    <Link to="/promotions" className="text-gray-600 hover:text-primary transition-colors">
                      Promotions
                    </Link>
                  </>
                )}
                
                {isAdmin() && (
                  <>
                    <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors">
                      Admin Dashboard
                    </Link>
                    <Link to="/manage-users" className="text-gray-600 hover:text-primary transition-colors">
                      Manage Users
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/offers" className="text-gray-600 hover:text-primary transition-colors">
                  Special Offers
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <span>Hi, {user.name.split(' ')[0]}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  
                  {isClient() && (
                    <DropdownMenuItem onClick={() => navigate('/reservations')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>My Reservations</span>
                    </DropdownMenuItem>
                  )}
                  
                  {isVendor() && (
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Vendor Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onClick={() => navigate('/vouchers')}>
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>My Vouchers</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate('/offers')}>
                    <Gift className="mr-2 h-4 w-4" />
                    <span>Special Offers</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth?mode=login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/auth?mode=register')}>
                  Sign Up
                </Button>
              </>
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
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary py-2 transition-colors"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              
              {user ? (
                <>
                  {isClient() && (
                    <>
                      <Link
                        to="/reservations"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        My Reservations
                      </Link>
                      <Link
                        to="/offers"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Special Offers
                      </Link>
                    </>
                  )}
                  
                  {isVendor() && (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/services"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        My Services
                      </Link>
                      <Link
                        to="/manage-reservations"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Reservations
                      </Link>
                      <Link
                        to="/promotions"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Promotions
                      </Link>
                    </>
                  )}
                  
                  {isAdmin() && (
                    <>
                      <Link
                        to="/admin"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/manage-users"
                        className="text-gray-600 hover:text-primary py-2 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Manage Users
                      </Link>
                    </>
                  )}
                  
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-primary py-2 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="text-left text-gray-600 hover:text-primary py-2 transition-colors"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/offers"
                    className="text-gray-600 hover:text-primary py-2 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Special Offers
                  </Link>
                  <Link
                    to="/auth?mode=login"
                    className="text-gray-600 hover:text-primary py-2 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    className="text-gray-600 hover:text-primary py-2 transition-colors font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
