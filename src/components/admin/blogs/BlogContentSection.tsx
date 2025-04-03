
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CardContent } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { BlogFormValues } from '@/hooks/useBlogForm';

interface BlogContentSectionProps {
  form: UseFormReturn<BlogFormValues>;
}

export default function BlogContentSection({ form }: BlogContentSectionProps) {
  return (
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
  );
}
