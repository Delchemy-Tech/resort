"use client";
import {
  Car,
  Dumbbell,
  Flower2,
  Trophy,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine
} from 'lucide-react';
import React from 'react';

// Mock data types
interface Amenity {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Mock data
const mockAmenities: Amenity[] = [
  { id: '1', name: 'WiFi', icon: Wifi },
  { id: '2', name: 'Parking', icon: Car },
  { id: '3', name: 'Pool', icon: Waves },
  { id: '4', name: 'Gym', icon: Dumbbell },
  { id: '5', name: 'Spa', icon: Flower2 },
  { id: '6', name: 'Restaurant', icon: UtensilsCrossed },
  { id: '7', name: 'Bar', icon: Wine },
  { id: '8', name: 'Tennis', icon: Trophy }
];

const OtherAmenities: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Other Amenities
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Enjoy additional luxury amenities including 24/7 concierge service, private beach access, infinity pools, fitness centers, and much more.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {mockAmenities.map((amenity) => {
            const IconComponent = amenity.icon;
            return (
              <div key={amenity.id} className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 bg-yellow-400 hover:bg-yellow-500 rounded-full mb-3 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200 font-medium">{amenity.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherAmenities;