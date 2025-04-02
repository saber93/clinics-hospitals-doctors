
import React from 'react';
import { X, LogOut } from 'lucide-react';
import NavLink from './NavLink';
import { MobileMenuProps } from './types';
import { logoutUser } from '@/utils/auth';
import { Button } from '@/components/ui/button';

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  toggleMobileMenu,
  filteredLinks, 
  session, 
  handleLogout 
}) => {
  if (!isOpen) return null;

  // Use the appropriate close function
  const closeMenu = () => {
    if (onClose) {
      onClose();
    } else if (toggleMobileMenu) {
      toggleMobileMenu();
    }
  };
  
  const onLogout = () => {
    if (handleLogout) {
      handleLogout();
    } else {
      logoutUser();
    }
    closeMenu();
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
      <div className="flex justify-end p-4">
        <button 
          onClick={closeMenu} 
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
        
        {session && (
          <Button
            onClick={onLogout}
            className="text-lg text-red-500 font-medium py-2 transition-colors flex items-center gap-2"
            variant="ghost"
          >
            <LogOut size={18} />
            Log out
          </Button>
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
