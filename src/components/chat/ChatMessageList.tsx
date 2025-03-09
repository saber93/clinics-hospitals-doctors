
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
  patientId: string;
  doctorId: string;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ 
  messages, 
  currentUserId,
  patientId,
  doctorId
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get initials for avatar fallback
  const getInitials = (isDoctor: boolean) => {
    return isDoctor ? 'DR' : 'PT';
  };

  return (
    <div className="flex flex-col space-y-4 p-4 h-full overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <p className="text-sm">No messages yet</p>
          <p className="text-xs">Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => {
          const isCurrentUser = message.sender_id === currentUserId;
          const isDoctor = message.sender_id === doctorId;

          return (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-2 max-w-[80%]",
                isCurrentUser ? "self-end" : "self-start"
              )}
            >
              {!isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="User Avatar" />
                  <AvatarFallback className={isDoctor ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                    {getInitials(isDoctor)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.message}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {formatMessageTime(message.created_at)}
                </span>
              </div>
              {isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="User Avatar" />
                  <AvatarFallback className={isDoctor ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                    {getInitials(isDoctor)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
