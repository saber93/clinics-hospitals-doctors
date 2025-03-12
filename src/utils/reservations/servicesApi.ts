
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/reservations';

export const getAvailableServices = async (clinicId?: string): Promise<Service[]> => {
  try {
    console.log('Fetching available services...');
    
    // Use a basic query without complex type annotations
    const { data, error } = await supabase
      .from('services')
      .select('*')
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
    
    // Since we're not fetching vendor details in the initial query, make a second query for vendors
    const typedServices: Service[] = await Promise.all((data as any[]).map(async service => {
      // Get vendor data separately to avoid deep type issues
      const { data: vendorData } = await supabase
        .from('profiles')
        .select('id, name')
        .eq('id', service.vendor_id)
        .single();
      
      const vendor = vendorData || { id: '', name: 'Unknown Provider' };
      
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
          id: vendor.id,
          name: vendor.name
        }
      };
    }));
    
    return typedServices;
  } catch (error) {
    console.error('Error in getAvailableServices:', error);
    return [];
  }
};
