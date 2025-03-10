
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loadDoctorStats, loadDoctorServices, loadRecentPayments } from "../utils/doctorDataUtils";
import { getDoctorChatSettings } from "@/services/chat/settingsService";

export const useDoctorDashboard = () => {
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
        
        // Load stats, services, and payments in parallel
        try {
          const [statsData, servicesData, paymentsData] = await Promise.all([
            loadDoctorStats(session.user.id),
            loadDoctorServices(session.user.id),
            loadRecentPayments(session.user.id)
          ]);
          
          setStats(statsData);
          setServices(servicesData);
          setRecentPayments(paymentsData);
          
          console.log("Stats updated:", statsData);
        } catch (error) {
          console.error("Error loading dashboard data:", error);
          toast.error("Some dashboard data could not be loaded");
        }
        
      } catch (error) {
        console.error("Error loading doctor dashboard:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    checkUserAndLoadData();
  }, [navigate]);

  return { 
    loading, 
    stats, 
    chatSettings, 
    user, 
    doctorProfile, 
    services, 
    recentPayments 
  };
};
