
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import VisionMissionSection from '@/components/home/VisionMissionSection';
import ServicesSection from '@/components/home/ServicesSection';
import MarketingSection from '@/components/home/MarketingSection';
import DoctorsSection from '@/components/home/DoctorsSection';
import CTASection from '@/components/home/CTASection';
import FeaturedClinicsSection from '@/components/home/FeaturedClinicsSection';
import BlogSection from '@/components/home/BlogSection';
import ContactSection from '@/components/home/ContactSection';

const Index = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <VisionMissionSection />
      <ServicesSection />
      <MarketingSection />
      <DoctorsSection />
      <FeaturedClinicsSection />
      <BlogSection />
      <ContactSection />
      <CTASection />
    </div>
  );
};

export default Index;
