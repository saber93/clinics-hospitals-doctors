
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Extend BlogFormValues to support multilingual content
export interface BlogFormValues {
  title: string;
  title_ar?: string;
  slug: string;
  category: string;
  excerpt: string;
  excerpt_ar?: string;
  content: string;
  content_ar?: string;
  image_url?: string;
  is_published: boolean;
}

export function useBlogForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isEditMode = !!id;
  
  const form = useForm<BlogFormValues>({
    defaultValues: {
      title: '',
      title_ar: '',
      slug: '',
      category: '',
      excerpt: '',
      excerpt_ar: '',
      content: '',
      content_ar: '',
      image_url: '',
      is_published: false
    }
  });
  
  // Fetch blog if in edit mode
  const { data: blog, isLoading: isFetchingBlog } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    },
    enabled: isEditMode
  });
  
  // Update form when blog is fetched
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title || '',
        title_ar: blog.title_ar || '',
        slug: blog.slug || '',
        category: blog.category || '',
        excerpt: blog.excerpt || '',
        excerpt_ar: blog.excerpt_ar || '',
        content: blog.content || '',
        content_ar: blog.content_ar || '',
        image_url: blog.image_url || '',
        is_published: blog.is_published || false
      });
    }
  }, [blog, form]);
  
  // Mutation to save blog
  const mutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      if (isEditMode) {
        const { error } = await supabase
          .from('blogs')
          .update({
            title: data.title,
            title_ar: data.title_ar,
            slug: data.slug,
            category: data.category,
            excerpt: data.excerpt,
            excerpt_ar: data.excerpt_ar,
            content: data.content,
            content_ar: data.content_ar,
            image_url: data.image_url,
            is_published: data.is_published,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
        
        if (error) throw error;
        
        return { success: true, id };
      } else {
        const { data: newBlog, error } = await supabase
          .from('blogs')
          .insert({
            title: data.title,
            title_ar: data.title_ar,
            slug: data.slug,
            category: data.category,
            excerpt: data.excerpt,
            excerpt_ar: data.excerpt_ar,
            content: data.content,
            content_ar: data.content_ar,
            image_url: data.image_url,
            is_published: data.is_published
          })
          .select('id')
          .single();
        
        if (error) throw error;
        
        return { success: true, id: newBlog.id };
      }
    },
    onSuccess: (data) => {
      toast({
        title: isEditMode ? "Blog updated" : "Blog created",
        description: isEditMode 
          ? "Your blog post has been updated successfully."
          : "Your new blog post has been created successfully.",
      });
      
      navigate(`/admin/blogs`);
    },
    onError: (error) => {
      console.error("Error saving blog:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} blog post.`,
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: BlogFormValues) => {
    mutation.mutate(data);
  };
  
  return {
    form,
    isEditMode,
    isFetchingBlog,
    mutation,
    onSubmit
  };
}
