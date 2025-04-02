
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`p-8 rounded-sm transition-all duration-300 h-full flex flex-col justify-between ${isHovered ? 'bg-black text-white' : 'bg-white text-black'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="mb-6 text-4xl">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      </div>
      <div className="flex items-center">
        <p className="text-sm">read more</p>
        <ChevronRight className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'text-white' : 'text-black'}`} />
      </div>
    </div>
  );
};

export default ServiceCard;
