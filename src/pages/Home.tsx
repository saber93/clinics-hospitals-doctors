
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star, Shield, MapPin, Search } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Skin Deserves <span className="text-primary">Expert Care</span>
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
          <div className="md:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop" 
                alt="Skincare specialist with patient" 
                className="w-full h-[400px] object-cover"
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

      {/* Featured Clinics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Featured Skincare Clinics</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Browse through our network of top-rated dermatology and skincare clinics
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredClinics.map((clinic) => (
              <Card key={clinic.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/clinics/${clinic.id}`)}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={clinic.imageUrl} 
                    alt={clinic.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {clinic.discount > 0 && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-white">
                        {clinic.discount}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{clinic.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{clinic.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{clinic.location}</span>
                  </div>
                  <p className="mt-3 text-gray-600 line-clamp-2">{clinic.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {clinic.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button onClick={() => navigate('/clinics')} variant="outline" size="lg">
              View All Clinics
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-primary/90 rounded-2xl p-8 md:p-12 text-white shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your skincare journey?</h2>
            <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of happy clients who have found their perfect skincare match through Skinnect.
              Your journey to healthier skin is just a click away.
            </p>
            <div className="mt-8">
              <Button 
                variant="secondary" 
                size="lg" 
                className="font-semibold shadow-lg"
                onClick={() => navigate('/register')}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Demo data for featured clinics
const featuredClinics = [
  {
    id: 'clinic-1',
    name: 'Crystal Clear Dermatology',
    rating: 4.9,
    location: 'Downtown Medical District',
    description: 'Specialized in treating acne, rosacea, and other common skin conditions with the latest dermatological techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop',
    discount: 15,
    specialties: ['Acne Treatment', 'Skin Analysis', 'Medical Dermatology']
  },
  {
    id: 'clinic-2',
    name: 'Glow Aesthetic Center',
    rating: 4.8,
    location: 'Westside Beauty District',
    description: 'Luxury med-spa offering non-invasive treatments, chemical peels, and personalized skincare regimens.',
    imageUrl: 'https://images.unsplash.com/photo-1579165466991-467135ad5987?q=80&w=500&auto=format&fit=crop',
    discount: 0,
    specialties: ['Anti-Aging', 'Chemical Peels', 'Facials']
  },
  {
    id: 'clinic-3',
    name: 'Rejuvenate Laser Clinic',
    rating: 4.7,
    location: 'North Hills Plaza',
    description: 'Specializing in laser treatments for skin rejuvenation, hair removal, and scar reduction with cutting-edge technology.',
    imageUrl: 'https://images.unsplash.com/photo-1518671645931-e1d946a64b17?q=80&w=500&auto=format&fit=crop',
    discount: 10,
    specialties: ['Laser Therapy', 'Skin Tightening', 'Hair Removal']
  }
];

export default Home;
