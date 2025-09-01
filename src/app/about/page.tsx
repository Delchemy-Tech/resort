import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header headerData={null} />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
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