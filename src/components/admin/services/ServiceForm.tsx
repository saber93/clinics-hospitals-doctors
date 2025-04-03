
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';

const iconNames = Object.keys(Icons).filter(
  name => typeof Icons[name as keyof typeof Icons] === 'function' && name !== 'createLucideIcon'
);

// Define the form schema
const serviceFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon_name: z.string().min(1, 'Icon selection is required'),
  display_order: z.coerce.number().int().min(0),
  is_active: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();
  const [iconSearch, setIconSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: '',
      description: '',
      icon_name: '',
      display_order: 0,
      is_active: true,
    },
  });
  
  // Fetch service details if in edit mode
  const { isLoading: isFetchingService } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        toast.error(`Error fetching service: ${error.message}`);
        throw error;
      }
      
      if (data) {
        // Populate the form with the fetched data
        form.reset({
          title: data.title,
          description: data.description || '',
          icon_name: data.icon_name,
          display_order: data.display_order,
          is_active: data.is_active,
        });
        setSelectedIcon(data.icon_name);
      }
      
      return data;
    },
    enabled: isEditMode,
  });
  
  // Create/Edit mutation
  const mutation = useMutation({
    mutationFn: async (values: ServiceFormValues) => {
      if (isEditMode) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update({
            ...values,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);
          
        if (error) throw new Error(error.message);
        return { ...values, id };
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert([values])
          .select();
          
        if (error) throw new Error(error.message);
        return data[0];
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      if (isEditMode) {
        queryClient.invalidateQueries({ queryKey: ['service', id] });
      }
      toast.success(isEditMode ? 'Service updated successfully' : 'Service created successfully');
      navigate('/admin/services');
    },
    onError: (error: Error) => {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} service: ${error.message}`);
    },
  });
  
  const onSubmit = (values: ServiceFormValues) => {
    mutation.mutate(values);
  };
  
  // Filter icons based on search
  const filteredIcons = iconNames.filter(icon => 
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  );
  
  // Select icon and update form
  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName);
    form.setValue('icon_name', iconName);
  };
  
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter service title" {...field} />
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
                              min={0}
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Show this service on the website
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
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Service description" 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="icon_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input 
                              placeholder="Search icons..."
                              value={iconSearch}
                              onChange={(e) => setIconSearch(e.target.value)}
                            />
                            
                            <div className="hidden">
                              <Input {...field} />
                            </div>
                            
                            <div className="border rounded-md p-4">
                              <div className="font-medium mb-2">Selected Icon:</div>
                              {selectedIcon ? (
                                <div className="flex items-center gap-2">
                                  {React.createElement(
                                    (Icons as any)[selectedIcon], 
                                    { className: "h-6 w-6" }
                                  )}
                                  <span>{selectedIcon}</span>
                                </div>
                              ) : (
                                <div className="text-muted-foreground">No icon selected</div>
                              )}
                            </div>
                            
                            <div className="border rounded-md p-4 h-72 overflow-auto">
                              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                {filteredIcons.map(iconName => {
                                  const LucideIcon = (Icons as any)[iconName];
                                  return (
                                    <button
                                      key={iconName}
                                      type="button"
                                      className={`flex flex-col items-center justify-center p-2 rounded hover:bg-muted ${
                                        selectedIcon === iconName ? 'bg-muted ring-2 ring-primary' : ''
                                      }`}
                                      onClick={() => handleSelectIcon(iconName)}
                                    >
                                      <LucideIcon className="h-6 w-6 mb-1" />
                                      <span className="text-xs truncate w-full text-center">
                                        {iconName}
                                      </span>
                                    </button>
                                  );
                                })}
                                
                                {filteredIcons.length === 0 && (
                                  <div className="col-span-full text-center py-8 text-muted-foreground">
                                    No icons found matching your search
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/services')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditMode ? 'Update Service' : 'Create Service'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}
    </div>
  );
}
