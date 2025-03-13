
import React from 'react';
import { X } from 'lucide-react';
import NavLink from './NavLink';
import { MobileMenuProps } from './types';

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  filteredLinks, 
  session, 
  handleLogout 
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
      <div className="flex justify-end p-4">
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex flex-col items-center space-y-6 p-8">
        {filteredLinks.map((link) => (
          <NavLink 
            key={link.path} 
            path={link.path} 
            name={link.name} 
            icon={link.icon}
            className="text-lg"
          />
        ))}
        
        {session && handleLogout && (
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
            className="text-lg text-gray-600 hover:text-primary py-2 transition-colors"
          >
            Log out
          </button>
        )}
        
        {!session && (
          <>
            <NavLink 
              path="/auth?mode=login"
              name="Login"
              className="text-lg"
            />
            <NavLink 
              path="/auth?mode=register"
              name="Sign Up"
              className="text-lg font-medium"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
