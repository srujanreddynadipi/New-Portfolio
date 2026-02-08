import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, ExternalLink, Github, FolderKanban } from 'lucide-react'
import { projectService } from '../../services/projectService'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import FileUpload from '../../components/ui/FileUpload'
import { uploadFile, isValidImageFile } from '../../utils/storageUtils'

const ManageProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    tech: '',
    features: '',
    github_url: '',
    live_url: '',
    category: 'Full Stack',
    status: 'Completed',
    start_date: '',
    end_date: '',
    is_featured: false,
    display_order: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await projectService.getAllProjects()
    if (data) {
      setProjects(data)
    } else {
      console.error('Error fetching projects:', error)
      setProjects([])
    }
    setLoading(false)
  }

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project)
      setImageFile(project.image || null)
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        description: project.description || '',
        image: project.image || '',
        tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
        features: Array.isArray(project.features) ? project.features.join('\n') : '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        category: project.category || 'Full Stack',
        status: project.status || 'Completed',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        is_featured: project.is_featured || false,
        display_order: project.display_order || 0
      })
    } else {
      setEditingProject(null)
      setImageFile(null)
      setFormData({
        title: '',
        slug: '',
        description: '',
        image: '',
        tech: '',
        features: '',
        github_url: '',
        live_url: '',
        category: 'Full Stack',
        status: 'Completed',
        start_date: '',
        end_date: '',
        is_featured: false,
        display_order: 0
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
    setImageFile(null)
    setUploading(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = formData.image

      // Upload new image if file is selected
      if (imageFile && typeof imageFile !== 'string') {
        if (!isValidImageFile(imageFile)) {
          alert('Please select a valid image file (PNG, JPG, GIF, WEBP)')
          setUploading(false)
          return
        }

        const { data, error } = await uploadFile(imageFile, 'images', 'projects')
        if (error) {
          alert(`Upload failed: ${error}`)
          setUploading(false)
          return
        }
        imageUrl = data
      }

      const projectData = {
        ...formData,
        image: imageUrl,
        tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
        features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        display_order: parseInt(formData.display_order) || 0
      }

      if (editingProject) {
        const { error } = await projectService.updateProject(editingProject.id, projectData)
        if (!error) {
          await fetchProjects()
          handleCloseModal()
        }
      } else {
        const { error } = await projectService.createProject(projectData)
        if (!error) {
          await fetchProjects()
          handleCloseModal()
        }
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to save project')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await projectService.deleteProject(id)
    if (!error) {
      setProjects(projects.filter(p => p.id !== id))
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Manage Projects
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Add, edit, or delete your portfolio projects
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </motion.div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-8 sm:p-12"
        >
          <div className="text-center">
            <div className="inline-flex p-4 sm:p-6 rounded-full bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 mb-6">
              <FolderKanban className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No projects yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first project to get started!</p>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
            >
              <Plus className="w-5 h-5" />
              <span>Create Project</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {project.image && (
                  <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-700 dark:to-dark-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 text-primary-700 dark:text-primary-300 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 rounded-lg">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 mb-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors touch-manipulation"
                        aria-label="View GitHub repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors touch-manipulation"
                        aria-label="View live project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Project Name"
          />

          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="project-slug (auto-generated if empty)"
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Brief project description"
          />

          <FileUpload
            label="Project Image"
            accept="image/*"
            currentFile={imageFile}
            onFileSelect={(file) => setImageFile(file)}
            onRemove={() => setImageFile(null)}
            preview={true}
          />

          <Input
            label="Technologies"
            name="tech"
            value={formData.tech}
            onChange={handleChange}
            required
            placeholder="React, Node.js, MongoDB (comma-separated)"
          />

          <Textarea
            label="Features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={4}
            placeholder="One feature per line"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Mobile">Mobile</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          <Input
            label="GitHub URL"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
          />

          <Input
            label="Live URL"
            name="live_url"
            value={formData.live_url}
            onChange={handleChange}
            placeholder="https://project.com"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              placeholder="2024"
            />

            <Input
              label="End Date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              placeholder="2025"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Featured Project
              </span>
            </label>

            <Input
              label="Display Order"
              name="display_order"
              type="number"
              value={formData.display_order}
              onChange={handleChange}
              placeholder="0"
              className="w-24"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={handleCloseModal} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : editingProject ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageProjects
