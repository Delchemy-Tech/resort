import { ArrowRight } from 'lucide-react';

const SpecialDealsSection = () => {
  const deals = [
    { id: 1, title: "Extra 5% off" },
    { id: 2, title: "Extra 5% off" },
    { id: 3, title: "Extra 5% off" },
    { id: 4, title: "Extra 5% off" }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="max-w-lg">
            <h1 className="text-5xl font-serif text-gray-900 mb-6 font-normal">Special Deals</h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Diam et habitasse tortor cras donec urna eget dolor in turpis<br />
              venenatis eget pulvinar ipsum quisque non arcu nulla
            </p>
          </div>
          
          <button className="border-2 border-gray-900 px-8 py-3 text-gray-900 text-sm font-medium tracking-wider flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-colors">
            VIEW ALL
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* Top Row - 4 cards */}
          {deals.map((deal) => (
            <div key={deal.id} className="group relative">
              {/* Large gray rectangle */}
              <div className="w-full h-76 bg-gray-400 mb-4"></div>
              
              {/* Deal info */}
              <div className="space-y-3 absolute w-full bottom-10 bg-white p-4">
                <h3 className="text-xl font-serif text-gray-900 font-normal">
                  {deal.title}
                </h3>
                
                <button className="text-blue-500 text-sm font-medium tracking-wide flex items-center gap-2 hover:text-blue-600 transition-colors group">
                  VIEW DETAIL
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialDealsSection;