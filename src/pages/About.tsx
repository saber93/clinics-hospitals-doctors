
import React from 'react';
import { Separator } from '@/components/ui/separator';
import useIntersectionAnimation from '@/hooks/useIntersectionAnimation';
import AboutHeader from '@/components/about/AboutHeader';
import CompanyIntroSection from '@/components/about/CompanyIntroSection';
import CompanyProfileSection from '@/components/about/CompanyProfileSection';
import StrategicPartnershipsSection from '@/components/about/StrategicPartnershipsSection';
import MedicalSuppliesSection from '@/components/about/MedicalSuppliesSection';
import VisionObjectivesSection from '@/components/about/VisionObjectivesSection';
import BusinessModelSection from '@/components/about/BusinessModelSection';
import ConclusionSection from '@/components/about/ConclusionSection';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const About = () => {
  // We need 17 refs for all the animated elements
  const { fadeRefsRef } = useIntersectionAnimation(17);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-12">
      <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", isRTL && "rtl-content")}>
        <AboutHeader ref={(el) => fadeRefsRef.current[0] = el} />
        
        <CompanyIntroSection 
          leftRef={(el) => fadeRefsRef.current[1] = el} 
          rightRef={(el) => fadeRefsRef.current[2] = el} 
        />

        <Separator className="my-12" />
        
        <CompanyProfileSection />
        
        <StrategicPartnershipsSection 
          refs={[
            (el) => fadeRefsRef.current[3] = el,
            (el) => fadeRefsRef.current[4] = el,
            (el) => fadeRefsRef.current[5] = el,
            (el) => fadeRefsRef.current[6] = el
          ]}
        />
        
        <MedicalSuppliesSection 
          leftRef={(el) => fadeRefsRef.current[7] = el}
          rightRef={(el) => fadeRefsRef.current[8] = el}
          supplyRefs={[
            (el) => fadeRefsRef.current[9] = el,
            (el) => fadeRefsRef.current[10] = el,
            (el) => fadeRefsRef.current[11] = el
          ]}
        />
        
        <Separator className="my-12" />
        
        <VisionObjectivesSection 
          leftRef={(el) => fadeRefsRef.current[12] = el}
          rightRef={(el) => fadeRefsRef.current[13] = el}
        />
        
        <BusinessModelSection 
          refs={[
            (el) => fadeRefsRef.current[14] = el,
            (el) => fadeRefsRef.current[15] = el
          ]}
        />
        
        <Separator className="my-12" />
        
        <ConclusionSection ref={(el) => fadeRefsRef.current[16] = el} />
      </div>
    </div>
  );
};

export default About;
