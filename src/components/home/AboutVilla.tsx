"use client";
import { Section } from '@/lib/supabase';
import React from 'react';

interface AboutVillaProps {
  aboutData?: Section | null;
}

const AboutVilla: React.FC<AboutVillaProps> = ({ aboutData }) => {
  // Default values if no data from database
  const defaultData = {
    title: 'About VillaRent',
    description: 'Access Only The Finest Villas In The Most Exclusive Destinations. Our carefully curated collection features the world\'s most spectacular luxury villas, each offering unparalleled comfort and breathtaking views.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    secondary_description: 'From beachfront paradises to mountain retreats, we provide extraordinary experiences that exceed expectations. Every property is hand-selected for its unique character and exceptional quality.',
    cta_button: 'Learn More'
  };

  // Use database data if available, otherwise use defaults
  const data = aboutData?.section_json || defaultData;
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={data.image || defaultData.image}
              alt="Luxury Villa" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {data.title || defaultData.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {data.description || defaultData.description}
            </p>
            {data.secondary_description && (
              <p className="text-gray-600 mb-8">
                {data.secondary_description}
              </p>
            )}
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold">
              {data.cta_button || defaultData.cta_button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVilla;