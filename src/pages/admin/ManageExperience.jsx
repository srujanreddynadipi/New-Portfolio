import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Briefcase, MapPin, Calendar } from 'lucide-react'
import { experienceService } from '../../services/experienceService'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExp, setEditingExp] = useState(null)
  const [formData, setFormData] = useState({
    type: 'Internship',
    role: '',
    company: '',
    location: '',
    duration: '',
    start_date: '',
    end_date: '',
    current: false,
    description: '',
    responsibilities: '',
    technologies: '',
    display_order: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const types = ['Internship', 'Training', 'Full-time', 'Freelance', 'Part-time']

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    setLoading(true)
    const { data, error } = await experienceService.getAllExperience()
    if (data) {
      setExperiences(data)
    } else {
      console.error('Error fetching experiences:', error)
      setExperiences([]) // Set empty array on error
    }
    setLoading(false)
  }

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp)
      setFormData({
        type: exp.type,
        role: exp.role,
        company: exp.company,
        location: exp.location || '',
        duration: exp.duration,
        start_date: exp.start_date,
        end_date: exp.end_date || '',
        current: exp.current || false,
        description: exp.description || '',
        responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : '',
        technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : '',
        display_order: exp.display_order || 0,
      })
    } else {
      setEditingExp(null)
      setFormData({
        type: 'Internship',
        role: '',
        company: '',
        location: '',
        duration: '',
        start_date: '',
        end_date: '',
        current: false,
        description: '',
        responsibilities: '',
        technologies: '',
        display_order: 0,
      })
    }
    setIsModalOpen(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingExp(null)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        ...formData,
        responsibilities: formData.responsibilities.split('\n').filter(line => line.trim()),
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      }

      if (editingExp) {
        const { error } = await experienceService.updateExperience(editingExp.id, payload)
        if (error) throw new Error(error)
      } else {
        const { error } = await experienceService.createExperience(payload)
        if (error) throw new Error(error)
      }

      await fetchExperiences()
      handleCloseModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    const { error } = await experienceService.deleteExperience(id)
    if (error) {
      alert('Error deleting experience: ' + error)
    } else {
      await fetchExperiences()
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
            Manage Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Add, edit, or remove work experience entries
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
        >
          <Plus className="w-5 h-5" />
          <span>Add Experience</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-full p-6">
              <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No Experience Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base">Get started by adding your first work experience</p>
        </div>
      ) : (
        <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 text-primary-700 dark:text-primary-300 rounded-full flex-shrink-0">
                    {exp.type}
                  </span>
                  {exp.current && (
                    <span className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full flex-shrink-0 animate-pulse">
                      • Current
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {exp.role}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Briefcase className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span>{exp.company}</span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                )}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 mt-1.5 flex-shrink-0"></span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-50 dark:from-dark-700 dark:to-dark-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-dark-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex lg:flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => handleOpenModal(exp)}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingExp ? 'Edit Experience' : 'Add New Experience'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <Input
            label="Role/Position"
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
            placeholder="e.g., Full Stack Developer"
          />

          <Input
            label="Company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            placeholder="e.g., Tech Company Inc."
          />

          <Input
            label="Location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Remote, New York, etc."
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="text"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              required
              placeholder="e.g., Jan 2024"
            />

            <Input
              label="End Date"
              type="text"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              placeholder="e.g., Dec 2024"
              disabled={formData.current}
            />
          </div>

          <Input
            label="Duration"
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
            placeholder="e.g., Jan 2024 - Dec 2024"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked, end_date: e.target.checked ? '' : formData.end_date })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="current" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Currently working here
            </label>
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the role"
            rows={3}
          />

          <Textarea
            label="Responsibilities (one per line)"
            value={formData.responsibilities}
            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
            placeholder="Developed features&#10;Collaborated with team&#10;Implemented solutions"
            rows={5}
          />

          <Input
            label="Technologies (comma-separated)"
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            placeholder="React, Node.js, MongoDB, Docker"
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
              {submitting ? 'Saving...' : editingExp ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageExperience
