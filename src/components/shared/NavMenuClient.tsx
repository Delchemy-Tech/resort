"use client";

import Link from 'next/link';
import { useState } from "react";

export default function NavMenuClient({ navigation }: { navigation: any[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">VillaRent</h2>
            </div>
            <nav className="p-4">
              {navigation.map((item: any, index: number) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className="block py-3 text-gray-700 hover:text-yellow-600 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}