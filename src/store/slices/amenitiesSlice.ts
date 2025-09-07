import type {
    AmenitiesState,
    Amenity,
    ThunkApiConfig
} from '@/types/redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState: AmenitiesState = {
  amenities: [],
  categories: [],
  premiumAmenities: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// Mock data
const mockAmenities: Amenity[] = [
  {
    id: '1',
    name: 'Free WiFi',
    description: 'High-speed internet throughout the property',
    icon: 'wifi',
    category: 'Technology',
    available: true,
    premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Butler Service',
    description: 'Personal butler service for premium guests',
    icon: 'butler',
    category: 'Service',
    available: true,
    premium: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: '24/7 Room Service',
    description: 'Round-the-clock room service',
    icon: 'room-service',
    category: 'Service',
    available: true,
    premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Async thunks
export const fetchAmenities = createAsyncThunk<
  Amenity[],
  void,
  ThunkApiConfig
>('amenities/fetchAmenities', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    if (state.amenities.amenities.length > 0) {
      return state.amenities.amenities;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAmenities;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch amenities',
      code: 'AMENITIES_FETCH_ERROR',
    });
  }
});

// Amenities slice
const amenitiesSlice = createSlice({
  name: 'amenities',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAmenities: (state) => {
      state.amenities = [];
      state.categories = [];
      state.premiumAmenities = [];
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmenities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmenities.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = action.payload;
        state.categories = Array.from(new Set(action.payload.map(a => a.category)));
        state.premiumAmenities = action.payload.filter(a => a.premium);
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchAmenities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch amenities';
      });
  },
});

export const { clearError, clearAmenities } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;