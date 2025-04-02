
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
            alt="Team collaborating on marketing strategy" 
            className="rounded-lg shadow-xl object-cover h-[500px] w-full"
          />
          <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-0 lg:translate-x-1/4 bg-black text-white p-8 rounded-lg shadow-xl inline-block">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Guarantees Measurable Success</h3>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <div className="mb-2 text-gray-500 uppercase tracking-wider font-medium">CORPORATE SERVICE</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
            We help you achieve sustainable growth
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">01.</span> 
                Extensive network of customers and influencers
              </h3>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">02.</span> 
                Performance-based business model with no upfront costs
              </h3>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">03.</span> 
                Deep understanding of the UAE market dynamics
              </h3>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">04.</span> 
                Integrated ecosystem connecting suppliers, service providers, and customers
              </h3>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              onClick={() => navigate('/about')} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded"
              size="lg"
            >
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
