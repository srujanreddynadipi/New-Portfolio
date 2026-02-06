import { supabase } from './supabaseClient'

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
      return { data: null, error: error.message }
    }
  },

  // Create new contact message
  async createMessage(messageData) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([messageData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
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
