import type {
    FetchPropertiesPayload,
    PropertiesState,
    Property,
    ThunkApiConfig,
    UpdateFiltersPayload
} from '@/types/redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: PropertiesState = {
  properties: [],
  featuredProperties: [],
  selectedProperty: null,
  filters: {
    priceRange: [0, 10000],
    bedrooms: null,
    bathrooms: null,
    location: null,
    features: [],
  },
  loading: false,
  error: null,
  lastFetched: null,
};

// Mock data for demonstration - replace with actual API calls
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Beach Villa',
    description: 'Stunning oceanfront villa with private beach access',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    location: 'Maldives',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    features: ['Private Beach', 'Pool', 'Spa', 'Ocean View'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mountain Resort Cabin',
    description: 'Cozy cabin nestled in the mountains with spectacular views',
    price: 800,
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=800',
    location: 'Swiss Alps',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    features: ['Mountain View', 'Fireplace', 'Hiking Trails', 'Ski Access'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Urban Penthouse',
    description: 'Modern penthouse in the heart of the city',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    location: 'New York',
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    features: ['City View', 'Rooftop Terrace', 'Luxury Amenities', 'Central Location'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Async thunks
export const fetchProperties = createAsyncThunk<
  Property[],
  FetchPropertiesPayload | undefined,
  ThunkApiConfig
>('properties/fetchProperties', async (payload = {}, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    
    // Skip fetch if data exists and no force
    if (state.properties.properties.length > 0 && !payload.limit) {
      return state.properties.properties;
    }

    // Simulate API call - replace with actual Supabase query
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let properties = [...mockProperties];
    
    // Apply filters if provided
    if (payload.filters) {
      if (payload.filters.location) {
        properties = properties.filter(p => 
          p.location.toLowerCase().includes(payload.filters!.location!.toLowerCase())
        );
      }
      if (payload.filters.bedrooms) {
        properties = properties.filter(p => p.bedrooms >= payload.filters!.bedrooms!);
      }
      if (payload.filters.bathrooms) {
        properties = properties.filter(p => p.bathrooms >= payload.filters!.bathrooms!);
      }
      if (payload.filters.priceRange) {
        const [min, max] = payload.filters.priceRange;
        properties = properties.filter(p => p.price >= min && p.price <= max);
      }
    }

    return properties;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch properties',
      code: 'PROPERTIES_FETCH_ERROR',
    });
  }
});

export const fetchFeaturedProperties = createAsyncThunk<
  Property[],
  number | undefined,
  ThunkApiConfig
>('properties/fetchFeaturedProperties', async (limit = 3, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return first few properties as featured
    return mockProperties.slice(0, limit);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch featured properties',
      code: 'FEATURED_PROPERTIES_FETCH_ERROR',
    });
  }
});

export const fetchPropertyById = createAsyncThunk<
  Property,
  string,
  ThunkApiConfig
>('properties/fetchPropertyById', async (propertyId, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) {
      return rejectWithValue({
        message: `Property with ID ${propertyId} not found`,
        code: 'PROPERTY_NOT_FOUND',
      });
    }

    return property;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch property',
      code: 'PROPERTY_FETCH_ERROR',
    });
  }
});

// Properties slice
const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<UpdateFiltersPayload>) => {
      state.filters = { ...state.filters, ...action.payload.filters };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearProperties: (state) => {
      state.properties = [];
      state.featuredProperties = [];
      state.selectedProperty = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch properties
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch properties';
      });

    // Fetch featured properties
    builder
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProperties = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch featured properties';
      });

    // Fetch property by ID
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
        
        // Add to properties array if not already there
        const existingIndex = state.properties.findIndex(p => p.id === action.payload.id);
        if (existingIndex === -1) {
          state.properties.push(action.payload);
        } else {
          state.properties[existingIndex] = action.payload;
        }
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch property';
      });
  },
});

// Export actions
export const { 
  updateFilters, 
  clearFilters, 
  setSelectedProperty, 
  clearError, 
  clearProperties 
} = propertiesSlice.actions;

// Export reducer
export default propertiesSlice.reducer;