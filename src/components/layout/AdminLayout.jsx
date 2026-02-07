import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  MessageSquare, 
  Upload,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Code,
  Briefcase,
  Award,
  Trophy
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
    { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
    { icon: Code, label: 'Skills', path: '/admin/skills' },
    { icon: Briefcase, label: 'Experience', path: '/admin/experience' },
    { icon: Award, label: 'Certifications', path: '/admin/certifications' },
    { icon: Trophy, label: 'Achievements', path: '/admin/achievements' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Upload, label: 'Resume', path: '/admin/resume' },
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-dark-800 shadow-2xl z-50 overflow-y-auto border-r border-gray-200 dark:border-dark-700"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Panel
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Portfolio Management</p>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-1.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                    className={`group flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive(item.path) ? '' : 'group-hover:scale-110 transition-transform'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700 space-y-3">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 w-full transition-all"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-5 h-5" />
                      <span className="font-medium">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5" />
                      <span className="font-medium">Light Mode</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors touch-manipulation"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700"
              >
                <span className="hidden sm:inline">View Site</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
