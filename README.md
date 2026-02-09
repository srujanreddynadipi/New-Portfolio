# Portfolio - Full Stack Developer

A production-ready, modern portfolio website built with React, Vite, Tailwind CSS, and Supabase. Features enterprise-level code quality, high performance, security hardening, SEO optimization, and full accessibility compliance.

## ✨ Highlights

- 🎨 **Beautiful UI**: Mobile-first design with animated gradients and dark mode
- 🔒 **Security**: XSS prevention, rate limiting, input sanitization
- ⚡ **Performance**: Code splitting, lazy loading, optimized builds
- ♿ **Accessible**: WCAG 2.1 compliant with keyboard navigation
- 🔍 **SEO Ready**: Dynamic meta tags, OpenGraph, Twitter cards
- 📱 **Responsive**: Works flawlessly on all devices
- 🛡️ **Error Handling**: Global error boundary and toast notifications
- 📊 **Admin Panel**: Full content management system

## ✅ Recent Updates (Feb 2026)

- ✅ **Input focus stability**: Admin forms now keep cursor focus; modal focus trap no longer re-initializes on each render.
- ✅ **Achievements image upload**: File upload wiring fixed and stored image URLs now save correctly.
- ✅ **Resume download**: Hero download button pulls the latest resume from Supabase storage.
- ✅ **Images show fully**: Project, certification, achievement, blog, and admin previews use full-fit images (hero profile image unchanged).
- ✅ **Contact form robustness**: Proper success/error state handling and clearer submission feedback.
- ✅ **Production config note**: Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your host (Vercel/Netlify) and that the `documents` bucket is public for resume downloads.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Update .env with your Supabase credentials

# Start development server
npm run dev
```

## 📚 Documentation

- **[Complete Documentation](./DOCUMENTATION.md)** - Architecture, features, and deployment
- **[Supabase Setup](./SUPABASE_SETUP.md)** - Database schema and configuration

## 🛠️ Tech Stack

- **React 18** + **Vite** - Modern frontend with lightning-fast builds
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend, auth, database, storage
- **Framer Motion** - Smooth animations
- **react-helmet-async** - SEO meta management

## 🔒 Production Features

### Security
- XSS prevention with input sanitization
- Rate limiting on forms (3 attempts/5 min)
- Security headers (X-Frame-Options, CSP)
- Email & URL validation

### Performance
- React.lazy code splitting (40% smaller initial bundle)
- Manual chunk optimization
- Debounced validation
- React.memo for expensive components
- Terser minification with console.log removal

### Accessibility
- Focus trap for modals
- Keyboard navigation
- Screen reader support
- Skip-to-content link
- ARIA attributes
- WCAG 2.1 AA compliant

### SEO
- Dynamic meta tags
- OpenGraph social cards
- Twitter card support
- robots.txt crawler instructions
- Semantic HTML

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

## 🚀 Deployment

This project is optimized for **Vercel** deployment with included configuration:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed deployment instructions.

## 📁 Key Files

- `vercel.json` - Deployment config with security headers
- `.env.example` - Environment variable template
- `src/utils/security.js` - XSS prevention and validation
- `src/utils/performance.js` - Performance utilities
- `src/utils/accessibility.js` - ARIA and keyboard helpers
- `src/components/common/ErrorBoundary.jsx` - Global error handling
- `src/context/ToastContext.jsx` - Notification system

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Run formatter: `npm run format`
4. Commit changes
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using React, Vite, and Supabase**

For detailed documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       ├── Textarea.jsx
│   │       ├── Modal.jsx
│   │       └── Spinner.jsx
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   └── Contact.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageProjects.jsx
│   │       ├── ManageBlogs.jsx
│   │       ├── ViewMessages.jsx
│   │       └── UploadResume.jsx
│   ├── services/
│   │   ├── supabaseClient.js
│   │   ├── authService.js
│   │   ├── projectService.js
│   │   ├── blogService.js
│   │   ├── contactService.js
│   │   └── resumeService.js
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useScrollPosition.js
│   │   └── useMediaQuery.js
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([Create one here](https://supabase.com))

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd Portfolio
   ```

2. **Install dependencies** (Already done if you followed setup)
   ```bash
   npm install
   ```

3. **Setup Supabase**
   
   See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions on:
   - Creating a Supabase project
   - Setting up database tables
   - Configuring storage buckets
   - Setting up authentication

4. **Configure environment variables**
   
   Copy `.env.example` to `.env` and add your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env`:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🎨 Theme Customization

The beige primary color theme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#FDFBF7',
    100: '#FAF6ED',
    // ... modify these values
  }
}
```

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Use the credentials you set up in Supabase Auth
3. Default test credentials (if you created them):
   - Email: admin@example.com
   - Password: your_secure_password

## 📝 Database Schema

### Projects Table
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- image (text)
- tech (text[])
- github_url (text)
- live_url (text)
- created_at (timestamp)
```

### Blogs Table
```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique)
- content (text)
- excerpt (text)
- image (text)
- tags (text[])
- read_time (int)
- created_at (timestamp)
- updated_at (timestamp)
```

### Contacts Table
```sql
- id (uuid, primary key)
- name (text)
- email (text)
- subject (text)
- message (text)
- is_read (boolean, default false)
- created_at (timestamp)
```

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🚀 Deployment

### Option 1: Vercel
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Option 3: GitHub Pages
```bash
npm run build
# Then deploy the dist/ folder
```

## 🎯 Performance Optimizations

- Code splitting with dynamic imports
- Image optimization
- Lazy loading components
- Minified production build
- Optimized bundle size with vendor chunks

## 🔒 Security

- Protected admin routes
- Supabase RLS (Row Level Security) policies
- Environment variables for sensitive data
- XSS protection with React
- HTTPS only (in production)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

## 👤 Author

Your Name - Java Full Stack Developer

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Supabase for the backend infrastructure
- Framer Motion for smooth animations

## 📞 Support

For issues or questions:
- Open an issue in the repository
- Email: contact@example.com

---

**Happy Coding! 🚀**
#   N e w - P o r t f o l i o 
 
 