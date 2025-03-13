
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  toggleMobileMenu: () => void;
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMobileMenu, handleLogout }) => {
  const { user, isClient, isVendor, isAdmin } = useAuth();

  if (!isOpen) return null;

  return (
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
  );
};

export default MobileMenu;
