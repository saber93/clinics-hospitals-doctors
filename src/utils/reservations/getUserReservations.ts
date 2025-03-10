
import { supabase } from '@/integrations/supabase/client';
import { EnrichedReservation } from '@/types/reservations';

// Get reservations for a user with one query that includes service and vendor details
export const getUserReservations = async (
  userId: string,
  role: string
): Promise<EnrichedReservation[]> => {
  try {
    console.log(`Getting reservations for ${role} with ID: ${userId}`);
    
    const filterField = role === 'doctor' || role === 'vendor' ? 'vendor_id' : 'client_id';
    
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        clients:profiles!reservations_client_id_fkey(name),
        vendors:profiles!reservations_vendor_id_fkey(name),
        services(name, price)
      `)
      .eq(filterField, userId)
      .order('date', { ascending: true });
      
    if (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }

    // Convert to proper typed data
    const typedReservations: EnrichedReservation[] = data.map(item => ({
      id: item.id,
      client_id: item.client_id || '',
      vendor_id: item.vendor_id || '',
      service_id: item.service_id || '',
      date: item.date,
      time: item.time,
      status: (item.status as 'pending' | 'confirmed' | 'cancelled' | 'completed') || 'pending',
      created_at: item.created_at || '',
      updated_at: item.updated_at || '',
      clients: { 
        name: item.clients && typeof item.clients === 'object' ? (item.clients as any).name || 'Unknown Client' : 'Unknown Client' 
      },
      vendors: { 
        name: item.vendors && typeof item.vendors === 'object' ? (item.vendors as any).name || 'Unknown Vendor' : 'Unknown Vendor' 
      },
      services: { 
        name: item.services && typeof item.services === 'object' ? (item.services as any).name || 'Unknown Service' : 'Unknown Service',
        price: item.services && typeof item.services === 'object' ? (item.services as any).price : undefined
      }
    }));
    
    console.log(`Found ${typedReservations.length} reservations for user ${userId}`);
    return typedReservations;
  } catch (error) {
    console.error('Error in getUserReservations:', error);
    return [];
  }
};
