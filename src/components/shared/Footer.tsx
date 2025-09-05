import { Facebook, Instagram, MessageCircle, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Button } from "../home/ui/button";

export const Footer: React.FC = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: '#222222' }}>
      {/* Main Footer Content */}
      <div className="py-16">
        {/* CTA Section */}
        <div className="max-w-5xl mx-auto text-gray-900 py-8 mb-16 rounded-lg" style={{ backgroundColor: 'rgba(217, 226, 205, 0.8)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="max-w-lg">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-gray-900 mb-4">
                Speak to us about your travel plans, we're here to help.
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Diam et habitasse tortor cras donec urna eget dolor in turpis venenatis eget pulvinar ipsum quisque non arcu nulla
              </p>
            </div>
            
            <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium uppercase tracking-wide hover:bg-gray-800 whitespace-nowrap">
              CHAT WITH US
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand and Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Brand Section */}
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white mb-6">
                Villague.
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
                Diam et habitasse tortor cras donec urna eget dolor in turpis venenatis eget pulvinar ipsum quisque non arcu nulla
              </p>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mb-4">
                Join Our Newsletter
              </h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Diam et habitasse tortor cras donec urna eget dolor in turpis venenatis eget.
              </p>
              
              <div className="flex gap-0 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white text-gray-900 border-0 focus:outline-none text-sm placeholder-gray-500"
                />
                <Button className="px-6 py-3 bg-yellow-400 text-gray-900 text-sm font-medium uppercase tracking-wide hover:bg-yellow-500 border-0">
                  SUBSCRIBES
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
            {/* Office */}
            <div>
              <h4 className="text-lg font-serif font-normal text-white mb-6">
                Office
              </h4>
              <div className="space-y-3">
                <p className="text-gray-400 text-sm leading-relaxed">
                  021 Hollywood Boulevard, LA
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  customer@example.com
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  (021) 345-6789
                </p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-serif font-normal text-white mb-6">
                Services
              </h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Family Experiences
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Events
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Weddings
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Tours
                </a>
              </div>
            </div>

            {/* Quick Menu */}
            <div>
              <h4 className="text-lg font-serif font-normal text-white mb-6">
                Quick Menu
              </h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Home
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Services
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Blog
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Contact Us
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-serif font-normal text-white mb-6">
                Support
              </h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Faq
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Privacy & Cookies
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Legal
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Accessibility
                </a>
                <a href="#" className="block text-gray-400 text-sm leading-relaxed hover:text-yellow-400 transition-colors">
                  Sitemap
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-lg font-serif font-normal text-white mb-6 text-left lg:text-center">
                Follow Us
              </h4>
              <div className="flex gap-4 flex-wrap min-w-0 justify-start lg:justify-center">
                <a
                  href="#"
                  className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#ACB889' }}
                >
                  <Facebook className="w-5 h-5 text-gray-900" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#ACB889' }}
                >
                  <Twitter className="w-5 h-5 text-gray-900" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#ACB889' }}
                >
                  <Instagram className="w-5 h-5 text-gray-900" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#ACB889' }}
                >
                  <Youtube className="w-5 h-5 text-gray-900" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-600 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © 2021 Aalia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};