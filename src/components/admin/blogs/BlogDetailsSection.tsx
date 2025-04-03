
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CardContent } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { BlogFormValues } from '@/hooks/useBlogForm';

interface BlogDetailsSectionProps {
  form: UseFormReturn<BlogFormValues>;
}

export default function BlogDetailsSection({ form }: BlogDetailsSectionProps) {
  return (
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
  );
}
