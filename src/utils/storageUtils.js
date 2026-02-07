import { supabase } from '../services/supabaseClient'

/**
 * Upload an image file to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name ('images' or 'documents')
 * @param {string} folder - The folder path within the bucket (e.g., 'projects', 'blogs', 'certificates')
 * @returns {Promise<{data: string|null, error: string|null}>} - Returns public URL or error
 */
export const uploadFile = async (file, bucket = 'images', folder = '') => {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided')
    }

    // Check file size (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 5MB')
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return { data: publicUrl, error: null }
  } catch (error) {
    console.error('Upload error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Delete a file from Supabase Storage
 * @param {string} fileUrl - The public URL of the file to delete
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<{error: string|null}>}
 */
export const deleteFile = async (fileUrl, bucket = 'images') => {
  try {
    if (!fileUrl) return { error: null }

    // Extract file path from public URL
    const url = new URL(fileUrl)
    const pathParts = url.pathname.split(`/${bucket}/`)
    if (pathParts.length < 2) {
      throw new Error('Invalid file URL')
    }
    const filePath = pathParts[1]

    // Delete from storage
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Delete error:', error)
    return { error: error.message }
  }
}

/**
 * Validate image file type
 * @param {File} file - The file to validate
 * @returns {boolean}
 */
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  return file && validTypes.includes(file.type)
}

/**
 * Validate PDF file type
 * @param {File} file - The file to validate
 * @returns {boolean}
 */
export const isValidPDFFile = (file) => {
  return file && file.type === 'application/pdf'
}
