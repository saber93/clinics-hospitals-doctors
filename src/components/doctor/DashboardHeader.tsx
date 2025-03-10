
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, MessageSquare } from "lucide-react";

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">Doctor Dashboard</h2>
        <p className="text-muted-foreground">Manage your patients, appointments, and consultations</p>
      </div>
      <div className="mt-4 md:mt-0 space-x-2">
        <Button variant="outline" onClick={() => navigate("/chat-settings")}>
          <Settings className="h-4 w-4 mr-2" /> Consultation Settings
        </Button>
        <Button onClick={() => navigate("/chats")}>
          <MessageSquare className="h-4 w-4 mr-2" /> Chat Sessions
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
