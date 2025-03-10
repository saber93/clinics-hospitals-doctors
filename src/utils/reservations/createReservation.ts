
import { supabase } from '@/integrations/supabase/client';
import { Reservation } from '@/types/reservations';

// Create a new reservation
export const createReservation = async (
  clientId: string,
  vendorId: string,
  serviceId: string,
  date: string,
  time: string
): Promise<Reservation | null> => {
  try {
    console.log('Creating reservation with data:', {
      clientId,
      vendorId,
      serviceId,
      date,
      time
    });
    
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        client_id: clientId,
        vendor_id: vendorId,
        service_id: serviceId,
        date: date,
        time: time,
        status: 'pending' as const // Use const assertion to specify the exact string literal type
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating reservation:', error);
      throw new Error(`Failed to create reservation: ${error.message}`);
    }
    
    console.log('Reservation created successfully:', data);
    
    // Cast to the proper Reservation type
    const typedReservation: Reservation = {
      id: data.id,
      client_id: data.client_id,
      vendor_id: data.vendor_id,
      service_id: data.service_id,
      date: data.date,
      time: data.time,
      status: data.status as 'pending' | 'confirmed' | 'cancelled' | 'completed',
      created_at: data.created_at,
      updated_at: data.updated_at
    };
    
    return typedReservation;
  } catch (error) {
    console.error('Error in createReservation:', error);
    return null;
  }
};
