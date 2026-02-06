import Hero from '../../components/sections/Hero'
import Skills from '../../components/sections/Skills'
import Projects from '../../components/sections/Projects'
import Experience from '../../components/sections/Experience'
import Education from '../../components/sections/Education'
import Certifications from '../../components/sections/Certifications'
import Achievements from '../../components/sections/Achievements'
import Contact from '../../components/sections/Contact'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
    </div>
  )
}

export default Home
