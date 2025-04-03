
import React from 'react';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useBlogForm } from '@/hooks/useBlogForm';
import BlogDetailsSection from './BlogDetailsSection';
import BlogContentSection from './BlogContentSection';
import BlogFormActions from './BlogFormActions';

export default function BlogForm() {
  const { form, isEditMode, isFetchingBlog, mutation, onSubmit } = useBlogForm();
  
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
                <BlogDetailsSection form={form} />
              </Card>
              
              <Card className="space-y-4">
                <BlogContentSection form={form} />
              </Card>
            </div>
            
            <BlogFormActions 
              isEditMode={isEditMode} 
              isPending={mutation.isPending} 
            />
          </form>
        </Form>
      )}
    </div>
  );
}
