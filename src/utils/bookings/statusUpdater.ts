
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Booking } from '@/hooks/types/bookingTypes';

export const updateBookingStatus = async (
  reservationId: string, 
  newStatus: string,
  reservations: Booking[],
  setReservations: React.Dispatch<React.SetStateAction<Booking[]>>
) => {
  try {
    const { error } = await supabase
      .from('reservations')
      .update({ status: newStatus })
      .eq('id', reservationId);
    
    if (error) throw error;
    
    // Update local state
    setReservations(reservations.map(res => 
      res.id === reservationId ? { ...res, status: newStatus } : res
    ));
    
    toast.success(`Booking ${newStatus} successfully`);
    return true;
  } catch (error) {
    console.error("Error updating booking status:", error);
    toast.error("Failed to update booking status");
    return false;
  }
};
