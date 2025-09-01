"use client";
import { Section } from '@/lib/supabase';
import React from 'react';

interface HeaderProps {
  headerData: Section | null;
}

const Header: React.FC<HeaderProps> = ({ headerData }) => {
  // Default values if no data from database
  const defaultData = {
    brand_name: 'VillaRent',
    navigation: [
      { name: 'Home', href: '#' },
      { name: 'Properties', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    cta_button: 'Sign In'
  };

  // Use database data if available, otherwise use defaults
  const data = headerData?.section_json || defaultData;
  
  return (
    <header className="bg-white/10 backdrop-blur-sm absolute top-0 left-0 right-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="flex items-center min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-white truncate">
              {data.brand_name || defaultData.brand_name}
            </h1>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-8">
            {(data.navigation || defaultData.navigation).map((item: any, index: number) => (
              <a 
                key={index}
                href={item.href || '#'} 
                className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-sm uppercase tracking-wide whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center justify-end min-w-0 flex-1">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded font-semibold text-sm uppercase tracking-wide transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap">
              BOOK NOW
              <span className="ml-2 text-base">→</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;