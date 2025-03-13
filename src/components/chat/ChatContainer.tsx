
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessageList from './ChatMessageList';

interface ChatContainerProps {
  userId: string;
  patientId: string;
  doctorId: string;
  sessionId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  userId,
  patientId,
  doctorId,
  sessionId,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-grow overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex flex-col h-full py-4 px-6 justify-end" ref={scrollRef}>
          <ChatMessageList 
            currentUserId={userId}
            patientId={patientId}
            doctorId={doctorId}
            sessionId={sessionId}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatContainer;
