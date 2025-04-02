
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`p-8 rounded-sm transition-all duration-300 h-full flex flex-col justify-between ${isHovered ? 'bg-black text-white' : 'bg-white text-black'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="mb-6 text-4xl">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      </div>
      <div className="flex items-center">
        <p className="text-sm mr-2">read more</p>
        <ChevronRight className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'text-white' : 'text-black'}`} />
      </div>
    </div>
  );
};

const CreativeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12L36 24L24 36L12 24L24 12Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ProductionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
    <rect x="20" y="12" width="16" height="16" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const RebrandingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12C18.4772 12 14 16.4772 14 22C14 27.5228 18.4772 32 24 32" stroke="currentColor" strokeWidth="2" />
    <path d="M28 24L36 24" stroke="currentColor" strokeWidth="2" />
    <path d="M32 20L36 24L32 28" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const CorporateIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="16" width="8" height="8" stroke="currentColor" strokeWidth="2" />
    <rect x="28" y="16" width="8" height="8" stroke="currentColor" strokeWidth="2" />
    <rect x="20" y="24" width="8" height="8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ServicesSection = () => {
  const services = [
    {
      title: "Strategic Business Development Partnerships",
      description: "read more",
      icon: <CreativeIcon />,
    },
    {
      title: "Digital Marketing via Social Media",
      description: "read more",
      icon: <ProductionIcon />,
    },
    {
      title: "Providing the Best Medical and Cosmetic Products and Equipment",
      description: "read more",
      icon: <RebrandingIcon />,
    },
    {
      title: "Corporate Identity",
      description: "read more",
      icon: <CorporateIcon />,
    },
  ];

  const [api, setApi] = React.useState<any>(null);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0">
            <h4 className="text-sm uppercase font-medium tracking-wider text-gray-700 mb-3">MAIN DIRECTIONS</h4>
            <h2 className="text-5xl font-bold">Services</h2>
          </div>
          
          <div className="max-w-xl mx-4 md:mx-0">
            <p className="text-lg text-gray-600">
              Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
              aspernaturaut odit aut fugit, sed quia consequuntur. Dicta sunt 
              explicabo. Nemo enim ipsam voluptatem quia voluptas.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
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
        
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  isActive={index === 1}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ServicesSection;
