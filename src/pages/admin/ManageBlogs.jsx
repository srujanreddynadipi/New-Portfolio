import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, Calendar, Clock, FileText } from 'lucide-react'
import { blogService } from '../../services/blogService'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import FileUpload from '../../components/ui/FileUpload'
import { uploadFile, isValidImageFile } from '../../utils/storageUtils'

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author: 'Srujan Reddy',
    category: '',
    tags: '',
    read_time: '',
    is_published: false
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setLoading(true)
    const { data, error } = await blogService.getAllBlogs()
    if (data) {
      setBlogs(data)
    } else {
      console.error('Error fetching blogs:', error)
      setBlogs([])
    }
    setLoading(false)
  }

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog)
      setImageFile(blog.featured_image || null)
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        featured_image: blog.featured_image || '',
        author: blog.author || 'Srujan Reddy',
        category: blog.category || '',
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
        read_time: blog.read_time || '',
        is_published: blog.is_published || false
      })
    } else {
      setEditingBlog(null)
      setImageFile(null)
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        author: 'Srujan Reddy',
        category: '',
        tags: '',
        read_time: '',
        is_published: false
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingBlog(null)
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
      let imageUrl = formData.featured_image

      // Upload new image if file is selected
      if (imageFile && typeof imageFile !== 'string') {
        if (!isValidImageFile(imageFile)) {
          alert('Please select a valid image file (PNG, JPG, GIF, WEBP)')
          setUploading(false)
          return
        }

        const { data, error } = await uploadFile(imageFile, 'images', 'blogs')
        if (error) {
          alert(`Upload failed: ${error}`)
          setUploading(false)
          return
        }
        imageUrl = data
      }

      const blogData = {
        ...formData,
        featured_image: imageUrl,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        read_time: parseInt(formData.read_time) || null,
        published_at: formData.is_published ? new Date().toISOString() : null
      }

      if (editingBlog) {
        const { error } = await blogService.updateBlog(editingBlog.id, blogData)
        if (!error) {
          await fetchBlogs()
          handleCloseModal()
        }
      } else {
        const { error } = await blogService.createBlog(blogData)
        if (!error) {
          await fetchBlogs()
          handleCloseModal()
        }
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to save blog post')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    const { error } = await blogService.deleteBlog(id)
    if (!error) {
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
            Manage Blogs
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Create, edit, or delete blog posts
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>New Blog Post</span>
        </button>
      </motion.div>

      {blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-8 sm:p-12"
        >
          <div className="text-center">
            <div className="inline-flex p-4 sm:p-6 rounded-full bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 mb-6">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No blog posts yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first post to get started!</p>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="group bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {blog.title}
                      </h3>
                      {blog.is_published ? (
                        <span className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full flex-shrink-0">
                          Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 rounded-full flex-shrink-0">
                          Draft
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {formatDate(blog.published_at || blog.created_at)}
                      </span>
                      {blog.read_time && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {blog.read_time} min
                        </span>
                      )}
                      {blog.views > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {blog.views}
                        </span>
                      )}
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {blog.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 text-primary-700 dark:text-primary-300 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 4 && (
                          <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 rounded-lg">
                            +{blog.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleOpenModal(blog)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation"
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
        title={editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Blog post title"
          />

          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="blog-post-slug (auto-generated if empty)"
          />

          <Textarea
            label="Excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            placeholder="Brief summary for preview"
          />

          <Textarea
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={8}
            placeholder="Full blog post content (Markdown supported)"
          />

          <FileUpload
            label="Featured Image"
            accept="image/*"
            currentFile={imageFile}
            onFileSelect={(file) => setImageFile(file)}
            onRemove={() => setImageFile(null)}
            preview={true}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
            />

            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Tech, Web Dev, AI"
            />
          </div>

          <Input
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, JavaScript, Tutorial (comma-separated)"
          />

          <Input
            label="Read Time (minutes)"
            name="read_time"
            type="number"
            value={formData.read_time}
            onChange={handleChange}
            placeholder="5"
          />

          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Publish immediately
            </span>
          </label>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={handleCloseModal} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : editingBlog ? 'Update Blog Post' : 'Create Blog Post'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageBlogs
