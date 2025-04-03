
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Service, adaptDatabaseService } from '@/types/cms';
import ServiceCard from './ServiceCard';
import ServiceHeader from './ServiceHeader';
import useEmblaCarousel from 'embla-carousel-react';
import { services as mockServices } from './servicesData';

export default function ServicesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });

  // Explicitly define the return type for the queryFn to avoid infinite type instantiation
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      // Convert database format to our CMS format
      return data.map(service => adaptDatabaseService(service));
    },
    enabled: true,
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
