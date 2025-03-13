
import React from 'react';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 text-gray-600">Learn about our mission and our team.</p>
        
        <Separator className="my-8" />
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to make healthcare accessible to everyone by providing a seamless platform 
            that connects patients with healthcare providers. We believe that everyone deserves 
            access to quality healthcare, and we're committed to making that a reality.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2023, our platform was born out of a shared frustration with the complexity 
            of healthcare systems. We saw how difficult it was for patients to find the right 
            providers, schedule appointments, and manage their health records. We set out to create 
            a solution that would simplify this process and make healthcare more accessible.
          </p>
          
          <div className="bg-primary/5 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-3">Our Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span><strong className="font-medium">Accessibility:</strong> Making healthcare available to everyone, everywhere.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span><strong className="font-medium">Innovation:</strong> Continuously improving our platform with new technologies.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span><strong className="font-medium">Privacy:</strong> Ensuring the security and confidentiality of user data.</span>
              </li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-6">
            Our team consists of passionate individuals from diverse backgrounds in healthcare, 
            technology, and customer service. United by our mission to revolutionize healthcare 
            access, we work tirelessly to improve our platform and provide the best possible 
            experience for our users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
