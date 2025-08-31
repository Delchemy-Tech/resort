# Troubleshooting Guide

## Console Error: "Supabase error details: {}"

This error indicates that the Supabase error object is empty, which typically means there's a connection or configuration issue.

### Step 1: Check Environment Variables
Look for these console messages when the app loads:
- "Supabase URL: Set" 
- "Supabase Key: Set"

If you see "Missing", your environment variables aren't loading properly.

### Step 2: Verify Environment File
Ensure your `.env.local` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_RESORT_ID=1
```

### Step 3: Restart Development Server
Environment variable changes require a server restart:
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 4: Check Supabase Project Status
1. Go to your Supabase dashboard
2. Verify your project is active and not paused
3. Check if there are any service outages

### Step 5: Test Database Connection
The app will now show detailed error information:
- "Empty error object detected - possible connection issue"
- "Check your Supabase URL and API key configuration"

### Step 6: Create the Sections Table
If the table doesn't exist, go to Supabase SQL Editor and run:

```sql
-- Create the sections table
create table public.sections (
  section_id bigint generated always as identity not null,
  resort_id bigint not null,
  section_name character varying(255) not null,
  item_type character varying(50) not null,
  section_json jsonb not null,
  item_description text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint sections_pkey primary key (section_id)
);

-- Insert sample data for testing
INSERT INTO sections (resort_id, section_name, item_type, section_json, item_description) 
VALUES (
  1, 
  'Hero', 
  'hero_banner',
  '{
    "title": "Welcome to Paradise Resort",
    "subtitle": "Experience luxury like never before",
    "background_image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    "search_form": {
      "location_placeholder": "Destination",
      "checkin_placeholder": "Arrival",
      "checkout_placeholder": "Departure", 
      "guests_placeholder": "Guests",
      "search_button": "Find Your Stay"
    }
  }'::jsonb,
  'Hero section for resort homepage'
);
```

### Step 7: Check Row Level Security (RLS)
If the table exists but you still get errors, RLS might be blocking access:

```sql
-- Disable RLS for testing (enable it later with proper policies)
ALTER TABLE public.sections DISABLE ROW LEVEL SECURITY;
```

### Common Error Codes:
- Empty `{}` error: Configuration/connection issue
- `PGRST116`: No rows found (normal if no data exists)
- `42P01`: Table doesn't exist
- `42703`: Column doesn't exist

### Expected Console Output (Success):
```
Supabase URL: Set
Supabase Key: Set
Testing database connection...
Database connection successful
Resort ID from env: 1
Fetching header data...
No data found for section: Header
Fetching hero data...
Successfully fetched section data for: Hero [object]
```

### If Still Having Issues:
1. Check browser Network tab for HTTP errors
2. Verify your Supabase project URL and API key are correct
3. Try creating a simple test query in Supabase dashboard
4. Check if your IP is blocked by Supabase firewall settings