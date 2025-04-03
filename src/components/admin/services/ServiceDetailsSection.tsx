
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { ServiceFormValues } from '@/hooks/useServiceForm';
import * as Icons from 'lucide-react';

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
  // Create a properly typed icon component
  const renderIcon = () => {
    if (!selectedIconName || typeof selectedIconName !== 'string') return null;
    
    // Check if the icon name exists in the Icons object
    const IconComponent = (Icons as Record<string, React.FC<{ className?: string }>>)[selectedIconName];
    
    // Only render if it's a valid icon component
    if (IconComponent && typeof IconComponent === 'function') {
      return <IconComponent className="w-6 h-6 text-primary" />;
    }
    
    return null;
  };

  return (
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
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
        </div>
        
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="icon_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input 
                      list="iconNames" 
                      placeholder="Select an icon name" 
                      {...field} 
                      className="flex-grow"
                    />
                    {selectedIconName && (
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/5 rounded">
                        {renderIcon()}
                      </div>
                    )}
                  </div>
                </FormControl>
                <datalist id="iconNames">
                  {availableIcons.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
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
      </div>
    </CardContent>
  );
}
