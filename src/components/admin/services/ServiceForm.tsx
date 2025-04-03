
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useServiceForm } from '@/hooks/useServiceForm';
import ServiceDetailsSection from './ServiceDetailsSection';
import ServiceFormActions from './ServiceFormActions';

export default function ServiceForm() {
  const { form, isEditMode, isFetchingService, mutation, onSubmit } = useServiceForm();
  
  // Get all available Lucide icon names
  const availableIcons = Object.keys(Icons).filter(
    (key) => typeof Icons[key as keyof typeof Icons] === 'function'
  );
  
  // Preview the selected icon
  const selectedIcon = form.watch('icon_name');
  // This was causing the error - storing the component instead of rendering it
  const IconComponent = selectedIcon ? (Icons as any)[selectedIcon] : null;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Service' : 'Create New Service'}
      </h1>
      
      {isFetchingService ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <ServiceDetailsSection 
                form={form}
                availableIcons={availableIcons}
                IconComponent={IconComponent}
              />
            </Card>
            
            <ServiceFormActions 
              isEditMode={isEditMode}
              isPending={mutation.isPending}
            />
          </form>
        </Form>
      )}
    </div>
  );
}
