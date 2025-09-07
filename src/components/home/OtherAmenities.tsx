"use client";
import { useAmenities, useAppDispatch } from '@/hooks/redux';
import { fetchAmenities } from '@/store/slices/amenitiesSlice';
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
import React, { useEffect } from 'react';

// Mock data types
interface Amenity {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Icon mapping function
const getIconForAmenity = (amenityName: string) => {
  const name = amenityName.toLowerCase();
  if (name.includes('wifi')) return Wifi;
  if (name.includes('parking') || name.includes('car')) return Car;
  if (name.includes('pool') || name.includes('water')) return Waves;
  if (name.includes('gym') || name.includes('fitness')) return Dumbbell;
  if (name.includes('spa')) return Flower2;
  if (name.includes('restaurant') || name.includes('dining')) return UtensilsCrossed;
  if (name.includes('bar') || name.includes('wine')) return Wine;
  if (name.includes('tennis') || name.includes('sport')) return Trophy;
  return Wifi; // Default icon
};

const OtherAmenities: React.FC = () => {
  const dispatch = useAppDispatch();
  const amenitiesData = useAmenities();
  
  useEffect(() => {
    // Fetch amenities if not already loaded
    if (amenitiesData.amenities.length === 0) {
      dispatch(fetchAmenities());
    }
  }, [dispatch, amenitiesData.amenities.length]);
  
  // Use Redux data or fallback to mock data
  const amenities = amenitiesData.amenities.length > 0 
    ? amenitiesData.amenities.slice(0, 8).map((amenity: any, index: any) => ({
        id: amenity.id,
        name: amenity.name,
        icon: getIconForAmenity(amenity.name)
      }))
    : [
      { id: '1', name: 'WiFi', icon: Wifi },
      { id: '2', name: 'Parking', icon: Car },
      { id: '3', name: 'Pool', icon: Waves },
      { id: '4', name: 'Gym', icon: Dumbbell },
      { id: '5', name: 'Spa', icon: Flower2 },
      { id: '6', name: 'Restaurant', icon: UtensilsCrossed },
      { id: '7', name: 'Bar', icon: Wine },
      { id: '8', name: 'Tennis', icon: Trophy }
    ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-serif font-normal text-gray-900 mb-8">
          Other Amenities
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          Enjoy additional luxury amenities including 24/7 concierge service, private beach access, infinity pools, fitness centers, and much more.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {amenities.map((amenity: any) => {
            const IconComponent = amenity.icon;
            return (
              <div key={amenity.id} className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 bg-yellow-400 hover:bg-yellow-500 rounded-full mb-3 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors duration-200 font-medium uppercase tracking-wide">{amenity.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherAmenities;