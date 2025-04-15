
import React, { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy load components for better performance
const HeroSection = React.lazy(() => import('@/components/home/HeroSection'));
const VisionMissionSection = React.lazy(() => import('@/components/home/VisionMissionSection'));
const ServicesSection = React.lazy(() => import('@/components/home/ServicesSection'));
const MarketingSection = React.lazy(() => import('@/components/home/MarketingSection'));
const DoctorsSection = React.lazy(() => import('@/components/home/DoctorsSection'));
const CTASection = React.lazy(() => import('@/components/home/CTASection'));
const FeaturedClinicsSection = React.lazy(() => import('@/components/home/FeaturedClinicsSection'));
const BlogSection = React.lazy(() => import('@/components/home/BlogSection'));
const ContactSection = React.lazy(() => import('@/components/home/ContactSection'));

const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">
    <LoadingSpinner size="md" />
  </div>}>
    {children}
  </Suspense>
);

const Index = () => {
  return (
    <div className="w-full">
      <LazyComponent>
        <HeroSection />
      </LazyComponent>
      
      <LazyComponent>
        <VisionMissionSection />
      </LazyComponent>
      
      <LazyComponent>
        <ServicesSection />
      </LazyComponent>
      
      <LazyComponent>
        <MarketingSection />
      </LazyComponent>
      
      <LazyComponent>
        <DoctorsSection />
      </LazyComponent>
      
      <LazyComponent>
        <FeaturedClinicsSection />
      </LazyComponent>
      
      <LazyComponent>
        <BlogSection />
      </LazyComponent>
      
      <LazyComponent>
        <ContactSection />
      </LazyComponent>
      
      <LazyComponent>
        <CTASection />
      </LazyComponent>
    </div>
  );
};

export default Index;
