
import React from 'react';
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
import { Service } from '@/types/cms';

// Define the form schema
const serviceFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon_name: z.string().min(1, 'Icon name is required'),
  display_order: z.number().int().min(0, 'Display order must be a non-negative number'),
  is_active: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();
  
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
          description: data.description,
          icon_name: data.icon_name,
          display_order: data.display_order,
          is_active: data.is_active,
        });
      }
      
      return data as Service;
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
  
  // Get available icons from lucide-react for selection
  const iconNames = Object.keys(Icons).filter(
    (name) => typeof Icons[name as keyof typeof Icons] === 'function'
  );
  
  const IconPreview = ({ name }: { name: string }) => {
    const LucideIcon = (Icons as any)[name];
    
    if (LucideIcon) {
      return <LucideIcon className="h-6 w-6" />;
    }
    
    return null;
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
              <CardContent className="pt-6 space-y-4">
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter service description" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="icon_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-muted-foreground">Preview:</span>
                        {field.value && <IconPreview name={field.value} />}
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="Icon name (e.g. Heart, Star, User)"
                          list="icon-suggestions"
                          {...field} 
                        />
                      </FormControl>
                      <datalist id="icon-suggestions">
                        {iconNames.map((name) => (
                          <option key={name} value={name} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            onChange={(e) => field.onChange(parseInt(e.target.value))} 
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
