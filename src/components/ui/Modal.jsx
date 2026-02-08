import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { createFocusTrap, toggleScrollLock, generateAriaId } from '../../utils/accessibility'

/**
 * Accessible Modal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.size - Modal size ('sm', 'md', 'lg', 'xl')
 */
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const modalRef = useRef(null)
  const titleId = useRef(generateAriaId('modal-title'))
  const descId = useRef(generateAriaId('modal-desc'))
  const onCloseRef = useRef(onClose)

  // Size variants
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }

  // Manage focus trap and scroll lock
  useEffect(() => {
    if (isOpen && modalRef.current) {
      toggleScrollLock(true)
      const cleanup = createFocusTrap(modalRef.current)

      // ESC key handler
      const handleEsc = e => {
        if (e.key === 'Escape') onCloseRef.current()
      }
      document.addEventListener('keydown', handleEsc)

      return () => {
        cleanup()
        toggleScrollLock(false)
        document.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isOpen])

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId.current}
            aria-describedby={descId.current}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`glass-card ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  {title && (
                    <h2
                      id={titleId.current}
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                      {title}
                    </h2>
                  )}
                  <button
                    onClick={onClose}
                    className="ml-auto p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div id={descId.current}>{children}</div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
