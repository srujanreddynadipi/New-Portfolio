import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Code2, Sparkles } from 'lucide-react'
import { skillsService } from '../../services/skillsService'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'

const ManageSkills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: 'programming',
    description: '',
    display_order: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const categories = ['programming', 'frameworks', 'databases', 'tools', 'concepts']

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setLoading(true)
    const { data, error } = await skillsService.getAllSkillsAdmin()
    if (data) {
      setSkills(data)
    } else {
      console.error('Error fetching skills:', error)
      setSkills([]) // Set empty array on error
    }
    setLoading(false)
  }

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill)
      setFormData({
        name: skill.name,
        level: skill.level,
        category: skill.category,
        description: skill.description || '',
        display_order: skill.display_order || 0,
      })
    } else {
      setEditingSkill(null)
      setFormData({
        name: '',
        level: 50,
        category: 'programming',
        description: '',
        display_order: 0,
      })
    }
    setIsModalOpen(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSkill(null)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      if (editingSkill) {
        const { error } = await skillsService.updateSkill(editingSkill.id, formData)
        if (error) throw new Error(error)
      } else {
        const { error } = await skillsService.createSkill(formData)
        if (error) throw new Error(error)
      }

      await fetchSkills()
      handleCloseModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    const { error } = await skillsService.deleteSkill(id)
    if (error) {
      alert('Error deleting skill: ' + error)
    } else {
      await fetchSkills()
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

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
            Manage Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Add, edit, or remove skills from your portfolio
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
        >
          <Plus className="w-5 h-5" />
          <span>Add Skill</span>
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-full p-6">
              <Code2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No Skills Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base">Get started by adding your first skill</p>
        </div>
      ) : null}

      {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white capitalize">
              {category}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categorySkills.map((skill, skillIndex) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (catIndex * 0.1) + (skillIndex * 0.05) }}
                className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                        {skill.name}
                      </h3>
                      {skill.description && (
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {skill.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleOpenModal(skill)}
                        className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Proficiency</span>
                      <span className="font-bold text-primary-600 dark:text-primary-400">{skill.level}%</span>
                    </div>
                    <div className="relative w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Skill Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., React, Java, Docker"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Proficiency Level: {formData.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <Input
            label="Description (Optional)"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the skill"
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

          <div className="flex justify-end space-x-3">
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
              {submitting ? 'Saving...' : editingSkill ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageSkills
