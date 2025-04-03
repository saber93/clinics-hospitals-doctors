
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { ServiceFormValues } from '@/hooks/useServiceForm';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search } from 'lucide-react';

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
  const [iconSearchTerm, setIconSearchTerm] = useState('');
  
  // Create a properly typed icon component
  const renderIcon = () => {
    if (!selectedIconName || typeof selectedIconName !== 'string') return null;
    
    // Safely access the icon component with proper type assertions
    const IconComponent = (Icons as Record<string, React.ComponentType<LucideProps>>)[selectedIconName];
    
    if (IconComponent) {
      return <IconComponent className="w-6 h-6 text-primary" />;
    }
    
    return null;
  };

  // Filter icons based on search term
  const filteredIcons = availableIcons.filter(
    (name) => name.toLowerCase().includes(iconSearchTerm.toLowerCase())
  );

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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                          role="combobox"
                        >
                          <div className="flex items-center">
                            {field.value && (
                              <div className="mr-2">
                                {renderIcon()}
                              </div>
                            )}
                            {field.value || "Select an icon"}
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <div className="p-2 border-b">
                          <div className="flex items-center gap-2 mb-1">
                            <Search className="h-4 w-4 opacity-50 flex-shrink-0" />
                            <Input
                              placeholder="Search icons..."
                              value={iconSearchTerm}
                              onChange={(e) => setIconSearchTerm(e.target.value)}
                              className="h-9 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                        </div>
                        <ScrollArea className="h-[300px] p-2">
                          <div className="grid grid-cols-4 gap-2">
                            {filteredIcons.map((iconName) => {
                              // Get the actual icon component with proper typing
                              const IconComponent = (Icons as Record<string, React.ComponentType<LucideProps>>)[iconName];
                              
                              if (!IconComponent) return null;
                              
                              return (
                                <Button
                                  key={iconName}
                                  variant="ghost"
                                  size="sm"
                                  className="flex flex-col items-center justify-center h-20 py-2 gap-1 text-xs"
                                  onClick={() => {
                                    field.onChange(iconName);
                                    setIconSearchTerm('');
                                  }}
                                >
                                  <IconComponent className="h-6 w-6" />
                                  <span className="truncate max-w-full">{iconName}</span>
                                </Button>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
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
      </div>
    </CardContent>
  );
}
