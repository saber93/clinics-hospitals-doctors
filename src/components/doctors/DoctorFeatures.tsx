
import React from 'react';
import { Medal, HeartPulse, Clock, ThumbsUp } from 'lucide-react';

const DoctorFeatures = () => {
  const features = [
    {
      icon: <Medal className="h-10 w-10 text-primary" />,
      title: "Board Certified Specialists",
      description: "All doctors in our network are certified with relevant medical boards and skin care authorities.",
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-primary" />,
      title: "Patient-Centered Approach",
      description: "Our specialists focus on your specific needs for personalized skin treatment plans.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Flexible Scheduling",
      description: "Many doctors offer extended hours and virtual consultations to fit your busy schedule.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-primary" />,
      title: "Verified Reviews",
      description: "Real patient feedback helps you choose the right specialist for your needs.",
    },
  ];
  
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Specialists</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We've partnered with top doctors to ensure high-quality care
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorFeatures;
