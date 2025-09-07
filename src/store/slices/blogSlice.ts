import type {
    BlogPost,
    BlogState,
    ThunkApiConfig
} from '@/types/redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: BlogState = {
  posts: [],
  categories: [],
  tags: [],
  selectedPost: null,
  latestPosts: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// Mock data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in the Maldives',
    excerpt: 'Discover the most spectacular and secluded spots in this tropical paradise',
    content: 'Full blog post content here...',
    author: 'Travel Expert',
    publishDate: '2024-01-20',
    category: 'Travel Tips',
    tags: ['Maldives', 'Hidden Gems', 'Travel'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    slug: 'top-10-hidden-gems-maldives',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Luxury Spa Treatments You Must Try',
    excerpt: 'Indulge in these rejuvenating spa experiences during your stay',
    content: 'Full blog post content here...',
    author: 'Wellness Expert',
    publishDate: '2024-01-18',
    category: 'Wellness',
    tags: ['Spa', 'Wellness', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    slug: 'luxury-spa-treatments-must-try',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Sustainable Tourism: Our Commitment',
    excerpt: 'Learn about our eco-friendly initiatives and sustainable practices',
    content: 'Full blog post content here...',
    author: 'Sustainability Team',
    publishDate: '2024-01-15',
    category: 'Sustainability',
    tags: ['Sustainability', 'Environment', 'Tourism'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    slug: 'sustainable-tourism-commitment',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Async thunks
export const fetchBlogPosts = createAsyncThunk<
  BlogPost[],
  { limit?: number; category?: string } | undefined,
  ThunkApiConfig
>('blog/fetchBlogPosts', async (params = {}, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    if (state.blog.posts.length > 0 && !params.category && !params.limit) {
      return state.blog.posts;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    
    let posts = [...mockBlogPosts];
    
    if (params.category) {
      posts = posts.filter(post => post.category === params.category);
    }
    
    if (params.limit) {
      posts = posts.slice(0, params.limit);
    }
    
    return posts;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch blog posts',
      code: 'BLOG_POSTS_FETCH_ERROR',
    });
  }
});

export const fetchLatestBlogPosts = createAsyncThunk<
  BlogPost[],
  number | undefined,
  ThunkApiConfig
>('blog/fetchLatestBlogPosts', async (limit = 3, { rejectWithValue }) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return mockBlogPosts
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch latest blog posts',
      code: 'LATEST_BLOG_POSTS_FETCH_ERROR',
    });
  }
});

// Blog slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<BlogPost | null>) => {
      state.selectedPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearBlog: (state) => {
      state.posts = [];
      state.categories = [];
      state.tags = [];
      state.selectedPost = null;
      state.latestPosts = [];
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch blog posts
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.categories = Array.from(new Set(action.payload.map(post => post.category)));
        
        // Extract all unique tags
        const allTags = action.payload.flatMap(post => post.tags);
        state.tags = Array.from(new Set(allTags));
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch blog posts';
      });

    // Fetch latest blog posts
    builder
      .addCase(fetchLatestBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.latestPosts = action.payload;
        
        // Merge with existing posts
        const existingIds = state.posts.map(p => p.id);
        const newPosts = action.payload.filter(p => !existingIds.includes(p.id));
        state.posts.push(...newPosts);
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchLatestBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch latest blog posts';
      });
  },
});

export const { setSelectedPost, clearError, clearBlog } = blogSlice.actions;
export default blogSlice.reducer;