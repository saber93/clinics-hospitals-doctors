
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

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
