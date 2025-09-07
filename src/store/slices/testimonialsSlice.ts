import type {
    Testimonial,
    TestimonialsState,
    ThunkApiConfig
} from '@/types/redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState: TestimonialsState = {
  testimonials: [],
  averageRating: 0,
  totalReviews: 0,
  featuredTestimonials: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// Mock data
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: 'Absolutely stunning resort with exceptional service. The views were breathtaking and the staff went above and beyond to make our stay memorable.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b131?w=200',
    date: '2024-01-15',
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    comment: 'Perfect getaway destination. The amenities were top-notch and the location was ideal for both relaxation and exploration.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    date: '2024-01-10',
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    location: 'Madrid, Spain',
    rating: 4,
    comment: 'Beautiful resort with great facilities. The spa was incredible and the dining options were excellent. Would definitely return!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    date: '2024-01-08',
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Async thunks
export const fetchTestimonials = createAsyncThunk<
  Testimonial[],
  void,
  ThunkApiConfig
>('testimonials/fetchTestimonials', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    if (state.testimonials.testimonials.length > 0) {
      return state.testimonials.testimonials;
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    return mockTestimonials;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch testimonials',
      code: 'TESTIMONIALS_FETCH_ERROR',
    });
  }
});

// Testimonials slice
const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTestimonials: (state) => {
      state.testimonials = [];
      state.featuredTestimonials = [];
      state.averageRating = 0;
      state.totalReviews = 0;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
        state.totalReviews = action.payload.length;
        state.averageRating = action.payload.reduce((sum, t) => sum + t.rating, 0) / action.payload.length;
        state.featuredTestimonials = action.payload.filter(t => t.verified).slice(0, 3);
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch testimonials';
      });
  },
});

export const { clearError, clearTestimonials } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;