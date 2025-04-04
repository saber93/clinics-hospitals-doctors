
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface AuthButtonsProps {
  session: any;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ session }) => {
  const { t } = useTranslation();
  
  if (session) return null;
  
  return (
    <div className="flex items-center space-x-2">
      <Button asChild variant="ghost">
        <Link to="/auth?mode=login">{t('common.login')}</Link>
      </Button>
      <Button asChild>
        <Link to="/auth?mode=register">{t('common.register')}</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
