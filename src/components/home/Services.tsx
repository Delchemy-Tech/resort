"use client";
import React from 'react';

// Mock data types
interface Service {
  id: string;
  title: string;
  description: string;
}

// Mock data
const mockServices: Service[] = [
  {
    id: '1',
    title: '24/7 Concierge',
    description: 'Round-the-clock personalized service for all your needs'
  },
  {
    id: '2',
    title: 'Private Chef',
    description: 'Gourmet dining experiences with world-class chefs'
  },
  {
    id: '3',
    title: 'Spa Services',
    description: 'Relaxing treatments and wellness programs'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockServices.map((service, index) => (
            <div key={service.id} className="text-center p-8">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;