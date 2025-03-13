
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getChatSessionById, updateSessionActivity, markAllMessagesAsRead } from '@/services/chat/sessionService';
import { ChatSession } from '@/types/chat';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import ChatFooter from './ChatFooter';
import PaymentDialog from './PaymentDialog';

// Fix the Params interface to satisfy constraints
interface RouteParams {
  chatId: string;
}

const Chat: React.FC = () => {
  const { chatId } = useParams<keyof RouteParams>() as RouteParams;
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

  const handleMessageSent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      
      <ChatHeader 
        otherPartyName={otherPartyName}
        lastActivity={session.last_activity}
        isFree={session.is_free}
        onPaymentDialogOpen={handlePaymentDialogOpen}
      />
      
      <ChatContainer 
        userId={user?.id}
        patientId={session.patient_id}
        doctorId={session.doctor_id}
        sessionId={chatId}
      />
      
      <ChatFooter 
        sessionId={chatId}
        senderId={user?.id}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
};

export default Chat;
