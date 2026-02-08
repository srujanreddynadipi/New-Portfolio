import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Trophy, Award, Medal, Star } from 'lucide-react'
import { achievementsService } from '../../services/achievementsService'
import { uploadFile, isValidImageFile } from '../../utils/storageUtils'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import FileUpload from '../../components/ui/FileUpload'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    category: 'Hackathon',
    icon: 'trophy',
    image: '',
    display_order: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const categories = ['Hackathon', 'Certification', 'Award', 'Competition', 'Publication', 'Other']
  const icons = ['trophy', 'award', 'medal', 'star', 'certificate', 'crown']

  const iconComponents = {
    trophy: Trophy,
    award: Award,
    medal: Medal,
    star: Star,
    certificate: Award,
    crown: Trophy,
  }

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    setLoading(true)
    const { data, error } = await achievementsService.getAllAchievements()
    if (data) {
      setAchievements(data)
    } else {
      console.error('Error fetching achievements:', error)
      setAchievements([]) // Set empty array on error
    }
    setLoading(false)
  }

  const handleOpenModal = (achievement = null) => {
    if (achievement) {
      setEditingAchievement(achievement)
      setImageFile(achievement.image || null)
      setFormData({
        title: achievement.title,
        date: achievement.date,
        description: achievement.description,
        category: achievement.category || 'Hackathon',
        icon: achievement.icon || 'trophy',
        image: achievement.image || '',
        display_order: achievement.display_order || 0,
      })
    } else {
      setEditingAchievement(null)
      setImageFile(null)
      setFormData({
        title: '',
        date: '',
        description: '',
        category: 'Hackathon',
        icon: 'trophy',
        image: '',
        display_order: 0,
      })
    }
    setIsModalOpen(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAchievement(null)
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

        const { data, error: uploadError } = await uploadFile(imageFile, 'images', 'achievements')
        if (uploadError) throw new Error(uploadError)
        imageUrl = data.publicUrl
      }

      const achievementData = {
        ...formData,
        image: imageUrl,
      }

      if (editingAchievement) {
        const { error } = await achievementsService.updateAchievement(editingAchievement.id, achievementData)
        if (error) throw new Error(error)
      } else {
        const { error } = await achievementsService.createAchievement(achievementData)
        if (error) throw new Error(error)
      }

      await fetchAchievements()
      handleCloseModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return

    const { error } = await achievementsService.deleteAchievement(id)
    if (error) {
      alert('Error deleting achievement: ' + error)
    } else {
      await fetchAchievements()
    }
  }

  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || Trophy
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
            Manage Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Add, edit, or remove achievements and awards
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
        >
          <Plus className="w-5 h-5" />
          <span>Add Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-full p-6">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No Achievements Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base">Get started by adding your first achievement</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = getIconComponent(achievement.icon)
            const categoryColors = {
              'Hackathon': { bg: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30', text: 'text-blue-600 dark:text-blue-400', badge: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' },
              'Certification': { bg: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30', text: 'text-green-600 dark:text-green-400', badge: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' },
              'Award': { bg: 'from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30', text: 'text-yellow-600 dark:text-yellow-400', badge: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20' },
              'Competition': { bg: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30', text: 'text-purple-600 dark:text-purple-400', badge: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
              'Publication': { bg: 'from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30', text: 'text-orange-600 dark:text-orange-400', badge: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20' },
              'Other': { bg: 'from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30', text: 'text-gray-600 dark:text-gray-400', badge: 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20' }
            }
            const colors = categoryColors[achievement.category] || categoryColors['Other']
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 bg-gradient-to-br ${colors.bg} rounded-xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                        {achievement.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${colors.badge} ${colors.text} rounded-full`}>
                          {achievement.category}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {achievement.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleOpenModal(achievement)}
                        className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(achievement.id)}
                        className="p-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Achievement Title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Winner of National Hackathon 2024"
          />

          <Input
            label="Date"
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            placeholder="e.g., 2024 or January 2024"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            placeholder="Describe the achievement and its significance"
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-3 gap-3">
              {icons.map((iconName) => {
                const IconComp = getIconComponent(iconName)
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.icon === iconName
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-dark-600 hover:border-primary-300'
                    }`}
                  >
                    <IconComp className={`w-6 h-6 mx-auto ${
                      formData.icon === iconName
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                    <p className="text-xs mt-1 capitalize text-center">{iconName}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <FileUpload
            label="Achievement Image (Optional)"
            file={imageFile}
            onFileChange={setImageFile}
            accept="image/*"
            helpText="Upload an image of your achievement certificate or award"
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
              {submitting ? 'Saving...' : editingAchievement ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageAchievements
