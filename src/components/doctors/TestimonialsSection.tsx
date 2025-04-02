
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Dr. Johnson completely transformed my skin. Her expertise in treating adult acne made all the difference after years of struggling.",
      author: "Emma T.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&crop=faces",
      rating: 5,
    },
    {
      quote: "I was hesitant about cosmetic procedures, but Dr. Garcia provided such thorough information and gentle care. The results are so natural!",
      author: "Michael D.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&crop=faces",
      rating: 5,
    },
    {
      quote: "After struggling with rosacea for years, Dr. Kim's specialized treatment plan finally gave me the relief I needed. Highly recommended!",
      author: "Sarah L.",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&auto=format&fit=crop&crop=faces",
      rating: 4,
    },
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Patient Success Stories</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from patients who found the perfect specialist for their needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
                <span className="font-medium">{testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
