
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations, getAvailableServices } from "@/utils/reservations";

export const useReservations = (clinicId?: string, clinicName?: string) => {
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if we have a session
        const { data: { session } } = await supabase.auth.getSession();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!session || !user) {
          console.log("No session or user found, redirecting to login");
          toast.error("Please login to book appointments");
          navigate("/login");
          return;
        }
        
        setUserId(user.id);
        console.log('User logged in:', user.id);
        
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          console.log('User role:', profile.role);
          setUserRole(profile.role);
        }
        
        // Get available services
        console.log('Fetching services...');
        const servicesData = await getAvailableServices();
        console.log('Services fetched:', servicesData.length);
        
        // Filter by clinic if needed
        const filteredServices = clinicId 
          ? servicesData.filter(service => service.vendor_id === clinicId)
          : servicesData;
          
        setServices(filteredServices);
        
        if (clinicId && filteredServices.length > 0) {
          toast.success(`Booking appointment at ${clinicName}`);
        }
        
        // Get user reservations
        if (user.id && profile?.role) {
          console.log('Fetching reservations...');
          const reservationsData = await getUserReservations(user.id, profile.role);
          console.log('Reservations fetched:', reservationsData.length);
          setReservations(reservationsData);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load services data");
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [clinicId, clinicName, navigate]);

  const refreshReservations = async () => {
    if (userId && userRole) {
      try {
        const reservationsData = await getUserReservations(userId, userRole);
        setReservations(reservationsData);
      } catch (error) {
        console.error("Error refreshing reservations:", error);
      }
    }
  };

  return {
    services,
    loading,
    error,
    userRole,
    userId,
    reservations,
    refreshReservations
  };
};
