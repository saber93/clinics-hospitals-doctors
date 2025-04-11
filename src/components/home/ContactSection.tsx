
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone, MapPin, User, Info, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast.error(t('contact.agreeToTerms'));
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success(t('contact.messageSent'));
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
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12", isRTL && "rtl-content")}>
          {/* Left side - Contact information */}
          <div className={isRTL ? "text-right" : ""}>
            <p className="text-lg uppercase tracking-wider text-gray-700 mb-4">{t('contact.title')}</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              {t('contact.haveQuestions')} <br />
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              {t('contact.subtitle')}
            </p>
            
            <div className="space-y-6">
              <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className={cn("w-8", isRTL ? "ml-4" : "mr-4")}>
                  <MapPin className="h-6 w-6 text-gray-700" />
                </div>
                <span className="text-gray-800">{t('contact.officeAddress')}</span>
              </div>
              
              <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className={cn("w-8", isRTL ? "ml-4" : "mr-4")}>
                  <Phone className="h-6 w-6 text-gray-700" />
                </div>
                <span className="text-gray-800 font-medium">+971 56 910 2909</span>
              </div>
              
              <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className={cn("w-8", isRTL ? "ml-4" : "mr-4")}>
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
                  <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                    <User className={cn("h-5 w-5 text-gray-500", isRTL ? "ml-2" : "mr-2")} />
                    <label htmlFor="name" className="text-gray-700">{t('contact.fullName')}</label>
                  </div>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                    <Mail className={cn("h-5 w-5 text-gray-500", isRTL ? "ml-2" : "mr-2")} />
                    <label htmlFor="email" className="text-gray-700">{t('contact.email')}</label>
                  </div>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                    <Phone className={cn("h-5 w-5 text-gray-500", isRTL ? "ml-2" : "mr-2")} />
                    <label htmlFor="phone" className="text-gray-700">{t('contact.phoneNumber')}</label>
                  </div>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                    <Info className={cn("h-5 w-5 text-gray-500", isRTL ? "ml-2" : "mr-2")} />
                    <label htmlFor="subject" className="text-gray-700">{t('contact.subject')}</label>
                  </div>
                  <Input 
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="border-b border-gray-300 rounded-none px-0 bg-transparent"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className={cn("flex items-start", isRTL && "flex-row-reverse")}>
                  <Info className={cn("h-5 w-5 text-gray-500 mt-1", isRTL ? "ml-2" : "mr-2")} />
                  <label htmlFor="message" className="text-gray-700">{t('contact.messageHelp')}</label>
                </div>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[100px] border-b border-gray-300 rounded-none px-0 resize-none bg-transparent"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              
              <div className={cn("flex items-center space-x-2", isRTL && "flex-row-reverse space-x-reverse")}>
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
                  {t('contact.agreeToDataCollection')}
                </label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-mint-500 hover:bg-mint-600 text-white rounded-md px-8 py-2.5"
              >
                <Send className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} /> 
                {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
