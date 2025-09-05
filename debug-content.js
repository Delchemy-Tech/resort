// Debug script to check for external image references
const { createClient } = require('@supabase/supabase-js');

// Load environment variables - check multiple locations
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  console.log('No dotenv package, checking process.env directly');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkForExternalImages() {
  try {
    console.log('🔍 Checking database for external image references...');
    
    // Get all sections data
    const { data, error } = await supabase
      .from('sections')
      .select('*');
    
    if (error) {
      console.error('Error fetching data:', error);
      return;
    }
    
    console.log(`📊 Found ${data?.length || 0} sections to check`);
    
    // Check each section's JSON content for image URLs
    const suspiciousContent = [];
    
    data?.forEach(section => {
      const jsonStr = JSON.stringify(section.section_json || {});
      
      // Look for the specific problematic reference
      if (jsonStr.includes('Abad_Plaza_Hotel_Lobby')) {
        suspiciousContent.push({
          section_id: section.section_id,
          section_name: section.section_name,
          content: jsonStr
        });
      }
      
      // Also check for any non-Unsplash image URLs
      const imageUrlRegex = /https?:\/\/[^"'\s]*\.(jpg|jpeg|png|gif|webp)/gi;
      const matches = jsonStr.match(imageUrlRegex) || [];
      
      matches.forEach(url => {
        if (!url.includes('unsplash.com') && !url.includes('localhost')) {
          suspiciousContent.push({
            section_id: section.section_id,
            section_name: section.section_name,
            suspicious_url: url,
            type: 'external_image'
          });
        }
      });
    });
    
    if (suspiciousContent.length > 0) {
      console.log('🚨 Found suspicious content:');
      suspiciousContent.forEach(item => {
        console.log(`  Section: ${item.section_name} (ID: ${item.section_id})`);
        if (item.suspicious_url) {
          console.log(`    URL: ${item.suspicious_url}`);
        }
        if (item.content) {
          console.log(`    Content contains: Abad_Plaza_Hotel_Lobby`);
        }
        console.log('---');
      });
    } else {
      console.log('✅ No suspicious content found in database');
    }
    
  } catch (error) {
    console.error('❌ Error during check:', error);
  }
}

checkForExternalImages();