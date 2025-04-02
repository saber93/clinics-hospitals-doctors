
import React from 'react';
import { Target, Handshake, Award, Flag } from 'lucide-react';

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-4">
              <div className="relative h-72 md:h-96">
                <img 
                  src="public/lovable-uploads/92eca1af-a6f8-4f2a-a524-a8a0d601ba17.png"
                  alt="Team collaboration and strategy session"
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              </div>
              <div className="relative h-72 md:h-96 hidden sm:block">
                <img 
                  src="public/lovable-uploads/96b7f889-8783-4072-b164-abacb94bc958.png"
                  alt="Business meeting discussion"
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative h-72 md:h-96 hidden sm:block">
                <img 
                  src="public/lovable-uploads/da11f43c-4176-4142-a47d-140f21300c1d.png"
                  alt="Team collaborating on strategic vision"
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              </div>
              <div className="relative h-72 md:h-96">
                <img 
                  src="public/lovable-uploads/9b620d87-47a0-41af-b2a9-6118424081e8.png"
                  alt="Digital collaboration meeting"
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
