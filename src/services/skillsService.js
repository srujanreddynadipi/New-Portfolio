import { supabase } from './supabaseClient'

export const skillsService = {
  // Get all active skills grouped by category
  async getAllSkills() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
      
      if (error) throw error

      // Group by category
      const grouped = {
        programming: [],
        frameworks: [],
        databases: [],
        tools: [],
        concepts: []
      }

      data?.forEach(skill => {
        if (grouped[skill.category]) {
          grouped[skill.category].push({
            name: skill.name,
            level: skill.level,
            category: skill.category,
            description: skill.description
          })
        }
      })

      return { data: grouped, error: null }
    } catch (error) {
      console.error('Error fetching skills:', error)
      return { data: null, error: error.message }
    }
  },

  // Get all skills (admin view - includes inactive)
  async getAllSkillsAdmin() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Get single skill by ID
  async getSkillById(id) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Create new skill
  async createSkill(skillData) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([skillData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Update skill
  async updateSkill(id, skillData) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Delete skill (soft delete - set is_active to false)
  async deleteSkill(id) {
    try {
      const { error } = await supabase
        .from('skills')
        .update({ is_active: false })
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Hard delete skill
  async hardDeleteSkill(id) {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Reorder skills
  async reorderSkills(skillsArray) {
    try {
      const updates = skillsArray.map((skill, index) => ({
        id: skill.id,
        display_order: index
      }))

      const { error } = await supabase
        .from('skills')
        .upsert(updates)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  }
}
