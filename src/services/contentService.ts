import { Section, supabase } from '@/lib/supabase';

export class ContentService {
  /**
   * Test database connection and check if sections table exists
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log('Testing database connection...');
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
        
        console.error('Database connection test failed:', errorInfo);
        
        // If error object is empty, it might be a configuration issue
        if (!error.message && !error.code) {
          console.error('Empty error object - check Supabase configuration');
        }
        
        return false;
      }

      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error('Database connection test error:', error);
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