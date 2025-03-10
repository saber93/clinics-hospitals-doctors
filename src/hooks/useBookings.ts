
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getUserReservations } from '@/utils/reservations';
import { toast } from 'sonner';
import { generateDemoBookings } from '@/utils/bookings/demoBookings';
import { updateBookingStatus } from '@/utils/bookings/statusUpdater';
import { 
  filterBookingsByStatus, 
  getStatusCount as getStatusCountUtil,
  formatBookingDate 
} from '@/utils/bookings/filterUtils';
import { Booking } from './types/bookingTypes';

// Re-export for backward compatibility
export type { Booking } from './types/bookingTypes';

export const useBookings = () => {
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Handle status updates
  const handleUpdateStatus = async (reservationId: string, newStatus: string) => {
    return updateBookingStatus(reservationId, newStatus, reservations, setReservations);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        console.log("Fetching user data and reservations...");
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to access bookings");
          setLoading(false);
          return;
        }
        
        const currentUserId = session.user.id;
        setUserId(currentUserId);
        console.log("Current user ID:", currentUserId);
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUserId)
          .single();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Error loading user profile");
          setLoading(false);
          return;
        }
        
        const role = profile?.role || 'client';
        setUserRole(role);
        console.log("User role:", role);
        
        const reservationsData = await getUserReservations(currentUserId, role);
        console.log("Fetched reservations data:", reservationsData);
        
        if (reservationsData && Array.isArray(reservationsData) && reservationsData.length > 0) {
          setReservations(reservationsData);
        } else {
          console.log("No real reservations found, using demo data");
          // Use demo data if no real reservations
          setReservations(generateDemoBookings());
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load booking data");
        // Use demo data on error
        setReservations(generateDemoBookings());
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const filteredReservations = filterBookingsByStatus(reservations, activeFilter);
  
  const getStatusCount = (status: string) => {
    return getStatusCountUtil(reservations, status);
  };

  const formatDate = (dateString: string) => {
    return formatBookingDate(dateString);
  };

  return {
    reservations,
    filteredReservations,
    loading,
    userRole,
    userId,
    activeFilter,
    setActiveFilter,
    getStatusCount,
    handleUpdateStatus,
    formatDate
  };
};
