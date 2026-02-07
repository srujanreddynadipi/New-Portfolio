import { supabase } from './supabaseClient'

export const certificationsService = {
  // Get all active certifications
  async getAllCertifications() {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching certifications:', error)
      return { data: null, error: error.message }
    }
  },

  // Get all certifications (admin view - includes inactive)
  async getAllCertificationsAdmin() {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Get single certification by ID
  async getCertificationById(id) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Create new certification
  async createCertification(certificationData) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .insert([certificationData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Update certification
  async updateCertification(id, certificationData) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .update(certificationData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Delete certification (soft delete)
  async deleteCertification(id) {
    try {
      const { error } = await supabase
        .from('certifications')
        .update({ is_active: false })
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Hard delete certification
  async hardDeleteCertification(id) {
    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Upload certification image
  async uploadImage(file, certificationId) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${certificationId}-${Date.now()}.${fileExt}`
      const filePath = `certifications/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return { data: publicUrl, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}
