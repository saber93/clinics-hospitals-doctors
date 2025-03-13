
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock } from 'lucide-react';

interface ChatHeaderProps {
  otherPartyName: string;
  lastActivity: string;
  isFree: boolean;
  onPaymentDialogOpen: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  otherPartyName,
  lastActivity,
  isFree,
  onPaymentDialogOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border-b py-2 px-4 bg-white">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/chat-sessions')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage alt={otherPartyName} />
            <AvatarFallback>{otherPartyName?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{otherPartyName}</div>
            <div className="text-xs text-gray-500">
              Last active: {new Date(lastActivity).toLocaleTimeString()}
            </div>
          </div>
          {!isFree && (
            <Badge variant="secondary" className="ml-2 cursor-pointer" onClick={onPaymentDialogOpen}>
              <Clock className="mr-1 h-3 w-3" /> Pay
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
