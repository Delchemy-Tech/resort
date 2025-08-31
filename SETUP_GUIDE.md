# Quick Setup Guide

## 🚨 Console Error: "Supabase error details: {}"

This error means your database needs to be set up. Follow these steps:

## ✅ Step 1: Create the Sections Table

1. Go to your **Supabase Dashboard**
2. Click on **SQL Editor** in the left sidebar
3. Copy and paste this SQL:

```sql
-- Create the sections table
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
```

4. Click **Run** to create the table

## ✅ Step 2: Add Sample Data

Copy and paste this SQL to add sample content:

```sql
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
    "top_title": "Welcome to",
    "title": "Paradise Resort",
    "sub_title": "Experience luxury and tranquility in our exclusive villas",
    "image_1": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
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
    "top_title": "Discover",
    "title": "About Paradise Resort",
    "sub_title": "Discover the ultimate luxury experience at Paradise Resort. Our carefully curated collection features the worlds most spectacular villas, each offering unparalleled comfort and breathtaking views.",
    "image_1": "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "secondary_description": "From beachfront paradises to mountain retreats, we provide extraordinary experiences that exceed expectations. Every property is hand-selected for its unique character and exceptional quality.",
    "cta_button": "Discover More"
  }'::jsonb,
  'About section describing Paradise Resort'
);
```

## ✅ Step 3: Verify Data

Run this SQL to check if data was inserted:

```sql
SELECT section_name, item_type FROM public.sections WHERE resort_id = 1;
```

You should see:
- Header | navigation
- Hero | hero_banner  
- About | content_section

## ✅ Step 4: Refresh Your App

1. Go back to your application
2. **Refresh the page** (F5)
3. Check the console - you should now see:
   - ✅ Database connection successful
   - 📊 Found 3 sections for resort_id=1
   - ✅ Available sections: Header, Hero, About

## 🎯 Expected Result

Your website should now display:
- **Header**: "Paradise Resort" with updated navigation
- **Hero**: "Welcome to Paradise Resort" with new subtitle
- **About**: "Discover About Paradise Resort" section

## 🔧 Troubleshooting

If you still see errors:

1. **Check Supabase Project Status**: Ensure your project isn't paused
2. **Verify Environment Variables**: Check your `.env.local` file
3. **Check RLS Policies**: You may need to disable Row Level Security temporarily:
   ```sql
   ALTER TABLE public.sections DISABLE ROW LEVEL SECURITY;
   ```

## 🎉 Success!

Once the data is added, your console should show detailed logs with emojis and your website will display dynamic content from your Supabase database!