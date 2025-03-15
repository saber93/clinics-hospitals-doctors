
import React from 'react';

interface VisionObjectivesSectionProps {
  leftRef: (el: HTMLElement | null) => void;
  rightRef: (el: HTMLElement | null) => void;
}

const VisionObjectivesSection: React.FC<VisionObjectivesSectionProps> = ({ leftRef, rightRef }) => {
  const objectives = [
    {
      title: "Establish Valuable Partnerships",
      description: "Create and nurture strategic relationships that deliver measurable value to all parties involved."
    },
    {
      title: "Drive Performance",
      description: "Implement a robust performance indicator system that ties financial rewards to achieving specific targets."
    },
    {
      title: "Minimize Risk",
      description: "Eliminate upfront costs and financial risks for our partners through our performance-based compensation model."
    },
    {
      title: "Foster Innovation",
      description: "Continuously develop innovative marketing solutions that address the evolving needs of the UAE market."
    }
  ];
  
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div 
          className="fade-in-left" 
          ref={leftRef}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision and Objectives</h2>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vision</h3>
            <p className="text-lg text-gray-700">
              To be the bridge that connects service/product providers with customers, creating an integrated
              ecosystem where all participants thrive through mutual benefit and collaborative growth.
            </p>
          </div>
        </div>
        <div 
          className="fade-in-right card-image-hover rounded-xl overflow-hidden shadow-lg" 
          ref={rightRef}
        >
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Business meeting" 
            className="w-full h-64 object-cover hover-brightness"
          />
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Objectives</h3>
      <ul className="space-y-4">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start">
            <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-gray-700">
              <strong className="text-gray-900">{objective.title}:</strong> {objective.description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VisionObjectivesSection;
