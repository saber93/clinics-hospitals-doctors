
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ServiceCard from './ServiceCard';
import { ServiceItem } from './servicesData';

interface ServiceCarouselProps {
  services: ServiceItem[];
  api: any;
  setApi: React.Dispatch<React.SetStateAction<any>>;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services, api, setApi }) => {
  return (
    <div className="relative mx-0 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] lg:w-[calc(100%+6rem)] -right-4 md:-right-8 lg:-right-12 overflow-visible">
      <Carousel 
        className="w-full overflow-visible" 
        setApi={setApi} 
        opts={{
          align: "start",
          containScroll: false,
          slides: {
            perView: 1,
            spacing: 16,  // Set spacing between slides to 16px
          }
        }}
      >
        <CarouselContent className="-ml-4">
          {services.map((service, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
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
  );
};

export default ServiceCarousel;
