
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import PaymentDialog from './PaymentDialog';
import { supabase } from '@/integrations/supabase/client';
import { getChatSessionById, updateSessionActivity, markAllMessagesAsRead } from '@/services/chat/sessionService';
import { ChatSession } from '@/types/chat';

// Fix the Params interface to satisfy constraints
interface RouteParams {
  chatId: string;
}

const Chat: React.FC = () => {
  const { chatId } = useParams<keyof RouteParams>() as RouteParams;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    
    checkSession();
  }, []);

  useEffect(() => {
    const loadChatSession = async () => {
      if (!chatId) {
        toast({
          title: "Error",
          description: "Chat ID is missing.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      try {
        const chatSession = await getChatSessionById(chatId);
        if (chatSession) {
          setSession(chatSession);
        } else {
          toast({
            title: "Error",
            description: "Chat session not found.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading chat session:", error);
        toast({
          title: "Error",
          description: "Failed to load chat session.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadChatSession();
  }, [chatId, toast]);

  useEffect(() => {
    if (user && session) {
      setIsDoctor(user.id === session.doctor_id);
    }
  }, [user, session]);

  useEffect(() => {
    const updateLastActivity = async () => {
      if (chatId) {
        try {
          await updateSessionActivity(chatId);
        } catch (error) {
          console.error("Error updating last activity:", error);
        }
      }
    };

    updateLastActivity();

    const intervalId = setInterval(updateLastActivity, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [chatId]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (chatId && user) {
        try {
          await markAllMessagesAsRead(chatId, user.id);
        } catch (error) {
          console.error("Error marking messages as read:", error);
        }
      }
    };

    markMessagesAsRead();
  }, [chatId, user]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (!session) {
    return <div className="flex justify-center items-center h-full">Chat session not found.</div>;
  }

  const otherPartyName = isDoctor
    ? (session.patient?.name || 'Patient')
    : (session.doctor?.name || 'Doctor');

  const handlePaymentDialogOpen = () => {
    setPaymentDialogOpen(true);
  };

  const handlePaymentDialogClose = () => {
    setPaymentDialogOpen(false);
  };

  const handlePaymentComplete = (success: boolean, transactionId?: string) => {
    if (success) {
      toast({
        title: "Success",
        description: "Payment completed successfully."
      });
      // Additional logic after successful payment if needed
    }
  };

  return (
    <div className="container h-screen flex flex-col">
      {paymentDialogOpen && (
        <PaymentDialog
          isOpen={paymentDialogOpen}
          onClose={handlePaymentDialogClose}
          onPaymentComplete={handlePaymentComplete}
          chatSettings={null}
          doctorSettings={null}
          sessionId={chatId}
          patientId={session.patient_id}
          doctorId={session.doctor_id}
        />
      )}
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
                Last active: {new Date(session.last_activity).toLocaleTimeString()}
              </div>
            </div>
            {!session.is_free && (
              <Badge variant="secondary" className="ml-2 cursor-pointer" onClick={handlePaymentDialogOpen}>
                <Clock className="mr-1 h-3 w-3" /> Pay
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col h-full py-4 px-6 justify-end" ref={scrollRef}>
            <ChatMessageList 
              currentUserId={user?.id}
              patientId={session.patient_id}
              doctorId={session.doctor_id}
              sessionId={chatId}
            />
          </div>
        </ScrollArea>
      </div>
      <div className="border-t py-2 px-4 bg-white">
        <ChatInput 
          sessionId={chatId} 
          senderId={user?.id} 
          onMessageSent={() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
