# Pages Router Directory Structure

This project has been migrated from App Router to Pages Router with a page-specific component organization.

## Directory Structure

```
resort/
├── pages/                          # Pages Router directory
│   ├── _app.tsx                   # Global app configuration
│   ├── index.tsx                  # Home page (/)
│   ├── about.tsx                  # About page (/about)
│   ├── properties.tsx             # Properties page (/properties)
│   └── contact.tsx                # Contact page (/contact)
│
├── src/
│   ├── components/                # Component organization by page
│   │   ├── shared/               # Shared components across pages
│   │   │   ├── Header.tsx        # Global header component
│   │   │   └── Footer.tsx        # Global footer component
│   │   │
│   │   ├── home/                 # Home page specific components
│   │   │   ├── HeroSection.tsx   # Hero section
│   │   │   ├── AboutVilla.tsx    # About villa section
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
│   ├── services/                 # Data services
│   │   └── contentService.ts    # Content fetching service
│   │
│   └── app/                     # (Legacy from App Router)
│       └── globals.css          # Global styles
│
├── .env.local                   # Environment variables
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Key Changes Made

### 1. Pages Router Setup
- Created `pages/` directory in the root
- Added `_app.tsx` for global configuration
- Migrated home page to `pages/index.tsx`
- Created sample pages: about.tsx, properties.tsx, contact.tsx

### 2. Component Reorganization
- **Shared Components**: Moved Header.tsx and Footer.tsx to `src/components/shared/`
- **Home Page Components**: Moved all home page sections to `src/components/home/`
- **Page-Specific Folders**: Created folders for about, properties, and contact pages

### 3. Updated Import Paths
- Updated all import statements to reflect new component locations
- Shared components imported from `@/components/shared/`
- Page-specific components imported from `@/components/[page]/`

## How to Add New Pages

### 1. Create a New Page
Create a new file in the `pages/` directory:
```typescript
// pages/new-page.tsx
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

### 2. Create Page-Specific Components
Create a new folder in `src/components/` for your page:
```
src/components/new-page/
├── NewPageSection1.tsx
├── NewPageSection2.tsx
└── NewPageSection3.tsx
```

### 3. Import Page-Specific Components
In your page file, import components from the page-specific folder:
```typescript
import NewPageSection1 from '@/components/new-page/NewPageSection1';
import NewPageSection2 from '@/components/new-page/NewPageSection2';
```

## Benefits of This Structure

1. **Clear Separation**: Each page has its own component folder
2. **Shared Components**: Common components (Header, Footer) are in a shared folder
3. **Scalability**: Easy to add new pages and their specific components
4. **Maintainability**: Components are organized logically by page
5. **Pages Router**: Standard Next.js routing with file-based routing

## Database Integration

The Supabase integration remains unchanged:
- Database configuration in `src/lib/supabase.ts`
- Content service in `src/services/contentService.ts`
- Environment variables in `.env.local`

All database-connected components (Header, HeroSection, AboutVilla) maintain their Supabase integration with fallback mechanisms.