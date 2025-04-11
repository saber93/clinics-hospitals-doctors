
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { BlogFormValues } from '@/hooks/useBlogForm';
import { useTranslation } from '@/hooks/useTranslation';

interface BlogDetailsSectionProps {
  form: UseFormReturn<BlogFormValues>;
}

export default function BlogDetailsSection({ form }: BlogDetailsSectionProps) {
  const { t } = useTranslation();
  
  return (
    <CardContent className="pt-6">
      <Tabs defaultValue="en" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ar">العربية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="en" className="mt-6">
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
            name="excerpt"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Input placeholder="Brief summary of the blog post" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
        
        <TabsContent value="ar" className="mt-6">
          <FormField
            control={form.control}
            name="title_ar"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Title (Arabic)</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل عنوان المدونة" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="excerpt_ar"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Excerpt (Arabic)</FormLabel>
                <FormControl>
                  <Input placeholder="ملخص موجز للمدونة" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
      </Tabs>
      
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
