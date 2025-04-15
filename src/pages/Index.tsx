
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Marketing Deserves
            <span className="text-orange-500 block">Expert Care</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            We help businesses achieve sustainable growth through strategic marketing solutions
          </p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link to="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Growth Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="/lovable-uploads/454cda5b-8224-49a1-8193-8cd03939800c.png" 
              alt="Team meeting" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">We help you achieve sustainable growth</h2>
            <p className="text-gray-600 mb-6">
              Our expert team works with you to develop and implement effective marketing strategies that drive results.
            </p>
            <Button asChild variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
              <Link to="/services">Learn More</Link>
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
