/**
 * Logger Utility
 * Centralized logging with environment-aware behavior
 */

const isDev = import.meta.env.DEV

/**
 * Log levels
 */
const LogLevel = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug',
}

/**
 * Log level colors for better visibility
 */
const colors = {
  info: '#3b82f6',
  warn: '#f59e0b',
  error: '#ef4444',
  debug: '#8b5cf6',
}

/**
 * Format log message
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {any} data - Additional data
 */
const formatLog = (level, message, data) => {
  const timestamp = new Date().toISOString()
  return {
    timestamp,
    level,
    message,
    data: data || undefined,
  }
}

/**
 * Logger class
 */
class Logger {
  /**
   * Log info message
   * @param {string} message - Message to log
   * @param {any} data - Additional data
   */
  info(message, data) {
    if (isDev) {
      console.log(`%c[INFO]`, `color: ${colors.info}; font-weight: bold`, message, data || '')
    }
  }

  /**
   * Log warning message
   * @param {string} message - Message to log
   * @param {any} data - Additional data
   */
  warn(message, data) {
    if (isDev) {
      console.warn(`%c[WARN]`, `color: ${colors.warn}; font-weight: bold`, message, data || '')
    }
  }

  /**
   * Log error message
   * @param {string} message - Message to log
   * @param {Error} error - Error object
   */
  error(message, error) {
    console.error(`%c[ERROR]`, `color: ${colors.error}; font-weight: bold`, message, error || '')
    
    // In production, send to error tracking service
    if (!isDev && error) {
      // Example: Sentry.captureException(error)
    }
  }

  /**
   * Log debug message (only in development)
   * @param {string} message - Message to log
   * @param {any} data - Additional data
   */
  debug(message, data) {
    if (isDev) {
      console.debug(
        `%c[DEBUG]`,
        `color: ${colors.debug}; font-weight: bold`,
        message,
        data || ''
      )
    }
  }

  /**
   * Group logs together
   * @param {string} label - Group label
   * @param {Function} callback - Logs to group
   */
  group(label, callback) {
    if (isDev) {
      console.group(label)
      callback()
      console.groupEnd()
    }
  }

  /**
   * Log table data (development only)
   * @param {Array|Object} data - Tabular data
   */
  table(data) {
    if (isDev && data) {
      console.table(data)
    }
  }

  /**
   * Time a function execution
   * @param {string} label - Timer label
   * @param {Function} callback - Function to time
   */
  async time(label, callback) {
    if (isDev) {
      console.time(label)
      const result = await callback()
      console.timeEnd(label)
      return result
    }
    return callback()
  }
}

// Export singleton instance
export const logger = new Logger()
export default logger
