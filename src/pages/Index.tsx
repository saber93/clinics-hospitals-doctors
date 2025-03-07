
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Clock, Shield, Heart, ArrowRight } from "lucide-react";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for elements when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Select all elements to be animated
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
            <div className="animate-on-scroll space-y-6">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                Revolutionizing Skin Care
              </div>
              <h1 className="text-4xl md:text-6xl font-bold skinnect-gradient bg-clip-text text-transparent leading-tight">
                Connect With Beauty Specialists
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Discover, book, and experience top-rated skin and body care professionals in your area. Your path to radiant skin starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="skinnect-button-primary">
                  <Link to="/auth?mode=login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" className="skinnect-button-outline">
                  <Link to="/auth?mode=register">Create Account</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-6">
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
            <div className="relative animate-on-scroll hidden md:block">
              <div className="absolute -top-8 -left-8 w-full h-full bg-primary/10 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Skin Care Professional" 
                className="rounded-2xl shadow-xl object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 md:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Skinnect Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your journey to radiant skin and wellness is just three simple steps away
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-none shadow-lg animate-on-scroll">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover Professionals</h3>
                <p className="text-gray-600">Browse through numerous specialists in your area with detailed profiles and reviews.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg animate-on-scroll">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Book Appointments</h3>
                <p className="text-gray-600">Select your preferred date and time with just a few clicks. Receive instant confirmation.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg animate-on-scroll">
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
      <section ref={featuresRef} className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best in skin care booking with our user-friendly platform features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="skinnect-card animate-on-scroll transform transition-all duration-300 hover:-translate-y-2">
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
              <Button asChild className="skinnect-button-outline w-full">
                <Link to="/reservations">Book Now</Link>
              </Button>
            </div>
            <div className="skinnect-card animate-on-scroll transform transition-all duration-300 hover:-translate-y-2">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Special Offers</h3>
              <p className="text-gray-600 mb-4 text-center">Access exclusive deals and promotions from top clinics. Save on premium treatments and services.</p>
              <Button asChild className="skinnect-button-outline w-full">
                <Link to="/offers">View Offers</Link>
              </Button>
            </div>
            <div className="skinnect-card animate-on-scroll transform transition-all duration-300 hover:-translate-y-2">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Digital Vouchers</h3>
              <p className="text-gray-600 mb-4 text-center">Easily redeem and manage your vouchers and promo codes. Gift treatments to friends and family.</p>
              <Button asChild className="skinnect-button-outline w-full">
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
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied clients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-white animate-on-scroll">
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
            <Card className="border-none shadow-lg bg-white animate-on-scroll">
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
            <Card className="border-none shadow-lg bg-white animate-on-scroll">
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find answers to the most common questions about Skinnect
            </p>
          </div>
          <div className="space-y-6">
            <Card className="animate-on-scroll">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">How do I book an appointment?</h3>
                <p className="text-gray-600">Simply create an account, search for specialists in your area, select your preferred service, and choose an available time slot. Confirmation is instant!</p>
              </CardContent>
            </Card>
            <Card className="animate-on-scroll">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Can I cancel or reschedule my appointment?</h3>
                <p className="text-gray-600">Yes, you can easily cancel or reschedule your appointment through your dashboard up to 24 hours before your scheduled time without any penalty.</p>
              </CardContent>
            </Card>
            <Card className="animate-on-scroll">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">How do digital vouchers work?</h3>
                <p className="text-gray-600">Digital vouchers can be purchased on our platform and used as payment for services. They can also be gifted to friends and family via email.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-mint-500 to-skin-500 text-white">
        <div className="max-w-7xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience the best in skin care?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of happy clients who have transformed their skin and body care routine. Your glowing skin journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/auth?mode=register">Get Started Today</Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white hover:bg-white/10">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
