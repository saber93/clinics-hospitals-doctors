
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Star, Clock } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Comprehensive skincare solutions for all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
            <CardContent className="p-6">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Easy Bookings</h3>
              <p className="text-gray-600">
                Schedule appointments with skincare specialists at your convenience, 24/7.
                No more waiting on hold or dealing with complicated scheduling systems.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
            <CardContent className="p-6">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Verified Specialists</h3>
              <p className="text-gray-600">
                Connect with certified dermatologists and skincare professionals who have been thoroughly vetted.
                Your skin deserves only the best care.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
            <CardContent className="p-6">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Flexible Hours</h3>
              <p className="text-gray-600">
                Many of our partner clinics offer extended hours and weekend appointments to fit your busy schedule.
                Skincare that works around your life.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
