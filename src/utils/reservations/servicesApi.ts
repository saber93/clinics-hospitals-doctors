
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/reservations';

export const getAvailableServices = async (clinicId?: string): Promise<Service[]> => {
  try {
    console.log('Fetching available services...');
    
    // Use a simpler query without complex type annotations
    const { data, error } = await supabase
      .from('services')
      .select('*, vendors:profiles!services_vendor_id_fkey(id, name)')
      .eq(clinicId ? 'clinic_id' : 'id', clinicId || 'id');
    
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
    
    // Cast to the proper Service type using type assertion
    const typedServices: Service[] = (data as any[]).map(service => {
      // Safely handle possibly undefined vendors data
      const vendorData = service.vendors || { id: '', name: 'Unknown Provider' };
      
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
          id: vendorData.id,
          name: vendorData.name
        }
      };
    });
    
    return typedServices;
  } catch (error) {
    console.error('Error in getAvailableServices:', error);
    return [];
  }
};
