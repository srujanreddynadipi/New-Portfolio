import { supabase } from './supabaseClient'

export const experienceService = {
  // Get all active experience entries
  async getAllExperience() {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching experience:', error)
      return { data: null, error: error.message }
    }
  },

  // Get all experience (admin view - includes inactive)
  async getAllExperienceAdmin() {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Get single experience by ID
  async getExperienceById(id) {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Create new experience entry
  async createExperience(experienceData) {
    try {
      const { data, error } = await supabase
        .from('experience')
        .insert([experienceData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Update experience
  async updateExperience(id, experienceData) {
    try {
      const { data, error } = await supabase
        .from('experience')
        .update(experienceData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Delete experience (soft delete)
  async deleteExperience(id) {
    try {
      const { error } = await supabase
        .from('experience')
        .update({ is_active: false })
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Hard delete experience
  async hardDeleteExperience(id) {
    try {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Get current experience (where current = true)
  async getCurrentExperience() {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('is_active', true)
        .eq('current', true)
        .order('start_date', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}
