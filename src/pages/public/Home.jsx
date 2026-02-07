import { memo } from 'react'
import SEO from '../../components/common/SEO'
import Hero from '../../components/sections/Hero'
import Skills from '../../components/sections/Skills'
import Projects from '../../components/sections/Projects'
import Experience from '../../components/sections/Experience'
import Education from '../../components/sections/Education'
import Certifications from '../../components/sections/Certifications'
import Achievements from '../../components/sections/Achievements'
import Contact from '../../components/sections/Contact'

// Memoized sections for performance
const MemoizedSkills = memo(Skills)
const MemoizedProjects = memo(Projects)
const MemoizedExperience = memo(Experience)
const MemoizedEducation = memo(Education)
const MemoizedCertifications = memo(Certifications)
const MemoizedAchievements = memo(Achievements)

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Full-stack developer specializing in React, Node.js, and modern web technologies. View my portfolio, projects, and get in touch."
        keywords={['web developer', 'portfolio', 'react', 'full-stack', 'software engineer']}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />
        <MemoizedSkills />
        <MemoizedExperience />
        <MemoizedProjects />
        <MemoizedEducation />
        <MemoizedCertifications />
        <MemoizedAchievements />
        <Contact />
      </div>
    </>
  )
}

export default Home
