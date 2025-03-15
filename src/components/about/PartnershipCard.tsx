
import React from 'react';
import { Card } from '@/components/ui/card';

interface PartnershipCardProps {
  title: string;
  description: string;
  imageUrl: string;
  refProp: (el: HTMLElement | null) => void;
  delayClass: string;
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  refProp, 
  delayClass 
}) => {
  return (
    <div 
      className={`fade-in-${delayClass.includes('left') ? 'left' : 'right'} ${delayClass}`} 
      ref={refProp}
    >
      <Card className="bg-white shadow-sm rounded-xl overflow-hidden hover-lift hover-glow h-full">
        <div className="card-image-hover h-48">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </Card>
    </div>
  );
};

export default PartnershipCard;
