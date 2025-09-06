import Link from 'next/link';
import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbItems: Array<{
    label: string;
    href?: string;
    isActive?: boolean;
  }>;
  backgroundColor?: string;
  minHeight?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  breadcrumbItems,
  backgroundColor = '#8a8a8a',
  minHeight = '400px'
}) => {
  return (
    <div className="relative" style={{ backgroundColor, minHeight }}>
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex justify-between items-start">
          {/* Left side content */}
          <div className="flex flex-col">
            {subtitle && (
              <div className="mb-6">
                <span 
                  className="text-sm font-medium tracking-wider uppercase"
                  style={{ color: '#d4af37', letterSpacing: '0.15em' }}
                >
                  {subtitle}
                </span>
              </div>
            )}
            <h1 
              className="text-7xl font-light text-white leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {title}
            </h1>
          </div>

          {/* Right side breadcrumb */}
          <div className="flex items-center text-white text-sm font-medium mt-2">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index === 0 && (
                  <div className="flex items-center">
                    <svg 
                      className="w-4 h-4 mr-3" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    {item.href && !item.isActive ? (
                      <Link href={item.href} className="tracking-wide hover:text-yellow-300 transition-colors duration-200">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="tracking-wide">{item.label}</span>
                    )}
                  </div>
                )}
                {index > 0 && (
                  <>
                    <svg 
                      className="w-3 h-3 mx-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                    {item.href && !item.isActive ? (
                      <Link href={item.href} className="tracking-wide hover:text-yellow-300 transition-colors duration-200">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="tracking-wide">{item.label}</span>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHero;