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

  const loadDashboardData = async (userId: string) => {
    try {
      const [statsData, chatSettingsData, servicesData, paymentsData] = await Promise.all([
        loadDoctorStats(userId),
        getDoctorChatSettings(userId),
        loadDoctorServices(userId),
        loadRecentPayments(userId)
      ]);
      
      setStats(statsData);
      setChatSettings(chatSettingsData);
      setServices(servicesData);
      setRecentPayments(paymentsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Some dashboard data could not be loaded");
    }
  };

  const refetchDashboardData = async () => {
    if (user?.id) {
      setLoading(true);
      await loadDashboardData(user.id);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUserAndLoadData = async () => {
      try {
        setLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found");
          toast.error("Please login to access your dashboard");
          navigate("/auth");
          return;
        }
        
        console.log("Session found:", session.user.id);
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileError || !profile) {
          console.error("Error fetching profile:", profileError);
          toast.error("Failed to load profile data");
          return;
        }
        
        if (profile?.role !== 'vendor' && profile?.role !== 'doctor') {
          console.log("User role is not vendor/doctor:", profile?.role);
          toast.error("This dashboard is only for doctors");
          navigate("/dashboard");
          return;
        }
        
        setUser(session.user);
        setDoctorProfile(profile);
        
        await loadDashboardData(session.user.id);
        
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
    recentPayments,
    refetchDashboardData 
  };
};
