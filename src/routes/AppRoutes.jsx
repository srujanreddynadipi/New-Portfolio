import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../components/layout/AdminLayout'
import Spinner from '../components/ui/Spinner'

// Public Pages - Eager loaded for better UX
import Home from '../pages/public/Home'
import Contact from '../pages/public/Contact'

// Blog Pages - Lazy loaded
const Blog = lazy(() => import('../pages/public/Blog'))
const BlogDetail = lazy(() => import('../pages/public/BlogDetail'))

// Admin Pages - Lazy loaded (not critical path)
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'))
const ManageProjects = lazy(() => import('../pages/admin/ManageProjects'))
const ManageBlogs = lazy(() => import('../pages/admin/ManageBlogs'))
const ManageSkills = lazy(() => import('../pages/admin/ManageSkills'))
const ManageExperience = lazy(() => import('../pages/admin/ManageExperience'))
const ManageCertifications = lazy(() => import('../pages/admin/ManageCertifications'))
const ManageAchievements = lazy(() => import('../pages/admin/ManageAchievements'))
const ViewMessages = lazy(() => import('../pages/admin/ViewMessages'))
const UploadResume = lazy(() => import('../pages/admin/UploadResume'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size="xl" />
  </div>
)

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="certifications" element={<ManageCertifications />} />
        <Route path="achievements" element={<ManageAchievements />} />
        <Route path="messages" element={<ViewMessages />} />
        <Route path="resume" element={<UploadResume />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  )
}

// Simple 404 component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 px-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
      >
        Go Home
      </a>
    </div>
  </div>
)

export default AppRoutes
