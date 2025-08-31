-- Sample data for the sections table
-- Run this in your Supabase SQL Editor

-- First, let's make sure the table exists (if not, create it)
CREATE TABLE IF NOT EXISTS public.sections (
  section_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  resort_id bigint NOT NULL,
  section_name character varying(255) NOT NULL,
  item_type character varying(50) NOT NULL,
  section_json jsonb NOT NULL,
  item_description text NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT sections_pkey PRIMARY KEY (section_id)
);

-- Insert Header section data for resort_id = 1
INSERT INTO public.sections (resort_id, section_name, item_type, section_json, item_description) 
VALUES (
  1, 
  'Header', 
  'navigation',
  '{
    "brand_name": "Paradise Resort",
    "navigation": [
      { "name": "Home", "href": "#home" },
      { "name": "Villas", "href": "#villas" },
      { "name": "Amenities", "href": "#amenities" },
      { "name": "Contact", "href": "#contact" }
    ],
    "cta_button": "Book Now"
  }'::jsonb,
  'Main site header with navigation for Paradise Resort'
);

-- Insert Hero section data for resort_id = 1
INSERT INTO public.sections (resort_id, section_name, item_type, section_json, item_description) 
VALUES (
  1, 
  'Hero', 
  'hero_banner',
  '{
    "title": "Welcome to Paradise Resort",
    "subtitle": "Experience luxury and tranquility in our exclusive villas",
    "background_image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    "search_form": {
      "location_placeholder": "Choose Destination",
      "checkin_placeholder": "Check In Date",
      "checkout_placeholder": "Check Out Date", 
      "guests_placeholder": "Number of Guests",
      "search_button": "Find Your Perfect Villa"
    }
  }'::jsonb,
  'Hero section with search functionality for Paradise Resort'
);

-- Insert About Villa section data for resort_id = 1
INSERT INTO public.sections (resort_id, section_name, item_type, section_json, item_description) 
VALUES (
  1, 
  'About', 
  'content_section',
  '{
    "title": "About Paradise Resort",
    "description": "Discover the ultimate luxury experience at Paradise Resort. Our carefully curated collection features the world`s most spectacular villas, each offering unparalleled comfort and breathtaking views.",
    "secondary_description": "From beachfront paradises to mountain retreats, we provide extraordinary experiences that exceed expectations. Every property is hand-selected for its unique character and exceptional quality.",
    "cta_button": "Discover More",
    "image": "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }'::jsonb,
  'About section describing Paradise Resort'
);

-- Verify the data was inserted
SELECT * FROM public.sections WHERE resort_id = 1 ORDER BY section_name;