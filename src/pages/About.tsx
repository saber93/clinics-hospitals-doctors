import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Building2, Puzzle, Users, Stethoscope, Target, TrendingUp } from 'lucide-react';

const About = () => {
  useEffect(() => {
    const animateElements = () => {
      const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
      
      fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          element.classList.add('appear');
        }
      });
    };

    setTimeout(animateElements, 100);
    
    window.addEventListener('scroll', animateElements);
    
    return () => window.removeEventListener('scroll', animateElements);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up">About Zams Marketing Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-left">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Innovative Marketing Solutions in the UAE</h2>
            <p className="text-lg mb-6">
              At Zams Marketing Management Company, we bring a unique and innovative approach to the UAE market. 
              Our strategic partnership model combined with our extensive customer and influencer network allows 
              us to create valuable connections that drive business growth for all our partners.
            </p>
            <Button className="skinnect-button-primary button-hover-slide hover-scale mt-4" asChild>
              <Link to="/contact">Connect With Us <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
          <div className="glass-card p-8 rounded-xl shadow-lg hover-lift fade-in-right">
            <div className="flex items-center mb-4">
              <Building2 className="text-primary h-8 w-8 mr-3" />
              <h3 className="text-xl font-semibold">Company Profile</h3>
            </div>
            <ul className="space-y-3 ml-5">
              <li><strong>Company Name:</strong> Zams Marketing Management Company</li>
              <li><strong>Industry:</strong> Marketing and Strategic Partnership Management</li>
              <li><strong>Target Market:</strong> United Arab Emirates</li>
              <li><strong>Founded:</strong> 2021</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16 fade-in-up stagger-delay-1">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Competitive Advantages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift hover-glow testimonial-card">
            <CardContent className="p-6">
              <div className="mb-4 text-primary">
                <Puzzle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Strategic Partnerships</h3>
              <p>Building valuable connections between suppliers, service providers, and customers to create an integrated ecosystem.</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift hover-glow testimonial-card">
            <CardContent className="p-6">
              <div className="mb-4 text-primary">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Network</h3>
              <p>Access to a vast network of customers and influencers across the UAE market, enabling rapid market penetration.</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift hover-glow testimonial-card">
            <CardContent className="p-6">
              <div className="mb-4 text-primary">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance-Based Model</h3>
              <p>Our financial model ties rewards directly to performance indicators, ensuring no upfront costs or risks for our partners.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16 py-12 bg-secondary/50 rounded-2xl p-8 fade-in-up stagger-delay-2">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Strategic Partnerships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-xl shadow-md hover-scale">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Stethoscope className="text-primary h-5 w-5" />
              </div>
              Healthcare Products
            </h3>
            <p className="mb-4">We partner with suppliers of:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Pharmacy products and medications</li>
              <li>Nutritional supplements</li>
              <li>Skin and hair care products</li>
              <li>Beauty and cosmetic items</li>
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl shadow-md hover-scale">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Building2 className="text-primary h-5 w-5" />
              </div>
              Medical Facilities
            </h3>
            <p className="mb-4">We maintain strategic relationships with:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Clinics and medical centers</li>
              <li>Healthcare service providers</li>
              <li>Beauty and wellness centers</li>
              <li>Specialty treatment facilities</li>
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl shadow-md hover-scale">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Target className="text-primary h-5 w-5" />
              </div>
              Medical Equipment
            </h3>
            <p className="mb-4">We source reliable suppliers for:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Clinic furnishings and interiors</li>
              <li>New and used medical equipment</li>
              <li>Fillers, Botox, and collagen stimulants</li>
              <li>Sterilization tools and supplies</li>
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl shadow-md hover-scale">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Users className="text-primary h-5 w-5" />
              </div>
              Service Providers
            </h3>
            <p className="mb-4">We connect customers with quality:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Personal beauty services</li>
              <li>Makeup and cosmetic services</li>
              <li>Hair care and styling</li>
              <li>Logistics and distribution partners</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16 fade-in-up stagger-delay-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-8 rounded-xl shadow-lg hover-brightness">
            <h2 className="text-2xl font-bold mb-6 text-primary">Our Vision</h2>
            <p className="text-lg mb-4">
              To be the essential bridge that connects service and product providers with customers, 
              creating an integrated ecosystem where all participants thrive through strategic partnerships 
              and innovative marketing solutions.
            </p>
            <p className="text-lg">
              We aim to revolutionize traditional marketing approaches by developing performance-based 
              models that align incentives and ensure sustainable growth for all stakeholders.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Objectives</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">1</div>
                <div className="ml-4">
                  <p>Establish a comprehensive network of strategic partnerships across the healthcare and beauty sectors in the UAE.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">2</div>
                <div className="ml-4">
                  <p>Implement performance indicator systems that tie financial rewards directly to achieving measurable targets.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">3</div>
                <div className="ml-4">
                  <p>Create value-added services that eliminate upfront costs and minimize risks for our partners.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">4</div>
                <div className="ml-4">
                  <p>Develop innovative marketing solutions tailored to the unique needs of the UAE market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 py-12 bg-primary/5 rounded-2xl p-8 fade-in-up stagger-delay-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Business Model</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6 text-center">
            Our unique value-adding model is built on two key principles that ensure 
            sustainable growth and mutual benefit for all partners.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="hover-lift hover-glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Strategic Partnerships</h3>
                <p>
                  We establish connections between service providers, product suppliers,
                  and customers that create value for all parties involved, fostering an
                  ecosystem of mutual growth and success.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift hover-glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Performance-Based Revenue</h3>
                <p>
                  Our financial entitlements are directly linked to precise key performance
                  indicators (KPIs), ensuring complete transparency and aligning our success
                  with that of our partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="fade-in-up stagger-delay-5">
        <div className="skinnect-gradient rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Network</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            With our unique experience in the UAE market, innovative marketing solutions, and
            dedication to building trust-based strategic partnerships, we invite you to collaborate
            with us for mutual success in this dynamic market.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 button-hover-slide hover-scale" size="lg" asChild>
            <Link to="/contact">Become a Partner Today <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
