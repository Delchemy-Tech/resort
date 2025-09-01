"use client";
import React from 'react';

// Mock data types
interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Mock data
const mockFacilities: Facility[] = [
  {
    id: '1',
    title: 'Infinity Pool',
    description: 'Stunning infinity pools with breathtaking views overlooking the ocean or mountains',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80'
  },
  {
    id: '2',
    title: 'Private Beach',
    description: 'Exclusive access to pristine private beaches with white sand and crystal clear waters',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  }
];

const Facilities: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Facilities
          </h2>
          <p className="text-gray-600">
            Experience luxury amenities designed for your comfort
          </p>
        </div>
        
        <div className="space-y-16">
          {mockFacilities.map((facility, index) => (
            <div key={facility.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <img 
                  src={facility.image} 
                  alt={facility.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                <p className="text-gray-600 mb-6">{facility.description}</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;