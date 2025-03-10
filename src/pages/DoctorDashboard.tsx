
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorStats from "@/components/doctor/DoctorStats";
import PatientList from "@/components/doctor/PatientList";
import AppointmentCalendar from "@/components/doctor/AppointmentCalendar";
import DashboardHeader from "@/components/doctor/DashboardHeader";
import DoctorProfile from "@/components/doctor/DoctorProfile";
import ConsultationsTab from "@/components/doctor/ConsultationsTab";
import ServicesTab from "@/components/doctor/ServicesTab";
import PaymentsTab from "@/components/doctor/PaymentsTab";
import { getDoctorChatSettings } from "@/services/chat/settingsService";

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
        
        console.log("Session found:", session.user.id);
        
        // Check if user is a doctor/vendor
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Failed to load profile data");
          navigate("/dashboard");
          return;
        }
        
        if (!profile || (profile?.role !== 'vendor' && profile?.role !== 'doctor')) {
          console.log("User role is not vendor/doctor:", profile?.role);
          toast.error("This dashboard is only for doctors");
          navigate("/dashboard");
          return;
        }
        
        console.log("Doctor profile loaded:", profile);
        setUser(profile);
        setDoctorProfile(profile);
        
        // Load doctor's chat settings
        try {
          const settings = await getDoctorChatSettings(session.user.id);
          console.log("Doctor chat settings:", settings);
          setChatSettings(settings);
        } catch (settingsError) {
          console.error("Error loading chat settings:", settingsError);
        }
        
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
        
      if (chatError) {
        console.error("Error fetching chat sessions:", chatError);
        throw chatError;
      }
      
      console.log("Chat sessions loaded:", chatSessions?.length || 0);
      
      // Count unique patients
      const uniquePatients = new Set(chatSessions?.map(session => session.patient_id) || []);
      
      // Get appointment counts
      const { data: appointments, error: appointmentsError } = await supabase
        .from('reservations')
        .select('status')
        .eq('vendor_id', doctorId);
        
      if (appointmentsError) {
        console.error("Error fetching appointments:", appointmentsError);
        throw appointmentsError;
      }
      
      console.log("Appointments loaded:", appointments?.length || 0);
      
      const pendingAppointments = appointments?.filter(a => a.status === 'pending' || a.status === 'confirmed').length || 0;
      const completedAppointments = appointments?.filter(a => a.status === 'completed').length || 0;
      
      setStats({
        totalPatients: uniquePatients.size,
        pendingAppointments,
        completedAppointments,
        chatSessions: chatSessions?.length || 0
      });
      
      console.log("Stats updated:", {
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
        
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }
      
      console.log("Services loaded:", data?.length || 0);
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
        
      if (error) {
        console.error("Error fetching payments:", error);
        throw error;
      }
      
      console.log("Payments loaded:", data?.length || 0);
      
      // Get patient profiles in a separate query
      if (data && data.length > 0) {
        const patientIds = data.map(payment => payment.patient_id);
        
        const { data: patients, error: patientsError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', patientIds);
          
        if (patientsError) {
          console.error("Error fetching patient profiles:", patientsError);
          throw patientsError;
        }
        
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
      <DashboardHeader />
      
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
          <ConsultationsTab 
            chatSettings={chatSettings} 
            stats={stats} 
          />
        </TabsContent>
        
        <TabsContent value="services">
          <ServicesTab services={services} />
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentsTab recentPayments={recentPayments} />
        </TabsContent>
        
        <TabsContent value="profile">
          <DoctorProfile 
            doctorProfile={doctorProfile} 
            chatSettings={chatSettings} 
            stats={stats} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
