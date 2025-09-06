import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import PageHero from '@/components/shared/PageHero';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header headerData={null} />
      <PageHero 
        title="About Us"
        subtitle="ABOUT US"
        breadcrumbItems={[
          { label: 'HOME', href: '/' },
          { label: 'ABOUT US', isActive: true }
        ]}
      />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600">
            This is the about page. Add your about page specific components in src/components/about/
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;