
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 text-gray-600">Learn about our mission and our team.</p>
        
        <Separator className="my-8" />
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            At Skinnect, our mission is to revolutionize the skincare industry by connecting patients 
            with specialized healthcare providers and clinics. We believe that everyone deserves 
            access to quality skincare treatments, and we're committed to making that a reality
            through our innovative platform.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2023, Skinnect was born out of a shared frustration with the 
            fragmentation of the skincare market. We saw how difficult it was for patients to find 
            the right skincare specialists, schedule appointments, and manage their treatments. 
            We set out to create a solution that would simplify this process and make specialized
            skincare more accessible to everyone.
          </p>
          
          <Card className="bg-primary/5 rounded-lg p-6 my-8 border-none">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold mb-3">Our Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span><strong className="font-medium">Accessibility:</strong> Making quality skincare treatments available to everyone.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span><strong className="font-medium">Innovation:</strong> Continuously improving our platform with cutting-edge technologies.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span><strong className="font-medium">Privacy:</strong> Ensuring the security and confidentiality of patient data.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span><strong className="font-medium">Quality:</strong> Partnering only with verified, high-quality skincare providers.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-6">
            Our team consists of passionate individuals from diverse backgrounds in dermatology, 
            aesthetic medicine, technology, and customer service. United by our mission to revolutionize 
            skincare access, we work tirelessly to improve our platform and provide the best possible 
            experience for both patients and healthcare providers.
          </p>
          
          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to transform your skincare journey?</h3>
            <Button 
              size="lg" 
              onClick={() => navigate('/clinics')}
              className="animate-fade-in"
            >
              Find a Clinic Near You
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
