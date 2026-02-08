import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Moon, Sun, Lock, LogOut, LayoutDashboard } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, signOut } = useAuth()
  const scrollPosition = useScrollPosition()
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (path) => {
    if (path.includes('#')) {
      const [route, hash] = path.split('#')
      if (location.pathname === route || route === '/') {
        // Already on the page, just scroll
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        // Navigate to home first, then scroll
        navigate(route)
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }
    setIsOpen(false)
  }

  const handleLogout = async () => {
    const { success } = await signOut()
    if (success) {
      navigate('/')
      setIsOpen(false)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Education', path: '/#education' },
    { name: 'Certifications', path: '/#certifications' },
    { name: 'Achievements', path: '/#achievements' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash
    }
    return location.pathname === path
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 50
          ? 'glass-card shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">Srujan Reddy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.path.includes('#') ? (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium transition-colors ${
                    location.hash === `#${link.path.split('#')[1]}`
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            
            {/* Admin Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Admin Login</span>
              </Link>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-700"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card"
          >
              
              {/* Mobile Admin Section */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>Admin Login</span>
                </Link>
              )}
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                link.path.includes('#') ? (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.hash === `#${link.path.split('#')[1]}`
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
