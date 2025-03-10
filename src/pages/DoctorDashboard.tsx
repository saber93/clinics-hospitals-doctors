
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MessageSquare, Clock, Settings, PieChart, DollarSign, Stethoscope, BookOpen } from "lucide-react";
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
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

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
        setDoctorProfile(profile);
        
        // Load doctor's chat settings
        const settings = await getDoctorChatSettings(session.user.id);
        setChatSettings(settings);
        
        // Load stats
        await loadDoctorStats(session.user.id);
        
        // Load doctor's services
        await loadDoctorServices(session.user.id);
        
        // Load recent payments
        await loadRecentPayments(session.user.id);
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
  
  const loadDoctorServices = async (doctorId) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('vendor_id', doctorId)
        .order('name');
        
      if (error) throw error;
      
      setServices(data || []);
    } catch (error) {
      console.error("Error loading doctor services:", error);
    }
  };
  
  const loadRecentPayments = async (doctorId) => {
    try {
      const { data, error } = await supabase
        .from('chat_payments')
        .select(`
          id,
          amount,
          doctor_amount,
          payment_status,
          created_at,
          patient_id
        `)
        .eq('doctor_id', doctorId)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      
      // Get patient profiles in a separate query
      if (data && data.length > 0) {
        const patientIds = data.map(payment => payment.patient_id);
        
        const { data: patients, error: patientsError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', patientIds);
          
        if (patientsError) throw patientsError;
        
        // Create a lookup map for patients
        const patientsMap = (patients || []).reduce((acc, patient) => {
          acc[patient.id] = patient.name;
          return acc;
        }, {});
        
        // Add patient names to payments
        const paymentsWithPatients = data.map(payment => ({
          ...payment,
          patientName: patientsMap[payment.patient_id] || 'Unknown Patient'
        }));
        
        setRecentPayments(paymentsWithPatients);
      } else {
        setRecentPayments([]);
      }
    } catch (error) {
      console.error("Error loading recent payments:", error);
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
          <TabsTrigger value="services">My Services</TabsTrigger>
          <TabsTrigger value="payments">Recent Payments</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
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
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>My Services</CardTitle>
              <CardDescription>
                Services you offer to your patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {services.length > 0 ? (
                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description || 'No description provided'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-lg">${service.price}</span>
                          <span className="text-sm text-muted-foreground">{service.duration} min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No services found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You haven't created any services yet.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate('/reservations')}
              >
                Manage Services
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                Latest payments received for your consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentPayments.length > 0 ? (
                <div className="space-y-4">
                  {recentPayments.map(payment => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{payment.patientName}</p>
                            <Badge className="ml-2" variant={payment.payment_status === 'completed' ? 'default' : 'outline'}>
                              {payment.payment_status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(payment.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-lg text-green-600">${payment.doctor_amount}</span>
                          <span className="text-xs text-muted-foreground">Total: ${payment.amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No payments yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You haven't received any payments yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
