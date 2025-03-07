
import { supabase } from "@/integrations/supabase/client";

export type Reservation = {
  id: string;
  client_id: string;
  vendor_id: string;
  service_id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
};

export type Service = {
  id: string;
  vendor_id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
};

// Function to get reservations for a specific user
export const getUserReservations = async (userId: string, userRole: string) => {
  try {
    let query = supabase
      .from('reservations')
      .select(`
        *,
        services(name, duration, price)
      `);
    
    // Filter based on user role
    if (userRole === 'client') {
      query = query.eq('client_id', userId);
    } else if (userRole === 'vendor') {
      query = query.eq('vendor_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
    
    // Fetch related user data separately since we can't join directly
    if (data && data.length > 0) {
      // Get unique user IDs from reservations
      const clientIds = [...new Set(data.map(r => r.client_id).filter(Boolean))];
      const vendorIds = [...new Set(data.map(r => r.vendor_id).filter(Boolean))];
      
      // Fetch client profiles
      let clientProfiles: Record<string, any> = {};
      if (clientIds.length > 0) {
        const { data: clientData } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', clientIds);
          
        if (clientData) {
          clientProfiles = clientData.reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {} as Record<string, any>);
        }
      }
      
      // Fetch vendor profiles
      let vendorProfiles: Record<string, any> = {};
      if (vendorIds.length > 0) {
        const { data: vendorData } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', vendorIds);
          
        if (vendorData) {
          vendorProfiles = vendorData.reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {} as Record<string, any>);
        }
      }
      
      // Attach profile data to reservations
      return data.map(reservation => ({
        ...reservation,
        clients: clientProfiles[reservation.client_id] || { name: 'Unknown Client' },
        vendors: vendorProfiles[reservation.vendor_id] || { name: 'Unknown Provider' }
      }));
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in getUserReservations:", error);
    return [];
  }
};

// Function to get available services
export const getAvailableServices = async () => {
  try {
    const { data: servicesData, error } = await supabase
      .from('services')
      .select('*');
    
    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }
    
    // Fetch vendor information for each service
    if (servicesData && servicesData.length > 0) {
      const vendorIds = [...new Set(servicesData.map(s => s.vendor_id).filter(Boolean))];
      
      if (vendorIds.length > 0) {
        const { data: vendorData } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', vendorIds);
          
        if (vendorData) {
          const vendorProfiles = vendorData.reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {} as Record<string, any>);
          
          return servicesData.map(service => ({
            ...service,
            vendors: vendorProfiles[service.vendor_id] || { name: 'Unknown Provider' }
          }));
        }
      }
    }
    
    return servicesData || [];
  } catch (error) {
    console.error("Error in getAvailableServices:", error);
    return [];
  }
};

// Function to create a new reservation
export const createReservation = async (
  clientId: string,
  vendorId: string,
  serviceId: string,
  date: string,
  time: string
) => {
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
    
    return data?.[0];
  } catch (error) {
    console.error("Error in createReservation:", error);
    throw error;
  }
};
