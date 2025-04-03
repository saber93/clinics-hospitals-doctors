
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Service, adaptDatabaseService } from '@/types/cms';
import ServiceCard from './ServiceCard';
import ServiceHeader from './ServiceHeader';
import useEmblaCarousel from 'embla-carousel-react';
import { services as mockServices } from './servicesData';

// Define the raw service type from the database
interface DatabaseService {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  vendor_id: string | null;
  created_at: string;
  updated_at: string;
  icon_name?: string;
  display_order?: number;
  is_active?: boolean;
}

export default function ServicesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });

  // Define the fetchServices function with explicit return type to avoid deep type instantiation
  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    
    // Use a simpler type assertion approach
    return (data || []).map(service => adaptDatabaseService(service as DatabaseService));
  };

  // Use the query with the correct type annotations
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container">
        <ServiceHeader 
          scrollPrev={scrollPrev}
          scrollNext={scrollNext}
        />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {isLoading || !services ? (
              // Use mock services as fallback when loading
              mockServices.map((mockService, index) => (
                <div key={index} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 px-4">
                  <ServiceCard title={mockService.title} description={mockService.description} icon={mockService.icon} />
                </div>
              ))
            ) : (
              services.map((service) => (
                <div key={service.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 px-4">
                  <ServiceCard 
                    title={service.title} 
                    description={service.description} 
                    iconName={service.icon_name}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
