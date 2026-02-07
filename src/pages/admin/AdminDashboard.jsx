import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, FileText, MessageSquare, Code, Briefcase, Award, Trophy, Target, Upload } from 'lucide-react'
import { projectService } from '../../services/projectService'
import { blogService } from '../../services/blogService'
import { contactService } from '../../services/contactService'
import { skillsService } from '../../services/skillsService'
import { experienceService } from '../../services/experienceService'
import { certificationsService } from '../../services/certificationsService'
import { achievementsService } from '../../services/achievementsService'
import Card from '../../components/ui/Card'
import Spinner from '../../components/ui/Spinner'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    skills: 0,
    experience: 0,
    certifications: 0,
    achievements: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setLoading(true)
    
    const [
      projectsRes,
      blogsRes,
      messagesRes,
      skillsRes,
      experienceRes,
      certificationsRes,
      achievementsRes
    ] = await Promise.all([
      projectService.getAllProjects(),
      blogService.getAllBlogs(),
      contactService.getAllMessages(),
      skillsService.getAllSkillsAdmin(),
      experienceService.getAllExperience(),
      certificationsService.getAllCertifications(),
      achievementsService.getAllAchievements(),
    ])

    setStats({
      projects: Array.isArray(projectsRes.data) ? projectsRes.data.length : 0,
      blogs: Array.isArray(blogsRes.data) ? blogsRes.data.length : 0,
      messages: Array.isArray(messagesRes.data) ? messagesRes.data.filter(m => !m.is_read).length : 0,
      skills: Array.isArray(skillsRes.data) ? skillsRes.data.length : 0,
      experience: Array.isArray(experienceRes.data) ? experienceRes.data.length : 0,
      certifications: Array.isArray(certificationsRes.data) ? certificationsRes.data.length : 0,
      achievements: Array.isArray(achievementsRes.data) ? achievementsRes.data.length : 0,
    })

    setLoading(false)
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'bg-blue-500',
      link: '/admin/projects',
    },
    {
      title: 'Total Blogs',
      value: stats.blogs,
      icon: FileText,
      color: 'bg-green-500',
      link: '/admin/blogs',
    },
    {
      title: 'Unread Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-yellow-500',
      link: '/admin/messages',
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: Code,
      color: 'bg-purple-500',
      link: '/admin/skills',
    },
    {
      title: 'Experience',
      value: stats.experience,
      icon: Briefcase,
      color: 'bg-indigo-500',
      link: '/admin/experience',
    },
    {
      title: 'Certifications',
      value: stats.certifications,
      icon: Award,
      color: 'bg-pink-500',
      link: '/admin/certifications',
    },
    {
      title: 'Achievements',
      value: stats.achievements,
      icon: Trophy,
      color: 'bg-orange-500',
      link: '/admin/achievements',
    },
    {
      title: 'Completion',
      value: `${Math.round((stats.projects + stats.blogs + stats.skills + stats.experience + stats.certifications + stats.achievements) / 6)}%`,
      icon: Target,
      color: 'bg-cyan-500',
      link: '/admin',
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
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Dashboard
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <a href={stat.link}>
              <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 border border-gray-200 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}></div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 sm:p-4 ${stat.color} rounded-xl sm:rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-purple-500 rounded-full mr-3"></div>
              Quick Actions
            </h2>
            <div className="space-y-3">
              <a
                href="/admin/projects"
                className="block p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:shadow-md transition-all duration-300 group border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Manage Projects
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Add, edit, or delete projects
                    </p>
                  </div>
                  <FolderKanban className="w-5 h-5 text-blue-500" />
                </div>
              </a>
              <a
                href="/admin/blogs"
                className="block p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl hover:shadow-md transition-all duration-300 group border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      Manage Blogs
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Create or edit blog posts
                    </p>
                  </div>
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
              </a>
              <a
                href="/admin/messages"
                className="block p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl hover:shadow-md transition-all duration-300 group border border-yellow-200 dark:border-yellow-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      View Messages
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Check contact form submissions
                    </p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                </div>
              </a>
              <a
                href="/admin/resume"
                className="block p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl hover:shadow-md transition-all duration-300 group border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Upload Resume
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Update your resume PDF
                    </p>
                  </div>
                  <Upload className="w-5 h-5 text-purple-500" />
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity / Portfolio Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-purple-500 rounded-full mr-3"></div>
              Portfolio Overview
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills Added</span>
                  <Code className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.skills}</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl border border-pink-200 dark:border-pink-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Experience</span>
                  <Briefcase className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.experience}</div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Certifications</span>
                  <Award className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.certifications}</div>
              </div>

              <div className="p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Achievements</span>
                  <Trophy className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.achievements}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
