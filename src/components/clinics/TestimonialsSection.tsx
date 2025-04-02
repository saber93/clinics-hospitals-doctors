
import React from 'react';
import { QuoteIcon, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useIntersectionAnimation from '@/hooks/useIntersectionAnimation';

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote: "Zames connected me with an amazing dermatologist who completely transformed my skin. The booking process was seamless and I love being able to see reviews before making an appointment.",
    author: "Sarah Johnson",
    role: "Patient",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "As a clinic owner, partnering with Zames has significantly increased our patient base. Their platform makes it easy for patients to find us and book appointments without any hassle.",
    author: "Dr. Michael Chen",
    role: "Dermatology Clinic Owner",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "I've tried several skincare platforms, but Zames stands out with their verified clinics and transparent reviews. I feel confident knowing I'm choosing quality care for my skin.",
    author: "Emma Rodriguez",
    role: "Regular Client",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 4,
    quote: "The specialist I found through Zames provided exceptional care for my eczema. Within weeks, I saw dramatic improvement that other treatments couldn't achieve.",
    author: "David Thompson",
    role: "Long-term Patient",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 5,
    quote: "As a dermatologist, joining Zames has allowed me to reach many more patients who need specialized care. The platform's focus on quality has elevated my practice.",
    author: "Dr. Amelia Rodriguez",
    role: "Dermatology Specialist",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop"
  }
];

const TestimonialsSection = () => {
  const { fadeRefsRef } = useIntersectionAnimation(1);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className="text-center mb-12 fade-in-up"
          ref={el => fadeRefsRef.current[0] = el}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            What People Say About <span className="text-primary">Zames</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it — hear from our satisfied users and partners
          </p>
        </div>
        
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full testimonial-card bg-gray-50 p-8 rounded-xl shadow-sm relative">
                    <QuoteIcon className="text-primary/20 h-12 w-12 absolute top-6 right-6" />
                    
                    <p className="text-gray-700 mb-6 relative z-10">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center mt-6">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.author} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 h-10 w-10" />
              <CarouselNext className="relative inset-0 translate-y-0 h-10 w-10" />
            </div>
          </Carousel>
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
            See more testimonials
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
