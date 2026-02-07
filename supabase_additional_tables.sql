-- ============================================
-- ADDITIONAL PORTFOLIO TABLES MIGRATION
-- Run this in your Supabase SQL Editor after the main migration
-- ============================================

-- ============================================
-- 1. PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  images TEXT[],
  tech TEXT[] NOT NULL,
  features TEXT[],
  github_url TEXT,
  live_url TEXT,
  category TEXT CHECK (category IN ('Full Stack', 'Frontend', 'Backend', 'AI/ML', 'Mobile', 'Other')),
  status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'In Progress', 'Planned', 'On Hold')),
  start_date TEXT,
  end_date TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active projects"
  ON projects FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_order ON projects(display_order);

-- ============================================
-- 2. BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT DEFAULT 'Srujan Reddy',
  category TEXT,
  tags TEXT[],
  read_time INTEGER, -- in minutes
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view published blogs"
  ON blogs FOR SELECT
  USING (is_published = true AND is_active = true);

CREATE POLICY "Authenticated users can manage blogs"
  ON blogs FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_blogs_active ON blogs(is_active);
CREATE INDEX idx_blogs_published ON blogs(is_published);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_published_at ON blogs(published_at DESC);

-- ============================================
-- 3. CONTACTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  is_read BOOLEAN DEFAULT false,
  is_replied BOOLEAN DEFAULT false,
  replied_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can create contact messages"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view and manage contacts"
  ON contacts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_contacts_read ON contacts(is_read);
CREATE INDEX idx_contacts_replied ON contacts(is_replied);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);

-- ============================================
-- 4. APPLY UPDATED_AT TRIGGERS
-- ============================================
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. STORAGE BUCKETS
-- ============================================
-- Create storage bucket for documents (resumes, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
CREATE POLICY "Public can view documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Create storage bucket for images (project images, blog images, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for images bucket
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- ============================================
-- 6. SEED DATA FOR PROJECTS
-- ============================================
INSERT INTO projects (title, slug, description, image, tech, features, github_url, live_url, category, status, start_date, end_date, is_featured, display_order) VALUES
('CrimeNet – Full-Stack Public Safety Platform', 'crimenet-public-safety-platform', 
'Production-ready crime reporting platform with role-based dashboards for Citizens, Police, and Admins. Features include real-time crime reporting, officer assignment workflows, JWT authentication, and comprehensive analytics.',
NULL,
ARRAY['React', 'Spring Boot', 'Firebase Auth', 'Firestore', 'Docker', 'CI/CD', 'Tailwind CSS', 'JWT'],
ARRAY['Built 30+ RESTful APIs for complete CRUD operations', 'Implemented Citizen, Police, and Admin dashboards with role-based access', 'JWT security and Firebase authentication integration', 'Responsive UI using React and Tailwind CSS', 'Officer assignment workflows with real-time updates', 'Analytics dashboard for crime statistics and trends', 'Dockerized application with CI/CD pipeline deployment'],
'https://github.com/srujanreddynadipi/crimenet',
NULL,
'Full Stack',
'Completed',
'2025',
'2025',
true,
1),

('EchoVerse – AI Audiobook Generator', 'echoverse-ai-audiobook-generator',
'AI-powered audiobook generation platform that converts PDF, Word documents, and text files into high-quality audio narration using IBM Watson Text-to-Speech and HuggingFace models.',
NULL,
ARRAY['React', 'Node.js', 'MySQL', 'IBM Watson TTS', 'HuggingFace', 'AI/ML'],
ARRAY['Convert PDF, Word, and Text files to audio format', 'Multi-voice narration support with different character voices', 'Automatic chapter segmentation and bookmarking', 'User-friendly interfaces for Admin, Student, and Elderly users', 'Admin analytics dashboard for usage statistics', 'Progress tracking and playback controls', 'Download and share generated audiobooks'],
'https://github.com/srujanreddynadipi/echoverse',
NULL,
'AI/ML',
'Completed',
'2024',
'2025',
true,
2),

('Kushi Interiors – Full-Stack Interior Design Website', 'kushi-interiors-website',
'Production-grade, full-stack interior design website with admin dashboard for my first freelancing client. Features modern responsive design, project gallery management, testimonial system, secure authentication, and comprehensive analytics.',
NULL,
ARRAY['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel', 'Framer Motion', 'Sentry', 'Google Analytics 4'],
ARRAY['Modern responsive website with admin dashboard', 'Project gallery & testimonial management system', 'Secure authentication & content management', 'Contact form with email integration', 'SEO optimized with sitemap, meta tags, and structured data', 'Real-time error tracking with Sentry integration', 'Google Analytics 4 for visitor behavior insights', '< 2s page load time with 90+ performance score', 'Enterprise-level security headers & HTTPS', 'WCAG accessibility compliant', 'PostgreSQL with Row Level Security (RLS)', 'Code splitting & lazy loading optimization', 'Automated CI/CD pipeline with Vercel', 'A+ security rating', '100% mobile responsive'],
NULL,
'https://lnkd.in/gyhMqrHZ',
'Full Stack',
'Completed',
'2025',
'2025',
true,
3);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check row counts
-- SELECT 'projects' as table_name, COUNT(*) as count FROM projects
-- UNION ALL
-- SELECT 'blogs', COUNT(*) FROM blogs
-- UNION ALL
-- SELECT 'contacts', COUNT(*) FROM contacts;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
-- Additional tables migration completed successfully!
-- Next steps:
-- 1. Verify tables in Supabase dashboard
-- 2. Test contact form submission
-- 3. Test blog and project CRUD operations
-- 4. Upload a test resume to verify storage
-- 5. Create some blog posts via admin dashboard
