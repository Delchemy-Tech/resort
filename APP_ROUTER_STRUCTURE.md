# App Router Directory Structure

This project uses Next.js App Router with a page-specific component organization for optimal scalability and maintainability.

## Directory Structure

```
resort/
├── src/
│   ├── app/                        # App Router directory
│   │   ├── layout.tsx             # Root layout with metadata
│   │   ├── page.tsx               # Home page (/)
│   │   ├── globals.css            # Global styles
│   │   ├── favicon.ico            # Favicon
│   │   │
│   │   ├── about/                 # About page route
│   │   │   └── page.tsx          # About page (/about)
│   │   │
│   │   ├── properties/            # Properties page route
│   │   │   └── page.tsx          # Properties page (/properties)
│   │   │
│   │   └── contact/               # Contact page route
│   │       └── page.tsx          # Contact page (/contact)
│   │
│   ├── components/                # Page-specific component organization
│   │   ├── shared/               # Shared components across pages
│   │   │   ├── Header.tsx        # Database-integrated header
│   │   │   └── Footer.tsx        # Global footer component
│   │   │
│   │   ├── home/                 # Home page specific components
│   │   │   ├── HeroSection.tsx   # Database-integrated hero
│   │   │   ├── AboutVilla.tsx    # Database-integrated about
│   │   │   ├── FeaturedProperties.tsx # Featured properties
│   │   │   ├── Services.tsx      # Services section
│   │   │   ├── Facilities.tsx    # Facilities section
│   │   │   ├── SpecialDeals.tsx  # Special deals section
│   │   │   ├── OtherAmenities.tsx # Other amenities
│   │   │   ├── Testimonials.tsx  # Testimonials section
│   │   │   └── LatestBlog.tsx    # Latest blog section
│   │   │
│   │   ├── about/                # About page specific components
│   │   │   └── (add about page components here)
│   │   │
│   │   ├── properties/           # Properties page specific components
│   │   │   └── (add properties page components here)
│   │   │
│   │   └── contact/              # Contact page specific components
│   │       └── (add contact page components here)
│   │
│   ├── lib/                      # Utility libraries
│   │   └── supabase.ts          # Supabase configuration
│   │
│   └── services/                 # Data services
│       └── contentService.ts    # Content fetching service
│
├── .env.local                   # Environment variables
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Key Changes from Pages Router

### 1. App Router Features
- **File-based routing**: Routes defined by folder structure in `src/app/`
- **Nested layouts**: Layouts can be nested for different sections
- **Server Components**: Default server-side rendering for better performance
- **Improved SEO**: Better meta tag management with layout.tsx

### 2. Component Organization
- **Shared Components**: Common components in `src/components/shared/`
- **Page-Specific Components**: Components organized by page in respective folders
- **Clear Separation**: Each page has its own component directory

### 3. Route Structure
- **Home**: `/` → `src/app/page.tsx`
- **About**: `/about` → `src/app/about/page.tsx`
- **Properties**: `/properties` → `src/app/properties/page.tsx`
- **Contact**: `/contact` → `src/app/contact/page.tsx`

## How to Add New Pages

### 1. Create a New Route
Create a new folder and page.tsx in the `src/app/` directory:
```
src/app/new-page/
└── page.tsx
```

### 2. Page Component Template
```typescript
// src/app/new-page/page.tsx
import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const NewPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header headerData={null} />
      <main>
        {/* Your page content */}
      </main>
      <Footer />
    </div>
  );
};

export default NewPage;
```

### 3. Create Page-Specific Components
Create a new folder in `src/components/` for your page:
```
src/components/new-page/
├── NewPageSection1.tsx
├── NewPageSection2.tsx
└── NewPageSection3.tsx
```

### 4. Import Page-Specific Components
In your page file, import components from the page-specific folder:
```typescript
import NewPageSection1 from '@/components/new-page/NewPageSection1';
import NewPageSection2 from '@/components/new-page/NewPageSection2';
```

## Benefits of App Router Structure

### 1. Performance
- **Server Components**: Default server-side rendering
- **Improved Loading**: Better loading states and error handling
- **SEO Optimization**: Better meta tag and layout management

### 2. Developer Experience
- **Type Safety**: Full TypeScript support
- **Better Error Handling**: Improved error boundaries
- **Simplified Routing**: File-based routing is intuitive

### 3. Scalability
- **Component Organization**: Clear separation by page functionality
- **Shared Components**: Reusable components for common elements
- **Maintainability**: Easy to find and modify page-specific code

### 4. App Router Specific Features
- **Parallel Routes**: Can render multiple pages simultaneously
- **Intercepting Routes**: Can intercept routes for modals/overlays
- **Route Groups**: Can organize routes without affecting URL structure

## Database Integration

The Supabase integration remains unchanged and fully compatible:
- Database configuration in `src/lib/supabase.ts`
- Content service in `src/services/contentService.ts`
- Environment variables in `.env.local`
- Enhanced error handling with fallback mechanisms

All database-connected components (Header, HeroSection, AboutVilla) maintain their Supabase integration with proper error handling.

## Available Routes

- **Home**: [/](/) - Full home page with all sections
- **About**: [/about](/about) - Ready for about page components
- **Properties**: [/properties](/properties) - Ready for properties listing
- **Contact**: [/contact](/contact) - Ready for contact form and info

## Next Steps

1. **Add Components**: Create components in page-specific folders
2. **Enhance Layouts**: Add page-specific layouts if needed
3. **Database Integration**: Connect other pages to Supabase database
4. **SEO Optimization**: Add page-specific metadata to each page.tsx

Your resort website now uses the modern App Router architecture with excellent organization and scalability! 🏨✨