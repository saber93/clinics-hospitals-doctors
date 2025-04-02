
import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Find the Perfect Skin Specialist for You
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our network of highly qualified dermatologists and aesthetic specialists for personalized skin care.
          </p>
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Search by name, specialty, or location..."
            />
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 z-0"></div>
    </div>
  );
};

export default HeroSection;
