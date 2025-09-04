"use client";
import React from 'react';

// Gallery images
const galleryImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Luxury Beachfront Villa'
  },
  {
    id: '2', 
    src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Mountain Retreat Villa'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Modern City Apartment'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Tropical Paradise Villa'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Oceanfront Resort'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Hillside Villa'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Coastal Retreat'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Lakeside Resort'
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Desert Villa'
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Forest Lodge'
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Urban Penthouse'
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Riverside Villa'
  }
];

const FeaturedProperties: React.FC = () => {
  // Function to get images based on screen size
  const getImagesForBreakpoint = (count: number) => galleryImages.slice(0, count);

  return (
    <section className="bg-white">
      {/* Mobile and Small Tablets Header */}
      <div className="lg:hidden py-8 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-gray-900 mb-4">
          Featured Properties
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Discover our most exclusive villas and resorts.
        </p>
      </div>
      
      {/* Gallery Grid - Responsive with different image counts */}
      <div className="w-full">
        {/* Mobile (below sm): 4 images in 2x2 grid */}
        <div className="sm:hidden grid grid-cols-2 gap-0">
          {getImagesForBreakpoint(4).map((image) => (
            <div key={image.id} className="relative group overflow-hidden">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Small tablets (sm): 6 images in 3x2 grid */}
        <div className="hidden sm:grid md:hidden grid-cols-3 gap-0">
          {getImagesForBreakpoint(6).map((image) => (
            <div key={image.id} className="relative group overflow-hidden">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Medium tablets (md): 8 images in 4x2 grid */}
        <div className="hidden md:grid lg:hidden grid-cols-4 gap-0">
          {getImagesForBreakpoint(8).map((image) => (
            <div key={image.id} className="relative group overflow-hidden">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Large screens (lg): 12 images in 6x2 grid */}
        <div className="hidden lg:grid grid-cols-6 gap-0">
          {getImagesForBreakpoint(12).map((image) => (
            <div key={image.id} className="relative group overflow-hidden">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-56 xl:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;