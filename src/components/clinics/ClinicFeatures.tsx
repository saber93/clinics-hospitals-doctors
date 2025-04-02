
import React from 'react';
import { Check, Search, Award, Calendar, MapPin, Heart } from 'lucide-react';

const ClinicFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Premium <span className="text-primary">Clinic Network</span> for Your Health Journey
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our extensive network of verified clinics offering specialized care and treatments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Search className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Clinic Discovery</h3>
            <p className="text-gray-600">
              Our powerful search and filtering system helps you find the perfect clinic based on location, specialty, rating, and available treatments.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Award className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Verified Clinics</h3>
            <p className="text-gray-600">
              All clinics in our network are vetted for quality, credentials, and professional standards to ensure you receive the best care possible.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Convenient Booking</h3>
            <p className="text-gray-600">
              Easily schedule appointments online with your chosen clinic at times that work for you, without the hassle of phone calls.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Geographic Coverage</h3>
            <p className="text-gray-600">
              With clinics located throughout the region, you can find specialized care close to home or wherever you need it.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Check className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Specialized Treatments</h3>
            <p className="text-gray-600">
              From dermatology and aesthetics to wellness and preventative care, our clinics offer a comprehensive range of specialized services.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Patient-Centered Care</h3>
            <p className="text-gray-600">
              Our partner clinics prioritize your comfort and well-being, providing personalized treatment plans and attentive care.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-primary font-medium mb-4">Join our growing network of satisfied clients</p>
          <div className="flex justify-center space-x-8 mt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">200+</p>
              <p className="text-sm text-gray-500">Verified Clinics</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">50+</p>
              <p className="text-sm text-gray-500">Specialties</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">10,000+</p>
              <p className="text-sm text-gray-500">Happy Patients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicFeatures;
