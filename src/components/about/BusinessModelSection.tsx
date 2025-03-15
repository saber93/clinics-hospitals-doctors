
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BusinessModelSectionProps {
  refs: ((el: HTMLElement | null) => void)[];
}

const BusinessModelSection: React.FC<BusinessModelSectionProps> = ({ refs }) => {
  const models = [
    {
      title: "Strategic Partnerships",
      description: "We establish meaningful relationships that benefit all parties involved, focusing on long-term collaboration rather than transactional interactions. Our partnerships are built on trust, transparency, and mutual growth objectives.",
      delay: "stagger-delay-1",
      refIndex: 0
    },
    {
      title: "Performance-Based Compensation",
      description: "Our financial entitlements are directly linked to precise performance indicators (KPIs), ensuring transparency and sustainability. This approach aligns our success with that of our partners, creating a genuine win-win situation.",
      delay: "stagger-delay-2",
      refIndex: 1
    }
  ];
  
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Business Model</h2>
      <Card className="bg-white shadow-md border-none rounded-xl">
        <CardContent className="p-8">
          <p className="text-lg text-gray-700 mb-6">
            Our value-adding model is centered on creating sustainable growth for all our partners through:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((model, index) => (
              <div 
                key={index}
                className={`border-l-4 border-primary pl-4 ${index % 2 === 0 ? 'fade-in-left' : 'fade-in-right'} ${model.delay}`} 
                ref={refs[model.refIndex]}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{model.title}</h3>
                <p className="text-gray-700">{model.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default BusinessModelSection;
