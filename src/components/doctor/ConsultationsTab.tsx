
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConsultationsTabProps {
  chatSettings: any;
  stats: {
    chatSessions: number;
  };
}

const ConsultationsTab: React.FC<ConsultationsTabProps> = ({ chatSettings, stats }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat Consultations</CardTitle>
        <CardDescription>
          Manage your online consultations and patient chats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Consultation Settings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Free first consultation:</span>
                  <span className="font-medium">
                    {chatSettings?.offers_free_consultation ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Session price:</span>
                  <span className="font-medium">
                    ${chatSettings?.session_price || 'Default pricing'}
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 w-full"
                onClick={() => navigate('/chat-settings')}
              >
                Edit Settings
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Active Conversations</h3>
              <p className="text-sm text-muted-foreground">
                You have {stats.chatSessions} total chat sessions with your patients.
              </p>
              <Button 
                variant="default" 
                size="sm" 
                className="mt-4 w-full"
                onClick={() => navigate('/chats')}
              >
                View All Chats
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/chats')}
        >
          Manage Consultations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConsultationsTab;
