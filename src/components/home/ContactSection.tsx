
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone, MapPin, User, Info, Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast.error('Please agree to the data collection terms');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent!');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setAgreed(false);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact information */}
          <div>
            <p className="text-lg uppercase tracking-wider text-gray-700 mb-4">CONTACT US</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Have <br />Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We're here to help with any inquiries or collaboration
              opportunities. Reach out to us today!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-8 mr-4">
                  <MapPin className="h-6 w-6 text-gray-700" />
                </div>
                <span className="text-gray-800">UAE —15h Street, Office 478 - Dubai, B.O. 81566</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 mr-4">
                  <Phone className="h-6 w-6 text-gray-700" />
                </div>
                <span className="text-gray-800 font-medium">+971 56 910 2909</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 mr-4">
                  <Mail className="h-6 w-6 text-gray-700" />
                </div>
                <span className="text-gray-800">info@zames.marketing</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <label htmlFor="name" className="text-gray-700">Name</label>
                  </div>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <label htmlFor="email" className="text-gray-700">Email Address</label>
                  </div>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <label htmlFor="phone" className="text-gray-700">Phone</label>
                  </div>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-gray-500 mr-2" />
                    <label htmlFor="subject" className="text-gray-700">Subject</label>
                  </div>
                  <Input 
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-gray-500 mr-2 mt-1" />
                  <label htmlFor="message" className="text-gray-700">How can we help you? Feel free to get in touch!</label>
                </div>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[100px] border-b border-gray-300 rounded-none px-0 resize-none bg-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="rounded-sm"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree that my data is <span className="underline">collected and stored</span>
                </label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-mint-500 hover:bg-mint-600 text-white rounded-md px-8 py-2.5"
              >
                <Send className="mr-2 h-5 w-5" /> Get In Touch
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
