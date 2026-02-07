# Portfolio Documentation

A modern, accessible, and performant full-stack developer portfolio built with React, Vite, and Supabase.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Dark Mode**: Automatic theme detection and manual toggle
- **Admin Dashboard**: Content management for projects, blogs, skills, experience, certifications, and achievements
- **Blog System**: Dynamic blog with rich content support
- **Contact Form**: Secure form with rate limiting and validation
- **Resume Management**: Upload and manage resume files

### Production-Ready Enhancements
- **Error Handling**: Global error boundary with dev/prod modes
- **Security**: XSS prevention, rate limiting, input sanitization
- **Performance**: Code splitting, lazy loading, memoization, optimized builds
- **SEO**: Dynamic meta tags, OpenGraph, Twitter cards, robots.txt
- **Accessibility**: WCAG 2.1 compliant, keyboard navigation, screen reader support
- **Validation**: Client-side form validation with real-time feedback
- **Monitoring**: Centralized logging system

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router v6**: Client-side routing with code splitting
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first styling with custom theme
- **Lucide React**: Beautiful icons
- **react-helmet-async**: SEO meta tag management

### Backend & Services
- **Supabase**: Backend-as-a-Service (authentication, database, storage)
- **PostgreSQL**: Relational database through Supabase

### Build & Development
- **Vite**: Lightning-fast build tool with HMR
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Terser**: Production minification and optimization

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Update with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_NAME=Portfolio
   VITE_ADMIN_EMAIL=your_admin_email
   ```

4. **Database Setup**
   
   See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete database schema and setup instructions.

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
portfolio/
├── public/
│   ├── robots.txt           # SEO crawler instructions
│   └── vite.svg            # Favicon
├── src/
│   ├── assets/             # Static assets
│   ├── components/
│   │   ├── common/         # Reusable components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── SEO.jsx
│   │   ├── layout/         # Layout components
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SkipLink.jsx
│   │   ├── sections/       # Page sections
│   │   └── ui/            # UI components (Button, Input, Modal, etc.)
│   ├── context/           # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── data/              # Static data and images
│   ├── hooks/             # Custom React hooks
│   ├── pages/
│   │   ├── admin/         # Admin dashboard pages
│   │   └── public/        # Public-facing pages
│   ├── routes/            # Route configuration
│   ├── services/          # API services
│   │   ├── authService.js
│   │   ├── blogService.js
│   │   ├── contactService.js
│   │   ├── dbService.js
│   │   └── supabaseClient.js
│   ├── utils/             # Utility functions
│   │   ├── accessibility.js
│   │   ├── constants.js
│   │   ├── logger.js
│   │   ├── performance.js
│   │   ├── security.js
│   │   └── validation.js
│   ├── App.jsx
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env.example          # Environment template
├── .prettierrc           # Prettier config
├── eslint.config.js      # ESLint config
├── package.json
├── tailwind.config.js    # Tailwind config
├── vercel.json           # Deployment config
└── vite.config.js        # Vite config
```

## 🔒 Security Features

### Input Sanitization
- HTML entity encoding to prevent XSS attacks
- URL and email validation
- Input length constraints
- Required field validation

### Rate Limiting
- Contact form: 3 submissions per 5 minutes
- Login attempts: 5 attempts per 15 minutes
- Client-side rate limiting with Map-based storage

### Security Headers (vercel.json)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## ⚡ Performance Optimizations

### Code Splitting
- React.lazy for admin pages and blog routes
- Manual chunk splitting (react-vendor, supabase, animation, ui-icons)
- Suspense with loading fallback

### Build Optimizations
- Terser minification with console.log removal in production
- Asset naming strategy for optimal caching
- Tree shaking and dead code elimination
- Source maps disabled in production

### Runtime Optimizations
- React.memo for expensive components
- Debounced form validation (300ms)
- Intersection Observer for lazy loading
- Optimistic UI updates

## ♿ Accessibility

### WCAG 2.1 Compliance
- Semantic HTML elements
- ARIA attributes where needed
- Focus trap for modals
- Keyboard navigation support
- Skip to main content link
- Color contrast ratios meet AA standards

### Screen Reader Support
- Descriptive alt text for images
- aria-label for icon buttons
- aria-live announcements
- Proper heading hierarchy

## 🎨 Styling

### Theme System
- Light and dark modes
- Persistent theme preference
- Smooth transitions
- Custom color palette
- Responsive breakpoints

### CSS Architecture
- Tailwind CSS utility classes
- Custom component classes
- Glass morphism effects
- Animated gradients

## 📈 SEO

### Meta Tags
- Dynamic title and description
- OpenGraph tags for social sharing
- Twitter card support
- Canonical URLs
- Robots meta directives

### Optimization
- robots.txt for crawler instructions
- Semantic HTML structure
- Fast page load times
- Mobile-friendly design

## 🧪 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
```

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to link project
4. Set environment variables in Vercel dashboard
5. Deploy: `vercel --prod`

### Environment Variables
Ensure all variables from `.env.example` are set in your deployment platform.

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow Prettier formatting rules
- Use ESLint recommended rules
- Write meaningful commit messages

### Component Guidelines
- Keep components focused and small
- Use TypeScript-style JSDoc comments
- Export named exports for components
- Use default exports for pages

### Performance
- Memoize expensive calculations
- Use React.memo for pure components
- Implement code splitting for large features
- Optimize images before upload

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run linting: `npm run lint`
5. Format code: `npm run format`
6. Commit changes: `git commit -m 'Add new feature'`
7. Push to branch: `git push origin feature/new-feature`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind Labs for Tailwind CSS
- Supabase for backend services
- Framer for Motion animation library
- Lucide for beautiful icons

## 📧 Contact

For questions or support, please use the contact form on the website or reach out via email.

---

**Built with ❤️ using React, Vite, and Supabase**
