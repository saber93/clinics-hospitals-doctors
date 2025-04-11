
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { ServiceFormValues } from '@/hooks/useServiceForm';
import { useTranslation } from '@/hooks/useTranslation';

interface ServiceBasicDetailsProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceBasicDetails({ form }: ServiceBasicDetailsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ar">العربية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="en" className="space-y-6 mt-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Health Assessment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Describe the service..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
        
        <TabsContent value="ar" className="space-y-6 mt-6">
          <FormField
            control={form.control}
            name="title_ar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Title (Arabic)</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: تقييم الصحة" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description_ar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Arabic)</FormLabel>
                <FormControl>
                  <Input placeholder="وصف الخدمة..." {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
