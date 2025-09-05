import { ArrowRight, MapPin } from 'lucide-react';

const StayInComfortSection = () => {
  const properties = [
    {
      id: 1,
      name: "The Secret Jungle Villa",
      location: "BALI, INDONESIA",
      price: "$290,00",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Luxury Beach Resort",
      location: "MALDIVES", 
      price: "$450,00",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Mountain View Retreat",
      location: "SWISS ALPS",
      price: "$380,00",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <div className="bg-gray-50 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-0 mb-12 md:mb-16">
          <div className="max-w-full lg:max-w-md">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-gray-900 mb-4 md:mb-6 leading-tight">Stay In Comfort</h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Diam et habitasse tortor cras donec urna eget dolor in turpis
              venenatis eget pulvinar ipsum quisque non arcu nulla
            </p>
          </div>
          
          <button className="bg-yellow-400 px-6 md:px-8 py-2 md:py-3 text-black font-medium text-sm uppercase tracking-wide flex items-center justify-center lg:justify-start gap-2 hover:bg-yellow-500 transition-colors w-full sm:w-auto">
            VIEW ALL
            <ArrowRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Property Image */}
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              {/* Property Info */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-serif font-normal text-gray-900 mb-2 md:mb-3 leading-tight">
                  {property.name}
                </h3>
                
                <div className="flex items-center text-gray-500 text-xs md:text-sm mb-3 md:mb-4 tracking-wide uppercase">
                  <MapPin size={14} className="mr-2 md:w-4 md:h-4" />
                  {property.location}
                </div>
                
                <div className="text-xl md:text-2xl text-orange-500 font-medium">
                  {property.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StayInComfortSection;