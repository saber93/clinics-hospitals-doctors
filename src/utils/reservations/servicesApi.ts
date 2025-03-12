
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/reservations';

export const getAvailableServices = async (clinicId?: string): Promise<Service[]> => {
  try {
    console.log('Fetching available services...');
    
    let query = supabase
      .from('services')
      .select(`
        *,
        vendors:profiles(id, name)
      `);
    
    // Filter by clinicId if provided
    if (clinicId) {
      query = query.eq('clinic_id', clinicId);
    }
    
    const { data, error } = await query;
    
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
    
    // Cast to the proper Service type
    const typedServices: Service[] = data.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      vendor_id: service.vendor_id,
      image_url: service.image_url,
      created_at: service.created_at,
      vendors: {
        id: service.vendors?.id || '',
        name: service.vendors?.name || 'Unknown Provider'
      }
    }));
    
    return typedServices;
  } catch (error) {
    console.error('Error in getAvailableServices:', error);
    return [];
  }
};
