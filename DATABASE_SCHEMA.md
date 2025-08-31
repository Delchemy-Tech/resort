# Database Schema Documentation

## Sections Table Structure

The application now connects to your Supabase database to fetch dynamic content for the Hero section. Here's how it works:

### Table: `sections`

```sql
create table public.sections (
  section_id bigint generated always as identity not null,
  resort_id bigint not null,
  section_name character varying(255) not null,
  item_type character varying(50) not null,
  section_json jsonb not null,
  item_description text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint sections_pkey primary key (section_id),
  constraint sections_resort_id_fkey foreign key (resort_id) references resorts (id) on delete cascade
);
```

## Expected JSON Structure for Hero Section

For the Hero section (`section_name = "Hero"`), the `section_json` field should contain:

```json
{
  "top_title": "Welcome to",
  "title": "Paradise Resort", 
  "sub_title": "Experience luxury and tranquility in our exclusive villas",
  "image_1": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  "search_form": {
    "location_placeholder": "Location",
    "checkin_placeholder": "Check in",
    "checkout_placeholder": "Check out",
    "guests_placeholder": "Guests",
    "search_button": "Search Properties"
  }
}
```

## Expected JSON Structure for Header Section

For the Header section (`section_name = "Header"`), the `section_json` field should contain:

```json
{
  "brand_name": "VillaRent",
  "navigation": [
    { "name": "Home", "href": "#" },
    { "name": "Properties", "href": "#" },
    { "name": "About", "href": "#" },
    { "name": "Contact", "href": "#" }
  ],
  "cta_button": "Sign In"
}
```

## Sample Data Insert

To insert sample data for resort ID 1:

```sql
-- Insert Hero section data
INSERT INTO sections (resort_id, section_name, item_type, section_json, item_description) 
VALUES (
  1, 
  'Hero', 
  'hero_banner',
  '{
    "title": "Find Your Best Villa House And Apartment",
    "subtitle": "Discover luxury villas and apartments for your perfect getaway",
    "background_image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    "search_form": {
      "location_placeholder": "Location",
      "checkin_placeholder": "Check in",
      "checkout_placeholder": "Check out",
      "guests_placeholder": "Guests",
      "search_button": "Search Properties"
    }
  }'::jsonb,
  'Main hero section with search functionality'
);

-- Insert Header section data
INSERT INTO sections (resort_id, section_name, item_type, section_json, item_description) 
VALUES (
  1, 
  'Header', 
  'navigation',
  '{
    "brand_name": "VillaRent",
    "navigation": [
      { "name": "Home", "href": "#" },
      { "name": "Properties", "href": "#" },
      { "name": "About", "href": "#" },
      { "name": "Contact", "href": "#" }
    ],
    "cta_button": "Sign In"
  }'::jsonb,
  'Main site header with navigation'
);
```

## How It Works

1. **Environment Configuration**: The application uses `NEXT_PUBLIC_RESORT_ID=1` from `.env.local`
2. **Data Fetching**: On page load, the app fetches sections where `resort_id = 1` and `section_name = "Hero"`
3. **Fallback**: If no database data is found, the app uses default hardcoded values
4. **Dynamic Rendering**: The Hero section renders using the database content or defaults

## Features

- ✅ Dynamic content loading from Supabase
- ✅ Fallback to default values if database is unavailable
- ✅ TypeScript support with proper interfaces
- ✅ Loading state management
- ✅ Error handling

## Next Steps

1. Create the `sections` table in your Supabase database
2. Insert sample data using the SQL above
3. Restart your development server to see the dynamic content
4. Modify the JSON data in your database to see real-time changes