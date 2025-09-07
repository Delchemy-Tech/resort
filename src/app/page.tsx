"use client";

import React, { useEffect } from 'react';

// Configure runtime for Cloudflare Pages Edge Runtime
export const runtime = "edge";

// Import Redux hooks and actions
import { useAppDispatch, useContent, useContentSection, useErrorState, useLoadingState } from '@/hooks/redux';
import { fetchAmenities } from '@/store/slices/amenitiesSlice';
import { fetchLatestBlogPosts } from '@/store/slices/blogSlice';
import {
  fetchAllSections,
  fetchHealthStatus,
  fetchSection,
  testDatabaseConnection,
} from '@/store/slices/contentSlice';
import { fetchFacilities } from '@/store/slices/facilitiesSlice';
import { fetchFeaturedProperties } from '@/store/slices/propertiesSlice';
import { fetchServices } from '@/store/slices/servicesSlice';
import { fetchSpecialDeals } from '@/store/slices/specialDealsSlice';
import { fetchTestimonials } from '@/store/slices/testimonialsSlice';
import { addNotification, setGlobalLoading } from '@/store/slices/uiSlice';

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
  const dispatch = useAppDispatch();
  
  // Redux state selectors
  const content = useContent();
  const loadingState = useLoadingState();
  const errorState = useErrorState();
  
  // Get specific sections
  const headerData = useContentSection('Header');
  const heroData = useContentSection('Hero');
  const aboutData = useContentSection('About');
  
  useEffect(() => {
    const initializeApp = async () => {
      try {
        dispatch(setGlobalLoading(true));
        
        const resortId = parseInt(process.env.NEXT_PUBLIC_RESORT_ID || '1');
        console.log('🏨 Resort ID from env:', resortId);
        
        // Health check first
        console.log('🌡️ Starting comprehensive health check...');
        const healthResult = await dispatch(fetchHealthStatus()).unwrap();
        
        if (!healthResult) {
          dispatch(addNotification({
            type: 'warning',
            title: 'Database Warning',
            message: 'Database connectivity issues detected. Using fallback mode.',
            autoClose: true,
            duration: 5000,
          }));
        }
        
        // Test database connection
        console.log('🔗 Testing database connection...');
        try {
          await dispatch(testDatabaseConnection()).unwrap();
          console.log('✅ Database connection successful');
        } catch (connectionError) {
          console.warn('❌ Database connection failed, using default values');
          dispatch(addNotification({
            type: 'error',
            title: 'Connection Failed',
            message: 'Database connection failed. Using default content.',
            autoClose: true,
            duration: 5000,
          }));
        }
        
        // Fetch all sections
        console.log('📊 Fetching all sections...');
        try {
          await dispatch(fetchAllSections({ resortId })).unwrap();
        } catch (sectionsError) {
          console.warn('⚠️ Failed to fetch sections:', sectionsError);
        }
        
        // Fetch specific sections
        const sectionPromises = [
          dispatch(fetchSection({ resortId, sectionName: 'Header' })),
          dispatch(fetchSection({ resortId, sectionName: 'Hero' })),
          dispatch(fetchSection({ resortId, sectionName: 'About' })),
        ];
        
        // Fetch all other data in parallel
        const dataPromises = [
          dispatch(fetchFeaturedProperties(3)),
          dispatch(fetchServices()),
          dispatch(fetchFacilities()),
          dispatch(fetchAmenities()),
          dispatch(fetchSpecialDeals()),
          dispatch(fetchTestimonials()),
          dispatch(fetchLatestBlogPosts(3)),
        ];
        
        // Wait for all data to load
        await Promise.allSettled([...sectionPromises, ...dataPromises]);
        
        dispatch(addNotification({
          type: 'success',
          title: 'Data Loaded',
          message: 'All resort data has been loaded successfully!',
          autoClose: true,
          duration: 3000,
        }));
        
        console.log('🎉 All data fetching completed!');
        
      } catch (globalError) {
        console.error('💥 Global error in initializeApp:', globalError);
        dispatch(addNotification({
          type: 'error',
          title: 'Loading Error',
          message: 'An unexpected error occurred while loading page data.',
          autoClose: false,
        }));
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    initializeApp();
  }, [dispatch]);

  if (loadingState.global || loadingState.content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading resort data...</p>
          {content.healthStatus && (
            <div className="mt-4 text-sm text-gray-500">
              <p>Database: {content.healthStatus.checks?.database ? '✅' : '❌'}</p>
              <p>Tables: {content.healthStatus.checks?.tables ? '✅' : '❌'}</p>
              <p>Environment: {content.healthStatus.checks?.environment ? '✅' : '❌'}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Error state with helpful information
  if (errorState.hasErrors) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Connection Issue</h2>
          <p className="text-gray-600 mb-6">{errorState.content || 'An error occurred'}</p>
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