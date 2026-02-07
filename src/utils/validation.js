/**
 * Form Validation Utilities
 * Comprehensive validation helpers
 */

/**
 * Validates form data against rules
 * @param {Object} data - Form data
 * @param {Object} rules - Validation rules
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateForm = (data, rules) => {
  const errors = {}

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = data[field]
    const fieldErrors = []

    // Required validation
    if (fieldRules.required && (!value || value.trim() === '')) {
      fieldErrors.push(fieldRules.messages?.required || `${field} is required`)
    }

    // Only validate further if value exists
    if (value && value.trim() !== '') {
      // Min length
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        fieldErrors.push(
          fieldRules.messages?.minLength ||
            `${field} must be at least ${fieldRules.minLength} characters`
        )
      }

      // Max length
      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        fieldErrors.push(
          fieldRules.messages?.maxLength ||
            `${field} must be at most ${fieldRules.maxLength} characters`
        )
      }

      // Email pattern
      if (fieldRules.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          fieldErrors.push(fieldRules.messages?.email || 'Invalid email address')
        }
      }

      // URL pattern
      if (fieldRules.url) {
        try {
          new URL(value)
        } catch {
          fieldErrors.push(fieldRules.messages?.url || 'Invalid URL')
        }
      }

      // Custom pattern
      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        fieldErrors.push(fieldRules.messages?.pattern || `Invalid ${field} format`)
      }

      // Custom validator
      if (fieldRules.validator) {
        const customError = fieldRules.validator(value, data)
        if (customError) {
          fieldErrors.push(customError)
        }
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors[0] // Return first error only
    }
  })

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Common validation rules
 */
export const commonRules = {
  email: {
    required: true,
    email: true,
    messages: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
  },
  password: {
    required: true,
    minLength: 8,
    messages: {
      required: 'Password is required',
      minLength: 'Password must be at least 8 characters',
    },
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    messages: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name must not exceed 100 characters',
    },
  },
  phone: {
    pattern: /^[\d\s\-\+\(\)]+$/,
    messages: {
      pattern: 'Please enter a valid phone number',
    },
  },
  url: {
    url: true,
    messages: {
      url: 'Please enter a valid URL',
    },
  },
}

/**
 * Phone number formatter
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone
 */
export const formatPhone = phone => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}
