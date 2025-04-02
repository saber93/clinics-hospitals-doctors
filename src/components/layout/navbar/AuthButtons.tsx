
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthButtonsProps } from './types';
import { LogOut } from 'lucide-react';
import { logoutUser } from '@/utils/auth';
import { supabase } from '@/integrations/supabase/client';

const AuthButtons: React.FC<AuthButtonsProps> = ({ session }) => {
  const navigate = useNavigate();
  
  // If we have a session, show logout button
  if (session) {
    return (
      <Button 
        variant="ghost" 
        onClick={logoutUser}
        className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    );
  }
  
  // If no session, show login and signup buttons
  return (
    <>
      <Button variant="ghost" onClick={() => navigate('/auth?mode=login')}>
        Login
      </Button>
      <Button onClick={() => navigate('/auth?mode=register')}>
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
