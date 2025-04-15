
import React from 'react';

interface MedicalSuppliesSectionProps {
  leftRef: (el: HTMLElement | null) => void;
  rightRef: (el: HTMLElement | null) => void;
  supplyRefs: ((el: HTMLElement | null) => void)[];
}

const MedicalSuppliesSection: React.FC<MedicalSuppliesSectionProps> = ({ 
  leftRef, 
  rightRef, 
  supplyRefs 
}) => {
  const supplies = [
    {
      title: "Clinic Furnishings",
      description: "Functional and aesthetically pleasing furniture and fixtures designed for healthcare environments.",
      delayClass: "stagger-delay-1",
      refIndex: 0
    },
    {
      title: "Medical Equipment",
      description: "Both new and used medical equipment that meets international quality and safety standards.",
      delayClass: "stagger-delay-2",
      refIndex: 1
    },
    {
      title: "Essential Supplies",
      description: "Fillers, Botox, collagen stimulants, sterilization tools, and other critical medical supplies.",
      delayClass: "stagger-delay-3",
      refIndex: 2
    }
  ];
  
  return (
    <section className="mb-16 bg-primary/5 rounded-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div 
          className="fade-in-left" 
          ref={leftRef}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Supplying Clinics and Medical Centers</h2>
          <p className="text-lg text-gray-700 mb-6">
            We are dedicated to sourcing reliable suppliers for medical facilities, ensuring they have everything
            needed to provide exceptional patient care.
          </p>
        </div>
        <div 
          className="fade-in-right card-image-hover rounded-xl overflow-hidden shadow-lg" 
          ref={rightRef}
        >
          <img 
            src="/lovable-uploads/5181c954-47f3-4619-b052-7465f62f7bde.png"
            alt="Medical supplies" 
            className="w-full h-64 object-cover hover-brightness"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {supplies.map((supply, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-sm p-6 hover-lift hover-glow fade-in-up ${supply.delayClass}`} 
            ref={supplyRefs[supply.refIndex]}
          >
            <h3 className="text-lg font-semibold text-primary mb-2">{supply.title}</h3>
            <p className="text-gray-700">{supply.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MedicalSuppliesSection;
