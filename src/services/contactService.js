import { supabase } from './supabaseClient'
import { sanitizeHtml, isValidEmail, validateRequired } from '../utils/security'

export const contactService = {
  // Get all contact messages
  async getAllMessages() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      return { data: null, error: error.message }
    }
  },

  // Create new contact message with validation
  async createMessage(messageData) {
    try {
      // Validate required fields
      const validation = validateRequired(messageData, ['name', 'email', 'subject', 'message'])
      if (!validation.valid) {
        return { 
          data: null, 
          error: `Missing required fields: ${validation.missing.join(', ')}` 
        }
      }

      // Validate email format
      if (!isValidEmail(messageData.email)) {
        return { data: null, error: 'Invalid email address' }
      }

      // Sanitize inputs to prevent XSS
      const sanitizedData = {
        name: sanitizeHtml(messageData.name.trim()),
        email: messageData.email.trim().toLowerCase(),
        subject: sanitizeHtml(messageData.subject.trim()),
        message: sanitizeHtml(messageData.message.trim()),
      }

      // Length validations
      if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
        return { data: null, error: 'Name must be between 2 and 100 characters' }
      }

      if (sanitizedData.subject.length < 3 || sanitizedData.subject.length > 200) {
        return { data: null, error: 'Subject must be between 3 and 200 characters' }
      }

      if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
        return { data: null, error: 'Message must be between 10 and 2000 characters' }
      }

      const { data, error } = await supabase
        .from('contacts')
        .insert([sanitizedData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Failed to create message:', error)
      return { data: null, error: error.message || 'Failed to send message' }
    }
  },

  // Mark message as read
  async markAsRead(id) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({ is_read: true })
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Failed to mark as read:', error)
      return { data: null, error: error.message }
    }
  },

  // Delete message
  async deleteMessage(id) {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },
}
