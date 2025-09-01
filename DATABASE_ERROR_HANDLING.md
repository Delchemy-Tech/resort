# Database Error Handling Documentation

This document outlines the comprehensive error handling system implemented for all database communications in the resort project.

## Overview

The enhanced error handling system provides:
- **Comprehensive Error Processing**: Detailed error information with context
- **Retry Mechanisms**: Automatic retry with exponential backoff
- **Specific Error Code Handling**: Targeted responses for common database errors
- **Health Checks**: System-wide health monitoring
- **Graceful Degradation**: Fallback mechanisms when database is unavailable

## Error Handling Architecture

### 1. Error Types

```typescript
interface DatabaseError {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
  severity?: string;
}

interface DatabaseResult<T> {
  data: T | null;
  error: DatabaseError | null;
  success: boolean;
}
```

### 2. Core Error Handler

The `handleDatabaseError()` method processes all Supabase errors and provides:
- Structured error information
- Context-aware logging with emojis
- Specific guidance for common error codes
- Detection of empty error objects

### 3. Retry Mechanism

The `retryOperation()` method provides:
- Configurable retry attempts (default: 3)
- Exponential backoff strategy
- Context-aware logging
- Failure handling after max retries

## Specific Error Codes Handled

| Error Code | Description | Handling |
|------------|-------------|----------|
| `42P01` | Table does not exist | Guide to run schema script |
| `PGRST116` | No rows found | Normal behavior, suggest sample data |
| `23505` | Duplicate key violation | Data already exists |
| `23503` | Foreign key violation | Referenced data missing |
| `PGRST301` | Insufficient privileges | Check RLS policies |
| `PGRST204` | No content | Query returned no data |
| Empty Error | Connection issues | Check environment variables |

## Enhanced Methods

### 1. `testConnection()`
- **Purpose**: Comprehensive database connectivity test
- **Features**: 
  - Basic connectivity check
  - Environment variable validation
  - Permission verification
  - Multi-stage testing
- **Returns**: `DatabaseResult<boolean>`

### 2. `checkAccessibleTables()`
- **Purpose**: Verify table accessibility
- **Features**:
  - Tests multiple common tables
  - Provides accessibility summary
  - Network error handling
- **Returns**: `DatabaseResult<string[]>`

### 3. `showAllTables()`
- **Purpose**: List all database tables
- **Features**:
  - RPC method with fallback
  - Direct query alternative
  - Retry mechanism
- **Returns**: `DatabaseResult<any[]>`

### 4. `checkSampleData()`
- **Purpose**: Verify sample data exists
- **Features**:
  - Data validation
  - Detailed reporting
  - Setup guidance
- **Returns**: `DatabaseResult<any[]>`

### 5. `getSectionByName()`
- **Purpose**: Fetch specific section data
- **Features**:
  - Input validation
  - Detailed section information
  - Specific error handling
- **Returns**: `DatabaseResult<Section>`

### 6. `getAllSections()`
- **Purpose**: Fetch all sections for a resort
- **Features**:
  - Input validation
  - Summary reporting
  - Count information
- **Returns**: `DatabaseResult<Section[]>`

### 7. `healthCheck()`
- **Purpose**: System-wide health monitoring
- **Features**:
  - Database connectivity test
  - Table accessibility check
  - Environment validation
  - Comprehensive health report
- **Returns**: `DatabaseResult<HealthData>`

## Frontend Error Handling

### Enhanced Loading States
- Database connectivity indicators
- Health check status display
- Progress information

### Error State UI
- User-friendly error messages
- Actionable guidance
- Retry functionality
- Fallback content notification

### Graceful Degradation
- Default content when database unavailable
- Partial functionality maintenance
- Clear user communication

## Console Logging

### Logging Levels
- `🔍` Info: General information
- `⚠️` Warning: Non-critical issues
- `❌` Error: Critical problems
- `💥` Fatal: System failures
- `✅` Success: Successful operations
- `🎉` Celebration: Major milestones

### Structured Logging
```javascript
console.error('🚨 Database Error in context:', {
  message: processedError.message,
  code: processedError.code,
  details: processedError.details,
  hint: processedError.hint,
  severity: processedError.severity,
  fullError: error
});
```

## Usage Examples

### Basic Error Handling
```typescript
const result = await ContentService.getSectionByName(1, 'Hero');
if (result.success) {
  setHeroData(result.data);
} else {
  console.error('Failed to load hero section:', result.error);
  // Handle error appropriately
}
```

### Health Check
```typescript
const health = await ContentService.healthCheck();
if (!health.success) {
  setError('System health check failed');
  // Implement fallback behavior
}
```

### Retry with Custom Parameters
```typescript
const result = await ContentService.retryOperation(
  () => getSomeData(),
  5,      // max retries
  2000,   // initial delay
  'Custom Operation'
);
```

## Error Prevention Best Practices

### 1. Input Validation
- Validate all parameters before database calls
- Check for required environment variables
- Sanitize user inputs

### 2. Connection Management
- Test connectivity before operations
- Use connection pooling appropriately
- Handle network timeouts

### 3. Resource Management
- Close connections properly
- Handle memory leaks
- Monitor resource usage

### 4. Monitoring
- Regular health checks
- Performance monitoring
- Error rate tracking

## Troubleshooting Guide

### Common Issues

1. **Table Not Found (42P01)**
   - Run `sample-data.sql` in Supabase SQL Editor
   - Verify database schema
   - Check table permissions

2. **Connection Failed**
   - Verify environment variables in `.env.local`
   - Check Supabase project status
   - Validate API keys

3. **No Data Found (PGRST116)**
   - Normal behavior for empty tables
   - Add sample data for testing
   - Verify query parameters

4. **Permission Denied (PGRST301)**
   - Check Row Level Security (RLS) policies
   - Verify user permissions
   - Review API key scopes

### Debug Steps

1. Check browser console for detailed error logs
2. Verify environment variables
3. Test database connectivity in Supabase dashboard
4. Review RLS policies
5. Check API key permissions

## Configuration

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_RESORT_ID=1
```

### Error Handling Settings
- **Max Retries**: 3 attempts
- **Initial Delay**: 1000ms
- **Backoff Strategy**: Exponential (x2)
- **Timeout**: Default Supabase timeout

## Future Enhancements

1. **Advanced Monitoring**
   - Error rate metrics
   - Performance tracking
   - Alert systems

2. **Circuit Breaker Pattern**
   - Automatic service degradation
   - Recovery mechanisms
   - Load balancing

3. **Enhanced Caching**
   - Error response caching
   - Smart retry logic
   - Offline support

4. **User Experience**
   - Progressive loading
   - Better error messages
   - Automatic recovery

This comprehensive error handling system ensures robust database communication with excellent user experience and debugging capabilities.