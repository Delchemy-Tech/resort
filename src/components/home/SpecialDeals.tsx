import { ArrowRight } from 'lucide-react';

const SpecialDealsSection = () => {
  const deals = [
    { 
      id: 1, 
      title: "Extra 5% off",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Luxury Beach Resort Deal"
    },
    { 
      id: 2, 
      title: "Extra 5% off",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Mountain Villa Deal"
    },
    { 
      id: 3, 
      title: "Extra 5% off",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Desert Retreat Deal"
    },
    { 
      id: 4, 
      title: "Extra 5% off",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coastal Villa Deal"
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-0 mb-12">
          <div className="max-w-lg">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-4 sm:mb-6 font-normal">Special Deals</h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Diam et habitasse tortor cras donec urna eget dolor in turpis<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>venenatis eget pulvinar ipsum quisque non arcu nulla
            </p>
          </div>
          
          <button className="border-2 border-gray-900 px-6 sm:px-8 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium tracking-wider flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-colors self-start lg:self-auto">
            VIEW ALL
            <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="group relative">
              {/* Deal Image */}
              <div className="w-full h-48 sm:h-56 lg:h-76 mb-4 overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to gray placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.className = 'w-full h-48 sm:h-56 lg:h-76 bg-gray-400 mb-4';
                    }
                  }}
                />
              </div>
              
              {/* Deal info */}
              <div className="space-y-2 sm:space-y-3 absolute w-full bottom-6 sm:bottom-10 bg-white p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-serif text-gray-900 font-normal">
                  {deal.title}
                </h3>
                
                <button className="text-blue-500 text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2 hover:text-blue-600 transition-colors group">
                  VIEW DETAIL
                  <ArrowRight size={12} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
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