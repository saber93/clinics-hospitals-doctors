
import { supabase } from "@/integrations/supabase/client";
import type { Reservation } from "@/types/reservations";

export const createReservation = async (
  clientId: string,
  vendorId: string,
  serviceId: string,
  date: string,
  time: string
): Promise<Reservation | null> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        client_id: clientId,
        vendor_id: vendorId,
        service_id: serviceId,
        date,
        time,
        status: 'pending'
      })
      .select();
    
    if (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error("Error in createReservation:", error);
    throw error;
  }
};
