
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

const BlogSection = () => {
  const navigate = useNavigate();
  
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['homepage-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
        
      if (error) throw error;
      return data as Blog[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Fallback data if no blogs are found or there's an error
  const fallbackBlogs = [
    {
      id: '1',
      title: 'How Strategic Partnerships Drive Business Growth in the UAE?',
      category: 'STYLE',
      excerpt: 'In today\'s competitive business environment, building strategic partnerships has...',
      slug: 'strategic-partnerships-business-growth',
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      published_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'The Role of Influencers in Modern Marketing and Why Your Business Needs Them',
      category: 'STYLE',
      excerpt: 'In the digital age, influencer marketing has become one of...',
      slug: 'influencers-modern-marketing',
      image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80',
      published_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Why Do Medical Clinics Need Effective Digital Marketing Strategies?',
      category: 'CREATION',
      excerpt: 'With the rapid digital evolution, digital marketing has become a...',
      slug: 'medical-clinics-digital-marketing',
      image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      published_at: new Date().toISOString(),
    }
  ];
  
  const displayedBlogs = blogs && blogs.length > 0 ? blogs : fallbackBlogs;
  
  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return 'Publication date unavailable';
    }
  };
  
  const renderBlogCard = (blog: Blog) => (
    <Card 
      key={blog.id}
      className="border-none overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      onClick={() => handleBlogClick(blog.slug)}
    >
      <div className="relative h-56 group">
        <img 
          src={blog.image_url || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={blog.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback if image doesn't load
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="mt-auto flex items-center text-white">
            <span className="mr-2">Read More</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-gray-800 font-semibold">{blog.category}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-400">{formatDate(blog.published_at)}</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">{blog.title}</h3>
        <p className="text-gray-600 mb-6">{blog.excerpt}</p>
      </CardContent>
    </Card>
  );
  
  const renderSkeleton = () => (
    [...Array(3)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow">
        <Skeleton className="h-56 w-full" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))
  );
  
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-lg uppercase tracking-wider text-gray-700 mb-4">INSIGHTS & TRENDS</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Blog
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? renderSkeleton() : displayedBlogs.map(renderBlogCard)}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
