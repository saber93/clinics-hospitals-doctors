
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Service } from '@/types/cms';

// Define the form schema
const serviceFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon_name: z.string().min(1, 'Icon name is required'),
  display_order: z.coerce.number().int().nonnegative(),
  is_active: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();
  
  // Get all available Lucide icon names
  const availableIcons = Object.keys(Icons).filter(
    (key) => typeof Icons[key as keyof typeof Icons] === 'function'
  );
  
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
        const serviceData = data as Service;
        
        // Populate the form with the fetched data
        form.reset({
          title: serviceData.title,
          description: serviceData.description,
          icon_name: serviceData.icon_name,
          display_order: serviceData.display_order,
          is_active: serviceData.is_active,
        });
        
        return serviceData;
      }
      
      return null;
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
        return { ...values, id } as Service;
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert([{
            ...values,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select();
          
        if (error) throw new Error(error.message);
        return data[0] as Service;
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

  // Preview the selected icon
  const selectedIcon = form.watch('icon_name');
  const IconPreview = selectedIcon ? (Icons as any)[selectedIcon] : null;
  
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
                            <Textarea 
                              placeholder="Describe the service..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
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
                              {IconPreview && (
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/5 rounded">
                                  <IconPreview className="w-6 h-6 text-primary" />
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
            </Card>
            
            <div className="flex justify-between">
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
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
