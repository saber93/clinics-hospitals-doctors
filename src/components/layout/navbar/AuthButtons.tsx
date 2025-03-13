
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();
  
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
