
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ServiceHeader from './ServiceHeader';
import ServiceCarousel from './ServiceCarousel';
import { services } from './servicesData';

const ServicesSection = () => {
  const [api, setApi] = React.useState<any>(null);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

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
        
        <ServiceCarousel 
          services={services} 
          api={api} 
          setApi={setApi} 
        />
      </div>
    </section>
  );
};

export default ServicesSection;
