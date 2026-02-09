import { useEffect, useState, useCallback, useMemo, memo } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, Code2, Sparkles } from 'lucide-react'
import { portfolioData } from '../../data/data'
import { resumeService } from '../../services/resumeService'
import OptimizedImage from '../ui/OptimizedImage'

const Hero = memo(() => {
  const { hero, about, metadata } = portfolioData
  const [resumeUrl, setResumeUrl] = useState(metadata.resumeUrl || null)

  useEffect(() => {
    let isMounted = true

    const fetchResume = async () => {
      const { data } = await resumeService.getLatestResume()
      if (isMounted && data) {
        setResumeUrl(data)
      }
    }

    fetchResume()

    return () => {
      isMounted = false
    }
  }, [metadata.resumeUrl])

  const handleDownloadResume = useCallback(() => {
    const resolvedUrl = resumeUrl || metadata.resumeUrl
    if (resolvedUrl) {
      window.open(resolvedUrl, '_blank')
    } else {
      alert('Resume will be available soon!')
    }
  }, [resumeUrl, metadata.resumeUrl])

  const handleContactClick = useCallback(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Memoize animation variants - simpler and more performant
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }), [])

  const textVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }), [])

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 pb-32 px-4 overflow-visible z-50">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Greeting */}
            <motion.div variants={textVariants} className="space-y-4">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Code2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <span className="text-lg font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                  {hero.greeting}
                </span>
                <Sparkles className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              </div>

              {/* Name with Gradient */}
              <motion.h1 
                variants={textVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-400 dark:via-primary-300 dark:to-primary-500 bg-clip-text text-transparent">
                  {hero.name}
                </span>
              </motion.h1>

              {/* Role Badge */}
              <motion.div
                variants={textVariants}
                className="inline-block"
              >
                <div className="glass-card px-6 py-3 inline-block">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    {hero.role}
                  </h2>
                </div>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={textVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {hero.description}
            </motion.p>

            {/* Stats - Enhanced with Hover */}
            <motion.div
              variants={textVariants}
              className="flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              {[
                { value: about.yearsOfExperience, label: 'Years Experience', icon: '⏱️' },
                { value: about.projectsCompleted, label: 'Projects Completed', icon: '🚀' },
                { value: about.technologiesWorked, label: 'Technologies', icon: '⚡' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center lg:text-left group cursor-default"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 + idx }}
                      className="text-2xl"
                    >
                      {stat.icon}
                    </motion.span>
                    <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                      {stat.value}+
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={handleDownloadResume}
                className="btn-primary flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={handleContactClick}
                className="px-8 py-4 rounded-lg border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Right Side - Profile Image - Simplified */}
          <motion.div
            variants={textVariants}
            className="relative flex items-center justify-center z-40 py-8"
          >
            {/* Single Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 dark:from-primary-600 dark:via-primary-700 dark:to-primary-800 rounded-full blur-3xl opacity-40"></div>
            </div>

            {/* Profile Circle */}
            <div className="relative z-50">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full glass-card p-4 shadow-2xl relative overflow-hidden z-50">
                {/* Simple Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 dark:from-primary-500 dark:via-primary-700 dark:to-primary-500" style={{ padding: '4px' }}>
                  <div className="w-full h-full rounded-full bg-white dark:bg-dark-800" />
                </div>

                {/* Image Container */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-700 dark:to-primary-900 z-20">
                  {metadata.profileImage ? (
                    <OptimizedImage
                      src={metadata.profileImage}
                      alt={hero.name}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      eager={true}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center p-8">
                      <div>
                        <Code2 className="w-24 h-24 text-white/80 mx-auto mb-4" />
                        <p className="text-white/90 text-2xl font-bold tracking-wider">
                          {hero.name.split(' ').map(n => n[0]).join('')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Tech Badges - Enhanced */}
          <div className="relative">
            {[
              { emoji: '☕', text: 'Java', delay: 0, position: 'top-10 sm:top-8 right-0 sm:-right-4' },
              { emoji: '⚛️', text: 'React', delay: 0.3, position: 'bottom-16 sm:bottom-20 left-0 sm:-left-4' },
              { emoji: '🍃', text: 'Spring Boot', delay: 0.6, position: 'top-1/2 -translate-y-1/2 -right-2 sm:-right-6' },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + tech.delay, duration: 0.5, type: 'spring' }}
                className={`absolute ${tech.position} z-20`}
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, idx % 2 === 0 ? 8 : -8, 0],
                  }}
                  transition={{
                    duration: 3 + idx,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: tech.delay,
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 0,
                    transition: { duration: 0.2 }
                  }}
                  className="glass-card px-4 py-2 text-sm font-semibold text-primary-700 dark:text-primary-300 shadow-xl cursor-pointer relative overflow-hidden group"
                >
                  {/* Shine on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10">{tech.emoji} {tech.text}</span>
                </motion.div>
              </motion.div>
            ))}

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, (i % 2 === 0 ? 20 : -20), 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
                className="absolute w-2 h-2 bg-primary-400 dark:bg-primary-600 rounded-full"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${i % 2 === 0 ? 10 : 90}%`,
                }}
              />
            ))}
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400 cursor-pointer group"
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <motion.span 
                className="text-sm font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll Down
              </motion.span>
              <motion.div 
                className="w-7 h-11 border-2 border-primary-400 dark:border-primary-600 rounded-full flex items-start justify-center p-2 group-hover:border-primary-600 dark:group-hover:border-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 h-1.5 bg-primary-500 dark:bg-primary-400 rounded-full shadow-lg shadow-primary-500/50"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
