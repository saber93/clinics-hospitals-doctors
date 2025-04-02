
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
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&auto=format&fit=crop&q=80"
          alt="Professional medical doctors team" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/95 to-purple-900/95"></div>
      </div>

      {/* Left side images */}
      <div className="absolute left-0 top-0 w-1/3 h-full hidden md:block z-10">
        {/* Doctor image - top left */}
        <div className="w-36 h-36 pointer-events-none absolute left-[80px] top-20">
          <img 
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
            alt="Dermatologist examining patient" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Second left image */}
        <div className="w-40 h-40 pointer-events-none absolute left-[70px] top-[280px] z-10">
          <img 
            src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&auto=format&fit=crop&q=80" 
            alt="Doctor consulting with patient" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Third left image */}
        <div className="w-28 h-28 pointer-events-none absolute left-[144px] top-[396px] z-20">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80" 
            alt="Medical consultation" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Right side images */}
      <div className="absolute right-0 top-0 w-1/3 h-full hidden md:block z-10">
        {/* Top right image */}
        <div className="w-32 h-32 pointer-events-none absolute right-40 top-24">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80" 
            alt="Doctor with stethoscope" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Middle right image */}
        <div className="w-40 h-40 pointer-events-none absolute right-16 top-96">
          <img 
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&auto=format&fit=crop&q=80" 
            alt="Doctor in medical mask" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Bottom right image */}
        <div className="w-32 h-32 pointer-events-none absolute right-[48px] top-60">
          <img 
            src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=300&auto=format&fit=crop&q=80" 
            alt="Healthcare professional" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center py-16 relative z-20">
        <div className="flex items-center gap-1 sm:gap-2 mb-6">
          <div className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">MEDICAL</div>
          <div className="bg-white p-1 rounded-lg">
            <div className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold">SPECIALISTS</div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Expert Doctors
          <br />
          In Every Specialty
        </h1>
        
        <p className="text-white text-lg md:text-xl mb-12 max-w-2xl">
          Connect with board-certified specialists across all medical fields who provide personalized treatment plans for your health needs
        </p>
        
        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4">
          <FeatureBadge 
            number="30+" 
            label="SPECIALIZATIONS" 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
          <FeatureBadge 
            number="500+" 
            label="SPECIALISTS" 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
          <FeatureBadge 
            number="4.8" 
            label="AVERAGE RATING" 
            icon="star" 
            highlight 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
          <FeatureBadge 
            number="50K+" 
            label="SATISFIED PATIENTS" 
            className="w-[45%] max-w-[150px] sm:w-auto sm:min-w-[130px]" 
          />
        </div>
        
        <p className="text-white text-lg mt-12">
          Your journey to better health starts with the right specialist
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
    <div className={`flex flex-col items-center justify-center p-4 rounded-md ${highlight ? 'bg-blue-800' : 'bg-white/20 backdrop-blur-sm'} ${className}`}>
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
