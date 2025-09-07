"use client";
import { useAppDispatch, useFacilities } from '@/hooks/redux';
import { fetchFacilities } from '@/store/slices/facilitiesSlice';
import { ArrowRight, Flower2, Gamepad2, Users, Waves } from 'lucide-react';
import { useEffect } from 'react';

const OurFacilitiesSection = () => {
  const dispatch = useAppDispatch();
  const facilitiesData = useFacilities();
  
  useEffect(() => {
    // Fetch facilities if not already loaded
    if (facilitiesData.facilities.length === 0) {
      dispatch(fetchFacilities());
    }
  }, [dispatch, facilitiesData.facilities.length]);
  
  // Use Redux data or fallback to mock data
  const facilities = facilitiesData.facilities.length > 0 
    ? facilitiesData.facilities.slice(0, 4).map((facility: any, index: any) => {
        // Map to appropriate icons based on facility category or name
        let icon = Users; // Default icon
        if (facility.category === "Spa" || facility.name.includes("Spa")) icon = Flower2;
        if (facility.category === "Games" || facility.name.includes("Games")) icon = Gamepad2;
        if (facility.category === "Water" || facility.name.includes("Water")) icon = Waves;
        
        return {
          id: facility.id,
          title: facility.name,
          description: facility.description,
          icon: icon
        };
      })
    : [
      {
        id: '1',
        title: "Family Experience",
        description: "Gravida vulputate aliquet tempor aliquam sed quam pretium non urna sed elit aenean haruetra adipiscing porttibus a adipiscing gravida vulputate aliquam aliquet eget senectus aliquam sed quam pretium.",
        icon: Users
      },
      {
        id: '2',
        title: "Private Spa",
        description: "Gravida vulputate aliquet tempor aliquam sed quam pretium non urna sed elit aenean haruetra adipiscing porttibus a adipiscing gravida vulputate aliquam aliquet eget senectus aliquam sed quam pretium.",
        icon: Flower2
      },
      {
        id: '3',
        title: "Games",
        description: "Gravida vulputate aliquet tempor aliquam sed quam pretium non urna sed elit aenean haruetra adipiscing porttibus a adipiscing gravida vulputate aliquam aliquet eget senectus aliquam sed quam pretium.",
        icon: Gamepad2
      },
      {
        id: '4',
        title: "Water Activities",
        description: "Gravida vulputate aliquet tempor aliquam sed quam pretium non urna sed elit aenean haruetra adipiscing porttibus a adipiscing gravida vulputate aliquam aliquet eget senectus aliquam sed quam pretium.",
        icon: Waves
      }
    ];

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="max-w-md">
            <h1 className="text-4xl lg:text-5xl font-serif font-normal text-gray-900 mb-4">Our Facilities</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Diam et habitasse tortor cras donec urna eget dolor in turpis venenatis eget pulvinar ipsum quisque non arcu nulla
            </p>
          </div>
          
          <button className="bg-yellow-400 px-6 py-2 text-black text-sm font-medium tracking-wider flex items-center gap-2 hover:bg-yellow-500 transition-colors">
            BOOK NOW
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Facilities List */}
        <div className="space-y-12">
          {facilities.map((facility: any, index: any) => {
            const IconComponent = facility.icon;
            return (
              <div key={facility.id} className="flex gap-8">
                {/* Left side - Images */}
                <div className="flex-1">
                  {/* Main large image */}
                  <div className="w-full h-56 bg-gray-400 mb-4"></div>
                  {/* Two smaller images side by side */}
                  <div className="flex gap-4">
                    <div className="flex-1 h-28 bg-gray-400"></div>
                    <div className="flex-1 h-28 bg-gray-400"></div>
                  </div>
                </div>
                
                {/* Right side - Content with white card */}
                <div className="w-80 relative">
                  <div className="bg-white shadow-sm border border-gray-100 p-6 h-full flex flex-col justify-center group hover:shadow-md transition-all duration-300">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-yellow-400 rounded-full mb-6 flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-serif text-gray-900 mb-4 font-normal">
                      {facility.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {facility.description}
                    </p>
                    
                    <button className="w-full bg-yellow-400 py-3 px-4 text-black text-sm font-medium tracking-wider flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors">
                      VIEW DETAILS
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurFacilitiesSection;