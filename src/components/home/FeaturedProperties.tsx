"use client";
import React from 'react';

// Gallery images
const galleryImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    alt: 'Luxury Beachfront Villa'
  },
  {
    id: '2', 
    src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Mountain Retreat Villa'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Modern City Apartment'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Tropical Paradise Villa'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Oceanfront Resort'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Hillside Villa'
  }
];

const FeaturedProperties: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="flex h-[600px]">
        {/* Left Side - Image Gallery */}
        <div className="w-1/2">
          {/* Top Row - 3 images */}
          <div className="flex h-1/2">
            <div className="w-1/3">
              <img 
                src={galleryImages[0].src} 
                alt={galleryImages[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/3">
              <img 
                src={galleryImages[1].src} 
                alt={galleryImages[1].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/3">
              <img 
                src={galleryImages[2].src} 
                alt={galleryImages[2].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Bottom Row - 1 large image */}
          <div className="h-1/2">
            <img 
              src={galleryImages[3].src} 
              alt={galleryImages[3].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Right Side - More Images */}
        <div className="w-1/2">
          {/* Two images stacked */}
          <div className="h-1/2">
            <img 
              src={galleryImages[4].src} 
              alt={galleryImages[4].alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/2">
            <img 
              src={galleryImages[5].src} 
              alt={galleryImages[5].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;