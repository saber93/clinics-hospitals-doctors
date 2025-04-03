
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@/types/cms';
import * as Icons from 'lucide-react';

const ServicesSection = () => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['active-services'],
    queryFn: async () => {
      // Use type assertion for Supabase query
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
        
      if (error) throw error;
      return data as Service[];
    }
  });

  const ServiceIcon = ({ iconName }: { iconName: string }) => {
    const LucideIcon = (Icons as any)[iconName];
    
    if (LucideIcon) {
      return <LucideIcon className="h-12 w-12 text-primary mb-4" />;
    }
    
    return <div className="h-12 w-12 bg-primary/10 rounded-full mb-4" />;
  };

  if (error) {
    console.error('Error fetching services:', error);
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive services to support your health and wellness journey
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 flex flex-col items-center">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </Card>
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <ServiceIcon iconName={service.icon_name} />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No active services configured yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
