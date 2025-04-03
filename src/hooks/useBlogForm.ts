
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Blog } from '@/types/cms';
import { useAuth } from '@/contexts/AuthContext';

// Define the form schema
export const blogFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, no spaces, hyphens allowed'),
  category: z.string().min(1, 'Category is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  image_url: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  is_published: z.boolean().default(false),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export function useBlogForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();
  const { session } = useAuth();
  
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: '',
      excerpt: '',
      content: '',
      image_url: '',
      is_published: false,
    },
  });
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };
  
  // Auto-generate slug when title changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && value.title && !form.getValues('slug')) {
        form.setValue('slug', generateSlug(value.title as string));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  // Fetch blog details if in edit mode
  const { isLoading: isFetchingBlog } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        toast.error(`Error fetching blog: ${error.message}`);
        throw error;
      }
      
      if (data) {
        const blogData = data as Blog;
        
        // Populate the form with the fetched data
        form.reset({
          title: blogData.title,
          slug: blogData.slug,
          category: blogData.category,
          excerpt: blogData.excerpt,
          content: blogData.content,
          image_url: blogData.image_url || '',
          is_published: blogData.is_published,
        });
        
        return blogData;
      }
      
      return null;
    },
    enabled: isEditMode,
  });
  
  // Create/Edit mutation
  const mutation = useMutation({
    mutationFn: async (values: BlogFormValues) => {
      // Ensure user is authenticated
      if (!session?.user) {
        throw new Error('You must be logged in to create or edit blogs');
      }

      const blogData = {
        title: values.title,
        slug: values.slug,
        category: values.category,
        excerpt: values.excerpt,
        content: values.content,
        image_url: values.image_url || null,
        is_published: values.is_published
      };

      if (isEditMode) {
        // Update existing blog
        const { data, error } = await supabase
          .from('blogs')
          .update({
            ...blogData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select();
          
        if (error) throw new Error(error.message);
        return data?.[0] as Blog;
      } else {
        // Create new blog
        const { data, error } = await supabase
          .from('blogs')
          .insert({
            ...blogData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select();
          
        if (error) throw new Error(error.message);
        return data[0] as Blog;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      if (isEditMode) {
        queryClient.invalidateQueries({ queryKey: ['blog', id] });
      }
      toast.success(isEditMode ? 'Blog updated successfully' : 'Blog created successfully');
      navigate('/admin/blogs');
    },
    onError: (error: Error) => {
      console.error('Error in blog operation:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} blog: ${error.message}`);
    },
  });
  
  const onSubmit = (values: BlogFormValues) => {
    mutation.mutate(values);
  };
  
  return {
    form,
    isEditMode,
    isFetchingBlog,
    mutation,
    onSubmit,
  };
}
