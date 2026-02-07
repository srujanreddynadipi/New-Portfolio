# Admin Login Setup

## ✅ Admin Login Button Added!

You now have an admin login button in your navbar:
- **When logged out**: Shows "Admin Login" button (🔒 icon)
- **When logged in**: Shows "Dashboard" button + logout icon (🔴 icon)
- Available in both desktop and mobile views

## 🔑 Create Your Admin User

Follow these steps to create an admin user in Supabase:

### Method 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project: `Portfolio`

2. **Navigate to Authentication**
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab

3. **Add a New User**
   - Click "Add user" button
   - Select "Create new user"
   - Fill in your details:
     - **Email**: Your admin email (e.g., `admin@example.com`)
     - **Password**: Your secure password (min 6 characters)
     - **Auto Confirm User**: ✅ Enable this (important!)
   - Click "Create user"

4. **Done!** You can now login with these credentials.

### Method 2: Using SQL Editor

Alternatively, run this in your Supabase SQL Editor:

```sql
-- Insert an admin user via auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com', -- Change this to your email
  crypt('YourSecurePassword123', gen_salt('bf')), -- Change this password
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  false,
  ''
);
```

**Note**: Make sure to replace `admin@example.com` and `YourSecurePassword123` with your actual credentials.

## 🚀 How to Login

1. **Click "Admin Login"** button in the navbar
2. **Enter your credentials**:
   - Email: The email you created above
   - Password: The password you set
3. **Click "Sign In"**
4. **You'll be redirected** to the Admin Dashboard automatically

## 📍 Admin Routes

Once logged in, you'll have access to:
- `/admin` - Admin Dashboard (overview)
- `/admin/projects` - Manage Projects
- `/admin/blogs` - Manage Blog Posts
- `/admin/messages` - View Contact Messages
- `/admin/resume` - Upload Resume

## 🔒 Security Features

- ✅ Protected routes (redirects to login if not authenticated)
- ✅ Session persistence (stays logged in on refresh)
- ✅ Secure logout functionality
- ✅ Supabase Row Level Security enabled

## ⚠️ Important Security Notes

1. **Use a strong password** for your admin account
2. **Never commit** your `.env` file with real credentials
3. **Keep your Supabase keys secure**
4. Consider enabling **2FA** in your Supabase project settings

## 🐛 Troubleshooting

### "Invalid login credentials"
- Check your email and password are correct
- Make sure the user is **confirmed** (email_confirmed_at is set)

### "Cannot find auth.users table"
- This is normal - Supabase auth tables are managed separately
- Use the Dashboard method instead

### Redirects immediately after login
- Clear your browser cache
- Check browser console for errors

## 📚 Next Steps

After logging in as admin, you can:
1. Create admin pages for managing Skills, Experience, Certifications, and Achievements
2. Test the existing Blog and Project management features
3. View messages from the Contact form
4. Upload your resume

---

**Need help?** Check the Supabase documentation: https://supabase.com/docs/guides/auth
