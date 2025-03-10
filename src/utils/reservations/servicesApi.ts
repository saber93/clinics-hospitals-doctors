
import { supabase } from "@/integrations/supabase/client";
import type { Service } from "@/types/reservations";

export const getAvailableServices = async () => {
  try {
    console.log("Fetching available services...");
    
    const { data, error } = await supabase
      .from('services')
      .select('id, name, description, price, duration, vendor_id')
      .order('name');
    
    if (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
    
    // If services exist, fetch vendor names separately
    if (data && data.length > 0) {
      // Get unique vendor IDs
      const vendorIds = [...new Set(data.map(service => service.vendor_id).filter(Boolean))];
      
      const vendorProfiles = await fetchVendorProfiles(vendorIds);
      
      // Enrich services with vendor information
      const enrichedServices = data.map(service => ({
        ...service,
        vendors: service.vendor_id ? vendorProfiles[service.vendor_id] : { name: 'Unknown Provider' }
      }));
      
      console.log("Services fetched successfully:", enrichedServices.length);
      return enrichedServices;
    }
    
    console.log("No services found");
    return [];
  } catch (error) {
    console.error("Error in getAvailableServices:", error);
    return [];
  }
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
