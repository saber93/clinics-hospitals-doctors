
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { getRelativeTime } from '@/utils/dateUtils';

interface ChatSession {
  id: string;
  patient_id: string;
  doctor_id: string;
  is_free: boolean;
  status: string;
  last_activity: string;
  created_at: string;
  profiles: { name: string | null };
  doctor: { name: string | null };
  unread_count?: number;
}

interface ChatSessionCardProps {
  session: ChatSession;
  currentUserId: string;
}

const ChatSessionCard: React.FC<ChatSessionCardProps> = ({ session, currentUserId }) => {
  const isDoctor = currentUserId === session.doctor_id;
  const otherPartyName = isDoctor 
    ? (session.profiles?.name || 'Patient') 
    : (session.doctor?.name || 'Doctor');

  return (
    <Link to={`/chats/${session.id}`}>
      <Card className={cn(
        "transition-shadow hover:shadow-md cursor-pointer",
        session.unread_count ? "border-primary/50" : ""
      )}>
        <CardContent className="p-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage alt={otherPartyName} />
              <AvatarFallback className={isDoctor ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                {isDoctor ? 'PT' : 'DR'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{otherPartyName}</h3>
                <span className="text-xs text-gray-500">
                  {getRelativeTime(session.last_activity)}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <SessionBadges status={session.status} isFree={session.is_free} />
                
                {session.unread_count > 0 && (
                  <Badge className="ml-auto bg-primary rounded-full h-5 w-5 p-0 flex items-center justify-center">
                    {session.unread_count}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

interface SessionBadgesProps {
  status: string;
  isFree: boolean;
}

const SessionBadges: React.FC<SessionBadgesProps> = ({ status, isFree }) => {
  return (
    <div className="flex gap-1.5">
      {isFree && (
        <Badge variant="outline" className="bg-green-50 text-green-600 text-xs py-0">
          Free
        </Badge>
      )}
      
      {status === 'active' ? (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 text-xs py-0">
          Active
        </Badge>
      ) : status === 'expired' ? (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 text-xs py-0">
          <Clock className="h-3 w-3 mr-1" /> Expired
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-gray-50 text-gray-600 text-xs py-0">
          Completed
        </Badge>
      )}
    </div>
  );
};

export default ChatSessionCard;
