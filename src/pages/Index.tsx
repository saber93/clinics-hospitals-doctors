import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Clock, Shield, Heart, ArrowRight, ArrowDown, CheckCircle, MapPin, Gift } from "lucide-react";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial load animations
    const animateInitialElements = () => {
      const initialElements = document.querySelectorAll('.initial-animation');
      initialElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('appear');
        }, index * 100);
      });
    };

    // Animation for elements when they come into view during scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered animations to children
            const children = entry.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('appear');
              }, index * 100);
            });
            
            // For elements without children that need animation
            if (entry.target.classList.contains('fade-in-up') || 
                entry.target.classList.contains('fade-in-left') || 
                entry.target.classList.contains('fade-in-right')) {
              entry.target.classList.add('appear');
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Initial load animations
    animateInitialElements();

    // Select all container elements to observe for scroll animations
    const animatedContainers = document.querySelectorAll('.scroll-animate-container');
    animatedContainers.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animatedContainers.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative py-20 px-4 md:px-8 min-h-[90vh] flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-mint-50 to-skin-50 opacity-30 z-0"></div>
        <div className="max-w-7xl mx-auto z-10 w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium initial-animation fade-in-up">
                Revolutionizing Skin Care
              </div>
              <h1 className="text-4xl md:text-6xl font-bold skinnect-gradient bg-clip-text text-transparent leading-tight mt-4 initial-animation fade-in-up stagger-delay-1">
                Connect With Beauty Specialists
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mt-4 initial-animation fade-in-up stagger-delay-2">
                Discover, book, and experience top-rated skin and body care professionals in your area. Your path to radiant skin starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 initial-animation fade-in-up stagger-delay-3">
                <Button asChild size="lg" className="skinnect-button-primary hover-glow">
                  <Link to="/auth?mode=login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" className="skinnect-button-outline hover-lift">
                  <Link to="/auth?mode=register">Create Account</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-6 initial-animation fade-in-up stagger-delay-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-primary" />
                  <span>10K+ Users</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-primary" />
                  <span>4.9 Rating</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-primary" />
                  <span>Secure Booking</span>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-8 -left-8 w-full h-full bg-primary/10 rounded-2xl transform rotate-3 initial-animation fade-in-right"></div>
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Skin Care Professional" 
                className="rounded-2xl shadow-xl object-cover w-full h-[500px] initial-animation fade-in-right stagger-delay-1"
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator initial-animation fade-in-up stagger-delay-5" onClick={() => scrollToSection(featuresRef)}>
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="h-6 w-6" />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 md:px-8 bg-secondary" ref={featuresRef}>
        <div className="max-w-7xl mx-auto scroll-animate-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">How Skinnect Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-in-up stagger-delay-1">
              Your journey to radiant skin and wellness is just three simple steps away
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-none shadow-lg fade-in-up stagger-delay-2 hover-lift card-with-image">
              <div className="card-image-hover h-48">
                <img 
                  src="https://images.unsplash.com/photo-1573461160327-b422e32d3918?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Discover Professionals" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover Professionals</h3>
                <p className="text-gray-600">Browse through numerous specialists in your area with detailed profiles and reviews.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg fade-in-up stagger-delay-3 hover-lift card-with-image">
              <div className="card-image-hover h-48">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Book Appointments" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Book Appointments</h3>
                <p className="text-gray-600">Select your preferred date and time with just a few clicks. Receive instant confirmation.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg fade-in-up stagger-delay-4 hover-lift card-with-image">
              <div className="card-image-hover h-48">
                <img 
                  src="https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Enjoy Your Service" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enjoy Your Service</h3>
                <p className="text-gray-600">Experience premium skin care treatments from certified professionals and see results.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto scroll-animate-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">Our Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-in-up stagger-delay-1">
              Experience the best in skin care booking with our user-friendly platform features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="skinnect-card fade-in-up stagger-delay-2 hover-scale card-with-image">
              <div className="card-image-hover h-48 -mx-6 -mt-6 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Easy Booking" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M16 8h.01" />
                  <path d="M8 16h.01" />
                  <path d="M12 12h.01" />
                  <path d="M8 8h.01" />
                  <path d="M16 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Easy Booking</h3>
              <p className="text-gray-600 mb-4 text-center">Book appointments with your favorite specialists with just a few clicks, anytime and anywhere.</p>
              <Button asChild className="skinnect-button-outline w-full hover-glow button-hover-slide">
                <Link to="/reservations">Book Now</Link>
              </Button>
            </div>
            <div className="skinnect-card fade-in-up stagger-delay-3 hover-scale card-with-image">
              <div className="card-image-hover h-48 -mx-6 -mt-6 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Special Offers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Special Offers</h3>
              <p className="text-gray-600 mb-4 text-center">Access exclusive deals and promotions from top clinics. Save on premium treatments and services.</p>
              <Button asChild className="skinnect-button-outline w-full hover-glow button-hover-slide">
                <Link to="/offers">View Offers</Link>
              </Button>
            </div>
            <div className="skinnect-card fade-in-up stagger-delay-4 hover-scale card-with-image">
              <div className="card-image-hover h-48 -mx-6 -mt-6 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1629131484002-cea2cdaa99b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital Vouchers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Digital Vouchers</h3>
              <p className="text-gray-600 mb-4 text-center">Easily redeem and manage your vouchers and promo codes. Gift treatments to friends and family.</p>
              <Button asChild className="skinnect-button-outline w-full hover-glow button-hover-slide">
                <Link to="/vouchers">My Vouchers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 px-4 md:px-8 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10 scroll-animate-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-in-up stagger-delay-1">
              Don't just take our word for it - hear from some of our satisfied clients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-white fade-in-left stagger-delay-2 hover-lift hover-rotate">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center">
                      <Heart className="text-primary h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"Skinnect made it so easy to find the perfect facial treatment. The booking process was smooth, and I could see all the reviews before making my choice."</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-white fade-in-up stagger-delay-3 hover-lift hover-rotate">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center">
                      <Heart className="text-primary h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Davis</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"As someone who travels frequently, finding consistent quality skincare services was always a challenge until I discovered Skinnect. Now I can book appointments anywhere."</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-white fade-in-right stagger-delay-4 hover-lift hover-rotate">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center">
                      <Heart className="text-primary h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jessica Wong</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The special offers and voucher system saved me a lot of money on my regular treatments. I've recommended Skinnect to all of my friends who love skincare!"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto scroll-animate-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 fade-in-up stagger-delay-1">
              Find answers to the most common questions about Skinnect
            </p>
          </div>
          <div className="space-y-6">
            <Card className="fade-in-up stagger-delay-2 hover-glow hover-brightness">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  How do I book an appointment?
                </h3>
                <p className="text-gray-600">Simply create an account, search for specialists in your area, select your preferred service, and choose an available time slot. Confirmation is instant!</p>
              </CardContent>
            </Card>
            <Card className="fade-in-up stagger-delay-3 hover-glow hover-brightness">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Can I cancel or reschedule my appointment?
                </h3>
                <p className="text-gray-600">Yes, you can easily cancel or reschedule your appointment through your dashboard up to 24 hours before your scheduled time without any penalty.</p>
              </CardContent>
            </Card>
            <Card className="fade-in-up stagger-delay-4 hover-glow hover-brightness">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  How do digital vouchers work?
                </h3>
                <p className="text-gray-600">Digital vouchers can be purchased on our platform and used as payment for services. They can also be gifted to friends and family via email.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-mint-500 to-skin-500 text-white">
        <div className="max-w-7xl mx-auto text-center scroll-animate-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in-up">Ready to experience the best in skin care?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto fade-in-up stagger-delay-1">
            Join thousands of happy clients who have transformed their skin and body care routine. Your glowing skin journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-delay-2">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 hover-scale button-hover-slide">
              <Link to="/auth?mode=register">Get Started Today</Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white hover:bg-white/10 hover-scale button-hover-slide">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
          <div className="mt-12 flex justify-center gap-8 fade-in-up stagger-delay-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Available in 50+ cities</span>
            </div>
            <div className="flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              <span>Gift cards available</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>24/7 Customer support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
