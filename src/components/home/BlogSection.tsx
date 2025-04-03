
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Blog } from '@/types/cms';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      {blog.image_url ? (
        <img 
          src={blog.image_url} 
          alt={blog.title} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <div className="p-5">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {blog.category}
        </span>
        <h3 className="mt-2 text-xl font-bold group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>
        <p className="mt-2 text-gray-600 line-clamp-3">
          {blog.excerpt}
        </p>
        <Link 
          to={`/blog/${blog.slug}`} 
          className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: async () => {
      // Use type assertion for Supabase query
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (error) throw error;
      return data as Blog[];
    }
  });

  if (error) {
    console.error('Error fetching blogs:', error);
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest research, resources, and insights
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="w-full h-8 mt-4 rounded" />
                <Skeleton className="w-3/4 h-4 mt-2 rounded" />
                <Skeleton className="w-full h-24 mt-2 rounded" />
              </div>
            ))}
          </div>
        ) : blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No published blog posts yet.
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
