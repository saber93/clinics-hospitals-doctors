
import React from 'react';
import { Target, Handshake, Award, Flag } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const VisionMissionSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const objectives = [
    {
      title: t('visionmission.objective1Title'),
      description: t('visionmission.objective1Description')
    },
    {
      title: t('visionmission.objective2Title'),
      description: t('visionmission.objective2Description')
    },
    {
      title: t('visionmission.objective3Title'),
      description: t('visionmission.objective3Description')
    },
    {
      title: t('visionmission.objective4Title'),
      description: t('visionmission.objective4Description')
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-lg uppercase font-medium tracking-wider text-gray-700">{t('visionmission.sectionTitle')}</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">{t('visionmission.visionTitle')}</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {t('visionmission.visionDescription')}
            </p>

            <div className="mt-8">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">{t('visionmission.objectivesTitle')}</h2>
              <div className="space-y-6">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-400">*</span>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">{objective.title}:</span> {objective.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative h-[600px] mt-8 md:mt-0">
            {/* Large background image */}
            <div className="absolute right-0 top-0 w-[80%] h-[80%]">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt={t('visionmission.teamImageAlt')}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            
            {/* Overlapping smaller image */}
            <div className="absolute left-0 bottom-0 w-[75%] h-[75%] shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt={t('visionmission.strategicImageAlt')}
                className="rounded-lg object-cover w-full h-full border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
