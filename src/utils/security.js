/**
 * Security Utilities
 * Input sanitization and validation helpers
 */

/**
 * Sanitizes HTML input to prevent XSS attacks
 * @param {string} input - Raw user input
 * @returns {string} Sanitized string
 */
export const sanitizeHtml = input => {
  if (!input) return ''
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  return String(input).replace(/[&<>"'/]/g, s => map[s])
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export const isValidUrl = url => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Rate limiter for form submissions
 * @param {string} key - Unique identifier
 * @param {number} limit - Max attempts
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} Whether request is allowed
 */
export const rateLimiter = (() => {
  const attempts = new Map()

  return (key, limit = 3, windowMs = 60000) => {
    const now = Date.now()
    const record = attempts.get(key) || { count: 0, resetAt: now + windowMs }

    if (now > record.resetAt) {
      record.count = 0
      record.resetAt = now + windowMs
    }

    record.count++
    attempts.set(key, record)

    return record.count <= limit
  }
})()

/**
 * Validates required fields
 * @param {Object} data - Form data
 * @param {string[]} required - Required field names
 * @returns {Object} { valid: boolean, missing: string[] }
 */
export const validateRequired = (data, required) => {
  const missing = required.filter(field => !data[field] || data[field].trim() === '')
  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Strips HTML tags from string
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
export const stripHtml = html => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generates secure random string
 * @param {number} length - String length
 * @returns {string} Random string
 */
export const generateSecureId = (length = 16) => {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}
