"use client";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">VillaRent</h3>
            <p className="text-gray-300 mb-6">
              Your gateway to the world's most exclusive luxury villa rentals.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-300 hover:text-yellow-500 cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-300 hover:text-yellow-500 cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-yellow-500 cursor-pointer" />
              <Youtube className="w-6 h-6 text-gray-300 hover:text-yellow-500 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">Properties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">Maldives</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">Bali</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">Santorini</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500">Dubai</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-yellow-500" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-yellow-500" />
                <span className="text-gray-300">info@villarent.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-yellow-500" />
                <span className="text-gray-300">New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 VillaRent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;