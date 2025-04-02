
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ServiceHeaderProps {
  scrollPrev: () => void;
  scrollNext: () => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ scrollPrev, scrollNext }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
      <div className="mb-8 md:mb-0">
        <h4 className="text-sm uppercase font-medium tracking-wider text-gray-700 mb-3">MAIN DIRECTIONS</h4>
        <h2 className="text-5xl font-bold">Services</h2>
      </div>
      
      <div className="max-w-xl mx-4 md:mx-0">
        <p className="text-lg text-gray-600">
          Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
          aspernaturaut odit aut fugit, sed quia consequuntur. Dicta sunt 
          explicabo. Nemo enim ipsam voluptatem quia voluptas.
        </p>
      </div>
      
      <div className="flex items-center space-x-4 mt-6 md:mt-0">
        <button 
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={scrollNext}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ServiceHeader;
