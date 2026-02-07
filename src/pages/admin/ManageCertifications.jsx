import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, ExternalLink, Award, Calendar } from 'lucide-react'
import { certificationsService } from '../../services/certificationsService'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'
import FileUpload from '../../components/ui/FileUpload'
import { uploadFile, isValidImageFile } from '../../utils/storageUtils'

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCert, setEditingCert] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    credential_id: '',
    credential_url: '',
    description: '',
    skills: '',
    image: '',
    display_order: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    setLoading(true)
    const { data, error } = await certificationsService.getAllCertifications()
    if (data) {
      setCertifications(data)
    } else {
      console.error('Error fetching certifications:', error)
      setCertifications([]) // Set empty array on error
    }
    setLoading(false)
  }

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert)
      setImageFile(cert.image || null)
      setFormData({
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        credential_id: cert.credential_id || '',
        credential_url: cert.credential_url || '',
        description: cert.description || '',
        skills: Array.isArray(cert.skills) ? cert.skills.join(', ') : '',
        image: cert.image || '',
        display_order: cert.display_order || 0,
      })
    } else {
      setEditingCert(null)
      setImageFile(null)
      setFormData({
        title: '',
        issuer: '',
        date: '',
        credential_id: '',
        credential_url: '',
        description: '',
        skills: '',
        image: '',
        display_order: 0,
      })
    }
    setIsModalOpen(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCert(null)
    setImageFile(null)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      let imageUrl = formData.image

      // Upload new image if file is selected
      if (imageFile && typeof imageFile !== 'string') {
        if (!isValidImageFile(imageFile)) {
          setError('Please select a valid image file (PNG, JPG, GIF, WEBP)')
          setSubmitting(false)
          return
        }

        const { data, error: uploadError } = await uploadFile(imageFile, 'images', 'certificates')
        if (uploadError) {
          setError(`Upload failed: ${uploadError}`)
          setSubmitting(false)
          return
        }
        imageUrl = data
      }

      const payload = {
        ...formData,
        image: imageUrl,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
      }

      if (editingCert) {
        const { error } = await certificationsService.updateCertification(editingCert.id, payload)
        if (error) throw new Error(error)
      } else {
        const { error } = await certificationsService.createCertification(payload)
        if (error) throw new Error(error)
      }

      await fetchCertifications()
      handleCloseModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this certification?')) return

    const { error } = await certificationsService.deleteCertification(id)
    if (error) {
      alert('Error deleting certification: ' + error)
    } else {
      await fetchCertifications()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Manage Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Add, edit, or remove certifications and courses
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
        >
          <Plus className="w-5 h-5" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-full p-6">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No Certifications Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base">Get started by adding your first certification</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {cert.image_url && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-700 dark:to-dark-800">
                <img
                  src={cert.image_url}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1 min-w-0">
                  {cert.title}
                </h3>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleOpenModal(cert)}
                    className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="p-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Award className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  <span>{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span>{cert.date}</span>
                </div>
              </div>

              {cert.description && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {cert.description}
                </p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 text-primary-700 dark:text-primary-300 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 rounded-lg">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group/link"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {cert.credential_id && (
                <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                  ID: {cert.credential_id}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCert ? 'Edit Certification' : 'Add New Certification'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Certification Title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., AWS Certified Solutions Architect"
          />

          <Input
            label="Issuer/Organization"
            type="text"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            required
            placeholder="e.g., Amazon Web Services"
          />

          <Input
            label="Date Obtained"
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            placeholder="e.g., January 2024 or 2024"
          />

          <Input
            label="Credential ID (Optional)"
            type="text"
            value={formData.credential_id}
            onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
            placeholder="e.g., ABC123XYZ"
          />

          <Input
            label="Credential URL (Optional)"
            type="url"
            value={formData.credential_url}
            onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
            placeholder="https://..."
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the certification"
            rows={3}
          />

          <Input
            label="Skills (comma-separated)"
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="AWS, Cloud Computing, DevOps"
          />

          <FileUpload
            label="Certificate Image (Optional)"
            accept="image/*"
            currentFile={imageFile}
            onFileSelect={(file) => setImageFile(file)}
            onRemove={() => setImageFile(null)}
            preview={true}
          />

          <Input
            label="Display Order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
            placeholder="0"
          />

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-500 hover:bg-gray-600"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              <Save className="w-5 h-5 mr-2" />
              {submitting ? (imageFile && typeof imageFile !== 'string' ? 'Uploading...' : 'Saving...') : editingCert ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageCertifications
