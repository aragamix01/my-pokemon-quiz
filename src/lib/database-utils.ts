/**
 * Standardized Database Utilities
 * Common patterns and utilities for Pokemon local databases
 * Used by moves-database.ts, type-effectiveness.ts, and future databases
 */

export interface DatabaseMetadata {
  version: string
  source: string
  description: string
  lastUpdated: string
  totalRecords?: number
}

export interface DatabaseResponse<T> {
  metadata: DatabaseMetadata
  data: T
  success: boolean
  error?: string
}

/**
 * Generic database search function
 * @param database - The database object to search
 * @param searchTerm - Term to search for
 * @param searchFields - Fields to search in (default: ['name'])
 * @returns Array of matching records
 */
export function searchDatabase<T extends Record<string, any>>(
  database: Record<string, T>,
  searchTerm: string,
  searchFields: (keyof T)[] = ['name']
): T[] {
  if (!searchTerm.trim()) return Object.values(database)
  
  const lowerSearchTerm = searchTerm.toLowerCase()
  
  return Object.values(database).filter(record => 
    searchFields.some(field => {
      const value = record[field]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearchTerm)
      }
      if (Array.isArray(value)) {
        return value.some((item: any) => 
          typeof item === 'string' && item.toLowerCase().includes(lowerSearchTerm)
        )
      }
      return false
    })
  )
}

/**
 * Filter database by field value
 * @param database - The database object to filter
 * @param field - Field to filter by
 * @param value - Value to match
 * @returns Array of matching records
 */
export function filterDatabase<T extends Record<string, any>>(
  database: Record<string, T>,
  field: keyof T,
  value: any
): T[] {
  return Object.values(database).filter(record => record[field] === value)
}

/**
 * Get database statistics
 * @param database - The database object to analyze
 * @param groupByField - Field to group statistics by
 * @returns Statistics object
 */
export function getDatabaseStats<T extends Record<string, any>>(
  database: Record<string, T>,
  groupByField?: keyof T
): Record<string, number> | { total: number } {
  const total = Object.keys(database).length
  
  if (!groupByField) {
    return { total }
  }
  
  const stats: Record<string, number> = {}
  Object.values(database).forEach(record => {
    const value = String(record[groupByField])
    stats[value] = (stats[value] || 0) + 1
  })
  
  return { total, ...stats }
}

/**
 * Validate database record structure
 * @param record - Record to validate
 * @param requiredFields - Array of required field names
 * @returns Validation result
 */
export function validateRecord<T extends Record<string, any>>(
  record: T,
  requiredFields: (keyof T)[]
): { valid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(field => 
    record[field] === undefined || record[field] === null
  ).map(String)
  
  return {
    valid: missingFields.length === 0,
    missingFields
  }
}

/**
 * Clean and normalize search terms
 * @param term - Search term to clean
 * @returns Cleaned search term
 */
export function cleanSearchTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim()
}

/**
 * Sort database records by field
 * @param database - Database to sort
 * @param field - Field to sort by
 * @param direction - Sort direction ('asc' | 'desc')
 * @returns Sorted array of records
 */
export function sortDatabase<T extends Record<string, any>>(
  database: Record<string, T>,
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return Object.values(database).sort((a, b) => {
    const aVal = a[field]
    const bVal = b[field]
    
    // Handle different data types
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    
    // Fallback to string comparison
    const aStr = String(aVal)
    const bStr = String(bVal)
    return direction === 'asc' 
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr)
  })
}

/**
 * Check if a record exists in the database
 * @param database - Database to check
 * @param key - Key to look for
 * @returns Boolean indicating existence
 */
export function hasRecord<T>(
  database: Record<string, T>,
  key: string
): boolean {
  return key in database
}

/**
 * Get record with fallback
 * @param database - Database to search
 * @param key - Primary key to look for
 * @param fallbackKey - Fallback key if primary not found
 * @returns Record or null
 */
export function getRecordWithFallback<T>(
  database: Record<string, T>,
  key: string,
  fallbackKey?: string
): T | null {
  if (database[key]) {
    return database[key]
  }
  
  if (fallbackKey && database[fallbackKey]) {
    return database[fallbackKey]
  }
  
  return null
}

/**
 * Create a safe database getter function
 * @param database - Database object
 * @param name - Database name for error messages
 * @returns Safe getter function
 */
export function createDatabaseGetter<T>(
  database: Record<string, T>,
  name: string
) {
  return (key: string): DatabaseResponse<T | null> => {
    try {
      const record = database[key] || null
      return {
        metadata: {
          version: '1.0',
          source: `${name} Local Database`,
          description: `Retrieved record: ${key}`,
          lastUpdated: new Date().toISOString().split('T')[0]
        },
        data: record,
        success: true
      }
    } catch (error) {
      return {
        metadata: {
          version: '1.0',
          source: `${name} Local Database`,
          description: `Error retrieving record: ${key}`,
          lastUpdated: new Date().toISOString().split('T')[0]
        },
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

/**
 * Merge multiple database search results
 * @param results - Array of search result arrays
 * @returns Merged and deduplicated results
 */
export function mergeSearchResults<T extends { id?: number | string; name?: string }>(
  ...results: T[][]
): T[] {
  const seen = new Set<string | number>()
  const merged: T[] = []
  
  results.forEach(resultArray => {
    resultArray.forEach(item => {
      const key = item.id || item.name || JSON.stringify(item)
      if (!seen.has(key)) {
        seen.add(key)
        merged.push(item)
      }
    })
  })
  
  return merged
}

/**
 * Create database index for faster searches
 * @param database - Database to index
 * @param indexField - Field to create index on
 * @returns Index map
 */
export function createDatabaseIndex<T extends Record<string, any>>(
  database: Record<string, T>,
  indexField: keyof T
): Map<any, T[]> {
  const index = new Map<any, T[]>()
  
  Object.values(database).forEach(record => {
    const value = record[indexField]
    if (!index.has(value)) {
      index.set(value, [])
    }
    index.get(value)!.push(record)
  })
  
  return index
}

/**
 * Performance timer for database operations
 */
export class DatabaseTimer {
  private startTime: number
  
  constructor() {
    this.startTime = performance.now()
  }
  
  elapsed(): number {
    return performance.now() - this.startTime
  }
  
  reset(): void {
    this.startTime = performance.now()
  }
}