import type { Section } from '@/lib/supabase';
import { ContentService } from '@/services/contentService';
import type {
    ContentState,
    FetchContentPayload,
    HealthStatus,
    ThunkApiConfig
} from '@/types/redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: ContentState = {
  sections: {},
  allSections: [],
  resortId: 1,
  healthStatus: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunks
export const fetchHealthStatus = createAsyncThunk<
  HealthStatus,
  void,
  ThunkApiConfig
>('content/fetchHealthStatus', async (_, { rejectWithValue }) => {
  try {
    const result = await ContentService.healthCheck();
    if (!result.success || !result.data) {
      return rejectWithValue({
        message: result.error?.message || 'Health check failed',
        code: result.error?.code || 'HEALTH_CHECK_FAILED',
      });
    }
    return result.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Unknown error during health check',
      code: 'HEALTH_CHECK_ERROR',
    });
  }
});

export const testDatabaseConnection = createAsyncThunk<
  boolean,
  void,
  ThunkApiConfig
>('content/testConnection', async (_, { rejectWithValue }) => {
  try {
    const result = await ContentService.testConnection();
    if (!result.success) {
      return rejectWithValue({
        message: result.error?.message || 'Database connection failed',
        code: result.error?.code || 'CONNECTION_FAILED',
      });
    }
    return true;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Unknown connection error',
      code: 'CONNECTION_ERROR',
    });
  }
});

export const fetchSection = createAsyncThunk<
  { sectionName: string; section: Section },
  FetchContentPayload,
  ThunkApiConfig
>('content/fetchSection', async ({ resortId, sectionName, force = false }, { getState, rejectWithValue }) => {
  try {
    if (!sectionName) {
      return rejectWithValue({
        message: 'Section name is required',
        code: 'MISSING_SECTION_NAME',
      });
    }

    const state = getState();
    const existingSection = state.content.sections[sectionName];
    
    // Skip fetch if data exists and force is false
    if (existingSection && !force) {
      return { sectionName, section: existingSection };
    }

    const result = await ContentService.getSectionByName(resortId, sectionName);
    if (!result.success || !result.data) {
      return rejectWithValue({
        message: result.error?.message || `Failed to fetch section: ${sectionName}`,
        code: result.error?.code || 'SECTION_FETCH_FAILED',
      });
    }

    return { sectionName, section: result.data };
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Unknown error fetching section',
      code: 'SECTION_FETCH_ERROR',
    });
  }
});

export const fetchAllSections = createAsyncThunk<
  Section[],
  FetchContentPayload,
  ThunkApiConfig
>('content/fetchAllSections', async ({ resortId, force = false }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    
    // Skip fetch if data exists and force is false
    if (state.content.allSections.length > 0 && !force) {
      return state.content.allSections;
    }

    const result = await ContentService.getAllSections(resortId);
    if (!result.success) {
      return rejectWithValue({
        message: result.error?.message || 'Failed to fetch all sections',
        code: result.error?.code || 'ALL_SECTIONS_FETCH_FAILED',
      });
    }

    return result.data || [];
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Unknown error fetching all sections',
      code: 'ALL_SECTIONS_FETCH_ERROR',
    });
  }
});

export const checkSampleData = createAsyncThunk<
  Section[],
  number,
  ThunkApiConfig
>('content/checkSampleData', async (resortId, { rejectWithValue }) => {
  try {
    const result = await ContentService.checkSampleData(resortId);
    if (!result.success) {
      return rejectWithValue({
        message: result.error?.message || 'Failed to check sample data',
        code: result.error?.code || 'SAMPLE_DATA_CHECK_FAILED',
      });
    }

    return result.data || [];
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Unknown error checking sample data',
      code: 'SAMPLE_DATA_CHECK_ERROR',
    });
  }
});

// Content slice
const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setResortId: (state, action: PayloadAction<number>) => {
      state.resortId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearContent: (state) => {
      state.sections = {};
      state.allSections = [];
      state.lastFetched = null;
    },
    setSection: (state, action: PayloadAction<{ sectionName: string; section: Section }>) => {
      const { sectionName, section } = action.payload;
      state.sections[sectionName] = section;
    },
  },
  extraReducers: (builder) => {
    // Health status
    builder
      .addCase(fetchHealthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.healthStatus = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchHealthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch health status';
      });

    // Database connection test
    builder
      .addCase(testDatabaseConnection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(testDatabaseConnection.fulfilled, (state) => {
        state.loading = false;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(testDatabaseConnection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Database connection failed';
      });

    // Fetch section
    builder
      .addCase(fetchSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.loading = false;
        const { sectionName, section } = action.payload;
        state.sections[sectionName] = section;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch section';
      });

    // Fetch all sections
    builder
      .addCase(fetchAllSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSections.fulfilled, (state, action) => {
        state.loading = false;
        state.allSections = action.payload;
        
        // Also update individual sections
        action.payload.forEach((section) => {
          state.sections[section.section_name] = section;
        });
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchAllSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch all sections';
      });

    // Check sample data
    builder
      .addCase(checkSampleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSampleData.fulfilled, (state, action) => {
        state.loading = false;
        // Sample data check returns sections, so update them
        action.payload.forEach((section) => {
          state.sections[section.section_name] = section;
        });
        state.lastFetched = new Date().toISOString();
      })
      .addCase(checkSampleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to check sample data';
      });
  },
});

// Export actions
export const { setResortId, clearError, clearContent, setSection } = contentSlice.actions;

// Export reducer
export default contentSlice.reducer;