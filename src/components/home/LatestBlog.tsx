"use client";
import React from 'react';

// Mock data types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
}

// Mock data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Luxury Destinations for 2024',
    excerpt: 'Discover the most exclusive and breathtaking destinations for your next luxury vacation.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: '2',
    title: 'Villa Rental Tips: What to Look For',
    excerpt: 'Essential tips and guidelines for choosing the perfect luxury villa for your vacation.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
  },
  {
    id: '3',
    title: 'Sustainable Luxury Travel',
    excerpt: 'How to enjoy luxury travel while being mindful of environmental impact.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80'
  }
];

const LatestBlog: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600">
            Stay updated with travel tips and destination guides
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockBlogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-yellow-500 hover:text-yellow-600 font-semibold">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;