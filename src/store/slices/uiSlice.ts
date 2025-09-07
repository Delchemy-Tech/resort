import type { Notification, UIState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: UIState = {
  mobileMenuOpen: false,
  searchModalOpen: false,
  bookingModalOpen: false,
  theme: 'light',
  notifications: [],
  loading: {
    global: false,
    components: {},
  },
};

// UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Mobile menu actions
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },

    // Search modal actions
    toggleSearchModal: (state) => {
      state.searchModalOpen = !state.searchModalOpen;
    },
    setSearchModalOpen: (state, action: PayloadAction<boolean>) => {
      state.searchModalOpen = action.payload;
    },

    // Booking modal actions
    toggleBookingModal: (state) => {
      state.bookingModalOpen = !state.bookingModalOpen;
    },
    setBookingModalOpen: (state, action: PayloadAction<boolean>) => {
      state.bookingModalOpen = action.payload;
    },

    // Theme actions
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Loading actions
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    setComponentLoading: (state, action: PayloadAction<{ component: string; loading: boolean }>) => {
      const { component, loading } = action.payload;
      state.loading.components[component] = loading;
    },
    clearComponentLoading: (state, action: PayloadAction<string>) => {
      delete state.loading.components[action.payload];
    },

    // Notification actions
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    clearReadNotifications: (state) => {
      state.notifications = state.notifications.filter(n => !n.read);
    },

    // Reset UI state
    resetUIState: (state) => {
      return { ...initialState, theme: state.theme }; // Preserve theme
    },
  },
});

// Export actions
export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSearchModal,
  setSearchModalOpen,
  toggleBookingModal,
  setBookingModalOpen,
  setTheme,
  toggleTheme,
  setGlobalLoading,
  setComponentLoading,
  clearComponentLoading,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  clearReadNotifications,
  resetUIState,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;