import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, FileText, MessageSquare, TrendingUp } from 'lucide-react'
import { projectService } from '../../services/projectService'
import { blogService } from '../../services/blogService'
import { contactService } from '../../services/contactService'
import Card from '../../components/ui/Card'
import Spinner from '../../components/ui/Spinner'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setLoading(true)
    
    const [projectsRes, blogsRes, messagesRes] = await Promise.all([
      projectService.getAllProjects(),
      blogService.getAllBlogs(),
      contactService.getAllMessages(),
    ])

    setStats({
      projects: projectsRes.data?.length || 0,
      blogs: blogsRes.data?.length || 0,
      messages: messagesRes.data?.filter(m => !m.is_read).length || 0,
    })

    setLoading(false)
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Blogs',
      value: stats.blogs,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Unread Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Views',
      value: '0',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover={false}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-4 ${stat.color} rounded-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover={false}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/projects"
              className="block p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Manage Projects
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add, edit, or delete projects
              </p>
            </a>
            <a
              href="/admin/blogs"
              className="block p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Manage Blogs
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create or edit blog posts
              </p>
            </a>
            <a
              href="/admin/messages"
              className="block p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                View Messages
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check contact form submissions
              </p>
            </a>
          </div>
        </Card>

        <Card hover={false}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No recent activity to display
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
