
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative min-h-[500px] w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&auto=format&fit=crop&q=80"
          alt="Modern medical clinic building" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/95 to-blue-900/95"></div>
      </div>

      {/* Left side images - repositioned to be more centered between edge and content */}
      <div className="absolute left-0 top-0 w-1/3 h-full hidden md:block z-10">
        {/* Medical clinic image - top left */}
        <div className="w-36 h-36 pointer-events-none absolute left-[80px] top-20">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80"
            alt="Medical clinic reception" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Third left image - repositioned to overlap with bottom image */}
        <div className="w-40 h-40 pointer-events-none absolute left-[70px] top-[280px] z-10">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&auto=format&fit=crop&q=80" 
            alt="Central Laser Center" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Second left image - bottom - moved further to the right and up */}
        <div className="w-28 h-28 pointer-events-none absolute left-[144px] top-[396px] z-20">
          <img 
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&auto=format&fit=crop&q=80" 
            alt="Modern medical building" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Right side images - positioned with vertical spacing */}
      <div className="absolute right-0 top-0 w-1/3 h-full hidden md:block z-10">
        {/* Top right image */}
        <div className="w-32 h-32 pointer-events-none absolute right-40 top-24">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&auto=format&fit=crop&q=80" 
            alt="Modern wellness clinic" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Middle right image - moved 32px more to the right */}
        <div className="w-40 h-40 pointer-events-none absolute right-16 top-96">
          <img 
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300&auto=format&fit=crop&q=80" 
            alt="Medical center building" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Bottom right image - moved 32px more to the right (changed from right-16 to right-[48px]) */}
        <div className="w-32 h-32 pointer-events-none absolute right-[48px] top-60">
          <img 
            src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=300&auto=format&fit=crop&q=80" 
            alt="Healthcare facility" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center py-16 relative z-20">
        <div className="flex items-center gap-1 sm:gap-2 mb-6">
          <div className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">MEDICAL</div>
          <div className="bg-white p-1 rounded-lg">
            <div className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold">CLINICS</div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Find Expert Healthcare
          <br />
          For Your Wellness Journey
        </h1>
        
        <p className="text-white text-lg md:text-xl mb-12 max-w-2xl">
          Discover specialized medical clinics offering a wide range of treatments and services to help you achieve optimal health and well-being
        </p>
        
        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4">
          <FeatureBadge 
            number="50+" 
            label="SPECIALTIES" 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
          <FeatureBadge 
            number="200+" 
            label="VERIFIED CLINICS" 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
          <FeatureBadge 
            number="1000+" 
            label="EXPERT PRACTITIONERS" 
            icon="star" 
            highlight 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
          <FeatureBadge 
            number="24/7" 
            label="PATIENT CARE" 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
        </div>
        
        <p className="text-white text-lg mt-12">
          Your health journey starts with finding the right care
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
  className?: string;
}

const FeatureBadge = ({ number, label, highlight = false, icon, className }: FeatureBadgeProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-md ${highlight ? 'bg-purple-800' : 'bg-white/20 backdrop-blur-sm'} ${className}`}>
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
