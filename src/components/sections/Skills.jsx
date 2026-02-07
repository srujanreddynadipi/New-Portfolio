import { motion } from 'framer-motion'
import { Code2, Layers, Database, Wrench, Brain, Sparkles } from 'lucide-react'
import { useSkills } from '../../hooks/usePortfolioData'
import Spinner from '../ui/Spinner'

// Reusable SkillCard Component
const SkillCard = ({ icon: Icon, title, skills, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="glass-card p-6 h-full group relative overflow-hidden"
    >
      {/* Hover Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-primary-400/0 group-hover:bg-primary-400/10 dark:group-hover:bg-primary-600/10 transition-all duration-300"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon - Enhanced */}
        <motion.div
          whileHover={{ 
            rotate: [0, -10, 10, -10, 0], 
            scale: 1.15,
          }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700 flex items-center justify-center mb-5 shadow-xl shadow-primary-500/50 group-hover:shadow-2xl group-hover:shadow-primary-500/70 transition-all relative overflow-hidden"
        >
          <Icon className="w-8 h-8 text-white z-10" />
        </motion.div>

        {/* Title - Enhanced */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>

        {/* Skill Badges - Enhanced */}
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + idx * 0.05,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.15,
                y: -4,
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.3 },
              }}
              className="relative group/badge"
            >
              <span className="px-4 py-2 text-sm font-semibold bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-700 dark:text-primary-300 rounded-full border-2 border-primary-200 dark:border-primary-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all cursor-pointer backdrop-blur-sm">
                {skill.name}
              </span>

              {/* Tooltip with skill level - Enhanced */}
              {skill.level && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 text-white text-xs font-medium rounded-lg opacity-0 group-hover/badge:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                      />
                    </div>
                    <span>{skill.level}%</span>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Skill Count - Enhanced */}
        <motion.div 
          className="mt-5 pt-5 border-t-2 border-gray-200 dark:border-gray-700"
          whileHover={{ borderColor: 'rgb(220, 193, 134)' }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">
              {skills.length}
            </span>{' '}
            <span className="font-medium">
              {skills.length === 1 ? 'skill' : 'skills'} mastered
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const { data: skills, loading, error } = useSkills()

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 relative z-0">
        <div className="max-w-7xl mx-auto relative z-10 flex justify-center items-center min-h-[400px]">
          <Spinner />
        </div>
      </section>
    )
  }

  // Show error message if data fetch failed (shouldn't happen due to fallback)
  if (error) {
    console.error('Skills error:', error)
  }

  // Category configuration with icons and display names
  const categories = [
    {
      key: 'programming',
      title: 'Programming Languages',
      icon: Code2,
      skills: skills.programming || [],
    },
    {
      key: 'frameworks',
      title: 'Frameworks & Libraries',
      icon: Layers,
      skills: skills.frameworks || [],
    },
    {
      key: 'databases',
      title: 'Databases',
      icon: Database,
      skills: skills.databases || [],
    },
    {
      key: 'tools',
      title: 'Tools & Technologies',
      icon: Wrench,
      skills: skills.tools || [],
    },
    {
      key: 'concepts',
      title: 'Core Concepts',
      icon: Brain,
      skills: skills.concepts || [],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  return (
    <section
      id="skills"
      className="py-20 px-4 relative z-0"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="inline-block relative"
          >
            {/* Badge Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-primary-400 dark:bg-primary-600 rounded-full blur-xl"
            />
            <span className="px-6 py-3 bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 dark:from-primary-900/40 dark:via-primary-800/40 dark:to-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full text-sm font-bold mb-4 inline-flex items-center gap-2 border-2 border-primary-300 dark:border-primary-700 shadow-lg relative z-10">
              <Sparkles className="w-4 h-4" />
              Technical Expertise
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="section-title mt-6"
          >
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-400 dark:via-primary-300 dark:to-primary-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section-subtitle max-w-2xl mx-auto"
          >
            A comprehensive set of tools and technologies I use to build robust, scalable applications
          </motion.p>
        </motion.div>

        {/* Skills Grid - Enhanced */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <SkillCard
              key={category.key}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
