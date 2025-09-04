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
  const [error, setError] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const resortId = parseInt(process.env.NEXT_PUBLIC_RESORT_ID || '1');
        console.log('🏨 Resort ID from env:', resortId);
        
        // Comprehensive health check first
        console.log('🌡️ Starting comprehensive health check...');
        const healthCheck = await ContentService.healthCheck();
        setHealthStatus(healthCheck.data);
        
        if (!healthCheck.success) {
          console.warn('⚠️ Health check failed, but continuing with fallback mode');
          setError('Database connectivity issues detected. Using fallback mode.');
        }
        
        // Test database connection with enhanced error handling
        console.log('🔗 Testing database connection...');
        const connectionTest = await ContentService.testConnection();
        if (!connectionTest.success) {
          console.warn('❌ Database connection failed, using default values');
          setError(connectionTest.error?.message || 'Database connection failed');
          
          // Still show diagnostic information
          await ContentService.showAllTables();
          await ContentService.checkAccessibleTables();
          setLoading(false);
          return;
        }
        
        // Show diagnostic information
        const tableResult = await ContentService.showAllTables();
        const accessResult = await ContentService.checkAccessibleTables();
        
        // Run specific diagnosis for problematic tables
        if (!accessResult.success && accessResult.data === null) {
          console.log('🔍 Running specific diagnosis for problematic tables...');
          await ContentService.diagnoseTableIssue('users');
          await ContentService.diagnoseTableIssue('sections');
        }
        
        // Check if sample data exists
        const sampleDataCheck = await ContentService.checkSampleData(resortId);
        if (!sampleDataCheck.success) {
          console.warn('⚠️ Sample data check failed:', sampleDataCheck.error?.message);
        }
        
        // Fetch header data with enhanced error handling
        console.log('🗺️ Fetching header data...');
        const headerResult = await ContentService.getSectionByName(resortId, 'Header');
        if (headerResult.success && headerResult.data) {
          setHeaderData(headerResult.data);
          console.log('✅ Header data loaded successfully');
        } else {
          console.warn('⚠️ Header data not found:', headerResult.error?.message);
        }
        
        // Fetch hero section data with enhanced error handling
        console.log('🎆 Fetching hero data...');
        const heroResult = await ContentService.getSectionByName(resortId, 'Hero');
        if (heroResult.success && heroResult.data) {
          setHeroData(heroResult.data);
          console.log('✅ Hero data loaded successfully');
        } else {
          console.warn('⚠️ Hero data not found:', heroResult.error?.message);
        }
        
        // Fetch about section data with enhanced error handling
        console.log('ℹ️ Fetching about data...');
        const aboutResult = await ContentService.getSectionByName(resortId, 'About');
        if (aboutResult.success && aboutResult.data) {
          setAboutData(aboutResult.data);
          console.log('✅ About data loaded successfully');
        } else {
          console.warn('⚠️ About data not found:', aboutResult.error?.message);
        }
        
        // Clear any previous errors if we get here
        setError(null);
        console.log('🎉 All section data fetching completed!');
        
      } catch (globalError) {
        console.error('💥 Global error in fetchSectionData:', globalError);
        setError('An unexpected error occurred while loading page data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading resort data...</p>
          {healthStatus && (
            <div className="mt-4 text-sm text-gray-500">
              <p>Database: {healthStatus.checks?.database ? '✅' : '❌'}</p>
              <p>Tables: {healthStatus.checks?.tables ? '✅' : '❌'}</p>
              <p>Environment: {healthStatus.checks?.environment ? '✅' : '❌'}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Error state with helpful information
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Connection Issue</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="text-sm text-gray-500 mb-4">
            <p>The website will continue to work with default content.</p>
            <p>Check the browser console for detailed error information.</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Retry Connection
          </button>
        </div>
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
      <OtherAmenities />
      <SpecialDeals />
      <Testimonials />
      <LatestBlog />
      <Footer />
    </div>
  );
};

export default HomePage;