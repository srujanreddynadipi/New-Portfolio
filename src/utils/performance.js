/**
 * Performance Utilities
 * Optimization helpers for React components
 */

/**
 * Debounces function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttles function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy loads image with loading placeholder
 * @param {string} src - Image source
 * @param {string} placeholder - Placeholder image
 * @returns {Promise<string>} Loaded image src
 */
export const lazyLoadImage = (src, placeholder = '') => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preloads critical resources
 * @param {string[]} resources - Array of resource URLs
 */
export const preloadResources = resources => {
  if (typeof window === 'undefined') return

  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = resource.endsWith('.woff2')
      ? 'font'
      : resource.endsWith('.css')
      ? 'style'
      : 'image'
    link.href = resource
    if (link.as === 'font') {
      link.crossOrigin = 'anonymous'
    }
    document.head.appendChild(link)
  })
}

/**
 * Implements intersection observer for lazy loading
 * @param {Function} callback - Callback when element is visible
 * @param {Object} options - Intersection observer options
 * @returns {IntersectionObserver} Observer instance
 */
export const createObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  }

  return new IntersectionObserver(callback, { ...defaultOptions, ...options })
}

/**
 * Calculates time to read content
 * @param {string} text - Content text
 * @param {number} wordsPerMinute - Average reading speed
 * @returns {number} Minutes to read
 */
export const calculateReadTime = (text, wordsPerMinute = 200) => {
  if (!text) return 0
  const wordCount = text.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Formats file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = bytes => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
