
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketingJourneySection = () => {
  const navigate = useNavigate();
  
  const handleReadMoreClick = () => {
    navigate('/about');
  };
  
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-lg uppercase tracking-wider text-gray-700 mb-4">OUR JOURNEY TO MARKETING EXCELLENCE</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Real<br />
              Marketing,<br />
              Real<br />
              Results
            </h2>
          </div>
          
          <div className="space-y-8 md:col-span-2">
            <div>
              <p className="text-lg text-gray-700 mb-8">
                From overcoming marketing failures to leading in performance-based strategies, we 
                transformed our challenges into success. At ZAMES, we redefine marketing by focusing 
                on real, measurable growth—ensuring businesses thrive without financial risks.
              </p>
              
              <div className="flex justify-end">
                <button 
                  className="flex items-center text-gray-900 font-medium hover:text-primary transition-colors"
                  onClick={handleReadMoreClick}
                >
                  Read More <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              
              <div className="border-t border-gray-200 mt-8 pt-4"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Our Beginning</h3>
                  <span className="text-xl font-semibold">2012</span>
                </div>
                <p className="text-gray-500 mb-2">Fashion & Makeup Industry</p>
                <p className="text-gray-700">The starting point of our journey into real marketing solutions.</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Marketing Transformation</h3>
                  <span className="text-xl font-semibold">2020</span>
                </div>
                <p className="text-gray-500 mb-2">Self-Marketing Strategy</p>
                <p className="text-gray-700">Built an in-house team, shifting from design-focused to result-driven campaigns.</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Industry Expansion</h3>
                  <span className="text-xl font-semibold">2022</span>
                </div>
                <p className="text-gray-500 mb-2">Beauty & Healthcare Marketing</p>
                <p className="text-gray-700">Revolutionizing client acquisition for clinics and medical professionals.</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Founded</h3>
                  <span className="text-xl font-semibold">2025</span>
                </div>
                <p className="text-gray-500 mb-2">Performance-Based Marketing</p>
                <p className="text-gray-700">Turning past failures into a data-driven success model.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingJourneySection;
