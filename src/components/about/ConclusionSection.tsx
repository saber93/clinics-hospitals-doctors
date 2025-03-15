
import React from 'react';

interface ConclusionSectionProps {
  ref: (el: HTMLElement | null) => void;
}

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ ref }) => {
  return (
    <section className="mb-16 text-center">
      <div 
        className="fade-in-up" 
        ref={ref}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us on Our Journey</h2>
        <div className="prose max-w-3xl mx-auto text-gray-700">
          <p className="text-lg leading-relaxed mb-6">
            Zams Marketing Management Company brings a unique experience to the UAE market, combining innovative 
            marketing solutions with a deep commitment to building trust-based, strategic partnerships. Our 
            dedication to excellence, coupled with our performance-driven approach, ensures that we deliver 
            measurable results for all our partners.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            We invite potential partners to collaborate with us for mutual success. Together, we can create an
            integrated ecosystem where businesses thrive and customers receive exceptional products and services.
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <a 
          href="/contact" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 button-hover-slide"
        >
          Contact Us to Become a Partner
        </a>
      </div>
    </section>
  );
};

export default ConclusionSection;
