import { supabase } from './supabaseClient'

export const resumeService = {
  // Upload resume PDF
  async uploadResume(file) {
    try {
      const fileName = `resume-${Date.now()}.pdf`
      const filePath = `resumes/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      return { data: publicUrl, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Get latest resume URL
  async getLatestResume() {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .list('resumes', {
          limit: 1,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      if (error) throw error

      if (data && data.length > 0) {
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(`resumes/${data[0].name}`)

        return { data: publicUrl, error: null }
      }

      return { data: null, error: 'No resume found' }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Delete resume
  async deleteResume(fileName) {
    try {
      const { error } = await supabase.storage
        .from('documents')
        .remove([`resumes/${fileName}`])

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },
}
