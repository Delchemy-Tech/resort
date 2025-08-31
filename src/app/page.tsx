"use client";
import { Section } from '@/lib/supabase';
import { ContentService } from '@/services/contentService';
import { Calendar, Facebook, Instagram, Mail, MapPin, Phone, Star, Twitter, Users, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Mock data types
interface Property {
  id: string;
  title: string;
  location: string;
  image: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
}

interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
}

interface Amenity {
  id: string;
  name: string;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
}

// Mock data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
  },
  {
    id: '2',
    title: 'Mountain Retreat Villa',
    location: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: '3',
    title: 'Modern City Apartment',
    location: 'New York',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  }
];

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

const mockFacilities: Facility[] = [
  {
    id: '1',
    title: 'Infinity Pool',
    description: 'Stunning infinity pools with breathtaking views overlooking the ocean or mountains',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80'
  },
  {
    id: '2',
    title: 'Private Beach',
    description: 'Exclusive access to pristine private beaches with white sand and crystal clear waters',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  }
];

const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Book 60 days in advance',
    discount: '25% OFF'
  },
  {
    id: '2',
    title: 'Extended Stay',
    description: 'Stay for 7+ nights',
    discount: '30% OFF'
  },
  {
    id: '3',
    title: 'Last Minute',
    description: 'Book within 48 hours',
    discount: '20% OFF'
  },
  {
    id: '4',
    title: 'Group Booking',
    description: 'Book for 8+ guests',
    discount: '35% OFF'
  }
];

const mockAmenities: Amenity[] = [
  { id: '1', name: 'WiFi' },
  { id: '2', name: 'Parking' },
  { id: '3', name: 'Pool' },
  { id: '4', name: 'Gym' },
  { id: '5', name: 'Spa' },
  { id: '6', name: 'Restaurant' },
  { id: '7', name: 'Bar' },
  { id: '8', name: 'Tennis' }
];

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

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Luxury Destinations for 2024',
    excerpt: 'Discover the most exclusive and breathtaking destinations for your next luxury vacation.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: '2',
    title: 'Villa Rental Tips: What to Look For',
    excerpt: 'Essential tips and guidelines for choosing the perfect luxury villa for your vacation.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
  },
  {
    id: '3',
    title: 'Sustainable Luxury Travel',
    excerpt: 'How to enjoy luxury travel while being mindful of environmental impact.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80'
  }
];

// Header Component
const Header = ({ headerData }: { headerData: Section | null }) => {
  // Default values if no data from database
  const defaultData = {
    brand_name: 'VillaRent',
    navigation: [
      { name: 'Home', href: '#' },
      { name: 'Properties', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    cta_button: 'Sign In'
  };

  // Use database data if available, otherwise use defaults
  const data = headerData?.section_json || defaultData;
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {data.brand_name || defaultData.brand_name}
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {(data.navigation || defaultData.navigation).map((item: any, index: number) => (
              <a 
                key={index}
                href={item.href || '#'} 
                className={`${index === 0 ? 'text-gray-900' : 'text-gray-700'} hover:text-yellow-600`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
              {data.cta_button || defaultData.cta_button}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = ({ heroData }: { heroData: Section | null }) => {
  // Default values if no data from database
  const defaultData = {
    title: 'Find Your Best Villa House And Apartment',
    subtitle: 'Discover luxury villas and apartments for your perfect getaway',
    background_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    search_form: {
      location_placeholder: 'Location',
      checkin_placeholder: 'Check in',
      checkout_placeholder: 'Check out',
      guests_placeholder: 'Guests',
      search_button: 'Search Properties'
    }
  };

  // Use database data if available, otherwise use defaults
  const data = heroData?.section_json || defaultData;
  
  return (
    <section className="relative h-screen bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${data.background_image || defaultData.background_image}")`
    }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {(data.title || defaultData.title).split(' ').map((word: string, index: number, arr: string[]) => (
              <React.Fragment key={index}>
                {word}
                {index === Math.floor(arr.length / 3) || index === Math.floor((arr.length * 2) / 3) ? <br /> : ' '}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-xl mb-8 opacity-90">
            {data.subtitle || defaultData.subtitle}
          </p>
          
          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <MapPin className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.location_placeholder || defaultData.search_form.location_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <Calendar className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.checkin_placeholder || defaultData.search_form.checkin_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <Calendar className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.checkout_placeholder || defaultData.search_form.checkout_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <Users className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={data.search_form?.guests_placeholder || defaultData.search_form.guests_placeholder} 
                  className="bg-transparent outline-none flex-1 text-gray-700" 
                />
              </div>
            </div>
            <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold">
              {data.search_form?.search_button || defaultData.search_form.search_button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Villa Component
const AboutVilla = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Luxury Villa" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About VillaRent
            </h2>
            <p className="text-gray-600 mb-6">
              Access Only The Finest Villas In The Most Exclusive Destinations. Our carefully curated collection features the world's most spectacular luxury villas, each offering unparalleled comfort and breathtaking views.
            </p>
            <p className="text-gray-600 mb-8">
              From beachfront paradises to mountain retreats, we provide extraordinary experiences that exceed expectations. Every property is hand-selected for its unique character and exceptional quality.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Properties Component
const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the world's most extraordinary villas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Component
const Services = () => {
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

// Facilities Component
const Facilities = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Facilities
          </h2>
          <p className="text-gray-600">
            Experience luxury amenities designed for your comfort
          </p>
        </div>
        
        <div className="space-y-16">
          {mockFacilities.map((facility, index) => (
            <div key={facility.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <img 
                  src={facility.image} 
                  alt={facility.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                <p className="text-gray-600 mb-6">{facility.description}</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Special Deals Component
const SpecialDeals = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Special Deals
          </h2>
          <p className="text-gray-600">
            Don't miss out on these exclusive offers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDeals.map((deal) => (
            <div key={deal.id} className="bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-yellow-500 mb-2">{deal.discount}</div>
              <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
              <p className="text-gray-600 text-sm">{deal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Other Amenities Component
const OtherAmenities = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Other Amenities
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Enjoy additional luxury amenities including 24/7 concierge service, private beach access, infinity pools, fitness centers, and much more.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {mockAmenities.map((amenity) => (
            <div key={amenity.id} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full mb-2"></div>
              <span className="text-sm text-gray-600">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component  
const Testimonials = () => {
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

// Latest Blog Component
const LatestBlog = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600">
            Stay updated with travel tips and destination guides
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockBlogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-yellow-500 hover:text-yellow-600 font-semibold">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
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

// Main Component
const LuxuryVillaHomepage = () => {
  const [headerData, setHeaderData] = useState<Section | null>(null);
  const [heroData, setHeroData] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const resortId = parseInt(process.env.NEXT_PUBLIC_RESORT_ID || '1');
        
        // Fetch header data (you can adjust section name as needed)
        const headerSection = await ContentService.getSectionByName(resortId, 'Header');
        setHeaderData(headerSection);
        
        // Fetch hero section data
        const heroSection = await ContentService.getSectionByName(resortId, 'Hero');
        setHeroData(heroSection);
        console.log('Header data:', );
        
      } catch (error) {
        console.error('Error fetching section data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header headerData={headerData} />
      <HeroSection heroData={heroData} />
      <AboutVilla />
      <FeaturedProperties />
      <Services />
      <Facilities />
      <SpecialDeals />
      <OtherAmenities />
      <Testimonials />
      <LatestBlog />
      <Footer />
    </div>
  );
};

export default LuxuryVillaHomepage;