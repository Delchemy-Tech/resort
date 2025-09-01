"use client";
import { Section } from '@/lib/supabase';
import { ContentService } from '@/services/contentService';
import React, { useEffect, useState } from 'react';

// Import shared components
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

// Import home page specific components
import AboutVilla from '@/components/home/AboutVilla';
import Facilities from '@/components/home/Facilities';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import HeroSection from '@/components/home/HeroSection';
import LatestBlog from '@/components/home/LatestBlog';
import OtherAmenities from '@/components/home/OtherAmenities';
import Services from '@/components/home/Services';
import SpecialDeals from '@/components/home/SpecialDeals';
import Testimonials from '@/components/home/Testimonials';

// Main Home Page Component
const HomePage: React.FC = () => {
  const [headerData, setHeaderData] = useState<Section | null>(null);
  const [heroData, setHeroData] = useState<Section | null>(null);
  const [aboutData, setAboutData] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const resortId = parseInt(process.env.NEXT_PUBLIC_RESORT_ID || '1');
        console.log('🏨 Resort ID from env:', resortId);
        
        // Test database connection first
        console.log('🔗 Testing database connection...');
        const connectionTest = await ContentService.testConnection();
        if (!connectionTest) {
          console.warn('❌ Database connection failed, using default values');
          // Still show table information even if connection failed
          await ContentService.showAllTables();
          await ContentService.checkAccessibleTables();
          setLoading(false);
          return;
        }
        
        // Show all tables in the database
        await ContentService.showAllTables();
        await ContentService.checkAccessibleTables();
        
        // Check if sample data exists
        await ContentService.checkSampleData(resortId);
        
        // Fetch header data
        console.log('🗺 Fetching header data...');
        const headerSection = await ContentService.getSectionByName(resortId, 'Header');
        setHeaderData(headerSection);
        
        // Fetch hero section data
        console.log('🎆 Fetching hero data...');
        const heroSection = await ContentService.getSectionByName(resortId, 'Hero');
        setHeroData(heroSection);
        
        // Fetch about section data
        console.log('ℹ️ Fetching about data...');
        const aboutSection = await ContentService.getSectionByName(resortId, 'About');
        setAboutData(aboutSection);
        
      } catch (error) {
        console.error('💥 Error fetching section data:', error);
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
      <AboutVilla aboutData={aboutData} />
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

export default HomePage;