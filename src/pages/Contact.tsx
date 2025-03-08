
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { ArrowRight, Mail, Phone, MapPin, Clock, MessageSquare, Send, LinkedinIcon, InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-left">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Get in Touch</h2>
            <p className="text-lg mb-6">
              Have questions about our services or partnership opportunities? Our team is here to help.
              Reach out to us using the contact form or through any of our communication channels.
            </p>
            <div className="card-image-hover rounded-xl overflow-hidden shadow-lg mb-8">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Business professionals shaking hands" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <div className="glass-card p-8 rounded-xl shadow-lg hover-lift fade-in-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter your name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="skinnect-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="skinnect-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="What is this regarding?" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="skinnect-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell us about your inquiry..." 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows={5}
                  className="skinnect-input w-full rounded-md resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                className="skinnect-button-primary button-hover-slide hover-scale w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} 
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="mb-16 fade-in-up stagger-delay-1">
        <h2 className="text-3xl font-bold mb-8 text-center">Ways to Connect</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift hover-glow testimonial-card">
            <CardContent className="p-6">
              <div className="mb-4 text-primary">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="mb-2">Give us a call</p>
              <a href="tel:+971501234567" className="text-primary hover:underline">+971 50 123 4567</a>
            </CardContent>
          </Card>
          
          <Card className="hover-lift hover-glow testimonial-card">
            <CardContent className="p-6">
              <div className="mb-4 text-primary">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="mb-2">Send us an email</p>
              <a href="mailto:info@zams.com" className="text-primary hover:underline">info@zams.com</a>
            </CardContent>
          </Card>
          
          <Card className="hover-lift hover-glow testimonial-card">
            <CardContent className="p-6">
              <div className="mb-4 text-primary">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="mb-2">Visit our office</p>
              <address className="not-italic">Dubai Business Bay, UAE</address>
            </CardContent>
          </Card>
          
          <Card className="hover-lift hover-glow testimonial-card">
            <CardContent className="p-6">
              <div className="mb-4 text-primary">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="mb-2">Our working hours</p>
              <p>Sun-Thu: 9AM - 6PM</p>
              <p>Fri-Sat: Closed</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16 py-12 bg-secondary/50 rounded-2xl p-8 fade-in-up stagger-delay-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Follow Us</h2>
            <p className="text-lg">
              Stay connected with us on social media for the latest updates, 
              announcements, and insights into the UAE market.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-all duration-300">
                <FacebookIcon className="text-primary h-6 w-6" />
              </a>
              <a href="#" className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-all duration-300">
                <InstagramIcon className="text-primary h-6 w-6" />
              </a>
              <a href="#" className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-all duration-300">
                <TwitterIcon className="text-primary h-6 w-6" />
              </a>
              <a href="#" className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-all duration-300">
                <LinkedinIcon className="text-primary h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="card-image-hover rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1592772874383-d08932d29db7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1827&q=80" 
              alt="Mobile devices with social media" 
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mb-16 fade-in-up stagger-delay-3">
        <h2 className="text-3xl font-bold mb-8 text-center">Partnership Inquiries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-with-image overflow-hidden rounded-xl shadow-lg">
            <div className="card-image-hover h-48">
              <img 
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Healthcare products" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-2">Healthcare Products</h3>
              <p className="mb-4">Interested in our healthcare products partnership program?</p>
              <Button variant="outline" size="sm" className="hover-scale" asChild>
                <Link to="/contact?inquiry=healthcare">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          
          <div className="card-with-image overflow-hidden rounded-xl shadow-lg">
            <div className="card-image-hover h-48">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Medical facility" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-2">Medical Facilities</h3>
              <p className="mb-4">Explore our partnerships with medical centers and clinics.</p>
              <Button variant="outline" size="sm" className="hover-scale" asChild>
                <Link to="/contact?inquiry=medical">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          
          <div className="card-with-image overflow-hidden rounded-xl shadow-lg">
            <div className="card-image-hover h-48">
              <img 
                src="https://images.unsplash.com/photo-1562243061-204550d8a2c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                alt="Beauty products" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-2">Beauty Services</h3>
              <p className="mb-4">Join our network of beauty and wellness service providers.</p>
              <Button variant="outline" size="sm" className="hover-scale" asChild>
                <Link to="/contact?inquiry=beauty">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 fade-in-up stagger-delay-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-8 rounded-xl shadow-lg hover-brightness">
            <h2 className="text-2xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How can I become a partner?</h3>
                <p>Fill out our contact form with your business details and partnership interests. Our team will reach out to discuss opportunities.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What areas do you serve?</h3>
                <p>We currently operate across the United Arab Emirates, with a focus on Dubai, Abu Dhabi, and Sharjah.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How does your partnership model work?</h3>
                <p>Our model is based on performance indicators with no upfront costs. We only succeed when you succeed.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="card-image-hover rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Business meeting" 
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="text-primary h-5 w-5" />
                </div>
                <h3 className="font-semibold">Quick Response</h3>
              </div>
              <p className="text-sm">Our team typically responds to inquiries within 24 hours during business days.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fade-in-up stagger-delay-5">
        <div className="skinnect-gradient rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Whether you're looking to become a partner, have questions about our services,
            or just want to learn more about what we do, we're here to help.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 button-hover-slide hover-scale" size="lg" asChild>
            <a href="#top">Contact Us Today <ArrowRight className="ml-2" /></a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
