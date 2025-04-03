
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { ServiceFormValues } from '@/hooks/useServiceForm';
import { IconSelector } from './IconSelector';

interface ServiceConfigurationProps {
  form: UseFormReturn<ServiceFormValues>;
  availableIcons: string[];
  selectedIconName: string | null;
}

export function ServiceConfiguration({ 
  form, 
  availableIcons,
  selectedIconName 
}: ServiceConfigurationProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="icon_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl>
              <div className="flex space-x-2">
                <IconSelector
                  value={field.value}
                  onChange={field.onChange}
                  availableIcons={availableIcons}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="display_order"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Display Order</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0" 
                placeholder="0" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="is_active"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
            <div>
              <FormLabel>Active</FormLabel>
              <div className="text-sm text-muted-foreground">
                Display this service on the website
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
