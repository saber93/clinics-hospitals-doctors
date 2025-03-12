
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/utils/auth';
import { cn } from '@/lib/utils';

interface AuthButtonsProps {
  session: any;
  isMobile?: boolean;
}

const AuthButtons = ({ session, isMobile = false }: AuthButtonsProps) => {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutUser();
  };

  if (!session) {
    return (
      <div className={cn("flex", isMobile ? "flex-col space-y-4 w-full max-w-xs" : "space-x-4")}>
        <Button 
          asChild 
          variant="outline" 
          size={isMobile ? "lg" : "sm"}
          className={cn(
            "backdrop-blur-sm bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20",
            isMobile && "w-full"
          )}
        >
          <Link to="/login">Log In</Link>
        </Button>
        <Button 
          asChild 
          size={isMobile ? "lg" : "sm"} 
          className={cn(
            "skinnect-button-primary backdrop-blur-sm hover:shadow-md hover:shadow-primary/20 transition-all duration-300",
            isMobile && "w-full"
          )}
        >
          <Link to="/register">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size={isMobile ? "lg" : "sm"}
      className={cn(
        "backdrop-blur-sm bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20",
        isMobile && "w-full max-w-xs"
      )}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
};

export default AuthButtons;
