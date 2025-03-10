
import { supabase } from "@/integrations/supabase/client";
import { getMessageContent } from "./conversationTemplates";

/**
 * Create chat messages for a session
 */
export const createChatMessages = async (sessionId: string, messages: any[]) => {
  console.log("Creating chat messages...");
  
  const { error: messagesError } = await supabase
    .from('chat_messages')
    .insert(messages);
    
  if (messagesError) {
    console.error("Error creating chat messages:", messagesError);
    throw new Error(messagesError.message || 'Unknown error creating chat messages');
  }
  
  console.log("Chat messages created successfully");
};

/**
 * Generate messages for a chat session with realistic timestamps
 */
export const generateChatMessages = (
  sessionId: string, 
  doctorId: string, 
  clientId: string, 
  conversationType: string, 
  sessionStartTime: number, 
  sessionEndTime: number, 
  count: number = 5
) => {
  const messages = [];
  const timeInterval = (sessionEndTime - sessionStartTime) / (count * 2);
  
  // Create alternating messages between doctor and client
  for (let i = 0; i < count; i++) {
    // Doctor message
    messages.push({
      session_id: sessionId,
      sender_id: doctorId,
      message: getMessageContent(conversationType, i, true),
      is_read: i < count - 1, // Last message might be unread
      created_at: new Date(sessionStartTime + timeInterval * (i * 2)).toISOString()
    });
    
    // Client message (if not the last iteration)
    if (i < count - 1) {
      messages.push({
        session_id: sessionId,
        sender_id: clientId,
        message: getMessageContent(conversationType, i, false),
        is_read: true,
        created_at: new Date(sessionStartTime + timeInterval * (i * 2 + 1)).toISOString()
      });
    }
  }
  
  return messages;
};
