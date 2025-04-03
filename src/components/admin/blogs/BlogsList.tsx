
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { formatDistance } from 'date-fns';

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function BlogsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw new Error(error.message);
      }
      return data as Blog[];
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
        
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete blog: ${error.message}`);
    }
  });
  
  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string, isPublished: boolean }) => {
      const { error } = await supabase
        .from('blogs')
        .update({ is_published: isPublished })
        .eq('id', id);
        
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog status updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update blog status: ${error.message}`);
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleTogglePublish = (id: string, isCurrentlyPublished: boolean) => {
    togglePublishMutation.mutate({ 
      id, 
      isPublished: !isCurrentlyPublished 
    });
  };

  if (error) {
    return <div className="p-4 text-red-500">Error loading blogs: {error.toString()}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={() => navigate('/admin/blogs/new')}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Blog
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : blogs && blogs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      blog.is_published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {blog.is_published ? 'Published' : 'Draft'}
                  </span>
                </TableCell>
                <TableCell>
                  {blog.updated_at ? 
                    formatDistance(new Date(blog.updated_at), new Date(), { addSuffix: true }) : 
                    'Never'
                  }
                </TableCell>
                <TableCell className="flex justify-end items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTogglePublish(blog.id, blog.is_published)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {blog.is_published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/blogs/${blog.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
        </div>
      )}
    </div>
  );
}
