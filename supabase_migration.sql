-- ============================================
-- PORTFOLIO DATABASE MIGRATION
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. SKILLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER CHECK (level >= 0 AND level <= 100),
  category TEXT NOT NULL CHECK (category IN ('programming', 'frameworks', 'databases', 'tools', 'concepts')),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active skills"
  ON skills FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_active ON skills(is_active);
CREATE INDEX idx_skills_order ON skills(display_order);

-- ============================================
-- 2. EXPERIENCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('Internship', 'Training', 'Full-time', 'Freelance', 'Part-time')),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  duration TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  current BOOLEAN DEFAULT false,
  description TEXT,
  responsibilities TEXT[],
  technologies TEXT[],
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active experience"
  ON experience FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage experience"
  ON experience FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_experience_active ON experience(is_active);
CREATE INDEX idx_experience_order ON experience(display_order);
CREATE INDEX idx_experience_current ON experience(current);

-- ============================================
-- 3. CERTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  credential_id TEXT,
  credential_url TEXT,
  description TEXT,
  skills TEXT[],
  image TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active certifications"
  ON certifications FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage certifications"
  ON certifications FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_certifications_active ON certifications(is_active);
CREATE INDEX idx_certifications_order ON certifications(display_order);

-- ============================================
-- 4. ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Hackathon', 'Certification', 'Award', 'Competition', 'Publication', 'Other')),
  icon TEXT DEFAULT 'trophy',
  image TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active achievements"
  ON achievements FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage achievements"
  ON achievements FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_achievements_active ON achievements(is_active);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_order ON achievements(display_order);

-- ============================================
-- 5. UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. SEED DATA (OPTIONAL - Your Current Data)
-- ============================================

-- Insert Skills from your static data
INSERT INTO skills (name, level, category, display_order) VALUES
-- Programming Languages
('Java', 90, 'programming', 1),
('JavaScript', 75, 'programming', 2),
('TypeScript', 80, 'programming', 3),
('HTML', 90, 'programming', 4),
('CSS', 85, 'programming', 5),

-- Frameworks
('Spring Boot', 85, 'frameworks', 1),
('React', 80, 'frameworks', 2),
('Tailwind CSS', 85, 'frameworks', 3),

-- Databases
('MySQL', 85, 'databases', 1),
('PostgreSQL', 80, 'databases', 2),
('SQL', 85, 'databases', 3),
('Firestore', 70, 'databases', 4),
('Supabase', 80, 'databases', 5),

-- Tools
('Git', 85, 'tools', 1),
('GitHub', 90, 'tools', 2),
('Postman', 85, 'tools', 3),
('MySQL Workbench', 80, 'tools', 4),
('JDBC', 80, 'tools', 5),
('Jenkins', 70, 'tools', 6),
('Docker', 75, 'tools', 7),
('Kubernetes', 65, 'tools', 8),
('Vercel', 85, 'tools', 9),
('Sentry', 75, 'tools', 10),

-- Concepts
('DBMS', 85, 'concepts', 1),
('Operating Systems', 80, 'concepts', 2),
('Software Engineering', 85, 'concepts', 3),
('Computer Networking', 75, 'concepts', 4),
('Data Structures & Algorithms', 85, 'concepts', 5),
('OOP', 90, 'concepts', 6),
('RESTful APIs', 90, 'concepts', 7);

-- Insert Experience
INSERT INTO experience (type, role, company, location, duration, start_date, end_date, current, description, responsibilities, technologies, display_order) VALUES
('Internship', 'React & Node.js Developer Intern', 'Blue Planer Info Solutions Pvt. Ltd.', 'Remote', 'Mar 2025 – Sep 2025', 'Mar 2025', 'Sep 2025', false, 
'Worked on full-stack development projects using React and Node.js, implementing secure REST APIs and role-based access control systems.',
ARRAY['Developed full-stack modules for enterprise applications', 'Built secure REST APIs with JWT authentication', 'Implemented Role-Based Access Control (RBAC) for user management', 'Collaborated with team using Git and Bitbucket for version control', 'Participated in code reviews and agile development practices'],
ARRAY['React', 'Node.js', 'JWT', 'Git', 'Bitbucket', 'REST APIs', 'RBAC'],
1),
('Training', 'Java & Spring Boot Training', 'TNSIF Foundation', 'Online', 'Sep 2024 – Oct 2024', 'Sep 2024', 'Oct 2024', false,
'Intensive training program focused on Java backend development and Spring Boot framework with real-world project implementation.',
ARRAY['Built certificate verification system with Spring Boot', 'Developed college placement management system', 'Created 25+ REST APIs for various modules', 'Implemented database operations using MySQL and JDBC', 'Learned Spring Boot best practices and design patterns'],
ARRAY['Java', 'Spring Boot', 'MySQL', 'JDBC', 'REST APIs', 'Maven'],
2);

-- Insert Certifications
INSERT INTO certifications (title, issuer, date, description, skills, display_order) VALUES
('MERN Stack Developer Certification', 'EY-GDS Edunet Foundation', '2024', 
'Comprehensive certification covering MongoDB, Express.js, React, and Node.js full-stack development.',
ARRAY['MongoDB', 'Express.js', 'React', 'Node.js', 'Full Stack Development'],
1),
('Oracle SQL / PLSQL', 'Oracle', 'Ongoing', 
'Currently pursuing certification in Oracle Database SQL and PL/SQL programming.',
ARRAY['SQL', 'PL/SQL', 'Oracle Database', 'Database Programming'],
2),
('Snowflake', 'Snowflake', 'Upskilling', 
'Ongoing upskilling in Snowflake cloud data platform and data warehousing concepts.',
ARRAY['Snowflake', 'Data Warehousing', 'Cloud Data Platform'],
3);

-- Insert Achievements
INSERT INTO achievements (title, date, description, category, icon, display_order) VALUES
('Runner-up – Cognitive-X Smart Intenz Hackathon 2025', '2025', 
'Secured second position in the Cognitive-X Smart Intenz Hackathon, presenting innovative solutions in AI and software development.',
'Hackathon', 'trophy', 1),
('Selected for Smart India Hackathon 2025', '2025', 
'Selected to represent at the national-level Smart India Hackathon, one of India''s biggest coding competitions.',
'Hackathon', 'award', 2),
('MERN Stack Developer Certification – EY-GDS', '2024', 
'Successfully completed comprehensive MERN Stack Developer certification from EY-GDS Edunet Foundation.',
'Certification', 'certificate', 3);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check row counts
-- SELECT 'skills' as table_name, COUNT(*) as count FROM skills
-- UNION ALL
-- SELECT 'experience', COUNT(*) FROM experience
-- UNION ALL
-- SELECT 'certifications', COUNT(*) FROM certifications
-- UNION ALL
-- SELECT 'achievements', COUNT(*) FROM achievements;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
-- Migration completed successfully!
-- Next steps:
-- 1. Verify data in Supabase dashboard
-- 2. Test public read access
-- 3. Test admin CRUD operations
-- 4. Update frontend services
