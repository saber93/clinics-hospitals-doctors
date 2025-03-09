
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatSession, ChatMessage, ChatPayment, ChatSettings, DoctorChatSettings } from "@/types/chat";

// Fetch chat sessions for the current user
export const fetchUserChatSessions = async (userId: string, isDoctor: boolean = false) => {
  try {
    const field = isDoctor ? 'doctor_id' : 'patient_id';
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        profiles!chat_sessions_patient_id_fkey(name),
        doctor:profiles!chat_sessions_doctor_id_fkey(name)
      `)
      .eq(field, userId)
      .order('last_activity', { ascending: false });

    if (error) throw error;
    
    // Transform the data to match our ChatSession type
    const typedData = data.map(session => ({
      ...session,
      status: session.status as "active" | "expired" | "completed",
      patient: session.profiles,
      doctor: session.doctor
    })) as unknown as ChatSession[];
    
    return typedData;
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    toast.error('Failed to load chat sessions');
    return [];
  }
};

// Fetch messages for a specific chat session
export const fetchChatMessages = async (sessionId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as ChatMessage[];
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    toast.error('Failed to load chat messages');
    return [];
  }
};

// Send a new message
export const sendChatMessage = async (sessionId: string, senderId: string, message: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        sender_id: senderId,
        message
      })
      .select()
      .single();

    if (error) throw error;

    // Update the last_activity timestamp in the session
    await supabase
      .from('chat_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', sessionId);

    return data as ChatMessage;
  } catch (error) {
    console.error('Error sending message:', error);
    toast.error('Failed to send message');
    return null;
  }
};

// Create a new chat session
export const createChatSession = async (patientId: string, doctorId: string, isFree: boolean = false) => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        is_free: isFree,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data as ChatSession;
  } catch (error) {
    console.error('Error creating chat session:', error);
    toast.error('Failed to create chat session');
    return null;
  }
};

// Check if a free session exists between patient and doctor
export const checkFreeSessionExists = async (patientId: string, doctorId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctorId)
      .eq('is_free', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows returned
    return !!data;
  } catch (error) {
    console.error('Error checking free session:', error);
    return false;
  }
};

// Get chat settings
export const getChatSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('chat_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data as ChatSettings;
  } catch (error) {
    console.error('Error fetching chat settings:', error);
    toast.error('Failed to load chat settings');
    return null;
  }
};

// Get doctor chat settings
export const getDoctorChatSettings = async (doctorId: string) => {
  try {
    const { data, error } = await supabase
      .from('doctor_chat_settings')
      .select('*')
      .eq('doctor_id', doctorId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    if (!data) {
      // Create default settings if none exist
      const settings = await createDoctorChatSettings(doctorId);
      return settings;
    }
    
    return data as DoctorChatSettings;
  } catch (error) {
    console.error('Error fetching doctor chat settings:', error);
    toast.error('Failed to load doctor settings');
    return null;
  }
};

// Create default doctor chat settings
export const createDoctorChatSettings = async (doctorId: string) => {
  try {
    const chatSettings = await getChatSettings();
    const sessionPrice = chatSettings ? chatSettings.default_session_price : 50;
    
    const { data, error } = await supabase
      .from('doctor_chat_settings')
      .insert({
        doctor_id: doctorId,
        offers_free_consultation: false,
        session_price: sessionPrice
      })
      .select()
      .single();

    if (error) throw error;
    return data as DoctorChatSettings;
  } catch (error) {
    console.error('Error creating doctor chat settings:', error);
    return null;
  }
};

// Update doctor chat settings
export const updateDoctorChatSettings = async (
  doctorId: string, 
  offersFreeConsultation: boolean, 
  sessionPrice: number | null
) => {
  try {
    const { data, error } = await supabase
      .from('doctor_chat_settings')
      .update({
        offers_free_consultation: offersFreeConsultation,
        session_price: sessionPrice,
        updated_at: new Date().toISOString()
      })
      .eq('doctor_id', doctorId)
      .select()
      .single();

    if (error) throw error;
    toast.success('Settings updated successfully');
    return data as DoctorChatSettings;
  } catch (error) {
    console.error('Error updating doctor chat settings:', error);
    toast.error('Failed to update settings');
    return null;
  }
};

// Create a payment record
export const createChatPayment = async (
  sessionId: string,
  patientId: string,
  doctorId: string,
  amount: number,
  commissionPercentage: number,
  paymentMethod: string,
  paymentProvider: string
) => {
  try {
    const commissionAmount = (amount * commissionPercentage) / 100;
    const doctorAmount = amount - commissionAmount;
    
    const { data, error } = await supabase
      .from('chat_payments')
      .insert({
        session_id: sessionId,
        patient_id: patientId,
        doctor_id: doctorId,
        amount,
        commission_percentage: commissionPercentage,
        commission_amount: commissionAmount,
        doctor_amount: doctorAmount,
        payment_method: paymentMethod,
        payment_status: 'pending',
        payment_provider: paymentProvider
      })
      .select()
      .single();

    if (error) throw error;
    return data as ChatPayment;
  } catch (error) {
    console.error('Error creating payment record:', error);
    toast.error('Failed to create payment record');
    return null;
  }
};

// Update payment status
export const updatePaymentStatus = async (
  paymentId: string,
  status: 'pending' | 'completed' | 'failed',
  transactionId?: string
) => {
  try {
    const { data, error } = await supabase
      .from('chat_payments')
      .update({
        payment_status: status,
        transaction_id: transactionId
      })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data as ChatPayment;
  } catch (error) {
    console.error('Error updating payment status:', error);
    toast.error('Failed to update payment status');
    return null;
  }
};

// Get payment methods (Tabby, Tamara, etc.)
export const getPaymentMethods = async () => {
  // This would normally fetch from the database, but for now we'll return hardcoded values
  return [
    {
      id: 'tabby',
      name: 'Tabby',
      logo: '/tabby-logo.png',
      supports_installments: true
    },
    {
      id: 'tamara',
      name: 'Tamara',
      logo: '/tamara-logo.png',
      supports_installments: true
    },
    {
      id: 'credit_card',
      name: 'Credit Card',
      logo: '/credit-card.png',
      supports_installments: false
    }
  ];
};

// Set up realtime subscription for chat messages
export const subscribeToMessages = (sessionId: string, callback: (message: ChatMessage) => void) => {
  const channel = supabase
    .channel(`chat-messages-${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`
      },
      (payload) => {
        callback(payload.new as ChatMessage);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Mark messages as read
export const markMessagesAsRead = async (sessionId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('session_id', sessionId)
      .neq('sender_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};
