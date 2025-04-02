
import React from 'react';
import { Building, Stethoscope, Clock, Shield, Heart, Clipboard } from 'lucide-react';

const HospitalFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose Our Hospitals</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover the benefits of connecting with our network of trusted healthcare facilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Building className="h-10 w-10 text-blue-600" />}
            title="Advanced Facilities"
            description="State-of-the-art medical equipment and modern infrastructure designed for optimal patient care"
          />
          
          <FeatureCard 
            icon={<Stethoscope className="h-10 w-10 text-blue-600" />}
            title="Expert Medical Teams"
            description="Experienced doctors, nurses, and healthcare professionals dedicated to providing excellent care"
          />
          
          <FeatureCard 
            icon={<Clock className="h-10 w-10 text-blue-600" />}
            title="24/7 Emergency Services"
            description="Round-the-clock emergency care for immediate medical attention when you need it most"
          />
          
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-blue-600" />}
            title="Certified & Accredited"
            description="All listed hospitals meet rigorous healthcare standards and quality certifications"
          />
          
          <FeatureCard 
            icon={<Heart className="h-10 w-10 text-blue-600" />}
            title="Patient-Centered Care"
            description="Compassionate approach that puts patients and their families at the center of all decisions"
          />
          
          <FeatureCard 
            icon={<Clipboard className="h-10 w-10 text-blue-600" />}
            title="Transparent Information"
            description="Clear details about services, specialties, facilities, and patient reviews to help you make informed decisions"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HospitalFeatures;
