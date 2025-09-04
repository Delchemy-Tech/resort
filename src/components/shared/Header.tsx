"use client";
import { Section } from '@/lib/supabase';
import React, { useState } from 'react';

interface HeaderProps {
  headerData: Section | null;
}

const Header: React.FC<HeaderProps> = ({ headerData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-yellow-400 sticky top-0 left-0 right-0 z-50">
        <div className="grid grid-cols-3 h-14">
          {/* Menu Section */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center text-black hover:bg-yellow-500 transition-colors"
          >
            <div className="flex flex-col space-y-1 mb-1">
              <div className="w-4 h-0.5 bg-black"></div>
              <div className="w-4 h-0.5 bg-black"></div>
              <div className="w-4 h-0.5 bg-black"></div>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide">Menu</span>
          </button>

          {/* Book Now Section */}
          <button className="flex flex-col items-center justify-center text-black hover:bg-yellow-500 transition-colors border-l border-r border-black/20">
            <div className="mb-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide">Book Now</span>
          </button>

          {/* Call Section */}
          <button className="flex flex-col items-center justify-center text-black hover:bg-yellow-500 transition-colors">
            <div className="mb-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide">Call</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">{data.brand_name || defaultData.brand_name}</h2>
            </div>
            <nav className="p-4">
              {(data.navigation || defaultData.navigation).map((item: any, index: number) => (
                <a 
                  key={index}
                  href={item.href || '#'} 
                  className="block py-3 text-gray-700 hover:text-yellow-600 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white/10 backdrop-blur-sm sticky top-0 left-0 right-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Name */}
            <div className="flex items-center min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-white truncate">
                {data.brand_name || defaultData.brand_name}
              </h1>
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex items-center justify-center flex-1 space-x-8">
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
    </>
  );
};

export default Header;