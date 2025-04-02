
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-4 text-gray-600">We'd love to hear from you. Get in touch with the Zames team.</p>
        
        <Separator className="my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help you?" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide details about your inquiry..." 
                      className="min-h-[150px]" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : submitted ? 
                      <span className="flex items-center">
                        <Check className="mr-2 h-4 w-4" /> Sent!
                      </span> : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-lg border-none mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p className="text-gray-600">123 Zames Avenue, Beauty District, CA 90210</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Support Hotline</p>
                      <p className="text-gray-600">+1 (800) 123-4567</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">support@zames.com</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <div className="bg-primary/10 rounded-lg p-4 shadow-md">
                <h3 className="font-medium mb-2">Clinic Partnership Inquiries</h3>
                <p className="text-sm text-gray-600">
                  If you're a clinic or skincare professional interested in joining our platform:
                </p>
                <p className="text-primary font-bold mt-1">
                  partners@zames.com
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-primary/5 rounded-lg p-4 shadow-md">
                <h3 className="font-medium mb-2">Emergency Contact</h3>
                <p className="text-sm text-gray-600">
                  For urgent medical concerns, please contact:
                </p>
                <p className="text-primary font-bold mt-1">
                  +1 (800) 999-8888
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
