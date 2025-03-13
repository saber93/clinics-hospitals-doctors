
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const DesktopMenu: React.FC = () => {
  const { user, isClient, isVendor, isAdmin } = useAuth();

  return (
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
  );
};

export default DesktopMenu;
