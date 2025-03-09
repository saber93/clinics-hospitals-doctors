
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import ChatList from "@/components/chat/ChatList";

const ChatSessions = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Chat Sessions</h1>
            <p className="text-muted-foreground">
              Manage your patient consultations
            </p>
          </div>
        </div>

        <ChatList />
      </div>
    </div>
  );
};

export default ChatSessions;
