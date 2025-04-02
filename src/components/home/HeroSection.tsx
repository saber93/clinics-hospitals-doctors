import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Star, Shield } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Your Marketing Deserves <span className="text-primary">Expert Care</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-xl">
            Connect with top-rated dermatology clinics and skincare specialists. 
            Book appointments, manage treatments, and achieve your best skin ever.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate('/clinics')}
            >
              <Search className="w-4 h-4 mr-2" /> Find Clinics
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => navigate('/reservations')}
            >
              <Calendar className="w-4 h-4 mr-2" /> Book Appointment
            </Button>
          </div>
          <div className="mt-6 flex items-center">
            <Badge variant="secondary" className="mr-2">Trusted by 10,000+ patients</Badge>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative md:-ml-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto">
            <img 
              src="/lovable-uploads/f538345f-52aa-4960-a4a2-c377edde5280.png" 
              alt="Team collaborating on healthcare planning" 
              className="w-full h-[450px] md:h-[500px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Verified Specialists</p>
                <p className="text-xs text-gray-500">100% certified professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
