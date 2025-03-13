
import React, { useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const fadeRefsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const fadeRefs = fadeRefsRef.current.filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });
    
    fadeRefs.forEach((ref) => {
      observer.observe(ref);
    });
    
    return () => {
      fadeRefs.forEach((ref) => {
        observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <div 
            className="fade-in-up" 
            ref={(el) => fadeRefsRef.current[0] = el}
          >
            <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about Zams Marketing Management Company and our innovative approach to strategic partnerships
            </p>
          </div>
        </header>
        
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div 
              className="fade-in-left" 
              ref={(el) => fadeRefsRef.current[1] = el}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Company</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">
                  At Zams Marketing Management Company, we bring a unique and innovative experience to the UAE market. 
                  Our approach centers on building strategic partnerships that create mutual value and sustainable growth. 
                  Through our extensive customer and influencer network, we connect businesses with their ideal audience, 
                  amplifying their market presence and enhancing their competitive edge.
                </p>
              </div>
            </div>
            <div 
              className="fade-in-right card-image-hover rounded-xl overflow-hidden shadow-lg" 
              ref={(el) => fadeRefsRef.current[2] = el}
            >
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Business partners shaking hands" 
                className="w-full h-64 object-cover hover-brightness"
              />
            </div>
          </div>
        </section>

        <Separator className="my-12" />
        
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
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Strategic Partnerships</h2>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div 
              className="fade-in-left stagger-delay-1" 
              ref={(el) => fadeRefsRef.current[3] = el}
            >
              <Card className="bg-white shadow-sm rounded-xl overflow-hidden hover-lift hover-glow h-full">
                <div className="card-image-hover h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Pharmacy Products" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">Product Suppliers</h3>
                  <p className="text-gray-700">
                    We collaborate with quality suppliers of pharmacy products, medications, nutritional supplements, 
                    skin and hair care, and beauty items to ensure our partners have access to the best products.
                  </p>
                </div>
              </Card>
            </div>
            
            <div 
              className="fade-in-right stagger-delay-2" 
              ref={(el) => fadeRefsRef.current[4] = el}
            >
              <Card className="bg-white shadow-sm rounded-xl overflow-hidden hover-lift hover-glow h-full">
                <div className="card-image-hover h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Medical Center" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">Clinics and Medical Centers</h3>
                  <p className="text-gray-700">
                    Our strategic relationships with healthcare facilities ensure high-quality services for customers
                    while providing clinics with reliable patient flow and business growth.
                  </p>
                </div>
              </Card>
            </div>
            
            <div 
              className="fade-in-left stagger-delay-3" 
              ref={(el) => fadeRefsRef.current[5] = el}
            >
              <Card className="bg-white shadow-sm rounded-xl overflow-hidden hover-lift hover-glow h-full">
                <div className="card-image-hover h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Logistics" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">Logistics Companies</h3>
                  <p className="text-gray-700">
                    We partner with reliable logistics providers to ensure seamless distribution and delivery,
                    maintaining product integrity and customer satisfaction throughout the supply chain.
                  </p>
                </div>
              </Card>
            </div>
            
            <div 
              className="fade-in-right stagger-delay-4" 
              ref={(el) => fadeRefsRef.current[6] = el}
            >
              <Card className="bg-white shadow-sm rounded-xl overflow-hidden hover-lift hover-glow h-full">
                <div className="card-image-hover h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Beauty Services" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">Personal Services Providers</h3>
                  <p className="text-gray-700">
                    Our network includes professional makeup artists, hair care specialists, and other beauty service
                    providers, connecting them with clients who seek premium personal care services.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="mb-16 bg-primary/5 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div 
              className="fade-in-left" 
              ref={(el) => fadeRefsRef.current[7] = el}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Supplying Clinics and Medical Centers</h2>
              <p className="text-lg text-gray-700 mb-6">
                We are dedicated to sourcing reliable suppliers for medical facilities, ensuring they have everything
                needed to provide exceptional patient care.
              </p>
            </div>
            <div 
              className="fade-in-right card-image-hover rounded-xl overflow-hidden shadow-lg" 
              ref={(el) => fadeRefsRef.current[8] = el}
            >
              <img 
                src="https://images.unsplash.com/photo-1516549655926-6bdb631f369f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Medical supplies" 
                className="w-full h-64 object-cover hover-brightness"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div 
              className="bg-white rounded-lg shadow-sm p-6 hover-lift hover-glow fade-in-up stagger-delay-1" 
              ref={(el) => fadeRefsRef.current[9] = el}
            >
              <h3 className="text-lg font-semibold text-primary mb-2">Clinic Furnishings</h3>
              <p className="text-gray-700">
                Functional and aesthetically pleasing furniture and fixtures designed for healthcare environments.
              </p>
            </div>
            
            <div 
              className="bg-white rounded-lg shadow-sm p-6 hover-lift hover-glow fade-in-up stagger-delay-2" 
              ref={(el) => fadeRefsRef.current[10] = el}
            >
              <h3 className="text-lg font-semibold text-primary mb-2">Medical Equipment</h3>
              <p className="text-gray-700">
                Both new and used medical equipment that meets international quality and safety standards.
              </p>
            </div>
            
            <div 
              className="bg-white rounded-lg shadow-sm p-6 hover-lift hover-glow fade-in-up stagger-delay-3" 
              ref={(el) => fadeRefsRef.current[11] = el}
            >
              <h3 className="text-lg font-semibold text-primary mb-2">Essential Supplies</h3>
              <p className="text-gray-700">
                Fillers, Botox, collagen stimulants, sterilization tools, and other critical medical supplies.
              </p>
            </div>
          </div>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div 
              className="fade-in-left" 
              ref={(el) => fadeRefsRef.current[12] = el}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision and Objectives</h2>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vision</h3>
                <p className="text-lg text-gray-700">
                  To be the bridge that connects service/product providers with customers, creating an integrated
                  ecosystem where all participants thrive through mutual benefit and collaborative growth.
                </p>
              </div>
            </div>
            <div 
              className="fade-in-right card-image-hover rounded-xl overflow-hidden shadow-lg" 
              ref={(el) => fadeRefsRef.current[13] = el}
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Business meeting" 
                className="w-full h-64 object-cover hover-brightness"
              />
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Objectives</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">
                <strong className="text-gray-900">Establish Valuable Partnerships:</strong> Create and nurture strategic relationships that deliver measurable value to all parties involved.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">
                <strong className="text-gray-900">Drive Performance:</strong> Implement a robust performance indicator system that ties financial rewards to achieving specific targets.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">
                <strong className="text-gray-900">Minimize Risk:</strong> Eliminate upfront costs and financial risks for our partners through our performance-based compensation model.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/20 text-primary font-bold rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">
                <strong className="text-gray-900">Foster Innovation:</strong> Continuously develop innovative marketing solutions that address the evolving needs of the UAE market.
              </span>
            </li>
          </ul>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Business Model</h2>
          <Card className="bg-white shadow-md border-none rounded-xl">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 mb-6">
                Our value-adding model is centered on creating sustainable growth for all our partners through:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                  className="border-l-4 border-primary pl-4 fade-in-left stagger-delay-1" 
                  ref={(el) => fadeRefsRef.current[14] = el}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Strategic Partnerships</h3>
                  <p className="text-gray-700">
                    We establish meaningful relationships that benefit all parties involved, focusing on long-term 
                    collaboration rather than transactional interactions. Our partnerships are built on trust, 
                    transparency, and mutual growth objectives.
                  </p>
                </div>
                
                <div 
                  className="border-l-4 border-primary pl-4 fade-in-right stagger-delay-2" 
                  ref={(el) => fadeRefsRef.current[15] = el}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance-Based Compensation</h3>
                  <p className="text-gray-700">
                    Our financial entitlements are directly linked to precise performance indicators (KPIs), 
                    ensuring transparency and sustainability. This approach aligns our success with that of our 
                    partners, creating a genuine win-win situation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-16 text-center">
          <div 
            className="fade-in-up" 
            ref={(el) => fadeRefsRef.current[16] = el}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us on Our Journey</h2>
            <div className="prose max-w-3xl mx-auto text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Zams Marketing Management Company brings a unique experience to the UAE market, combining innovative 
                marketing solutions with a deep commitment to building trust-based, strategic partnerships. Our 
                dedication to excellence, coupled with our performance-driven approach, ensures that we deliver 
                measurable results for all our partners.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We invite potential partners to collaborate with us for mutual success. Together, we can create an
                integrated ecosystem where businesses thrive and customers receive exceptional products and services.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 button-hover-slide"
            >
              Contact Us to Become a Partner
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
