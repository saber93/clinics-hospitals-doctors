
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

interface DoctorProfileProps {
  doctorProfile: any;
  chatSettings: any;
  stats: {
    totalPatients: number;
    pendingAppointments: number;
    completedAppointments: number;
    chatSessions: number;
  };
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctorProfile, chatSettings, stats }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Profile</CardTitle>
        <CardDescription>
          Your professional information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
            <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center">
              <Stethoscope className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{doctorProfile?.name}</h3>
              <p className="text-sm text-muted-foreground">Joined on {new Date(doctorProfile?.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-3">Consultation Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">First consultation:</span>
                  <span className="font-medium">
                    {chatSettings?.offers_free_consultation ? 'Free' : `$${chatSettings?.session_price || 'Not set'}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Follow-up sessions:</span>
                  <span className="font-medium">${chatSettings?.session_price || 'Default pricing'}</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-3">Activity Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total patients:</span>
                  <span className="font-medium">{stats.totalPatients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed appointments:</span>
                  <span className="font-medium">{stats.completedAppointments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active chats:</span>
                  <span className="font-medium">{stats.chatSessions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/chat-settings')}
        >
          Edit Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorProfile;
