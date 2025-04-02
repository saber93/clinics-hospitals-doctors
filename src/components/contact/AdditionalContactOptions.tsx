
import React from 'react';

interface ContactOptionProps {
  title: string;
  description: string;
  contactDetail: string;
}

const ContactOption = ({ title, description, contactDetail }: ContactOptionProps) => {
  return (
    <div className="bg-primary/5 rounded-lg p-4 shadow-md">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-600">
        {description}
      </p>
      <p className="text-primary font-bold mt-1">
        {contactDetail}
      </p>
    </div>
  );
};

const AdditionalContactOptions = () => {
  return (
    <>
      <div className="mt-6">
        <ContactOption 
          title="Clinic Partnership Inquiries"
          description="If you're a clinic or skincare professional interested in joining our platform:"
          contactDetail="partners@zames.marketing"
        />
      </div>
      
      <div className="mt-6">
        <ContactOption 
          title="Emergency Contact"
          description="For urgent medical concerns, please contact:"
          contactDetail="+971 56 910 2909"
        />
      </div>
    </>
  );
};

export default AdditionalContactOptions;
