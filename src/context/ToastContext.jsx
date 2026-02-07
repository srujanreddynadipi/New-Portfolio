/**
 * Toast Notification System
 * Centralized notification management for user feedback
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

const TOAST_TYPES = {
  success: { icon: CheckCircle, color: 'green' },
  error: { icon: XCircle, color: 'red' },
  warning: { icon: AlertCircle, color: 'yellow' },
  info: { icon: Info, color: 'blue' },
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, duration }])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const toast = {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
    remove: removeToast,
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map(({ id, message, type }) => {
            const { icon: Icon, color } = TOAST_TYPES[type]
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                className={`bg-white dark:bg-dark-800 rounded-xl shadow-lg border-l-4 border-${color}-500 p-4 flex items-start gap-3`}
              >
                <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400 flex-shrink-0 mt-0.5`} />
                <p className="flex-1 text-sm text-gray-900 dark:text-white">{message}</p>
                <button
                  onClick={() => removeToast(id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
