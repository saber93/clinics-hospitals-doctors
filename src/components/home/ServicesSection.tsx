
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ServiceHeader from './ServiceHeader';
import ServiceCarousel from './ServiceCarousel';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import * as Icons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

const ServicesSection = () => {
  const [api, setApi] = React.useState<any>(null);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
  
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['homepage-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
        
      if (error) throw error;
      return data as Service[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Map services to the format expected by ServiceCarousel
  const serviceItems = React.useMemo(() => {
    if (!services || services.length === 0) {
      return [];
    }
    
    return services.map(service => ({
      title: service.title,
      description: service.description,
      icon: () => {
        const LucideIcon = (Icons as any)[service.icon_name];
        if (LucideIcon) {
          return <LucideIcon className="w-12 h-12" />;
        }
        return <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">?</div>;
      }
    }));
  }, [services]);
  
  if (error) {
    console.error('Error loading services:', error);
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <ServiceHeader scrollPrev={scrollPrev} scrollNext={scrollNext} />

        <div className="block md:hidden mb-6">
          <div className="flex justify-center space-x-4">
            <button 
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <ServiceCarousel 
            services={serviceItems.length > 0 ? serviceItems : []} 
            api={api} 
            setApi={setApi} 
          />
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
