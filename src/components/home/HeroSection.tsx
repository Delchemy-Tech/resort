"use client";
import { Section } from '@/lib/supabase';
import { Calendar, ChevronDown, Users } from 'lucide-react';
import React from 'react';

interface HeroSectionProps {
  heroData: Section | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroData }) => {
  // Default values if no data from database
  const defaultData = {
    top_title: 'ENJOY THE FINEST STAYS',
    title: 'Find Your Best Villa House And Appartment',
    sub_title: 'Gravida vulputate aliquet tempor sitoque sed pretium non urna sed etid aenean haretra quam placerat adipiscing',
    image_1: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    search_form: {
      room_placeholder: 'Select one of our Room',
      checkout_placeholder: 'Check out',
      checkin_placeholder: 'Chek in',
      guests_placeholder: 'Number of guest',
      search_button: 'BOOK NOW'
    }
  };

  // Use database data if available, otherwise use defaults
  const data = heroData?.section_json || defaultData;
  
  return (
    <section className="relative h-[calc(100vh-64px)] bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${data.image_1 || defaultData.image_1}")`
    }}>
      <div className="absolute inset-0 flex flex-col justify-center">
        {/* Hero Content */}
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-white max-w-2xl mb-16">
            {/* Top Title */}
            <div className="text-yellow-400 text-sm md:text-base font-medium uppercase tracking-[0.2em] mb-6">
              {data.top_title || defaultData.top_title}
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight mb-8">
              Find Your Best<br />
              Villa House And<br />
              Appartment
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
              {data.sub_title || defaultData.sub_title}
            </p>
          </div>
          
          {/* Search Form */}
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-w-5xl w-full backdrop-blur-sm bg-white/95">
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {/* Room Selection */}
                <div className="flex-1 px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
                    Room Type
                  </label>
                  <div className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700 text-sm font-medium">
                      {data.search_form?.room_placeholder || defaultData.search_form.room_placeholder}
                    </span>
                    <ChevronDown className="text-yellow-500 w-5 h-5 transition-transform hover:scale-110" />
                  </div>
                </div>
                
                {/* Check Out */}
                <div className="flex-1 px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
                    Check Out
                  </label>
                  <div className="flex items-center justify-between cursor-pointer relative">
                    <input 
                      type="date" 
                      className="bg-transparent outline-none text-gray-700 text-sm cursor-pointer w-full font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer hover:text-gray-900 transition-colors" 
                      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                      onChange={(e) => {
                        if (e.target.value) {
                          e.target.style.color = '#374151';
                        }
                      }}
                    />
                    <Calendar className="text-yellow-500 w-5 h-5 pointer-events-none absolute right-0 hover:text-yellow-600 transition-colors" />
                  </div>
                </div>
                
                {/* Check In */}
                <div className="flex-1 px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
                    Check In
                  </label>
                  <div className="flex items-center justify-between cursor-pointer relative">
                    <input 
                      type="date" 
                      className="bg-transparent outline-none text-gray-700 text-sm cursor-pointer w-full font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer hover:text-gray-900 transition-colors" 
                      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                      onChange={(e) => {
                        if (e.target.value) {
                          e.target.style.color = '#374151';
                        }
                      }}
                    />
                    <Calendar className="text-yellow-500 w-5 h-5 pointer-events-none absolute right-0 hover:text-yellow-600 transition-colors" />
                  </div>
                </div>
                
                {/* Number of Guests */}
                <div className="flex-1 px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
                    Guests
                  </label>
                  <div className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700 text-sm font-medium">
                      {data.search_form?.guests_placeholder || defaultData.search_form.guests_placeholder}
                    </span>
                    <Users className="text-yellow-500 w-5 h-5 transition-transform hover:scale-110" />
                  </div>
                </div>
                
                {/* Book Now Button */}
                <div className="md:flex-none">
                  <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    <span>{data.search_form?.search_button || defaultData.search_form.search_button}</span>
                    <span className="ml-3 text-base transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;