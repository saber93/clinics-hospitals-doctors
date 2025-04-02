
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
    quote: "Dr. Johnson completely transformed my skin. Her expertise in treating adult acne made all the difference after years of struggling.",
    author: "Emma T.",
    role: "Patient",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 2,
    quote: "I was hesitant about cosmetic procedures, but Dr. Garcia provided such thorough information and gentle care. The results are so natural!",
    author: "Michael D.",
    role: "Regular Patient",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 3,
    quote: "After struggling with rosacea for years, Dr. Kim's specialized treatment plan finally gave me the relief I needed. Highly recommended!",
    author: "Sarah L.",
    role: "Long-term Patient",
    imageUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 4,
    quote: "The orthopedic surgeon I found through Zames helped me recover from a sports injury much faster than I expected. Professional care from start to finish.",
    author: "David Thompson",
    role: "Sports Injury Patient",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&crop=faces"
  },
  {
    id: 5,
    quote: "As a cardiologist on the platform, I've been able to connect with patients who truly need specialized cardiac care. The referral system is excellent.",
    author: "Dr. Amelia Rodriguez",
    role: "Cardiologist",
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
            What Patients Say About <span className="text-primary">Our Doctors</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Read success stories from patients who found the right specialist for their needs
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
