
import React from 'react';
import { Separator } from '@/components/ui/separator';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import AdditionalContactOptions from '@/components/contact/AdditionalContactOptions';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-4 text-gray-600">We'd love to hear from you. Get in touch with the Zames team.</p>
        
        <Separator className="my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          
          <div>
            <ContactInfo />
            <AdditionalContactOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
