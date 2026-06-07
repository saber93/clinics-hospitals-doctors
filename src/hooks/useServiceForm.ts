
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Extend ServiceFormValues to support multilingual content
export interface ServiceFormValues {
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  // Add required fields for database compatibility
  duration?: number;
  price?: number;
}

export function useServiceForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isEditMode = !!id;
  
  const form = useForm<ServiceFormValues>({
    defaultValues: {
      title: '',
      title_ar: '',
      description: '',
      description_ar: '',
      icon_name: 'Layers',
      display_order: 0,
      is_active: true,
      // Default values for required fields
      duration: 30, // Default 30 minutes
      price: 0 // Default 0 price
    }
  });
  
  // Fetch service if in edit mode
  const { data: service, isLoading: isFetchingService } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    },
    enabled: isEditMode
  });
  
  // Update form when service is fetched
  useEffect(() => {
    if (service) {
      form.reset({
        // Use name field as title for backward compatibility
        title: service.name || '',
        title_ar: (service as any).title_ar || '',
        description: service.description || '',
        description_ar: (service as any).description_ar || '',
        icon_name: service.icon_name || 'Layers',
        display_order: service.display_order || 0,
        is_active: typeof service.is_active !== 'undefined' ? service.is_active : true,
        // Include required database fields
        duration: service.duration || 30,
        price: service.price || 0
      });
    }
  }, [service, form]);
  
  // Mutation to save service
  const mutation = useMutation({
    mutationFn: async (data: ServiceFormValues) => {
      if (isEditMode) {
        const { error } = await supabase
          .from('services')
          .update({
            // Use name field for backward compatibility
            name: data.title,
            description: data.description,
            icon_name: data.icon_name,
            display_order: data.display_order,
            is_active: data.is_active,
            // Include required fields
            duration: data.duration || 30,
            price: data.price || 0,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
        
        if (error) throw error;
        
        return { success: true, id };
      } else {
        const { data: newService, error } = await supabase
          .from('services')
          .insert({
            // Use name field for backward compatibility
            name: data.title,
            description: data.description,
            icon_name: data.icon_name,
            display_order: data.display_order,
            is_active: data.is_active,
            // Include required fields
            duration: data.duration || 30,
            price: data.price || 0
          })
          .select('id')
          .single();
        
        if (error) throw error;
        
        return { success: true, id: newService.id };
      }
    },
    onSuccess: (data) => {
      toast({
        title: isEditMode ? "Service updated" : "Service created",
        description: isEditMode 
          ? "The service has been updated successfully."
          : "The new service has been created successfully.",
      });
      
      navigate(`/admin/services`);
    },
    onError: (error) => {
      console.error("Error saving service:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} service.`,
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: ServiceFormValues) => {
    mutation.mutate(data);
  };
  
  return {
    form,
    isEditMode,
    isFetchingService,
    mutation,
    onSubmit
  };
}
