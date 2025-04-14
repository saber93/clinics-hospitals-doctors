
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavLink from './NavLink';
import { Button } from '@/components/ui/button';
import AuthButtons from './AuthButtons';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { NavLinkType } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  filteredLinks: NavLinkType[];
  session: any;
  onClose?: () => void;
  toggleMobileMenu?: () => void;
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  filteredLinks,
  session,
  onClose,
  toggleMobileMenu,
  handleLogout
}) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const closeMenu = toggleMobileMenu || onClose || (() => {});

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-50 animate-in fade-in">
      <div className="container h-full flex flex-col bg-background shadow-lg">
        <div className="flex justify-end py-4">
          <Button variant="ghost" size="icon" onClick={closeMenu} aria-label={t('common.toggleMenu')}>
            <X size={24} />
          </Button>
        </div>
        
        <nav className="flex-1 flex flex-col justify-center bg-white/90 rounded-lg p-4 shadow-sm">
          <ul className={cn(
            "flex flex-col items-center space-y-6 text-xl",
            isRTL && "space-y-reverse"
          )}>
            {filteredLinks.map((link) => (
              <li key={link.path} className="w-full text-center">
                <NavLink 
                  name={t(`common.${link.name.toLowerCase()}`)} 
                  path={link.path}
                  className="py-2 w-full flex justify-center hover:bg-accent rounded-md"
                  onClick={closeMenu}
                />
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="py-8 flex justify-center">
          {session ? (
            <Button 
              variant="outline" 
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            >
              {t('common.logout')}
            </Button>
          ) : (
            <AuthButtons session={session} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
