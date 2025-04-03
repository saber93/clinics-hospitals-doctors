
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Blog data
const blogPosts = [
  {
    id: '1',
    title: 'How Strategic Partnerships Drive Business Growth in the UAE?',
    category: 'STYLE',
    date: 'April 21, 2020',
    excerpt: 'In today\'s competitive business environment, building strategic partnerships has...',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    slug: 'strategic-partnerships-business-growth'
  },
  {
    id: '2',
    title: 'The Role of Influencers in Modern Marketing and Why Your Business Needs Them',
    category: 'STYLE',
    date: 'April 21, 2020',
    excerpt: 'In the digital age, influencer marketing has become one of...',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80',
    slug: 'influencers-modern-marketing'
  },
  {
    id: '3',
    title: 'Why Do Medical Clinics Need Effective Digital Marketing Strategies?',
    category: 'CREATION',
    date: 'April 21, 2020',
    excerpt: 'With the rapid digital evolution, digital marketing has become a...',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    slug: 'medical-clinics-digital-marketing'
  }
];

const BlogSection = () => {
  const navigate = useNavigate();
  
  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };
  
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
          {/* Blog cards with uniform style and hover effects */}
          {blogPosts.map((post) => (
            <Card 
              key={post.id}
              className="border-none overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
              onClick={() => handleBlogClick(post.slug)}
            >
              <div className="relative h-56 group">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="h-full w-full object-cover"
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
                  <span className="text-gray-800 font-semibold">{post.category}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
