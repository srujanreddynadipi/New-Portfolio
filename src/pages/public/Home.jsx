import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import Hero from '../../components/sections/Hero'

// Lazy load heavy sections for better initial load performance
const Skills = lazy(() => import('../../components/sections/Skills'))
const Projects = lazy(() => import('../../components/sections/Projects'))
const Experience = lazy(() => import('../../components/sections/Experience'))
const Education = lazy(() => import('../../components/sections/Education'))
const Certifications = lazy(() => import('../../components/sections/Certifications'))
const Achievements = lazy(() => import('../../components/sections/Achievements'))
const Contact = lazy(() => import('../../components/sections/Contact'))

// Lightweight loading placeholder
const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
)

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Full-stack developer specializing in React, Node.js, and modern web technologies. View my portfolio, projects, and get in touch."
        keywords={['web developer', 'portfolio', 'react', 'full-stack', 'software engineer']}
      />
      <div className="min-h-screen">
        {/* Hero Section - Eager loaded (above the fold) */}
        <Hero />
        
        {/* Below-the-fold sections - Lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>
    </>
  )
}

export default Home
