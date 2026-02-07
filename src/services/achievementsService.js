import { supabase } from './supabaseClient'

export const achievementsService = {
  // Get all active achievements
  async getAllAchievements() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching achievements:', error)
      return { data: null, error: error.message }
    }
  },

  // Get all achievements (admin view - includes inactive)
  async getAllAchievementsAdmin() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Get achievements by category
  async getAchievementsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Get single achievement by ID
  async getAchievementById(id) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Create new achievement
  async createAchievement(achievementData) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert([achievementData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Update achievement
  async updateAchievement(id, achievementData) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update(achievementData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Delete achievement (soft delete)
  async deleteAchievement(id) {
    try {
      const { error } = await supabase
        .from('achievements')
        .update({ is_active: false })
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Hard delete achievement
  async hardDeleteAchievement(id) {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  }
}
