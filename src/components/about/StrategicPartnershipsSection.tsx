
import React from 'react';
import PartnershipCard from './PartnershipCard';

interface StrategicPartnershipsSectionProps {
  refs: ((el: HTMLElement | null) => void)[];
}

const StrategicPartnershipsSection: React.FC<StrategicPartnershipsSectionProps> = ({ refs }) => {
  const partnerships = [
    {
      title: "Product Suppliers",
      description: "We collaborate with quality suppliers of pharmacy products, medications, nutritional supplements, skin and hair care, and beauty items to ensure our partners have access to the best products.",
      imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      delayClass: "stagger-delay-1",
      refIndex: 0
    },
    {
      title: "Clinics and Medical Centers",
      description: "Our strategic relationships with healthcare facilities ensure high-quality services for customers while providing clinics with reliable patient flow and business growth.",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      delayClass: "stagger-delay-2",
      refIndex: 1
    },
    {
      title: "Logistics Companies",
      description: "We partner with reliable logistics providers to ensure seamless distribution and delivery, maintaining product integrity and customer satisfaction throughout the supply chain.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      delayClass: "stagger-delay-3",
      refIndex: 2
    },
    {
      title: "Personal Services Providers",
      description: "Our network includes professional makeup artists, hair care specialists, and other beauty service providers, connecting them with clients who seek premium personal care services.",
      imageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      delayClass: "stagger-delay-4",
      refIndex: 3
    }
  ];
  
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Strategic Partnerships</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partnerships.map((partnership, index) => (
          <PartnershipCard
            key={index}
            title={partnership.title}
            description={partnership.description}
            imageUrl={partnership.imageUrl}
            refProp={refs[partnership.refIndex]}
            delayClass={`${index % 2 === 0 ? 'fade-in-left' : 'fade-in-right'} ${partnership.delayClass}`}
          />
        ))}
      </div>
    </section>
  );
};

export default StrategicPartnershipsSection;
