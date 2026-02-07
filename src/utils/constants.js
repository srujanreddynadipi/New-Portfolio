/**
 * Constants and Configuration
 */

// App metadata
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Portfolio',
  url: import.meta.env.VITE_APP_URL || 'https://yourportfolio.com',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Full-stack developer portfolio',
  author: 'Your Name',
  email: 'contact@example.com',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
}

// API Configuration
export const API_CONFIG = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  timeout: 30000, // 30 seconds
}

// Storage buckets
export const STORAGE_BUCKETS = {
  images: 'images',
  documents: 'documents',
  avatars: 'avatars',
}

// File upload constraints
export const FILE_CONSTRAINTS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  allowedDocTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
}

// Pagination
export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
}

// Animation durations (ms)
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
}

// Breakpoints (must match Tailwind config)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Form validation constraints
export const VALIDATION = {
  name: { min: 2, max: 100 },
  email: { max: 255 },
  subject: { min: 3, max: 200 },
  message: { min: 10, max: 2000 },
  password: { min: 8, max: 128 },
  url: { max: 2048 },
}

// Rate limiting
export const RATE_LIMITS = {
  contactForm: { max: 3, windowMs: 300000 }, // 3 submissions per 5 minutes
  login: { max: 5, windowMs: 900000 }, // 5 attempts per 15 minutes
}

// Cache keys
export const CACHE_KEYS = {
  theme: 'portfolio_theme',
  auth: 'portfolio_auth',
  user: 'portfolio_user',
}

// Error messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  rateLimited: 'Too many requests. Please try again later.',
}

// Success messages
export const SUCCESS_MESSAGES = {
  contactFormSubmitted: 'Message sent successfully! I\'ll get back to you soon.',
  dataUpdated: 'Data updated successfully.',
  dataDeleted: 'Data deleted successfully.',
  uploadComplete: 'Upload completed successfully.',
}

// Routes
export const ROUTES = {
  home: '/',
  blog: '/blog',
  contact: '/contact',
  admin: {
    login: '/admin/login',
    dashboard: '/admin',
    projects: '/admin/projects',
    blogs: '/admin/blogs',
    skills: '/admin/skills',
    experience: '/admin/experience',
    certifications: '/admin/certifications',
    achievements: '/admin/achievements',
    messages: '/admin/messages',
    resume: '/admin/resume',
  },
}

// SEO defaults
export const SEO_DEFAULTS = {
  titleTemplate: '%s | Portfolio',
  defaultTitle: 'Portfolio | Full Stack Developer',
  description: 'Full-stack developer portfolio showcasing modern web applications',
  keywords: ['web developer', 'portfolio', 'react', 'full-stack'],
  ogImage: '/og-image.jpg',
}
