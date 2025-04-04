
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface UserDropdownMenuProps {
  handleLogout: () => void;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ handleLogout }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className={cn(
        "flex items-center space-x-2",
        isRTL && "space-x-reverse"
      )}
    >
      <LogOut className="h-4 w-4" />
      <span>{t('common.logout')}</span>
    </Button>
  );
};

export default UserDropdownMenu;
