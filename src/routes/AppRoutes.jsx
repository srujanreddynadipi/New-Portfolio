import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../components/layout/AdminLayout'

// Public Pages
import Home from '../pages/public/Home'
import Blog from '../pages/public/Blog'
import BlogDetail from '../pages/public/BlogDetail'
import Contact from '../pages/public/Contact'

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageProjects from '../pages/admin/ManageProjects'
import ManageBlogs from '../pages/admin/ManageBlogs'
import ViewMessages from '../pages/admin/ViewMessages'
import UploadResume from '../pages/admin/UploadResume'

const AppRoutes = () => {
  return (
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
        <Route path="messages" element={<ViewMessages />} />
        <Route path="resume" element={<UploadResume />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

// Simple 404 component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page Not Found</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  </div>
)

export default AppRoutes
