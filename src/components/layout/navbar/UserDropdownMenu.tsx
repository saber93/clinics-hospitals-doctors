
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
import { useAuth } from '../../../context/AuthContext';

interface UserDropdownMenuProps {
  handleLogout: () => void;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ handleLogout }) => {
  const { user, isClient, isVendor } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <span>Hi, {user?.name?.split(' ')[0]}</span>
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
        
        {isClient() && (
          <DropdownMenuItem onClick={() => navigate('/reservations')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>My Reservations</span>
          </DropdownMenuItem>
        )}
        
        {isVendor() && (
          <DropdownMenuItem onClick={() => navigate('/dashboard')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Vendor Dashboard</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => navigate('/vouchers')}>
          <Ticket className="mr-2 h-4 w-4" />
          <span>My Vouchers</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/offers')}>
          <Gift className="mr-2 h-4 w-4" />
          <span>Special Offers</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
