
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          subject,
          message
        });
      
      if (error) {
        throw error;
      }

      toast.success(t('contact.messageSent'));
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(true);
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-none">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">{t('contact.sendMessage')}</h2>
        <form onSubmit={handleSubmit} className={cn("space-y-4", isRTL && "rtl-content text-right")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('contact.fullName')}</Label>
              <Input 
                id="name" 
                placeholder={isRTL ? "محمد أحمد" : "John Doe"} 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={isRTL ? "text-right" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('contact.email')}</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder={isRTL ? "محمد@example.com" : "john@example.com"} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={isRTL ? "text-right" : ""}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">{t('contact.subject')}</Label>
            <Input 
              id="subject" 
              placeholder={isRTL ? "كيف يمكننا مساعدتك؟" : "How can we help you?"} 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className={isRTL ? "text-right" : ""}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">{t('contact.message')}</Label>
            <Textarea 
              id="message" 
              placeholder={isRTL ? "يرجى تقديم تفاصيل حول استفسارك..." : "Please provide details about your inquiry..."} 
              className={cn("min-h-[150px]", isRTL && "text-right")} 
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
            {isSubmitting ? t('contact.sending') : submitted ? 
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> {t('contact.messageSent')}
              </span> : t('contact.sendMessage')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
