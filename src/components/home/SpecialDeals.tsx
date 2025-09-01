"use client";
import React from 'react';

// Mock data types
interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
}

// Mock data
const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Book 60 days in advance',
    discount: '25% OFF'
  },
  {
    id: '2',
    title: 'Extended Stay',
    description: 'Stay for 7+ nights',
    discount: '30% OFF'
  },
  {
    id: '3',
    title: 'Last Minute',
    description: 'Book within 48 hours',
    discount: '20% OFF'
  },
  {
    id: '4',
    title: 'Group Booking',
    description: 'Book for 8+ guests',
    discount: '35% OFF'
  }
];

const SpecialDeals: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Special Deals
          </h2>
          <p className="text-gray-600">
            Don't miss out on these exclusive offers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDeals.map((deal) => (
            <div key={deal.id} className="bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-yellow-500 mb-2">{deal.discount}</div>
              <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
              <p className="text-gray-600 text-sm">{deal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;