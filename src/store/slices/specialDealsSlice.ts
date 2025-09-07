import type {
    SpecialDeal,
    SpecialDealsState,
    ThunkApiConfig
} from '@/types/redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: SpecialDealsState = {
  deals: [],
  activeDeals: [],
  selectedDeal: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Mock data
const mockDeals: SpecialDeal[] = [
  {
    id: '1',
    title: 'Early Bird Special',
    description: 'Book 30 days in advance and save 20%',
    discount: 20,
    discountType: 'percentage',
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    terms: 'Valid for bookings made 30 days in advance',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Weekend Getaway',
    description: 'Special weekend rates for 2-night stays',
    discount: 150,
    discountType: 'fixed',
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    terms: 'Minimum 2 nights stay required',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Async thunks
export const fetchSpecialDeals = createAsyncThunk<
  SpecialDeal[],
  void,
  ThunkApiConfig
>('specialDeals/fetchSpecialDeals', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    if (state.specialDeals.deals.length > 0) {
      return state.specialDeals.deals;
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    return mockDeals;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch special deals',
      code: 'SPECIAL_DEALS_FETCH_ERROR',
    });
  }
});

// Special Deals slice
const specialDealsSlice = createSlice({
  name: 'specialDeals',
  initialState,
  reducers: {
    setSelectedDeal: (state, action: PayloadAction<SpecialDeal | null>) => {
      state.selectedDeal = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearDeals: (state) => {
      state.deals = [];
      state.activeDeals = [];
      state.selectedDeal = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
        state.activeDeals = action.payload.filter(deal => 
          deal.active && new Date(deal.validTo) > new Date()
        );
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchSpecialDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch special deals';
      });
  },
});

export const { setSelectedDeal, clearError, clearDeals } = specialDealsSlice.actions;
export default specialDealsSlice.reducer;