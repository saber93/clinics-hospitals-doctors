
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { BlogFormValues } from '@/hooks/useBlogForm';
import { useTranslation } from '@/hooks/useTranslation';

interface BlogContentSectionProps {
  form: UseFormReturn<BlogFormValues>;
}

export default function BlogContentSection({ form }: BlogContentSectionProps) {
  const { t } = useTranslation();
  
  return (
    <CardContent className="pt-6">
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ar">العربية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="en" className="mt-6">
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
        </TabsContent>
        
        <TabsContent value="ar" className="mt-6">
          <FormField
            control={form.control}
            name="content_ar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Arabic)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="محتوى المدونة الكامل" 
                    className="min-h-[300px] text-right" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
      </Tabs>
    </CardContent>
  );
}
