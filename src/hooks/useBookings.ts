
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getUserReservations } from '@/utils/reservations';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Types
export type Booking = {
  id: string;
  services: { name: string; price?: number };
  vendors: { name: string };
  date: string;
  time: string;
  status: string;
};

export const useBookings = () => {
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Generate demo bookings function (same as in ClientDashboard)
  const generateDemoBookings = () => {
    return [
      {
        id: '1',
        services: { name: 'Facial Treatment', price: 89.99 },
        vendors: { name: 'Beauty Spa Center' },
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
        time: '10:00 AM',
        status: 'confirmed'
      },
      {
        id: '2',
        services: { name: 'Deep Tissue Massage', price: 129.99 },
        vendors: { name: 'Wellness Retreat' },
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
        time: '2:30 PM',
        status: 'pending'
      },
      {
        id: '3',
        services: { name: 'Hot Stone Therapy', price: 149.99 },
        vendors: { name: 'Serenity Spa' },
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        time: '11:15 AM',
        status: 'confirmed'
      },
      {
        id: '4',
        services: { name: 'Hair Styling', price: 75.00 },
        vendors: { name: 'Glamour Salon' },
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
        time: '3:00 PM',
        status: 'completed'
      },
      {
        id: '5',
        services: { name: 'Manicure & Pedicure', price: 65.00 },
        vendors: { name: 'Nail Studio' },
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
        time: '1:15 PM',
        status: 'completed'
      }
    ];
  };

  const handleUpdateStatus = async (reservationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', reservationId);
      
      if (error) throw error;
      
      setReservations(reservations.map(res => 
        res.id === reservationId ? { ...res, status: newStatus } : res
      ));
      
      toast.success(`Booking ${newStatus} successfully`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
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

  const filteredReservations = reservations.filter(reservation => {
    if (activeFilter === 'all') return true;
    return reservation.status === activeFilter;
  });

  const getStatusCount = (status: string) => {
    return reservations.filter(res => res.status === status).length;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString;
    }
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
