/**
 * Accessibility Utilities
 * ARIA helpers and keyboard navigation utilities
 */

/**
 * Manages focus trap for modals and dialogs
 * @param {HTMLElement} element - Container element
 * @returns {Function} Cleanup function
 */
export const createFocusTrap = element => {
  if (!element) return () => {}

  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleKeyDown = e => {
    if (e.key !== 'Tab') return

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement?.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement?.focus()
    }
  }

  element.addEventListener('keydown', handleKeyDown)
  firstElement?.focus()

  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Announces message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Generates unique ID for aria-labelledby
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export const generateAriaId = (prefix = 'aria') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Checks if element is visible
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
export const isElementVisible = element => {
  if (!element) return false
  const style = window.getComputedStyle(element)
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
}

/**
 * Keyboard navigation handler
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Object} handlers - Key handler functions
 */
export const handleKeyboardNav = (event, handlers) => {
  const handler = handlers[event.key]
  if (handler) {
    event.preventDefault()
    handler(event)
  }
}

/**
 * Skip link handler for keyboard navigation
 * @param {string} targetId - ID of element to skip to
 */
export const skipToContent = targetId => {
  const target = document.getElementById(targetId)
  if (target) {
    target.tabIndex = -1
    target.focus()
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Manages scroll lock for modals
 * @param {boolean} lock - Whether to lock scroll
 */
export const toggleScrollLock = lock => {
  if (lock) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}
