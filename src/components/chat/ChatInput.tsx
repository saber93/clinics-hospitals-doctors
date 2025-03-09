
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, PaperclipIcon } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isDisabled?: boolean;
  disabledReason?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isDisabled = false,
  disabledReason = 'Chat is disabled'
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isDisabled || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(message);
      setMessage('');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 items-end">
      {isDisabled ? (
        <div className="w-full bg-gray-100 rounded-lg p-3 text-sm text-gray-500">
          {disabledReason}
        </div>
      ) : (
        <>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none focus-visible:ring-1"
            rows={1}
            maxRows={5}
            disabled={isDisabled || isSending}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!message.trim() || isDisabled || isSending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </>
      )}
    </form>
  );
};

export default ChatInput;
