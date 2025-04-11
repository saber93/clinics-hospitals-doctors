
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Service, adaptDatabaseService } from '@/types/cms';
import ServiceCard from './ServiceCard';
import ServiceHeader from './ServiceHeader';
import useEmblaCarousel from 'embla-carousel-react';
import { services as mockServices } from './servicesData';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();

  // Simplified fetch function that removes the non-existent is_active filter
  const fetchServices = async (): Promise<Service[]> => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        // Removing the is_active filter as it doesn't exist in the database
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      if (!data || !Array.isArray(data)) return [];
      
      // Convert to array of services without complex type inference
      return data.map(item => adaptDatabaseService(item));
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  };

  // Use the query with the fixed fetch function
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
                  <ServiceCard 
                    title={language === 'ar' && mockService.titleAr ? mockService.titleAr : mockService.title} 
                    description={language === 'ar' && mockService.descriptionAr ? mockService.descriptionAr : mockService.description} 
                    icon={mockService.icon} 
                  />
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
