
import React from 'react';
import ChatInput from './ChatInput';

interface ChatFooterProps {
  sessionId: string;
  senderId: string;
  onMessageSent: () => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({
  sessionId,
  senderId,
  onMessageSent
}) => {
  return (
    <div className="border-t py-2 px-4 bg-white">
      <ChatInput 
        sessionId={sessionId} 
        senderId={senderId} 
        onMessageSent={onMessageSent}
      />
    </div>
  );
};

export default ChatFooter;
