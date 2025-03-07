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
    console.log(`Getting reservations for user ${userId} with role ${userRole}`);
    
    // Debug log to show we're fetching reservations
    console.log("Starting to fetch reservations from database");
    
    // Fetch all reservations for admins without any user ID filter
    let query = supabase.from('reservations').select('*');
    
    // Only apply user-specific filters for non-admin roles
    if (userRole !== 'admin') {
      if (userRole === 'client') {
        query = query.eq('client_id', userId);
      } else if (userRole === 'vendor') {
        query = query.eq('vendor_id', userId);
      }
    }
    
    // Execute the query
    const { data: reservations, error } = await query;
    
    if (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
    
    console.log(`Found ${reservations?.length || 0} reservations for ${userRole} role:`, reservations);
    
    if (!reservations || reservations.length === 0) {
      return [];
    }
    
    // Extract unique IDs for related data
    const clientIds = [...new Set(reservations.map(r => r.client_id).filter(Boolean))];
    const vendorIds = [...new Set(reservations.map(r => r.vendor_id).filter(Boolean))];
    const serviceIds = [...new Set(reservations.map(r => r.service_id).filter(Boolean))];
    
    // Fetch client profiles
    let clientProfiles: Record<string, any> = {};
    if (clientIds.length > 0) {
      const { data: clientData, error: clientError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', clientIds);
        
      if (clientError) {
        console.error("Error fetching client profiles:", clientError);
      } else if (clientData) {
        clientProfiles = clientData.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>);
        console.log("Client profiles fetched:", clientProfiles);
      }
    }
    
    // Fetch vendor profiles
    let vendorProfiles: Record<string, any> = {};
    if (vendorIds.length > 0) {
      const { data: vendorData, error: vendorError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', vendorIds);
        
      if (vendorError) {
        console.error("Error fetching vendor profiles:", vendorError);
      } else if (vendorData) {
        vendorProfiles = vendorData.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>);
        console.log("Vendor profiles fetched:", vendorProfiles);
      }
    }
    
    // Fetch services
    let services: Record<string, any> = {};
    if (serviceIds.length > 0) {
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('id, name, duration, price')
        .in('id', serviceIds);
        
      if (servicesError) {
        console.error("Error fetching services:", servicesError);
      } else if (servicesData) {
        services = servicesData.reduce((acc, service) => {
          acc[service.id] = service;
          return acc;
        }, {} as Record<string, any>);
        console.log("Services fetched:", services);
      }
    }
    
    // Combine all data
    const enrichedReservations = reservations.map(reservation => {
      return {
        ...reservation,
        clients: clientProfiles[reservation.client_id] || { name: 'Unknown Client' },
        vendors: vendorProfiles[reservation.vendor_id] || { name: 'Unknown Provider' },
        services: services[reservation.service_id] || { name: 'Unknown Service' }
      };
    });
    
    console.log("Enriched reservations:", enrichedReservations);
    return enrichedReservations;
  } catch (error) {
    console.error("Error in getUserReservations:", error);
    return [];
  }
};

// Function to get available services
export const getAvailableServices = async () => {
  try {
    console.log("Fetching available services...");
    const { data, error } = await supabase
      .from('services')
      .select(`
        id,
        name,
        description,
        price,
        duration,
        vendor_id,
        vendors:profiles(name)
      `)
      .order('name');
    
    if (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
    
    console.log("Services fetched successfully:", data?.length || 0);
    return data || [];
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
