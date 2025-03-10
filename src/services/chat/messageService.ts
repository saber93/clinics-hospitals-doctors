
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatMessage } from "@/types/chat";

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
