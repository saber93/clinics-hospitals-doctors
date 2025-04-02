
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EnrichedReservation } from "@/types/reservations";
import { getUserReservations } from "@/utils/reservations";
import { formatReadableDate } from "@/utils/dateUtils";

export const useAllBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<EnrichedReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error("Please login to view your bookings");
          navigate("/auth");
          return;
        }
        
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        const role = profile?.role || 'client';
        
        // Use the getUserReservations utility function
        const reservations = await getUserReservations(user.id, role);
        setBookings(reservations);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [navigate]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);
  
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', bookingId);
        
      if (error) {
        throw error;
      }
      
      // Update the local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus as any } 
            : booking
        )
      );
      
      toast.success(`Booking ${newStatus} successfully`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
  };

  return {
    bookings,
    filteredBookings,
    loading,
    activeTab,
    setActiveTab,
    handleStatusChange,
    getStatusColor,
    formatDate: formatReadableDate
  };
};
