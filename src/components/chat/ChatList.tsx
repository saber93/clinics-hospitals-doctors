
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import { fetchUserChatSessions } from '@/services/chat'; // Updated import
import { supabase } from '@/integrations/supabase/client';
import ChatSessionCard from './ChatSessionCard';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import NotLoggedInState from './NotLoggedInState';

const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);
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

  if (loading) {
    return <LoadingState />;
  }

  if (!currentUser) {
    return <NotLoggedInState navigate={navigate} />;
  }

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <EmptyState />
      ) : (
        sessions.map((session) => (
          <ChatSessionCard 
            key={session.id}
            session={session}
            currentUserId={currentUser.id}
          />
        ))
      )}
    </div>
  );
};

export default ChatList;
