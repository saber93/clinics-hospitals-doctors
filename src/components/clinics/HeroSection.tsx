import React from "react";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <div className="relative min-h-[500px] w-full bg-gradient-to-b from-purple-500 to-blue-400 overflow-hidden">
      {/* Left side images - positioned with vertical spacing */}
      <div className="absolute left-0 top-0 w-1/3 h-full hidden md:block z-10">
        {/* Medical dermatology clinic image */}
        <div className="w-36 h-36 pointer-events-none absolute left-10 top-20">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80"
            alt="Medical dermatology clinic" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Second left image */}
        <div className="w-36 h-36 pointer-events-none absolute left-56 top-96">
          <img 
            src="https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=300&auto=format&fit=crop&q=80" 
            alt="Skin care specialist" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Right side images - positioned with vertical spacing */}
      <div className="absolute right-0 top-0 w-1/3 h-full hidden md:block z-10">
        {/* Top right image - skin analysis (smaller) */}
        <div className="w-32 h-32 pointer-events-none absolute right-12 top-24">
          <img 
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=300&auto=format&fit=crop&q=80" 
            alt="Skin analysis technology" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Middle right image - skincare products (bigger) */}
        <div className="w-40 h-40 pointer-events-none absolute right-48 top-96">
          <img 
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80" 
            alt="Professional skincare products" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Bottom right image - dermatology specialist (smaller) */}
        <div className="w-32 h-32 pointer-events-none absolute right-16 top-60">
          <img 
            src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&auto=format&fit=crop&q=80" 
            alt="Dermatology specialist" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center py-16">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-white text-5xl font-bold">SKIN</div>
          <div className="bg-white p-1 rounded-lg">
            <div className="text-primary text-5xl font-bold">CLINIC</div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Multifunctional medical
          <br />
          services for any purpose
        </h1>
        
        <p className="text-white text-lg md:text-xl mb-12 max-w-2xl">
          Discover top-rated clinics offering specialized skin treatments tailored to your needs
        </p>
        
        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4">
          <FeatureBadge number="15+" label="SPECIALIZED TREATMENTS" />
          <FeatureBadge number="100+" label="SATISFIED CLIENTS" />
          <FeatureBadge number="20+" label="EXPERT DOCTORS" icon="star" highlight />
          <FeatureBadge number="24/7" label="CUSTOMER SUPPORT" />
        </div>
        
        <p className="text-white text-lg mt-12">
          Aimed to fulfill your skincare needs
        </p>
      </div>
    </div>
  );
};

interface FeatureBadgeProps {
  number: string;
  label: string;
  highlight?: boolean;
  icon?: string;
}

const FeatureBadge = ({ number, label, highlight = false, icon }: FeatureBadgeProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-md min-w-[140px] ${highlight ? 'bg-purple-800' : 'bg-white/20 backdrop-blur-sm'}`}>
      <div className="text-2xl font-bold text-white">{number}</div>
      <div className="text-xs font-medium text-white mt-1">{label}</div>
      {icon === 'star' && (
        <div className="mt-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="text-yellow-300 text-xs">★</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
