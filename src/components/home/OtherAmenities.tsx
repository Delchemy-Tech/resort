"use client";
import React from 'react';

// Mock data types
interface Amenity {
  id: string;
  name: string;
}

// Mock data
const mockAmenities: Amenity[] = [
  { id: '1', name: 'WiFi' },
  { id: '2', name: 'Parking' },
  { id: '3', name: 'Pool' },
  { id: '4', name: 'Gym' },
  { id: '5', name: 'Spa' },
  { id: '6', name: 'Restaurant' },
  { id: '7', name: 'Bar' },
  { id: '8', name: 'Tennis' }
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
          {mockAmenities.map((amenity) => (
            <div key={amenity.id} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full mb-2"></div>
              <span className="text-sm text-gray-600">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherAmenities;