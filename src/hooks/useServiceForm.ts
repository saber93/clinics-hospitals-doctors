
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Service } from '@/types/cms';

// Define the form schema
export const serviceFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon_name: z.string().min(1, 'Icon name is required'),
  display_order: z.coerce.number().int().nonnegative(),
  is_active: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export function useServiceForm() {
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
  
  return {
    form,
    isEditMode,
    isFetchingService,
    mutation,
    onSubmit,
  };
}
