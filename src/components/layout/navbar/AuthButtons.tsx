
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthButtonsProps } from './types';

const AuthButtons: React.FC<AuthButtonsProps> = ({ session }) => {
  const navigate = useNavigate();
  
  // If we have a session, don't render the auth buttons
  if (session) return null;
  
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
