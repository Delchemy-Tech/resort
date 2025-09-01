import { Section, supabase } from '@/lib/supabase';

// Error types for better error handling
interface DatabaseError {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
  severity?: string;
}

// Result wrapper for better error handling
interface DatabaseResult<T> {
  data: T | null;
  error: DatabaseError | null;
  success: boolean;
}

export class ContentService {
  // Track errors to prevent spam
  private static errorCache = new Map<string, number>();
  private static readonly MAX_SAME_ERRORS = 3;
  
  /**
   * Check if we should log this error or if it's been logged too many times
   */
  private static shouldLogError(context: string, errorCode: string): boolean {
    const key = `${context}-${errorCode}`;
    const count = this.errorCache.get(key) || 0;
    
    if (count >= this.MAX_SAME_ERRORS) {
      if (count === this.MAX_SAME_ERRORS) {
        console.warn(`🔇 Suppressing further ${errorCode} errors for ${context} (logged ${count} times)`);
        this.errorCache.set(key, count + 1);
      }
      return false;
    }
    
    this.errorCache.set(key, count + 1);
    return true;
  }

  /**
   * Utility method to detect different types of error conditions
   */
  private static detectErrorType(error: any): string {
    // Check for completely empty/null/undefined errors
    if (!error) {
      return 'NULL_ERROR';
    }
    
    // Check for empty object
    if (typeof error === 'object' && Object.keys(error).length === 0) {
      return 'EMPTY_OBJECT';
    }
    
    // Check for network/fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return 'NETWORK_ERROR';
    }
    
    // Check for authentication errors
    if (error.message && error.message.includes('auth')) {
      return 'AUTH_ERROR';
    }
    
    // Check for timeout errors
    if (error.message && (error.message.includes('timeout') || error.message.includes('TIMEOUT'))) {
      return 'TIMEOUT_ERROR';
    }
    
    // Check if it has standard Supabase error properties
    if (error.code || error.message || error.details) {
      return 'SUPABASE_ERROR';
    }
    
    return 'UNKNOWN_ERROR';
  }

  /**
   * Enhanced error handler that processes Supabase errors
   */
  private static handleDatabaseError(error: any, context: string): DatabaseError {
    const errorType = this.detectErrorType(error);
    
    // Handle different error types with specific logic
    switch (errorType) {
      case 'NULL_ERROR':
        if (this.shouldLogError(context, 'NULL_ERROR')) {
          console.error(`🔌 Null error detected in ${context} - operation may have failed silently`);
        }
        return {
          message: 'Operation failed with no error information',
          code: 'NULL_ERROR',
          details: 'The operation returned null instead of proper error details',
          hint: 'Check network connectivity and API configuration'
        };
      
      case 'EMPTY_OBJECT':
        if (this.shouldLogError(context, 'EMPTY_OBJECT')) {
          console.error(`🔌 Empty error object detected in ${context} - likely connection issue`);
          console.error('🔧 Check your Supabase URL and API key in .env.local');
          console.error('🌐 Verify your internet connection and Supabase service status');
        }
        return {
          message: 'Connection or configuration error - empty error response',
          code: 'EMPTY_ERROR_OBJECT',
          details: 'The database returned an empty error object, indicating a connection or configuration issue',
          hint: 'Check environment variables and network connectivity'
        };
      
      case 'NETWORK_ERROR':
        if (this.shouldLogError(context, 'NETWORK_ERROR')) {
          console.error(`🌐 Network error detected in ${context}`);
        }
        return {
          message: 'Network connectivity issue',
          code: 'NETWORK_ERROR',
          details: error.message || 'Failed to connect to the database',
          hint: 'Check your internet connection and Supabase service status'
        };
      
      case 'AUTH_ERROR':
        if (this.shouldLogError(context, 'AUTH_ERROR')) {
          console.error(`🔐 Authentication error detected in ${context}`);
        }
        return {
          message: 'Authentication or authorization error',
          code: 'AUTH_ERROR',
          details: error.message || 'Failed to authenticate with the database',
          hint: 'Check your API keys and RLS policies'
        };
      
      case 'TIMEOUT_ERROR':
        if (this.shouldLogError(context, 'TIMEOUT_ERROR')) {
          console.error(`⏰ Timeout error detected in ${context}`);
        }
        return {
          message: 'Operation timed out',
          code: 'TIMEOUT_ERROR',
          details: error.message || 'Database operation exceeded timeout limit',
          hint: 'Try again or check database performance'
        };
    }
    
    // Handle standard Supabase errors
    const processedError: DatabaseError = {
      message: error?.message || 'Unknown database error',
      code: error?.code || 'UNKNOWN_ERROR',
      details: error?.details || 'No additional details available',
      hint: error?.hint || 'No hint provided',
      severity: error?.severity || 'ERROR'
    };

    // Enhanced logging with context - only log if not suppressed
    if (this.shouldLogError(context, processedError.code || 'UNKNOWN')) {
      console.error(`🚨 Database Error in ${context}:`, {
        errorType,
        message: processedError.message,
        code: processedError.code,
        details: processedError.details,
        hint: processedError.hint,
        severity: processedError.severity,
        originalError: error
      });
    }

    // Specific error code handling - only show guidance once
    const errorCode = processedError.code || 'UNKNOWN';
    if (this.shouldLogError(context, `${errorCode}_GUIDANCE`)) {
      switch (errorCode) {
        case '42P01':
          console.error('📋 Table does not exist. Please check your database schema.');
          console.error('💡 Run the sample-data.sql script to create required tables.');
          break;
        case 'PGRST116':
          console.log('ℹ️ No rows found - this is normal if data hasn\'t been added yet.');
          console.log('📝 Consider adding sample data to test the integration.');
          break;
        case '23505':
          console.error('🔒 Duplicate key violation. Data already exists.');
          break;
        case '23503':
          console.error('🔗 Foreign key violation. Referenced data does not exist.');
          break;
        case 'PGRST301':
          console.error('🔐 Insufficient privileges. Check your RLS policies.');
          break;
        case 'PGRST204':
          console.error('📄 No content - query returned no data.');
          break;
        default:
          if (errorCode === 'UNKNOWN_ERROR') {
            console.error('❓ Unknown error type - check network connectivity and API configuration.');
          }
          break;
      }
    }

    return processedError;
  }

  /**
   * Retry mechanism for database operations
   */
  private static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    context: string = 'Unknown operation'
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries} for ${context}`);
        return await operation();
      } catch (error) {
        lastError = error;
        console.warn(`⚠️ Attempt ${attempt} failed for ${context}:`, error);
        
        if (attempt < maxRetries) {
          console.log(`⏳ Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Enhanced method to check which tables we can access with proper error handling
   */
  static async checkAccessibleTables(): Promise<DatabaseResult<string[]>> {
    const commonTables = ['sections', 'resorts', 'users', 'properties', 'bookings'];
    const accessibleTables: string[] = [];
    const inaccessibleTables: string[] = [];
    
    console.log('🔍 Starting comprehensive table accessibility check...');
    
    try {
      for (const tableName of commonTables) {
        try {
          console.log(`🔄 Testing access to table: ${tableName}`);
          
          const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .limit(1);
            
          if (error) {
            // Check for empty error objects specifically
            if (!error || (typeof error === 'object' && Object.keys(error).length === 0)) {
              console.log(`🔌 ${tableName}: Empty error object - likely connection/config issue`);
              inaccessibleTables.push(tableName);
              continue;
            }
            
            const processedError = this.handleDatabaseError(error, `checkAccessibleTables(${tableName})`);
            inaccessibleTables.push(tableName);
            
            if (processedError.code === '42P01') {
              console.log(`❌ ${tableName}: Table does not exist`);
            } else if (processedError.code === 'EMPTY_ERROR_OBJECT') {
              console.log(`🔌 ${tableName}: Connection/configuration issue`);
            } else {
              console.log(`⚠️ ${tableName}: ${processedError.message} (${processedError.code})`);
            }
          } else {
            accessibleTables.push(tableName);
            const recordCount = data?.length || 0;
            console.log(`✅ ${tableName}: Table exists and accessible (${recordCount} sample records)`);
          }
        } catch (networkError) {
          console.error(`💥 ${tableName}: Network or connection error:`, networkError);
          inaccessibleTables.push(tableName);
          
          // Handle network-level errors
          if (networkError instanceof TypeError && networkError.message.includes('fetch')) {
            console.error(`🌐 ${tableName}: Network connectivity issue - check internet connection`);
          } else {
            console.error(`🔧 ${tableName}: Configuration or authentication issue`);
          }
        }
      }
      
      console.log(`📊 Table Accessibility Summary:`);
      console.log(`✅ Accessible: ${accessibleTables.length}/${commonTables.length} tables`);
      console.log(`❌ Inaccessible: ${inaccessibleTables.length}/${commonTables.length} tables`);
      
      if (accessibleTables.length === 0) {
        console.warn('🚨 No tables are accessible! Check your database setup.');
        console.warn('📝 Verify: 1) Environment variables 2) Network connection 3) Supabase project status');
        return {
          data: null,
          error: {
            message: 'No accessible tables found',
            code: 'NO_ACCESSIBLE_TABLES',
            details: `Tested ${commonTables.length} tables, none were accessible`,
            hint: 'Check database connection and table permissions'
          },
          success: false
        };
      }
      
      if (inaccessibleTables.length > 0) {
        console.log('📋 Inaccessible tables:', inaccessibleTables.join(', '));
      }
      
      return {
        data: accessibleTables,
        error: null,
        success: true
      };
      
    } catch (globalError) {
      const processedError = this.handleDatabaseError(globalError, 'checkAccessibleTables(global)');
      return {
        data: null,
        error: processedError,
        success: false
      };
    }
  }

  /**
   * Enhanced method to list all tables in the database with proper error handling
   */
  static async showAllTables(): Promise<DatabaseResult<any[]>> {
    try {
      console.log('🗂️ Fetching all tables in the database...');
      
      // Try RPC method first with retry mechanism
      const rpcResult = await this.retryOperation(async () => {
        const { data, error } = await supabase.rpc('get_all_tables');
        if (error) throw error;
        return data;
      }, 2, 1000, 'RPC get_all_tables');
      
      if (rpcResult && rpcResult.length > 0) {
        console.log('📋 Tables found via RPC:');
        rpcResult.forEach((table: any) => {
          console.log(`  📄 ${table.table_name} (${table.table_schema})`);
        });
        return {
          data: rpcResult,
          error: null,
          success: true
        };
      }
      
    } catch (rpcError) {
      console.log('⚠️ RPC method not available, trying direct query...');
      
      try {
        // Fallback to direct query with retry
        const directResult = await this.retryOperation(async () => {
          const { data, error } = await supabase
            .from('information_schema.tables')
            .select('table_name, table_schema')
            .eq('table_schema', 'public');
            
          if (error) throw error;
          return data;
        }, 2, 1000, 'Direct table query');
        
        if (directResult && directResult.length > 0) {
          console.log('📋 Tables found in public schema:');
          directResult.forEach((table: any) => {
            console.log(`  📄 ${table.table_name}`);
          });
          return {
            data: directResult,
            error: null,
            success: true
          };
        } else {
          console.log('🈳 No tables found in public schema');
          return {
            data: [],
            error: {
              message: 'No tables found in public schema',
              code: 'NO_TABLES_FOUND'
            },
            success: false
          };
        }
        
      } catch (directError) {
        const processedError = this.handleDatabaseError(directError, 'showAllTables(direct)');
        console.error('❌ Cannot access table information via any method');
        console.log('💡 Alternative: Check your Supabase dashboard > Table Editor');
        
        return {
          data: null,
          error: processedError,
          success: false
        };
      }
    }
    
    // This shouldn't be reached, but just in case
    return {
      data: [],
      error: {
        message: 'Unexpected end of showAllTables method',
        code: 'UNEXPECTED_END'
      },
      success: false
    };
  }

  /**
   * Enhanced method to check if sample data exists with proper error handling
   */
  static async checkSampleData(resortId: number): Promise<DatabaseResult<any[]>> {
    try {
      console.log(`🔍 Checking for sample data with resort_id=${resortId}...`);
      
      const result = await this.retryOperation(async () => {
        const { data, error, count } = await supabase
          .from('sections')
          .select('section_name, item_type, created_at', { count: 'exact' })
          .eq('resort_id', resortId);
          
        if (error) throw error;
        return { data, count };
      }, 3, 1000, `checkSampleData(resort_id=${resortId})`);
      
      const { data, count } = result;
      
      console.log(`📊 Found ${count || 0} sections for resort_id=${resortId}`);
      
      if (data && data.length > 0) {
        console.log('✅ Available sections:');
        data.forEach((section: any) => {
          console.log(`  • ${section.section_name} (${section.item_type}) - Created: ${section.created_at ? new Date(section.created_at).toLocaleDateString() : 'Unknown'}`);
        });
        
        return {
          data,
          error: null,
          success: true
        };
      } else {
        console.warn('⚠️ No data found in sections table!');
        console.log('📝 To add sample data:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Open SQL Editor');
        console.log('3. Run the script from sample-data.sql file');
        
        return {
          data: [],
          error: {
            message: `No sample data found for resort_id=${resortId}`,
            code: 'NO_SAMPLE_DATA'
          },
          success: false
        };
      }
      
    } catch (error) {
      const processedError = this.handleDatabaseError(error, `checkSampleData(resort_id=${resortId})`);
      return {
        data: null,
        error: processedError,
        success: false
      };
    }
  }

  /**
   * Enhanced database connection test with comprehensive error handling
   */
  static async testConnection(): Promise<DatabaseResult<boolean>> {
    try {
      console.log('🔍 Starting comprehensive database connection test...');
      
      // Test 1: Basic connectivity
      console.log('🔄 Test 1: Basic Supabase connectivity...');
      const connectivityResult = await this.retryOperation(async () => {
        const { data, error } = await supabase
          .from('sections')
          .select('section_id')
          .limit(1);
          
        if (error) throw error;
        return data;
      }, 3, 1000, 'Basic connectivity test');
      
      console.log('✅ Database connection successful');
      console.log('📊 Sections table exists and is accessible');
      
      // Test 2: Check for required environment variables
      console.log('🔄 Test 2: Environment configuration check...');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        const missingVars = [];
        if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
        if (!supabaseKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
        
        throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
      }
      
      console.log('✅ Environment variables configured correctly');
      
      // Test 3: Check database permissions
      console.log('🔄 Test 3: Database permissions check...');
      try {
        await supabase
          .from('sections')
          .select('count')
          .limit(0);
        console.log('✅ Read permissions confirmed');
      } catch (permError) {
        console.warn('⚠️ Limited permissions detected - check RLS policies');
      }
      
      console.log('🎉 All database connection tests passed!');
      
      return {
        data: true,
        error: null,
        success: true
      };
      
    } catch (error) {
      const processedError = this.handleDatabaseError(error, 'testConnection');
      
      // Provide specific guidance based on error type
      if (processedError.code === '42P01') {
        console.error('🚨 The "sections" table does not exist!');
        console.error('📝 Please run the sample-data.sql script in your Supabase SQL Editor');
      } else if (processedError.message?.includes('Missing environment variables')) {
        console.error('🔧 Environment configuration issue detected');
        console.error('📝 Please check your .env.local file');
      } else if (!processedError.message && !processedError.code) {
        console.error('🔌 Empty error object - possible connection issue');
        console.error('🔧 Verify your SUPABASE_URL and SUPABASE_ANON_KEY in .env.local');
      }
      
      return {
        data: false,
        error: processedError,
        success: false
      };
    }
  }

  /**
   * Enhanced method to fetch section data with comprehensive error handling
   */
  static async getSectionByName(resortId: number, sectionName: string): Promise<DatabaseResult<Section>> {
    try {
      console.log(`🔍 Fetching section: resort_id=${resortId}, section_name=${sectionName}`);
      
      // Validate input parameters
      if (!resortId || resortId <= 0) {
        throw new Error('Invalid resort ID provided');
      }
      
      if (!sectionName || sectionName.trim() === '') {
        throw new Error('Invalid section name provided');
      }
      
      const result = await this.retryOperation(async () => {
        const { data, error } = await supabase
          .from('sections')
          .select('*')
          .eq('resort_id', resortId)
          .eq('section_name', sectionName.trim())
          .single();
          
        if (error) throw error;
        return data;
      }, 3, 1000, `getSectionByName(${sectionName})`);
      
      console.log(`✅ Successfully fetched section data for: ${sectionName}`);
      console.log(`📄 Section details:`, {
        id: result.section_id,
        type: result.item_type,
        hasJson: !!result.section_json,
        description: result.item_description?.substring(0, 50) + '...' || 'No description'
      });
      
      return {
        data: result,
        error: null,
        success: true
      };
      
    } catch (error) {
      const processedError = this.handleDatabaseError(error, `getSectionByName(${sectionName})`);
      
      // Handle specific cases
      if (processedError.code === 'PGRST116') {
        console.log(`ℹ️ No data found for section: ${sectionName} (resort_id: ${resortId})`);
        console.log('💡 This is normal if you haven\'t added data to your database yet.');
        console.log('📝 Run the sample-data.sql script in your Supabase SQL Editor to add sample data.');
        
        return {
          data: null,
          error: {
            message: `Section '${sectionName}' not found for resort ${resortId}`,
            code: 'SECTION_NOT_FOUND'
          },
          success: false
        };
      }
      
      // Handle validation errors
      if (processedError.message?.includes('Invalid')) {
        return {
          data: null,
          error: {
            message: processedError.message,
            code: 'VALIDATION_ERROR'
          },
          success: false
        };
      }
      
      return {
        data: null,
        error: processedError,
        success: false
      };
    }
  }

  /**
   * Enhanced method to fetch all sections for a resort with proper error handling
   */
  static async getAllSections(resortId: number): Promise<DatabaseResult<Section[]>> {
    try {
      console.log(`🔍 Fetching all sections for resort_id=${resortId}`);
      
      // Validate input
      if (!resortId || resortId <= 0) {
        throw new Error('Invalid resort ID provided');
      }
      
      const result = await this.retryOperation(async () => {
        const { data, error, count } = await supabase
          .from('sections')
          .select('*', { count: 'exact' })
          .eq('resort_id', resortId)
          .order('section_name');
          
        if (error) throw error;
        return { data, count };
      }, 3, 1000, `getAllSections(resort_id=${resortId})`);
      
      const { data, count } = result;
      
      console.log(`✅ Successfully fetched ${count || 0} sections for resort_id=${resortId}`);
      
      if (data && data.length > 0) {
        console.log('📋 Section summary:');
        data.forEach((section: Section) => {
          console.log(`  • ${section.section_name} (${section.item_type}) - ID: ${section.section_id}`);
        });
      } else {
        console.log('ℹ️ No sections found for this resort');
      }
      
      return {
        data: data || [],
        error: null,
        success: true
      };
      
    } catch (error) {
      const processedError = this.handleDatabaseError(error, `getAllSections(resort_id=${resortId})`);
      
      return {
        data: [],
        error: processedError,
        success: false
      };
    }
  }

  /**
   * Health check method to verify service availability
   */
  static async healthCheck(): Promise<DatabaseResult<any>> {
    try {
      console.log('🔍 Starting ContentService health check...');
      
      const healthData = {
        timestamp: new Date().toISOString(),
        service: 'ContentService',
        version: '2.0.0',
        checks: {
          database: false,
          tables: false,
          environment: false
        }
      };
      
      // Check 1: Database connectivity
      const dbTest = await this.testConnection();
      healthData.checks.database = dbTest.success;
      
      // Check 2: Table accessibility
      const tableTest = await this.checkAccessibleTables();
      healthData.checks.tables = tableTest.success;
      
      // Check 3: Environment variables
      healthData.checks.environment = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      
      const allHealthy = Object.values(healthData.checks).every(Boolean);
      
      console.log(`🌡️ Health Check Result: ${allHealthy ? '✅ HEALTHY' : '❌ UNHEALTHY'}`);
      console.log('📈 Health Details:', healthData);
      
      return {
        data: healthData,
        error: allHealthy ? null : {
          message: 'Some health checks failed',
          code: 'HEALTH_CHECK_FAILED'
        },
        success: allHealthy
      };
      
    } catch (error) {
      const processedError = this.handleDatabaseError(error, 'healthCheck');
      return {
        data: null,
        error: processedError,
        success: false
      };
    }
  }

  /**
   * Quick diagnostic method for troubleshooting specific table issues
   */
  static async diagnoseTableIssue(tableName: string): Promise<void> {
    console.log(`🔍 Running detailed diagnosis for table: ${tableName}`);
    
    try {
      // Test 1: Basic select
      console.log('🔄 Test 1: Basic select query...');
      const { data: selectData, error: selectError } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      console.log('Select result:', { data: selectData, error: selectError });
      console.log('Error type:', typeof selectError);
      console.log('Error keys:', selectError ? Object.keys(selectError) : 'No error');
      console.log('Error stringified:', JSON.stringify(selectError));
      
      // Test 2: Count query
      console.log('🔄 Test 2: Count query...');
      const { count, error: countError } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });
      
      console.log('Count result:', { count, error: countError });
      
      // Test 3: Schema info
      console.log('🔄 Test 3: Table schema check...');
      const { data: schemaData, error: schemaError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type')
        .eq('table_name', tableName)
        .eq('table_schema', 'public');
      
      console.log('Schema result:', { data: schemaData, error: schemaError });
      
    } catch (error) {
      console.error('💥 Diagnosis failed:', error);
    }
  }
}