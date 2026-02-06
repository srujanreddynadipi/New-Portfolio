# Supabase Setup Guide

Complete guide to set up Supabase backend for your portfolio.

## 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: Portfolio
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your location
5. Wait for project to be provisioned (~2 minutes)

## 2. Get API Credentials

1. Go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL** → This is your `VITE_SUPABASE_URL`
   - **anon/public key** → This is your `VITE_SUPABASE_ANON_KEY`
4. Add them to your `.env` file

## 3. Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run these queries:

### Projects Table

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  tech TEXT[],
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read projects
CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Blogs Table

```sql
-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  tags TEXT[],
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read blogs
CREATE POLICY "Public blogs are viewable by everyone"
  ON blogs FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert blogs"
  ON blogs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Contacts Table

```sql
-- Create contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit contact form)
CREATE POLICY "Anyone can insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can read
CREATE POLICY "Authenticated users can read contacts"
  ON contacts FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  USING (auth.role() = 'authenticated');
```

## 4. Create Storage Buckets

### 4.1 Images Bucket (for project and blog images)

1. Go to **Storage** in sidebar
2. Click **New Bucket**
3. Fill in:
   - **Name**: `images`
   - **Public**: ✓ (checked)
4. Click **Create Bucket**

### 4.2 Documents Bucket (for resume PDFs)

1. Click **New Bucket** again
2. Fill in:
   - **Name**: `documents`
   - **Public**: ✓ (checked)
3. Click **Create Bucket**

### 4.3 Set Storage Policies

For each bucket, add these policies:

**For `images` bucket:**
```sql
-- Policy: Anyone can view images
CREATE POLICY "Public images are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- Policy: Authenticated users can upload
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Policy: Authenticated users can delete
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

**For `documents` bucket:**
```sql
-- Policy: Anyone can view documents
CREATE POLICY "Public documents are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents');

-- Policy: Authenticated users can upload
CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Policy: Authenticated users can delete
CREATE POLICY "Authenticated users can delete documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
```

## 5. Setup Authentication

### 5.1 Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. **Email** should be enabled by default
3. Optionally configure email templates in **Authentication** → **Email Templates**

### 5.2 Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Fill in:
   - **Email**: admin@example.com (or your email)
   - **Password**: Choose a strong password
   - **Auto Confirm User**: ✓ (checked)
4. Click **Create User**

### 5.3 Disable Sign-ups (Optional but Recommended)

Since this is a personal portfolio, you probably don't want public registrations:

1. Go to **Authentication** → **Policies**
2. Go to **Authentication** → **Settings**
3. Find **User Signups** section
4. Uncheck **Enable email signups**
5. Click **Save**

## 6. Add Sample Data (Optional)

### Sample Project

```sql
INSERT INTO projects (title, description, image, tech, github_url, live_url)
VALUES (
  'E-Commerce Platform',
  'A full-stack e-commerce platform with payment integration, user authentication, and admin dashboard.',
  'https://via.placeholder.com/400x300',
  ARRAY['Java', 'Spring Boot', 'React', 'PostgreSQL'],
  'https://github.com/yourusername/ecommerce',
  'https://ecommerce-demo.com'
);
```

### Sample Blog Post

```sql
INSERT INTO blogs (title, slug, content, excerpt, image, tags, read_time)
VALUES (
  'Getting Started with Spring Boot',
  'getting-started-with-spring-boot',
  '<h2>Introduction</h2><p>Spring Boot makes it easy to create stand-alone, production-grade Spring applications...</p>',
  'Learn the basics of Spring Boot and how to create your first application.',
  'https://via.placeholder.com/800x400',
  ARRAY['Java', 'Spring Boot', 'Backend'],
  8
);
```

## 7. Test the Connection

1. Make sure your `.env` file has the correct credentials
2. Start your dev server: `npm run dev`
3. Try accessing public pages (should work without login)
4. Try logging in at `/admin/login`
5. Test CRUD operations in admin panel

## 8. Security Best Practices

### ✅ Do:
- Keep your `service_role` key secret (never expose it in frontend)
- Use Row Level Security (RLS) policies
- Validate user input
- Use HTTPS in production
- Regularly update dependencies

### ❌ Don't:
- Expose service role key in frontend code
- Disable RLS policies
- Store passwords in plain text
- Allow unrestricted public access to admin operations

## 9. Troubleshooting

### Issue: "Invalid API key"
- Double-check your `.env` file
- Make sure you're using the `anon/public` key, not `service_role`
- Restart your dev server after changing `.env`

### Issue: "Row Level Security policy violation"
- Check if you're logged in for admin operations
- Verify RLS policies are correctly set up
- Check if your user is authenticated

### Issue: "Failed to upload file"
- Check if storage buckets exist
- Verify storage policies are set correctly
- Make sure bucket is set to public

### Issue: "Cannot read properties"
- Check if tables are created correctly
- Verify column names match your code
- Check browser console for detailed errors

## 10. Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Auth Guide](https://supabase.com/docs/guides/auth)

---

## Quick Reference

### Environment Variables
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Tables Created
- ✅ projects
- ✅ blogs
- ✅ contacts

### Storage Buckets Created
- ✅ images (public)
- ✅ documents (public)

### Admin User Created
- ✅ Email: admin@example.com
- ✅ Password: (your secure password)

---

**Need Help?** Check the [troubleshooting section](#9-troubleshooting) or open an issue!
