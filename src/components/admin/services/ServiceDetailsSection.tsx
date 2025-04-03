
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { ServiceFormValues } from '@/hooks/useServiceForm';
import { ServiceBasicDetails } from './ServiceBasicDetails';
import { ServiceConfiguration } from './ServiceConfiguration';

interface ServiceDetailsSectionProps {
  form: UseFormReturn<ServiceFormValues>;
  availableIcons: string[];
  selectedIconName: string | null;
}

export default function ServiceDetailsSection({ 
  form, 
  availableIcons,
  selectedIconName 
}: ServiceDetailsSectionProps) {
  return (
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceBasicDetails form={form} />
        <ServiceConfiguration 
          form={form}
          availableIcons={availableIcons}
          selectedIconName={selectedIconName}
        />
      </div>
    </CardContent>
  );
}
