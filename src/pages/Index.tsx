import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Marketing Deserves
              <span className="text-orange-500 block">Expert Care</span>
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="ml-2 text-gray-700">Trusted by 10,000+ Patients</span>
            </div>
            <p className="text-gray-600 mb-8">
              At Zams Marketing Management Company, we bring a unique & innovative experience to the UAE market. Our approach centers on building strategic partnerships that create mutual value & sustainable growth. Through our extensive customer & influencer network, we connect businesses with their ideal audience, amplifying their market presence & enhancing their competitive edge.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="ghost" className="hover:bg-gray-100">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div>
            <img 
              src="/lovable-uploads/5181c954-47f3-4619-b052-7465f62f7bde.png"
              alt="Team collaboration" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Growth Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
              alt="Business success" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute bottom-[-30px] right-0 bg-black text-white p-8 rounded-lg shadow-xl max-w-[300px]">
              <h3 className="text-2xl font-bold mb-2">Guarantees</h3>
              <p className="text-xl">Measurable Success</p>
            </div>
          </div>
          <div>
            <div className="text-gray-500 uppercase tracking-wider font-medium mb-2">CORPORATE SERVICE</div>
            <h2 className="text-3xl font-bold mb-8">We help you achieve sustainable growth</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-orange-500 font-bold mr-3">01.</span>
                  Extensive network of customers and influencers
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-orange-500 font-bold mr-3">02.</span>
                  Performance-based business model with no upfront costs
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-orange-500 font-bold mr-3">03.</span>
                  Deep understanding of the UAE market dynamics
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-orange-500 font-bold mr-3">04.</span>
                  Integrated ecosystem connecting suppliers, service providers, and customers
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
            </div>
            
            <Button asChild variant="ghost" className="mt-8 border-2 border-orange-500 text-orange-500 hover:bg-orange-50">
              <Link to="/about">About<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vision & Objectives */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Vision & Objectives</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4">Vision</h3>
              <p className="text-gray-600">
                To become the leading marketing partner for healthcare providers, driving innovation and excellence in healthcare marketing.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4">Objectives</h3>
              <p className="text-gray-600">
                Deliver measurable results and sustainable growth for our clients through strategic marketing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Marketing Strategy {i}</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive marketing solutions tailored to your needs
                </p>
                <Link to="/services" className="text-orange-500 hover:text-orange-600">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partnerships */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Strategic Partnerships</h2>
        <div className="grid grid-cols-4 gap-8 text-center mb-12">
          <div>
            <div className="text-3xl font-bold text-orange-500">30k</div>
            <div className="text-gray-600">Visitors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">0</div>
            <div className="text-gray-600">Sales</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">0</div>
            <div className="text-gray-600">Growth</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">0</div>
            <div className="text-gray-600">Retention</div>
          </div>
        </div>
      </section>

      {/* Brand Presence Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Boost Your Brand Presence With Our Expertise, Smart Vision
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500">{i}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Feature {i}</h3>
                <p className="text-gray-600">
                  Comprehensive solutions to enhance your brand presence
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Marketing Results Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Real Marketing, Real Results</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {['Analytics', 'Market Research', 'Service Reviews', 'Location'].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-500">•</span>
              </div>
              <div>
                <h3 className="font-semibold">{item}</h3>
                <p className="text-gray-600">Strategic insights and analysis for better results</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 py-12">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your healthcare journey?</h2>
          <Button asChild variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
