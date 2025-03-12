
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/reservations';

export const getAvailableServices = async (): Promise<Service[]> => {
  try {
    console.log('Fetching available services...');
    
    // First check if we have an active session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.log('No active session found when fetching services');
      return getDemoServices(); // Return demo data if no session
    }

    console.log('Active session found, user ID:', session.user.id);
    
    // Fetch services with vendor information in a single query
    const { data, error } = await supabase
      .from('services')
      .select(`
        id,
        name,
        description,
        duration,
        price,
        vendor_id,
        created_at,
        profiles:vendor_id(id, name)
      `);
    
    if (error) {
      console.error('Error fetching services:', error);
      throw new Error(`Failed to fetch services: ${error.message}`);
    }
    
    console.log('Fetched services:', data);
    
    if (!data || data.length === 0) {
      console.log('No services found in database, returning demo services');
      return getDemoServices();
    }
    
    // Process the returned data with vendor information included
    const typedServices: Service[] = data.map((service: any) => ({
      id: service.id,
      name: service.name,
      description: service.description || '',
      duration: service.duration,
      price: service.price,
      vendor_id: service.vendor_id,
      image_url: null,
      created_at: service.created_at,
      vendors: {
        id: service.profiles?.id || service.vendor_id,
        name: service.profiles?.name || 'Unknown Provider'
      }
    }));
    
    return typedServices;
  } catch (error) {
    console.error('Error in getAvailableServices:', error);
    return getDemoServices();
  }
};

// Helper function to return demo services
const getDemoServices = (): Service[] => {
  console.log('Returning demo services');
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
};
