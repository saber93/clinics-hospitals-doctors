
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
    quote: "The emergency care I received at Memorial General Hospital was exceptional. The staff responded quickly and their expertise saved my life during a critical situation.",
    author: "Robert Johnson",
    role: "Emergency Patient",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 2,
    quote: "City Medical Center's maternity ward provided outstanding care throughout my pregnancy and delivery. The doctors and nurses were supportive, knowledgeable and made me feel safe.",
    author: "Lisa Rodriguez",
    role: "Maternity Patient",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 3,
    quote: "After my heart surgery at Heart & Vascular Institute, the cardiac rehabilitation program helped me recover faster than I expected. The personalized care was remarkable.",
    author: "Michael Chen",
    role: "Cardiac Patient",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 4,
    quote: "The children's hospital made my daughter's extended stay as comfortable as possible. The child-friendly environment and compassionate staff made a difficult time much easier.",
    author: "Sarah Williams",
    role: "Parent of Patient",
    imageUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 5,
    quote: "As a physician affiliated with University Research Medical Center, I'm proud of our commitment to combining exceptional patient care with groundbreaking medical research.",
    author: "Dr. James Wilson",
    role: "Hospital Physician",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&crop=faces"
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
            Patient Success <span className="text-primary">Stories</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Real experiences from patients who received quality care at our partner hospitals
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
            See more patient stories
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
