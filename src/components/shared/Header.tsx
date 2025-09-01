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
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {data.brand_name || defaultData.brand_name}
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {(data.navigation || defaultData.navigation).map((item: any, index: number) => (
              <a 
                key={index}
                href={item.href || '#'} 
                className={`${index === 0 ? 'text-gray-900' : 'text-gray-700'} hover:text-yellow-600`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
              {data.cta_button || defaultData.cta_button}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;