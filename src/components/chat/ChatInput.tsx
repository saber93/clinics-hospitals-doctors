
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ChatInputProps {
  sessionId: string;
  senderId: string;
  onMessageSent?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  sessionId, 
  senderId,
  onMessageSent 
}) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    if (!senderId) {
      toast.error('You must be logged in to send messages');
      return;
    }
    
    setSending(true);
    
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          sender_id: senderId,
          message: message.trim(),
          is_read: false
        });
        
      if (error) throw error;
      
      // Update session's last activity
      await supabase
        .from('chat_sessions')
        .update({ last_activity: new Date().toISOString() })
        .eq('id', sessionId);
      
      setMessage('');
      if (onMessageSent) onMessageSent();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-end gap-2">
      <Textarea
        className="resize-none min-h-[80px]"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={sending || !senderId}
      />
      <Button type="submit" size="icon" disabled={sending || !message.trim() || !senderId}>
        {sending ? (
          <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
