"use client";
import { useAppDispatch, useLatestBlogPosts } from '@/hooks/redux';
import { fetchLatestBlogPosts } from '@/store/slices/blogSlice';
import { useEffect } from "react";

const LatestBlogPostsSection = () => {
  const dispatch = useAppDispatch();
  const latestBlogPosts = useLatestBlogPosts();
  
  useEffect(() => {
    // Fetch latest blog posts if not already loaded
    if (latestBlogPosts.length === 0) {
      dispatch(fetchLatestBlogPosts(3));
    }
  }, [dispatch, latestBlogPosts.length]);
  
  // Use Redux data or fallback to mock data
  const blogPosts = latestBlogPosts.length > 0 
    ? latestBlogPosts.map((post: any) => ({
        id: post.id,
        title: post.title,
        date: new Date(post.publishDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).toUpperCase(),
        comments: "NO COMMENTS" // Could be added to blog model
      }))
    : [
        {
          id: '1',
          title: "Tellus massa tempor dignissim",
          date: "OCTOBER 21, 2021",
          comments: "NO COMMENTS"
        },
        {
          id: '2',
          title: "Tellus massa tempor dignissim",
          date: "OCTOBER 21, 2021",
          comments: "NO COMMENTS"
        },
        {
          id: '3',
          title: "Tellus massa tempor dignissim",
          date: "OCTOBER 21, 2021",
          comments: "NO COMMENTS"
        }
      ];

  return (
    <div className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section - Centered */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 font-normal">
            Latest Blog Posts
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Diam et habitasse tortor cras donec urna eget dolor in turpis venenatis<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>eget pulvinar ipsum quisque non arcu nulla
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {blogPosts.map((post: any) => (
            <div key={post.id} className="group cursor-pointer">
              {/* Blog Post Image */}
              <div className="w-full h-64 sm:h-72 lg:h-80 bg-gray-400 mb-6 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Blog Post Content */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif text-gray-900 font-normal group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h3>
                
                <div className="text-gray-400 text-xs sm:text-sm font-medium tracking-wider">
                  {post.date} {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogPostsSection;