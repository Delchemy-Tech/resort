import { Section } from '@/lib/supabase';

// Base state for async operations
export interface AsyncState {
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
}

// Content slice state
export interface ContentState extends AsyncState {
  sections: Record<string, Section>;
  allSections: Section[];
  resortId: number;
  healthStatus: HealthStatus | null;
}

// Properties slice state
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface PropertiesState extends AsyncState {
  properties: Property[];
  featuredProperties: Property[];
  selectedProperty: Property | null;
  filters: PropertyFilters;
}

export interface PropertyFilters {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  location: string | null;
  features: string[];
}

// Services slice state
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category: string;
  price?: number;
  duration?: string;
  created_at: string;
  updated_at: string;
}

export interface ServicesState extends AsyncState {
  services: Service[];
  categories: string[];
  selectedService: Service | null;
}

// Facilities slice state
export interface Facility {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: string;
  available: boolean;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface FacilitiesState extends AsyncState {
  facilities: Facility[];
  categories: string[];
  selectedFacility: Facility | null;
}

// Amenities slice state
export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: string;
  available: boolean;
  premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface AmenitiesState extends AsyncState {
  amenities: Amenity[];
  categories: string[];
  premiumAmenities: Amenity[];
}

// Special Deals slice state
export interface SpecialDeal {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  validFrom: string;
  validTo: string;
  terms: string;
  image?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SpecialDealsState extends AsyncState {
  deals: SpecialDeal[];
  activeDeals: SpecialDeal[];
  selectedDeal: SpecialDeal | null;
}

// Testimonials slice state
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialsState extends AsyncState {
  testimonials: Testimonial[];
  averageRating: number;
  totalReviews: number;
  featuredTestimonials: Testimonial[];
}

// Blog slice state
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  image?: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogState extends AsyncState {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
  selectedPost: BlogPost | null;
  latestPosts: BlogPost[];
}

// Health status interface
export interface HealthStatus {
  timestamp: string;
  service: string;
  version: string;
  checks: {
    database: boolean;
    tables: boolean;
    environment: boolean;
  };
}

// UI slice state for global UI state
export interface UIState {
  mobileMenuOpen: boolean;
  searchModalOpen: boolean;
  bookingModalOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  loading: {
    global: boolean;
    components: Record<string, boolean>;
  };
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  autoClose?: boolean;
  duration?: number;
}

// Root state interface
export interface RootState {
  content: ContentState;
  properties: PropertiesState;
  services: ServicesState;
  facilities: FacilitiesState;
  amenities: AmenitiesState;
  specialDeals: SpecialDealsState;
  testimonials: TestimonialsState;
  blog: BlogState;
  ui: UIState;
}

// Action payload types for async thunks
export interface FetchContentPayload {
  resortId: number;
  sectionName?: string;
  force?: boolean;
}

export interface FetchPropertiesPayload {
  filters?: Partial<PropertyFilters>;
  limit?: number;
  offset?: number;
}

export interface UpdateFiltersPayload {
  filters: Partial<PropertyFilters>;
}

// Error handling types
export interface ApiError {
  message: string;
  code: string;
  details?: string;
  hint?: string;
  status?: number;
}

export interface ThunkApiConfig {
  state: RootState;
  rejectValue: ApiError;
}

// Utility types for Redux actions
export type AppDispatch = any; // Will be properly typed in hooks
export type AppThunk<ReturnType = void> = any; // Will be properly typed in store