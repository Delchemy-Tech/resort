import type { AppDispatch, RootState } from '@/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for specific state slices
export const useContent = () => useAppSelector((state: RootState) => state.content);
export const useProperties = () => useAppSelector((state: RootState) => state.properties);
export const useServices = () => useAppSelector((state: RootState) => state.services);
export const useFacilities = () => useAppSelector((state: RootState) => state.facilities);
export const useAmenities = () => useAppSelector((state: RootState) => state.amenities);
export const useSpecialDeals = () => useAppSelector((state: RootState) => state.specialDeals);
export const useTestimonials = () => useAppSelector((state: RootState) => state.testimonials);
export const useBlog = () => useAppSelector((state: RootState) => state.blog);
export const useUI = () => useAppSelector((state: RootState) => state.ui);

// Composite hooks for commonly used data combinations
export const useLoadingState = () => {
  const content = useContent();
  const properties = useProperties();
  const services = useServices();
  const facilities = useFacilities();
  const amenities = useAmenities();
  const specialDeals = useSpecialDeals();
  const testimonials = useTestimonials();
  const blog = useBlog();
  const ui = useUI();

  return {
    global: ui.loading.global,
    content: content.loading,
    properties: properties.loading,
    services: services.loading,
    facilities: facilities.loading,
    amenities: amenities.loading,
    specialDeals: specialDeals.loading,
    testimonials: testimonials.loading,
    blog: blog.loading,
    anyLoading: [
      content.loading,
      properties.loading,
      services.loading,
      facilities.loading,
      amenities.loading,
      specialDeals.loading,
      testimonials.loading,
      blog.loading,
    ].some(Boolean),
  };
};

export const useErrorState = () => {
  const content = useContent();
  const properties = useProperties();
  const services = useServices();
  const facilities = useFacilities();
  const amenities = useAmenities();
  const specialDeals = useSpecialDeals();
  const testimonials = useTestimonials();
  const blog = useBlog();

  return {
    content: content.error,
    properties: properties.error,
    services: services.error,
    facilities: facilities.error,
    amenities: amenities.error,
    specialDeals: specialDeals.error,
    testimonials: testimonials.error,
    blog: blog.error,
    hasErrors: [
      content.error,
      properties.error,
      services.error,
      facilities.error,
      amenities.error,
      specialDeals.error,
      testimonials.error,
      blog.error,
    ].some(Boolean),
  };
};

// Health status hook
export const useHealthStatus = () => {
  const content = useContent();
  return content.healthStatus;
};

// Featured content hooks
export const useFeaturedProperties = () => {
  const properties = useProperties();
  return properties.featuredProperties;
};

export const useFeaturedTestimonials = () => {
  const testimonials = useTestimonials();
  return testimonials.featuredTestimonials;
};

export const useLatestBlogPosts = () => {
  const blog = useBlog();
  return blog.latestPosts;
};

export const useActiveDeals = () => {
  const specialDeals = useSpecialDeals();
  return specialDeals.activeDeals;
};

// Notification hooks
export const useNotifications = () => {
  const ui = useUI();
  return {
    notifications: ui.notifications,
    unreadCount: ui.notifications.filter((n: any) => !n.read).length,
  };
};

// Content section hook
export const useContentSection = (sectionName: string) => {
  const content = useContent();
  return content.sections[sectionName] || null;
};