
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatSession } from "@/types/chat";
import { handleSessionError } from "./utils/sessionHelpers";

// Create a new chat session
export const createChatSession = async (patientId: string, doctorId: string, isFree: boolean = false) => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        is_free: isFree,
        status: 'active',
        started_at: new Date().toISOString(),
        last_activity: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data as ChatSession;
  } catch (error) {
    return handleSessionError(error, 'Failed to create chat session');
  }
};

// Update session last activity timestamp
export const updateSessionActivity = async (sessionId: string) => {
  try {
    const { error } = await supabase
      .from('chat_sessions')
      .update({
        last_activity: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating session activity:', error);
    return false;
  }
};

// Mark all messages in a session as read for a user
export const markAllMessagesAsRead = async (sessionId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .update({
        is_read: true
      })
      .eq('session_id', sessionId)
      .neq('sender_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return false;
  }
};
