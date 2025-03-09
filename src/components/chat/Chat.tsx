
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { AlertCircle, ChevronLeft, DollarSign, Clock } from 'lucide-react';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import PaymentDialog from './PaymentDialog';
import { 
  fetchChatMessages, 
  sendChatMessage, 
  subscribeToMessages, 
  markMessagesAsRead,
  getChatSettings,
  getDoctorChatSettings,
  updatePaymentStatus
} from '@/services/chatService';
import { ChatMessage, ChatSession, ChatSettings, DoctorChatSettings } from '@/types/chat';

const Chat: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [chatSettings, setChatSettings] = useState<ChatSettings | null>(null);
  const [doctorSettings, setDoctorSettings] = useState<DoctorChatSettings | null>(null);
  const [patientName, setPatientName] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState<string | null>(null);

  // Check if chat is blocked (requires payment)
  const isChatBlocked = chatSession && !chatSession.is_free && 
    !messages.some(msg => msg.sender_id === chatSession.doctor_id);

  // Load user session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        if (!data.session) {
          toast.error('Please log in to access the chat');
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        toast.error('Authentication error');
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, [navigate]);

  // Load chat session
  useEffect(() => {
    const loadChatSession = async () => {
      if (!sessionId || !session?.user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('chat_sessions')
          .select(`
            *,
            patient:profiles!chat_sessions_patient_id_fkey(name),
            doctor:profiles!chat_sessions_doctor_id_fkey(name)
          `)
          .eq('id', sessionId)
          .single();

        if (error) throw error;
        
        if (!data) {
          toast.error('Chat session not found');
          navigate('/chats');
          return;
        }

        // Check if user is part of this chat
        if (data.patient_id !== session.user.id && data.doctor_id !== session.user.id) {
          toast.error('You do not have access to this chat');
          navigate('/chats');
          return;
        }

        setChatSession(data);
        setPatientName(data.patient?.name || 'Patient');
        setDoctorName(data.doctor?.name || 'Doctor');

        // Get chat settings
        const settings = await getChatSettings();
        setChatSettings(settings);

        // Get doctor settings
        const doctorSettings = await getDoctorChatSettings(data.doctor_id);
        setDoctorSettings(doctorSettings);

        // Load messages
        const messages = await fetchChatMessages(sessionId);
        setMessages(messages);

        // Mark messages as read
        await markMessagesAsRead(sessionId, session.user.id);
      } catch (error) {
        console.error('Error loading chat session:', error);
        toast.error('Failed to load chat session');
      }
    };

    if (sessionId && session) {
      loadChatSession();
    }
  }, [sessionId, session, navigate]);

  // Subscribe to new messages
  useEffect(() => {
    if (!sessionId || !session?.user?.id) return;
    
    const unsubscribe = subscribeToMessages(sessionId, (newMessage) => {
      setMessages((prevMessages) => {
        // Check if the message is already in the list
        if (prevMessages.some(msg => msg.id === newMessage.id)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
      
      // Mark as read if not from current user
      if (newMessage.sender_id !== session.user.id) {
        markMessagesAsRead(sessionId, session.user.id);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [sessionId, session]);

  // Handle sending message
  const handleSendMessage = async (message: string) => {
    if (!sessionId || !session?.user?.id || !chatSession) return;
    
    // If chat is blocked (not free and no doctor message yet), show payment dialog
    if (isChatBlocked) {
      setIsPaymentDialogOpen(true);
      return;
    }
    
    try {
      const newMessage = await sendChatMessage(sessionId, session.user.id, message);
      if (newMessage) {
        // No need to update messages state, the subscription will handle it
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  // Handle payment completion
  const handlePaymentComplete = async (success: boolean, transactionId?: string) => {
    if (!success || !chatSession) return;
    
    try {
      // In a real app, this would interact with the payment provider's webhook
      // For now, we'll just update the chat session as if payment was successful
      await supabase
        .from('chat_payments')
        .insert({
          session_id: chatSession.id,
          patient_id: chatSession.patient_id,
          doctor_id: chatSession.doctor_id,
          amount: doctorSettings?.session_price || chatSettings?.default_session_price || 50,
          commission_percentage: chatSettings?.default_commission_percentage || 10,
          commission_amount: ((doctorSettings?.session_price || chatSettings?.default_session_price || 50) * 
            (chatSettings?.default_commission_percentage || 10)) / 100,
          doctor_amount: ((doctorSettings?.session_price || chatSettings?.default_session_price || 50) - 
            ((doctorSettings?.session_price || chatSettings?.default_session_price || 50) * 
            (chatSettings?.default_commission_percentage || 10)) / 100),
          payment_method: 'credit_card',
          payment_status: 'completed',
          transaction_id: transactionId,
          payment_provider: 'credit_card'
        });
      
      toast.success('Payment successful! You can now continue the chat.');
      
      // Refresh the chat session
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', chatSession.id)
        .single();
        
      if (data) {
        setChatSession(data);
      }
    } catch (error) {
      console.error('Error handling payment completion:', error);
      toast.error('Failed to process payment completion');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <Button 
          variant="ghost" 
          className="w-fit flex items-center" 
          onClick={() => navigate('/chats')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to All Chats
        </Button>
        
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                Chat with {session?.user?.id === chatSession?.patient_id ? doctorName : patientName}
              </CardTitle>
              <CardDescription>
                {new Date(chatSession?.started_at || '').toLocaleDateString()}
              </CardDescription>
            </div>
            
            <div className="flex items-center space-x-2">
              {chatSession?.is_free && (
                <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                  Free Consultation
                </Badge>
              )}
              
              {chatSession?.status === 'active' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
                  Active
                </Badge>
              )}
              
              {chatSession?.status === 'expired' && (
                <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                  Expired
                </Badge>
              )}
              
              {chatSession?.status === 'completed' && (
                <Badge variant="outline" className="bg-gray-50 text-gray-600 hover:bg-gray-50">
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="p-0 flex flex-col h-[400px]">
            {isChatBlocked ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="rounded-full bg-amber-100 p-3 mb-4">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Payment Required</h3>
                <p className="text-sm text-gray-500 mb-4 max-w-md">
                  To continue this chat, a payment of ${doctorSettings?.session_price || chatSettings?.default_session_price || 50} is required.
                  This helps ensure quality consultations.
                </p>
                <Button onClick={() => setIsPaymentDialogOpen(true)}>
                  Pay to Continue
                </Button>
              </div>
            ) : chatSession?.status === 'expired' ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="rounded-full bg-amber-100 p-3 mb-4">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Chat Session Expired</h3>
                <p className="text-sm text-gray-500 mb-4 max-w-md">
                  This chat session has expired. You can start a new session if needed.
                </p>
                <Button onClick={() => navigate('/chats')}>
                  Go to All Chats
                </Button>
              </div>
            ) : (
              <ChatMessageList 
                messages={messages} 
                currentUserId={session?.user?.id || ''} 
                patientId={chatSession?.patient_id || ''}
                doctorId={chatSession?.doctor_id || ''}
              />
            )}
          </CardContent>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isDisabled={chatSession?.status !== 'active' || isChatBlocked} 
            disabledReason={
              isChatBlocked ? 'Payment required to continue' :
              chatSession?.status === 'expired' ? 'Chat session has expired' :
              chatSession?.status === 'completed' ? 'Chat session is completed' :
              'Chat is not available'
            } 
          />
        </Card>
      </div>
      
      {/* Payment Dialog */}
      <PaymentDialog 
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        onPaymentComplete={handlePaymentComplete}
        chatSettings={chatSettings}
        doctorSettings={doctorSettings}
        sessionId={chatSession?.id || ''}
        patientId={chatSession?.patient_id || ''}
        doctorId={chatSession?.doctor_id || ''}
      />
    </div>
  );
};

export default Chat;
