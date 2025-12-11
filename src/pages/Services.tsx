
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from '@/components/ui/Loading';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  icon_name: string | null;
  is_active: boolean | null;
}

const Services = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const { data: services, isLoading } = useQuery({
    queryKey: ['public-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Service[];
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cn("min-h-screen bg-background", isRTL && "rtl-content")}>
      {/* Hero Section */}
      <section className="bg-primary/5 py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t('services.title') || 'Our Services'}
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            {t('services.subtitle') || 'Discover our comprehensive range of healthcare services designed to meet your needs.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    {service.description && (
                      <CardDescription>{service.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-primary">
                        <DollarSign className="h-4 w-4" />
                        <span>{service.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t('services.noServices') || 'No services available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
