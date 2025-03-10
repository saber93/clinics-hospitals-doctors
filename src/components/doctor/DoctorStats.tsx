
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Check, MessageSquare } from "lucide-react";

interface DoctorStatsProps {
  stats: {
    totalPatients: number;
    pendingAppointments: number;
    completedAppointments: number;
    chatSessions: number;
  };
}

const DoctorStats: React.FC<DoctorStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
            <h3 className="text-2xl font-bold mt-1">{stats.totalPatients}</h3>
          </div>
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
            <h3 className="text-2xl font-bold mt-1">{stats.pendingAppointments}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <h3 className="text-2xl font-bold mt-1">{stats.completedAppointments}</h3>
          </div>
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-6 w-6 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Chat Sessions</p>
            <h3 className="text-2xl font-bold mt-1">{stats.chatSessions}</h3>
          </div>
          <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-violet-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorStats;
