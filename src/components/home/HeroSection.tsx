"use client";
import { Section } from '@/lib/supabase';
import { Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';

interface HeroSectionProps {
  heroData: Section | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroData }) => {
  // Default values if no data from database
  const defaultData = {
    top_title: 'Find Your Best',
    title: 'Villa House And Apartment',
    sub_title: 'Discover luxury villas and apartments for your perfect getaway',
    image_1: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    search_form: {
      location_placeholder: 'Location',
      checkin_placeholder: 'Check in',
      checkout_placeholder: 'Check out',
      guests_placeholder: 'Guests',
      search_button: 'Search Properties'
    }
  };

  // Use database data if available, otherwise use defaults
  const data = heroData?.section_json || defaultData;
  
  return (
    <section className="relative h-screen bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${data.image_1 || defaultData.image_1}")`
    }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {data.top_title && (
              <span className="block text-3xl md:text-4xl font-normal mb-2 opacity-90">
                {data.top_title}
              </span>
            )}
            <span className="block">
              {(data.title || defaultData.title).split(' ').map((word: string, index: number, arr: string[]) => (
                <React.Fragment key={index}>
                  {word}
                  {index === Math.floor(arr.length / 3) || index === Math.floor((arr.length * 2) / 3) ? <br /> : ' '}
                </React.Fragment>
              ))}
            </span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            {data.sub_title || defaultData.sub_title}
          </p>
          
          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <MapPin className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.location_placeholder || defaultData.search_form.location_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <Calendar className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.checkin_placeholder || defaultData.search_form.checkin_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <Calendar className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.checkout_placeholder || defaultData.search_form.checkout_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <Users className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.guests_placeholder || defaultData.search_form.guests_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
            </div>
            <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold">
              {data.search_form?.search_button || defaultData.search_form.search_button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;