
import React from 'react';
import { Button } from '@/components/ui/button';

interface NotLoggedInStateProps {
  navigate: (path: string) => void;
}

const NotLoggedInState: React.FC<NotLoggedInStateProps> = ({ navigate }) => {
  return (
    <div className="text-center py-8">
      <p className="mb-4">Please log in to view your chats</p>
      <Button onClick={() => navigate('/auth')}>Log In</Button>
    </div>
  );
};

export default NotLoggedInState;
