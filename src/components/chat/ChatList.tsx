
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { fetchUserChatSessions } from '@/services/chatService';
import { supabase } from '@/integrations/supabase/client';

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

const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setCurrentUser(data.session?.user || null);
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    
    checkSession();
  }, []);

  useEffect(() => {
    const loadChatSessions = async () => {
      if (!currentUser) return;
      
      try {
        const isDoctor = await checkIfDoctor(currentUser.id);
        const chatSessions = await fetchUserChatSessions(currentUser.id, isDoctor);
        
        // Get unread message counts for each session
        const sessionsWithUnread = await Promise.all(
          chatSessions.map(async (session: any) => {
            const { count } = await supabase
              .from('chat_messages')
              .select('id', { count: 'exact' })
              .eq('session_id', session.id)
              .eq('is_read', false)
              .neq('sender_id', currentUser.id);
            
            return {
              ...session,
              unread_count: count || 0
            };
          })
        );
        
        setSessions(sessionsWithUnread);
      } catch (error) {
        console.error('Error loading chat sessions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      loadChatSessions();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const checkIfDoctor = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      return data?.role === 'vendor';
    } catch {
      return false;
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">Please log in to view your chats</p>
        <Button onClick={() => navigate('/auth')}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No chat sessions found</h3>
          <p className="text-sm text-gray-500 mb-4">
            You haven't started any chat sessions yet.
          </p>
        </div>
      ) : (
        sessions.map((session) => {
          const isDoctor = currentUser.id === session.doctor_id;
          const otherPartyName = isDoctor 
            ? (session.profiles?.name || 'Patient') 
            : (session.doctor?.name || 'Doctor');
          
          return (
            <Link to={`/chats/${session.id}`} key={session.id}>
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
                        <div className="flex gap-1.5">
                          {session.is_free && (
                            <Badge variant="outline" className="bg-green-50 text-green-600 text-xs py-0">
                              Free
                            </Badge>
                          )}
                          
                          {session.status === 'active' ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 text-xs py-0">
                              Active
                            </Badge>
                          ) : session.status === 'expired' ? (
                            <Badge variant="outline" className="bg-amber-50 text-amber-600 text-xs py-0">
                              <Clock className="h-3 w-3 mr-1" /> Expired
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 text-xs py-0">
                              Completed
                            </Badge>
                          )}
                        </div>
                        
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
        })
      )}
    </div>
  );
};

export default ChatList;
