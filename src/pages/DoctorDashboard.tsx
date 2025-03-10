
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MessageSquare, Clock, Settings, PieChart } from "lucide-react";
import { getDoctorChatSettings } from "@/services/chat/settingsService";
import DoctorStats from "@/components/doctor/DoctorStats";
import PatientList from "@/components/doctor/PatientList";
import AppointmentCalendar from "@/components/doctor/AppointmentCalendar";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    chatSessions: 0
  });
  const [chatSettings, setChatSettings] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserAndLoadData = async () => {
      try {
        setLoading(true);
        
        // Check for authenticated user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to access your dashboard");
          navigate("/auth");
          return;
        }
        
        // Check if user is a doctor/vendor
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profile?.role !== 'vendor') {
          toast.error("This dashboard is only for doctors");
          navigate("/dashboard");
          return;
        }
        
        setUser(profile);
        
        // Load doctor's chat settings
        const settings = await getDoctorChatSettings(session.user.id);
        setChatSettings(settings);
        
        // Load stats
        await loadDoctorStats(session.user.id);
      } catch (error) {
        console.error("Error loading doctor dashboard:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    checkUserAndLoadData();
  }, [navigate]);
  
  const loadDoctorStats = async (doctorId) => {
    try {
      // Get total patients (unique patients from chat sessions)
      const { data: chatSessions, error: chatError } = await supabase
        .from('chat_sessions')
        .select('patient_id')
        .eq('doctor_id', doctorId);
        
      if (chatError) throw chatError;
      
      // Count unique patients
      const uniquePatients = new Set(chatSessions?.map(session => session.patient_id) || []);
      
      // Get appointment counts
      const { data: appointments, error: appointmentsError } = await supabase
        .from('reservations')
        .select('status')
        .eq('vendor_id', doctorId);
        
      if (appointmentsError) throw appointmentsError;
      
      const pendingAppointments = appointments?.filter(a => a.status === 'pending' || a.status === 'confirmed').length || 0;
      const completedAppointments = appointments?.filter(a => a.status === 'completed').length || 0;
      
      setStats({
        totalPatients: uniquePatients.size,
        pendingAppointments,
        completedAppointments,
        chatSessions: chatSessions?.length || 0
      });
    } catch (error) {
      console.error("Error loading doctor stats:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
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
      
      <DoctorStats stats={stats} />
      
      <Tabs defaultValue="patients" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patients">
          <PatientList doctorId={user?.id} />
        </TabsContent>
        
        <TabsContent value="appointments">
          <AppointmentCalendar doctorId={user?.id} />
        </TabsContent>
        
        <TabsContent value="consultations">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
