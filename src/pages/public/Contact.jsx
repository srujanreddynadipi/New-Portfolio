import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { contactService } from '../../services/contactService'
import { useToast } from '../../context/ToastContext'
import { rateLimiter } from '../../utils/security'
import { debounce } from '../../utils/performance'
import SEO from '../../components/common/SEO'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Button from '../../components/ui/Button'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const toast = useToast()

  // Debounced validation
  const validateField = debounce((field, value) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'name':
        if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors.email = 'Invalid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'subject':
        if (value.length < 3) {
          newErrors.subject = 'Subject must be at least 3 characters'
        } else {
          delete newErrors.subject
        }
        break
      case 'message':
        if (value.length < 10) {
          newErrors.message = 'Message must be at least 10 characters'
        } else {
          delete newErrors.message
        }
        break
    }

    setErrors(newErrors)
  }, 300)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Rate limiting check
    if (!rateLimiter('contact-form', 3, 300000)) {
      toast.error('Too many submissions. Please try again in 5 minutes.')
      return
    }

    // Validation check
    if (Object.keys(errors).length > 0) {
      toast.warning('Please fix the errors before submitting')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await contactService.createMessage(formData)
      
      setLoading(false)

      if (error) {
        toast.error(error)
      } else {
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({})
      }
    } catch (err) {
      setLoading(false)
      console.error('Contact form error:', err)
      toast.error('Failed to send message. Please try again or contact directly via email.')
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@example.com',
      link: 'mailto:contact@example.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      link: null,
    },
  ]

  return (
    <>
      <SEO
        title="Contact Me"
        description="Get in touch with me for collaborations, opportunities, or just to say hello. I'd love to hear from you!"
        keywords={['contact', 'email', 'collaboration', 'work together']}
      />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            Have a question or want to work together? Drop me a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card key={index} hover={false}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <info.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card hover={false}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />

                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Your message here..."
                />

                {success && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-600 dark:text-green-400">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400">
                      Error sending message: {error}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="inline-block ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact
