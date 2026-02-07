import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Trash2, CheckCircle } from 'lucide-react'
import { contactService } from '../../services/contactService'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const ViewMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    const { data } = await contactService.getAllMessages()
    setMessages(data || [])
    setLoading(false)
  }

  const handleMarkAsRead = async (id) => {
    const { error } = await contactService.markAsRead(id)
    if (!error) {
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    const { error } = await contactService.deleteMessage(id)
    if (!error) {
      setMessages(messages.filter(m => m.id !== id))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Contact Messages
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          View and manage contact form submissions
        </p>
      </motion.div>

      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-8 sm:p-12"
        >
          <div className="text-center">
            <div className="inline-flex p-4 sm:p-6 rounded-full bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 mb-6">
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No messages yet</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Messages will appear here when someone contacts you through the contact form.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                        {message.name}
                      </h3>
                      {!message.is_read && (
                        <span className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-full shadow-lg shadow-primary-500/30 flex-shrink-0">
                          New
                        </span>
                      )}
                    </div>
                    
                    <a 
                      href={`mailto:${message.email}`}
                      className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline mb-3 block truncate"
                    >
                      {message.email}
                    </a>
                    
                    {message.subject && (
                      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm sm:text-base">
                        Subject: {message.subject}
                      </p>
                    )}
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
                      {message.message}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{formatDate(message.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    {!message.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Read</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewMessages
