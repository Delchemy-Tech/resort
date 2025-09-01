"use client";
import { Star } from 'lucide-react';
import React from 'react';

// Mock data types
interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
}

// Mock data
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Los Angeles, CA',
    comment: 'Absolutely stunning villa with incredible ocean views. The service was impeccable and the amenities were top-notch.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Singapore',
    comment: 'Perfect getaway destination. The villa exceeded all our expectations and the staff went above and beyond.',
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            What Our Customer Say About Us
          </h2>
          <p className="text-gray-300">
            Read testimonials from our satisfied guests
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;