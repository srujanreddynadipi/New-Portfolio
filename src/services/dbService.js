/**
 * Enhanced Supabase Service Wrapper
 * Centralizes database operations with error handling
 */
import { supabase } from './supabaseClient'

/**
 * Executes Supabase query with error handling
 * @param {Function} queryFn - Query function to execute
 * @returns {Promise<{data: any, error: string|null}>}
 */
const executeQuery = async queryFn => {
  try {
    const result = await queryFn()
    
    if (result.error) {
      console.error('Supabase error:', result.error)
      return {
        data: null,
        error: result.error.message || 'Database operation failed',
      }
    }

    return { data: result.data, error: null }
  } catch (error) {
    console.error('Query execution error:', error)
    return {
      data: null,
      error: error.message || 'An unexpected error occurred',
    }
  }
}

/**
 * Generic CRUD operations wrapper
 */
export const createDbService = tableName => ({
  /**
   * Get all records
   * @param {Object} options - Query options
   * @returns {Promise}
   */
  getAll: async (options = {}) => {
    return executeQuery(async () => {
      let query = supabase.from(tableName).select(options.select || '*')

      if (options.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      if (options.order) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending ?? true,
        })
      }

      if (options.limit) {
        query = query.limit(options.limit)
      }

      return query
    })
  },

  /**
   * Get single record by ID
   * @param {string|number} id - Record ID
   * @returns {Promise}
   */
  getById: async id => {
    return executeQuery(async () => {
      return supabase.from(tableName).select('*').eq('id', id).single()
    })
  },

  /**
   * Create new record
   * @param {Object} data - Record data
   * @returns {Promise}
   */
  create: async data => {
    return executeQuery(async () => {
      return supabase.from(tableName).insert([data]).select().single()
    })
  },

  /**
   * Update record
   * @param {string|number} id - Record ID
   * @param {Object} data - Updated data
   * @returns {Promise}
   */
  update: async (id, data) => {
    return executeQuery(async () => {
      return supabase.from(tableName).update(data).eq('id', id).select().single()
    })
  },

  /**
   * Delete record
   * @param {string|number} id - Record ID
   * @returns {Promise}
   */
  delete: async id => {
    return executeQuery(async () => {
      return supabase.from(tableName).delete().eq('id', id)
    })
  },
})

/**
 * Storage operations with error handling
 */
export const storageService = {
  /**
   * Upload file to storage
   * @param {string} bucket - Bucket name
   * @param {string} path - File path
   * @param {File} file - File object
   * @returns {Promise}
   */
  uploadFile: async (bucket, path, file) => {
    return executeQuery(async () => {
      const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path)

      return { data: { url: publicUrl, path: data.path }, error: null }
    })
  },

  /**
   * Delete file from storage
   * @param {string} bucket - Bucket name
   * @param {string} path - File path
   * @returns {Promise}
   */
  deleteFile: async (bucket, path) => {
    return executeQuery(async () => {
      return supabase.storage.from(bucket).remove([path])
    })
  },
}

export { supabase }
