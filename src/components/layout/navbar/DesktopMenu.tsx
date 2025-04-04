
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const DesktopMenu: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Helper functions to check user roles
  const isClient = () => true; // Replace with actual role check logic
  const isVendor = () => false; // Replace with actual role check logic
  const isAdmin = () => false; // Replace with actual role check logic

  return (
    <div className={cn(
      "hidden md:flex items-center space-x-6",
      isRTL && "space-x-reverse"
    )}>
      {user ? (
        <>
          {isClient() && (
            <>
              <Link to="/reservations" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.myReservations')}
              </Link>
              <Link to="/offers" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.specialOffers')}
              </Link>
            </>
          )}
          
          {isVendor() && (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.dashboard')}
              </Link>
              <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.myServices')}
              </Link>
              <Link to="/manage-reservations" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.reservations')}
              </Link>
              <Link to="/promotions" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.promotions')}
              </Link>
            </>
          )}
          
          {isAdmin() && (
            <>
              <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.adminDashboard')}
              </Link>
              <Link to="/manage-users" className="text-gray-600 hover:text-primary transition-colors">
                {t('common.manageUsers')}
              </Link>
            </>
          )}
        </>
      ) : (
        <>
          <Link to="/offers" className="text-gray-600 hover:text-primary transition-colors">
            {t('common.specialOffers')}
          </Link>
        </>
      )}
    </div>
  );
};

export default DesktopMenu;
