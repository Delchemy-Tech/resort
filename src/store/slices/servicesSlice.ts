import type {
    Service,
    ServicesState,
    ThunkApiConfig
} from '@/types/redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: ServicesState = {
  services: [],
  categories: [],
  selectedService: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Mock data for demonstration
const mockServices: Service[] = [
  {
    id: '1',
    title: 'Spa & Wellness',
    description: 'Rejuvenate your body and mind with our world-class spa treatments',
    icon: 'spa',
    category: 'Wellness',
    price: 150,
    duration: '90 minutes',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Concierge Service',
    description: 'Personalized assistance for all your vacation needs',
    icon: 'concierge',
    category: 'Support',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Fine Dining',
    description: 'Exquisite culinary experiences from around the world',
    icon: 'restaurant',
    category: 'Dining',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Adventure Tours',
    description: 'Exciting outdoor activities and guided adventures',
    icon: 'adventure',
    category: 'Activities',
    price: 200,
    duration: '4 hours',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Async thunks
export const fetchServices = createAsyncThunk<
  Service[],
  void,
  ThunkApiConfig
>('services/fetchServices', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    
    // Skip fetch if data exists
    if (state.services.services.length > 0) {
      return state.services.services;
    }

    // Simulate API call - replace with actual Supabase query
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockServices;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch services',
      code: 'SERVICES_FETCH_ERROR',
    });
  }
});

export const fetchServicesByCategory = createAsyncThunk<
  Service[],
  string,
  ThunkApiConfig
>('services/fetchServicesByCategory', async (category, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockServices.filter(service => service.category === category);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch services by category',
      code: 'SERVICES_CATEGORY_FETCH_ERROR',
    });
  }
});

export const fetchServiceById = createAsyncThunk<
  Service,
  string,
  ThunkApiConfig
>('services/fetchServiceById', async (serviceId, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const service = mockServices.find(s => s.id === serviceId);
    if (!service) {
      return rejectWithValue({
        message: `Service with ID ${serviceId} not found`,
        code: 'SERVICE_NOT_FOUND',
      });
    }

    return service;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch service',
      code: 'SERVICE_FETCH_ERROR',
    });
  }
});

// Services slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearServices: (state) => {
      state.services = [];
      state.categories = [];
      state.selectedService = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch services
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        
        // Extract unique categories
        state.categories = Array.from(
          new Set(action.payload.map(service => service.category))
        );
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch services';
      });

    // Fetch services by category
    builder
      .addCase(fetchServicesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Merge with existing services
        const existingIds = state.services.map(s => s.id);
        const newServices = action.payload.filter(s => !existingIds.includes(s.id));
        state.services.push(...newServices);
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchServicesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch services by category';
      });

    // Fetch service by ID
    builder
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
        
        // Add to services array if not already there
        const existingIndex = state.services.findIndex(s => s.id === action.payload.id);
        if (existingIndex === -1) {
          state.services.push(action.payload);
        } else {
          state.services[existingIndex] = action.payload;
        }
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch service';
      });
  },
});

// Export actions
export const { 
  setSelectedService, 
  clearError, 
  clearServices 
} = servicesSlice.actions;

// Export reducer
export default servicesSlice.reducer;