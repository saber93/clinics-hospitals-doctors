
import React from "react";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <div className="relative min-h-[500px] w-full bg-gradient-to-b from-purple-500 to-blue-400 overflow-hidden">
      {/* Medical clinic floating images - positioned in foreground for better visibility */}
      <div className="absolute top-24 left-48 w-40 h-40 z-10 hidden md:block pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=300&auto=format&fit=crop"
          alt="Dental clinic" 
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      
      {/* Bottom-right image */}
      <div className="absolute bottom-24 right-48 w-40 h-40 z-10 hidden md:block pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=300&auto=format&fit=crop" 
          alt="Medical aesthetic treatment" 
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      
      {/* New overlapping images on bottom-left */}
      <div className="absolute bottom-16 left-16 hidden md:block">
        {/* Larger image in back */}
        <div className="w-48 h-48 z-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=300&auto=format&fit=crop" 
            alt="Skin treatment" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Smaller image overlapping in front */}
        <div className="w-32 h-32 absolute -top-10 -right-10 z-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=300&auto=format&fit=crop" 
            alt="Facial treatment" 
            className="w-full h-full object-cover rounded-lg shadow-lg border-2 border-white"
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
