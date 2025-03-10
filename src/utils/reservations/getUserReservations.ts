
import { supabase } from "@/integrations/supabase/client";
import type { EnrichedReservation } from "@/types/reservations";

export const getUserReservations = async (userId: string, userRole: string): Promise<EnrichedReservation[]> => {
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
    
    const [clientProfiles, vendorProfiles, services] = await Promise.all([
      fetchClientProfiles(clientIds),
      fetchVendorProfiles(vendorIds),
      fetchServices(serviceIds)
    ]);
    
    // Combine all data
    const enrichedReservations = reservations.map(reservation => ({
      ...reservation,
      clients: clientProfiles[reservation.client_id] || { name: 'Unknown Client' },
      vendors: vendorProfiles[reservation.vendor_id] || { name: 'Unknown Provider' },
      services: services[reservation.service_id] || { name: 'Unknown Service' }
    }));
    
    console.log("Enriched reservations:", enrichedReservations);
    return enrichedReservations;
  } catch (error) {
    console.error("Error in getUserReservations:", error);
    return [];
  }
};

const fetchClientProfiles = async (clientIds: string[]) => {
  if (clientIds.length === 0) return {};
  
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name')
    .in('id', clientIds);
    
  if (error) {
    console.error("Error fetching client profiles:", error);
    return {};
  }
  
  return data?.reduce((acc, profile) => {
    acc[profile.id] = profile;
    return acc;
  }, {} as Record<string, any>) || {};
};

const fetchVendorProfiles = async (vendorIds: string[]) => {
  if (vendorIds.length === 0) return {};
  
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name')
    .in('id', vendorIds);
    
  if (error) {
    console.error("Error fetching vendor profiles:", error);
    return {};
  }
  
  return data?.reduce((acc, profile) => {
    acc[profile.id] = profile;
    return acc;
  }, {} as Record<string, any>) || {};
};

const fetchServices = async (serviceIds: string[]) => {
  if (serviceIds.length === 0) return {};
  
  const { data, error } = await supabase
    .from('services')
    .select('id, name, duration, price')
    .in('id', serviceIds);
    
  if (error) {
    console.error("Error fetching services:", error);
    return {};
  }
  
  return data?.reduce((acc, service) => {
    acc[service.id] = service;
    return acc;
  }, {} as Record<string, any>) || {};
};
