import { ArrowRight, MapPin } from 'lucide-react';

const StayInComfortSection = () => {
  const properties = [
    {
      id: 1,
      name: "The Secret Jungle Villa",
      location: "BALI, INDONESIA",
      price: "$290,00"
    },
    {
      id: 2,
      name: "The Secret Jungle Villa",
      location: "BALI, INDONESIA", 
      price: "$290,00"
    },
    {
      id: 3,
      name: "The Secret Jungle Villa",
      location: "BALI, INDONESIA",
      price: "$290,00"
    }
  ];

  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <h1 className="text-5xl font-serif text-black mb-6">Stay In Comfort</h1>
            <p className="text-gray-600 max-w-md text-lg leading-relaxed">
              Diam et habitasse tortor cras donec urna eget dolor in turpis<br />
              venenatis eget pulvinar ipsum quisque non arcu nulla
            </p>
          </div>
          
          <button className="bg-yellow-400 px-8 py-3 text-black font-medium tracking-wide flex items-center gap-2 hover:bg-yellow-500 transition-colors">
            VIEW ALL
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white">
              {/* Large Gray Rectangle Image Placeholder */}
              <div className="w-full h-80 bg-gray-400 mb-6"></div>
              
              {/* Property Info */}
              <div className="px-0">
                <h3 className="text-xl font-serif text-black mb-3">
                  {property.name}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-4 tracking-wide">
                  <MapPin size={16} className="mr-2" />
                  {property.location}
                </div>
                
                <div className="text-2xl text-orange-500 font-medium">
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