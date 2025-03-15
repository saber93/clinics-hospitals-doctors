
import React from 'react';

interface SectionProps {
  leftRef: (el: HTMLElement | null) => void;
  rightRef: (el: HTMLElement | null) => void;
}

const CompanyIntroSection: React.FC<SectionProps> = ({ leftRef, rightRef }) => {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div 
          className="fade-in-left" 
          ref={leftRef}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Company</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed">
              At Zams Marketing Management Company, we bring a unique and innovative experience to the UAE market. 
              Our approach centers on building strategic partnerships that create mutual value and sustainable growth. 
              Through our extensive customer and influencer network, we connect businesses with their ideal audience, 
              amplifying their market presence and enhancing their competitive edge.
            </p>
          </div>
        </div>
        <div 
          className="fade-in-right card-image-hover rounded-xl overflow-hidden shadow-lg" 
          ref={rightRef}
        >
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Business partners shaking hands" 
            className="w-full h-64 object-cover hover-brightness"
          />
        </div>
      </div>
    </section>
  );
};

export default CompanyIntroSection;
