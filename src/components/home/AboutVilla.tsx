"use client";
import { Section } from '@/lib/supabase';
import { Play } from 'lucide-react';
import React from 'react';

interface AboutVillaProps {
  aboutData?: Section | null;
}

const AboutVilla: React.FC<AboutVillaProps> = ({ aboutData }) => {
  // Default values if no data from database
  const defaultData = {
    section_1: {
      title: 'About Villaque',
      description: 'Gravida vulputate aliquet tempor sit. Neque sed pretium non urna sed etid aenean haretra quam plac adipiscing penatibus aliquam adipiscing gravida elementum aliquet eget senectus felis enim diam molestie. Aenean haretra quam placerat adipiscing penatibus aliquam',
      cta_button: 'READ MORE',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    section_2: {
      title: 'Access Only The Finest Homes In The Most Desirable Destinations',
      description: 'Gravida vulputate aliquet tempor sit. Neque sed pretium non urna sed etid aenean haretra quam plac adipiscing penatibus aliqua adipiscing gravida elementum aliquet eget senectus felis enim diam molestie.',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      video_placeholder: true
    },
    partners: {
      title: 'Our Partners',
      logos: [
        { name: 'logoipsum', icon: 'circle' },
        { name: 'logoipsum', icon: 'moon' },
        { name: 'logoipsum', icon: 'star' },
        { name: 'logoipsum', icon: 'waves' },
        { name: 'logoipsum', icon: 'wave' },
        { name: 'logoipsum', icon: 'lightning' }
      ]
    },
    stats: [
      { number: '100k', label: 'GUEST SERVED', suffix: '+' },
      { number: '12', label: 'VILLAS & RESORTS', suffix: '' },
      { number: '10', label: 'LOCATIONS', suffix: '+' }
    ]
  };

  // Use database data if available, otherwise use defaults
  const data = aboutData?.section_json || defaultData;
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section - About Villaque */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left side - Image */}
          <div className="order-2 lg:order-1">
            <img 
              src={data.section_1?.image || defaultData.section_1.image}
              alt="Luxury Villa" 
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <h2 className="text-4xl lg:text-5xl font-serif font-normal text-gray-900 mb-8 leading-tight">
              {data.section_1?.title || defaultData.section_1.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {data.section_1?.description || defaultData.section_1.description}
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded font-medium text-sm uppercase tracking-wide transition-colors flex items-center">
              {data.section_1?.cta_button || defaultData.section_1.cta_button}
              <span className="ml-2">→</span>
            </button>
            
            {/* Partners Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {data.partners?.title || defaultData.partners.title}
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {(data.partners?.logos || defaultData.partners.logos).map((partner: any, index: number) => (
                  <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg">
                    <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs font-medium">{partner.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Section - Access Only The Finest */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="lg:pr-8">
            <h2 className="text-4xl lg:text-5xl font-serif font-normal text-gray-900 mb-8 leading-tight">
              {data.section_2?.title || defaultData.section_2.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              {data.section_2?.description || defaultData.section_2.description}
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8">
              {(data.stats || defaultData.stats).map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Video/Image */}
          <div className="relative">
            <div className="w-full h-[400px] bg-gray-300 rounded-lg overflow-hidden relative">
              {data.section_2?.video_placeholder ? (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <Play className="w-8 h-8 text-gray-700 ml-1" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <img 
                  src={data.section_2?.image || defaultData.section_2.image}
                  alt="Villa Access" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVilla;