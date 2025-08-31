import { Section, supabase } from '@/lib/supabase';

export class ContentService {
  /**
   * Simple method to check which tables we can access
   */
  static async checkAccessibleTables(): Promise<void> {
    const commonTables = ['sections', 'resorts', 'users', 'properties', 'bookings'];
    
    console.log('🔍 Checking access to common tables...');
    
    for (const tableName of commonTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
          
        if (error) {
          if (error.code === '42P01') {
            console.log(`❌ ${tableName}: Table does not exist`);
          } else {
            console.log(`⚠️ ${tableName}: ${error.message}`);
          }
        } else {
          console.log(`✅ ${tableName}: Table exists and accessible`);
        }
      } catch (err) {
        console.log(`💥 ${tableName}: Error checking table`);
      }
    }
  }

  /**
   * List all tables in the database
   */
  static async showAllTables(): Promise<void> {
    try {
      console.log('🗂️ Fetching all tables in the database...');
      
      // Query the information_schema to get all tables
      const { data, error } = await supabase
        .rpc('get_all_tables');

      if (error) {
        // If RPC doesn't exist, try a direct query to information_schema
        console.log('⚠️ RPC method not available, trying direct query...');
        
        const { data: tablesData, error: tablesError } = await supabase
          .from('information_schema.tables')
          .select('table_name, table_schema')
          .eq('table_schema', 'public');
          
        if (tablesError) {
          console.error('❌ Cannot access table information:', tablesError);
          console.log('💡 Alternative: Check your Supabase dashboard > Table Editor');
          return;
        }
        
        if (tablesData && tablesData.length > 0) {
          console.log('📋 Tables found in public schema:');
          tablesData.forEach((table: any) => {
            console.log(`  📄 ${table.table_name}`);
          });
        } else {
          console.log('🈳 No tables found in public schema');
        }
        return;
      }

      if (data && data.length > 0) {
        console.log('📋 All tables in database:');
        data.forEach((table: any) => {
          console.log(`  📄 ${table.table_name} (${table.table_schema})`);
        });
      } else {
        console.log('🈳 No tables found');
      }
      
    } catch (error) {
      console.error('💥 Error fetching tables:', error);
      console.log('💡 You can check tables manually in your Supabase dashboard');
    }
  }

  /**
   * Check if sample data exists in the database
   */
  static async checkSampleData(resortId: number): Promise<void> {
    try {
      console.log(`🔍 Checking for sample data with resort_id=${resortId}...`);
      
      const { data, error, count } = await supabase
        .from('sections')
        .select('section_name', { count: 'exact' })
        .eq('resort_id', resortId);

      if (error) {
        console.error('❌ Error checking sample data:', error);
        return;
      }

      console.log(`📊 Found ${count || 0} sections for resort_id=${resortId}`);
      
      if (data && data.length > 0) {
        console.log('✅ Available sections:', data.map(d => d.section_name));
      } else {
        console.warn('⚠️ No data found in sections table!');
        console.log('📝 To add sample data:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Open SQL Editor');
        console.log('3. Run the script from sample-data.sql file');
      }
    } catch (error) {
      console.error('💥 Error in checkSampleData:', error);
    }
  }

  /**
   * Test database connection and check if sections table exists
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Testing database connection...');
      
      // First check if we can connect to Supabase at all
      const { data, error } = await supabase
        .from('sections')
        .select('section_id')
        .limit(1);

      if (error) {
        const errorInfo = {
          message: error.message || 'Unknown connection error',
          code: error.code || 'No error code',
          details: error.details || 'No details available',
          hint: error.hint || 'No hint available',
          fullError: error
        };
        
        console.error('❌ Database connection test failed:', errorInfo);
        
        // Specific error handling for common issues
        if (error.code === '42P01') {
          console.error('🚨 The "sections" table does not exist!');
          console.error('📝 Please run the sample-data.sql script in your Supabase SQL Editor');
        } else if (!error.message && !error.code) {
          console.error('🔗 Empty error object - check Supabase configuration');
          console.error('🔧 Verify your SUPABASE_URL and SUPABASE_ANON_KEY in .env.local');
        }
        
        return false;
      }

      console.log('✅ Database connection successful');
      console.log('📊 Sections table exists and is accessible');
      return true;
    } catch (error) {
      console.error('💥 Database connection test error:', error);
      return false;
    }
  }

  /**
   * Fetch section data by resort ID and section name
   */
  static async getSectionByName(resortId: number, sectionName: string): Promise<Section | null> {
    try {
      console.log(`Fetching section: resort_id=${resortId}, section_name=${sectionName}`);
      
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('resort_id', resortId)
        .eq('section_name', sectionName)
        .single()

      if (error) {
        // Check if error object has any meaningful content
        const errorInfo = {
          message: error.message || 'Unknown error',
          code: error.code || 'No error code',
          details: error.details || 'No details available',
          hint: error.hint || 'No hint available',
          fullError: error
        };
        
        console.error('Supabase error details:', errorInfo);
        
        // If error object is empty, it might be a connection issue
        if (!error.message && !error.code) {
          console.error('Empty error object detected - possible connection issue');
          console.error('Check your Supabase URL and API key configuration');
        }
        
        // If no rows found, return null instead of treating as error
        if (error.code === 'PGRST116') {
          console.log(`✅ No data found for section: ${sectionName} (resort_id: ${resortId})`);
          console.log('💡 This is normal if you haven\'t added data to your database yet.');
          console.log('📝 Run the sample-data.sql script in your Supabase SQL Editor to add sample data.');
          return null;
        }
        
        return null;
      }

      console.log(`Successfully fetched section data for: ${sectionName}`, data);
      return data;
    } catch (error) {
      console.error('Error in getSectionByName:', error);
      return null;
    }
  }

  /**
   * Fetch all sections for a resort
   */
  static async getAllSections(resortId: number): Promise<Section[]> {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('resort_id', resortId)
        .order('section_name')

      if (error) {
        console.error('Error fetching sections:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllSections:', error)
      return []
    }
  }
}