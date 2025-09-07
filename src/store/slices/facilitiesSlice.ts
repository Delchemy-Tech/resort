import type {
    FacilitiesState,
    Facility,
    ThunkApiConfig
} from '@/types/redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: FacilitiesState = {
  facilities: [],
  categories: [],
  selectedFacility: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Mock data
const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Swimming Pool',
    description: 'Olympic-size pool with poolside service',
    icon: 'pool',
    category: 'Recreation',
    available: true,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Fitness Center',
    description: 'State-of-the-art gym equipment and personal trainers',
    icon: 'gym',
    category: 'Fitness',
    available: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Business Center',
    description: 'Fully equipped business facilities with meeting rooms',
    icon: 'business',
    category: 'Business',
    available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Async thunks
export const fetchFacilities = createAsyncThunk<
  Facility[],
  void,
  ThunkApiConfig
>('facilities/fetchFacilities', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    if (state.facilities.facilities.length > 0) {
      return state.facilities.facilities;
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    return mockFacilities;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch facilities',
      code: 'FACILITIES_FETCH_ERROR',
    });
  }
});

// Facilities slice
const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    setSelectedFacility: (state, action: PayloadAction<Facility | null>) => {
      state.selectedFacility = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFacilities: (state) => {
      state.facilities = [];
      state.categories = [];
      state.selectedFacility = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload;
        state.categories = Array.from(new Set(action.payload.map(f => f.category)));
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch facilities';
      });
  },
});

export const { setSelectedFacility, clearError, clearFacilities } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;