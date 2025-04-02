
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import VisionMissionSection from '@/components/home/VisionMissionSection';
import FeaturedClinicsSection from '@/components/home/FeaturedClinicsSection';
import ServicesSection from '@/components/home/ServicesSection';
import CTASection from '@/components/home/CTASection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />
      
      {/* Vision Mission Section */}
      <VisionMissionSection />

      {/* Featured Clinics Section */}
      <FeaturedClinicsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;
