import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header headerData={null} />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
          <p className="text-lg text-gray-600">
            This is the contact page. Add your contact page specific components in src/components/contact/
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;