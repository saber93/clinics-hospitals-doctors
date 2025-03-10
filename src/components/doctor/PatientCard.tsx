
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Calendar } from "lucide-react";
import { getInitials, formatDate } from "./utils/formatters";

export interface PatientCardProps {
  id: string;
  name: string;
  last_activity?: string;
  has_upcoming_appointment?: boolean;
  session_id?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({
  id,
  name,
  last_activity,
  has_upcoming_appointment,
  session_id
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">
            Last active: {formatDate(last_activity)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {has_upcoming_appointment && (
          <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            Upcoming Appointment
          </div>
        )}
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate(`/chats/${session_id}`)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate(`/reservations?patient=${id}`)}
        >
          <Calendar className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PatientCard;
