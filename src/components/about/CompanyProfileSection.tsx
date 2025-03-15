
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CompanyProfileSection: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Profile</h2>
      <Card className="bg-white shadow-md border-none rounded-xl">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Company Name:</span>
                  <span>Zams Marketing Management Company</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Industry:</span>
                  <span>Marketing and Strategic Partnership Management</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Target Market:</span>
                  <span>United Arab Emirates</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Competitive Advantages</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Extensive network of customers and influencers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Performance-based business model with no upfront costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Deep understanding of the UAE market dynamics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Integrated ecosystem connecting suppliers, service providers, and customers</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CompanyProfileSection;
