
import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "./utils/appointmentUtils";
import type { Appointment } from "./hooks/useAppointments";

interface AppointmentListProps {
  appointments: Appointment[];
  loading: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No appointments for this date</p>
        <Button 
          variant="outline" 
          size="sm"
          className="mt-4"
          onClick={() => navigate('/reservations')}
        >
          Manage Schedule
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map(appointment => (
        <div 
          key={appointment.id} 
          className="p-4 border rounded-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-medium">{appointment.service.name}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5 mr-1" />
                {appointment.client.name}
              </div>
            </div>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {appointment.time}
          </div>
          <div className="flex justify-end mt-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/all-bookings?id=${appointment.id}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
