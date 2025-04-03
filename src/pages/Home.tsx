
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import VisionMissionSection from '@/components/home/VisionMissionSection';
import FeaturedClinicsSection from '@/components/home/FeaturedClinicsSection';
import ServicesSection from '@/components/home/ServicesSection';
import CTASection from '@/components/home/CTASection';
import StrategicPartnershipSection from '@/components/home/StrategicPartnershipSection';
import MarketingSection from '@/components/home/MarketingSection';
import MarketingJourneySection from '@/components/home/MarketingJourneySection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />
      
      {/* Vision Mission Section */}
      <VisionMissionSection />

      {/* Services Section */}
      <ServicesSection />
      
      {/* Strategic Partnership Section */}
      <StrategicPartnershipSection />
      
      {/* Marketing Section */}
      <MarketingSection />

      {/* Featured Clinics Section */}
      <FeaturedClinicsSection />
      
      {/* Marketing Journey Section */}
      <MarketingJourneySection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;
