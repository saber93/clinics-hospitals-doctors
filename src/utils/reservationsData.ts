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
    
    // Set up the base query for reservations
    let query = supabase.from('reservations').select('*');
    
    // Apply role-based filters only for non-admin users
    if (userRole === 'client') {
      query = query.eq('client_id', userId);
    } else if (userRole === 'vendor') {
      query = query.eq('vendor_id', userId);
    } else if (userRole === 'admin') {
      // Admin can see all reservations - no filter needed
      console.log("Admin role detected, fetching all reservations");
    }
    
    // Execute the query
    const { data: reservationsData, error } = await query;
    
    if (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
    
    console.log(`Found ${reservationsData?.length || 0} reservations:`, reservationsData);
    
    if (!reservationsData || reservationsData.length === 0) {
      return [];
    }
    
    // Extract unique IDs for related data
    const clientIds = [...new Set(reservationsData.map(r => r.client_id).filter(Boolean))];
    const vendorIds = [...new Set(reservationsData.map(r => r.vendor_id).filter(Boolean))];
    const serviceIds = [...new Set(reservationsData.map(r => r.service_id).filter(Boolean))];
    
    console.log(`Found ${clientIds.length} unique clients and ${vendorIds.length} unique vendors`);
    
    // Fetch client profiles
    let clientProfiles: Record<string, any> = {};
    if (clientIds.length > 0) {
      const { data: clientData, error: clientError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', clientIds);
        
      if (clientError) {
        console.error("Error fetching client profiles:", clientError);
      }
      
      if (clientData) {
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
      }
      
      if (vendorData) {
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
      }
      
      if (servicesData) {
        services = servicesData.reduce((acc, service) => {
          acc[service.id] = service;
          return acc;
        }, {} as Record<string, any>);
        console.log("Services fetched:", services);
      }
    }
    
    // Combine all data
    const enrichedReservations = reservationsData.map(reservation => {
      const enriched = {
        ...reservation,
        clients: clientProfiles[reservation.client_id] || { name: 'Unknown Client' },
        vendors: vendorProfiles[reservation.vendor_id] || { name: 'Unknown Provider' },
        services: services[reservation.service_id] || { name: 'Unknown Service' }
      };
      console.log(`Enriched reservation: ${reservation.id}`, enriched);
      return enriched;
    });
    
    return enrichedReservations;
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
