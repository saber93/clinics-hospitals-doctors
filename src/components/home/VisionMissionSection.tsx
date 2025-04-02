
import React from 'react';
import { target, handshake, award, flag } from 'lucide-react';

const VisionMissionSection = () => {
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-lg uppercase font-medium tracking-wider text-gray-700">OUR VISION AND OBJECTIVES:</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To be the bridge that connects service/product providers with 
              customers, creating an integrated ecosystem where all 
              participants thrive through mutual benefit and collaborative 
              growth.
            </p>

            <div className="mt-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">Objectives</h2>
              <div className="space-y-6">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-400">*</span>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">{objective.title}:</span> {objective.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="public/lovable-uploads/da11f43c-4176-4142-a47d-140f21300c1d.png"
              alt="Team collaborating on strategic vision"
              className="rounded-lg object-cover w-full h-[600px]"
            />
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/20 to-transparent rounded-b-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
