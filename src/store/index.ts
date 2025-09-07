import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

// Import all slices
import amenitiesSlice from './slices/amenitiesSlice';
import blogSlice from './slices/blogSlice';
import contentSlice from './slices/contentSlice';
import facilitiesSlice from './slices/facilitiesSlice';
import propertiesSlice from './slices/propertiesSlice';
import servicesSlice from './slices/servicesSlice';
import specialDealsSlice from './slices/specialDealsSlice';
import testimonialsSlice from './slices/testimonialsSlice';
import uiSlice from './slices/uiSlice';

// Import types
import type { RootState } from '@/types/redux';

// Create the store factory
const makeStore = () => {
  const store = configureStore({
    reducer: {
      content: contentSlice,
      properties: propertiesSlice,
      services: servicesSlice,
      facilities: facilitiesSlice,
      amenities: amenitiesSlice,
      specialDeals: specialDealsSlice,
      testimonials: testimonialsSlice,
      blog: blogSlice,
      ui: uiSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/PAUSE',
            'persist/PURGE',
            'persist/REGISTER',
          ],
          // Ignore these field paths in all actions
          ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: ['content.lastFetched', 'properties.lastFetched'],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

// Create the store instance
export const store = makeStore();

// Export types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Export the store as default for provider
export default store;