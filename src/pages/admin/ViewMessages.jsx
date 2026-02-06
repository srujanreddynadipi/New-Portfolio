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
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Contact Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage contact form submissions
        </p>
      </motion.div>

      {messages.length === 0 ? (
        <Card hover={false}>
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No messages yet. Messages will appear here when someone contacts you.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover={false}>
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {message.name}
                      </h3>
                      {!message.is_read && (
                        <span className="ml-3 px-2 py-1 text-xs bg-primary-500 text-white rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {message.email}
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {message.subject}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {message.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    {!message.is_read && (
                      <Button
                        variant="secondary"
                        className="px-4"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      className="px-4"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewMessages
