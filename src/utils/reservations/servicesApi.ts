
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/reservations';

export const getAvailableServices = async (clinicId?: string): Promise<Service[]> => {
  try {
    console.log('Fetching available services...');
    
    // Avoid the complex type inference by using raw query with explicit casting
    const { data: rawData, error } = await supabase
      .from('services')
      .select('*');
    
    // Apply filtering after fetching
    const data = rawData?.filter(service => !clinicId || service.clinic_id === clinicId);
    
    if (error) {
      console.error('Error fetching services:', error);
      throw new Error(`Failed to fetch services: ${error.message}`);
    }
    
    console.log('Fetched services:', data);
    
    if (!data || data.length === 0) {
      // Return demo services if no services found
      return [
        {
          id: 'demo-service-1',
          name: 'Basic Consultation',
          description: 'Initial consultation with specialist',
          duration: 30,
          price: 75,
          vendor_id: 'demo-vendor-1',
          image_url: null,
          created_at: new Date().toISOString(),
          vendors: {
            id: 'demo-vendor-1',
            name: 'Dr. Smith'
          }
        },
        {
          id: 'demo-service-2',
          name: 'Facial Treatment',
          description: 'Rejuvenating facial treatment',
          duration: 60,
          price: 120,
          vendor_id: 'demo-vendor-2',
          image_url: null,
          created_at: new Date().toISOString(),
          vendors: {
            id: 'demo-vendor-2',
            name: 'Beauty Spa Center'
          }
        },
        {
          id: 'demo-service-3',
          name: 'Full Body Checkup',
          description: 'Comprehensive health examination',
          duration: 90,
          price: 200,
          vendor_id: 'demo-vendor-1',
          image_url: null,
          created_at: new Date().toISOString(),
          vendors: {
            id: 'demo-vendor-1',
            name: 'Dr. Smith'
          }
        }
      ];
    }
    
    // Process the returned data and fetch vendor information separately
    const typedServices: Service[] = await Promise.all(data.map(async (service: any) => {
      // Get vendor data separately to avoid deep type issues
      let vendorName = 'Unknown Provider';
      let vendorId = service.vendor_id || '';
      
      if (service.vendor_id) {
        try {
          const { data: vendorData } = await supabase
            .from('profiles')
            .select('id, name')
            .eq('id', service.vendor_id)
            .maybeSingle();
          
          if (vendorData) {
            vendorId = vendorData.id;
            vendorName = vendorData.name;
          }
        } catch (err) {
          console.error('Error fetching vendor data:', err);
        }
      }
      
      return {
        id: service.id,
        name: service.name,
        description: service.description || '',
        duration: service.duration,
        price: service.price,
        vendor_id: service.vendor_id,
        image_url: null,
        created_at: service.created_at,
        vendors: {
          id: vendorId,
          name: vendorName
        }
      };
    }));
    
    return typedServices;
  } catch (error) {
    console.error('Error in getAvailableServices:', error);
    return [];
  }
};
