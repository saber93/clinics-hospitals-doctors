
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Gift, Ticket, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutUser } from '@/utils/auth';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface UserDropdownMenuProps {
  handleLogout?: () => void;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    getUser();
    
    // Listen for user changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  const onLogout = () => {
    if (handleLogout) {
      handleLogout();
    } else {
      logoutUser(); // Use the centralized logout function as fallback
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <span>Hi, {user?.user_metadata?.name?.split(' ')[0] || 'User'}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/reservations')}>
          <Calendar className="mr-2 h-4 w-4" />
          <span>My Reservations</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/vouchers')}>
          <Ticket className="mr-2 h-4 w-4" />
          <span>My Vouchers</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/offers')}>
          <Gift className="mr-2 h-4 w-4" />
          <span>Special Offers</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-500 font-medium">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
