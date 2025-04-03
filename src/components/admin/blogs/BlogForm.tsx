
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

// Define the form schema
const blogFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, no spaces, hyphens allowed'),
  category: z.string().min(1, 'Category is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  image_url: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  is_published: z.boolean().default(false),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

export default function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();
  
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
        // Populate the form with the fetched data
        form.reset({
          title: data.title,
          slug: data.slug,
          category: data.category,
          excerpt: data.excerpt,
          content: data.content,
          image_url: data.image_url || '',
          is_published: data.is_published,
        });
      }
      
      return data;
    },
    enabled: isEditMode,
  });
  
  // Create/Edit mutation
  const mutation = useMutation({
    mutationFn: async (values: BlogFormValues) => {
      if (isEditMode) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update({
            ...values,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);
          
        if (error) throw new Error(error.message);
        return { ...values, id };
      } else {
        // Create new blog
        const { data, error } = await supabase
          .from('blogs')
          .insert([values])
          .select();
          
        if (error) throw new Error(error.message);
        return data[0];
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
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} blog: ${error.message}`);
    },
  });
  
  const onSubmit = (values: BlogFormValues) => {
    mutation.mutate(values);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Blog' : 'Create New Blog'}
      </h1>
      
      {isFetchingBlog ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter blog title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Slug (URL-friendly identifier)</FormLabel>
                        <FormControl>
                          <Input placeholder="blog-post-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Health, Marketing, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Featured Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="is_published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Published</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Make this blog post publicly visible
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
                </CardContent>
              </Card>
              
              <Card className="space-y-4">
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief summary of the blog post" 
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
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Full blog post content" 
                            className="min-h-[300px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            
            <CardFooter className="flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/blogs')}
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
                {isEditMode ? 'Update Blog' : 'Create Blog'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      )}
    </div>
  );
}
