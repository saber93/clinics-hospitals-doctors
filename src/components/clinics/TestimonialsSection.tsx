
import React from 'react';
import { QuoteIcon } from 'lucide-react';

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
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            What People Say About <span className="text-primary">Zames</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it — hear from our satisfied users and partners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-8 rounded-xl shadow-sm relative">
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
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
            See more testimonials
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
