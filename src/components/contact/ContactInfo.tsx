
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <Card className="shadow-lg border-none mb-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Headquarters</p>
              <p className="text-gray-600">UAE —15h Street, Office 478 - Dubai, B.O. 81566</p>
            </div>
          </li>
          <li className="flex items-start">
            <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Support Hotline</p>
              <p className="text-gray-600">+971 56 910 2909</p>
            </div>
          </li>
          <li className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-600">info@zames.marketing</p>
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
  );
};

export default ContactInfo;
