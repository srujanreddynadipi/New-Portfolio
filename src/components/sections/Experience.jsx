import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react'
import { portfolioData } from '../../data/data'

// Reusable TimelineItem Component
const TimelineItem = ({ item, index, isLast, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.3 } 
      }}
      className="glass-card p-5 group/card relative overflow-hidden h-full"
    >
        {/* Hover Glow Effect */}
        <motion.div 
          className="absolute inset-0 bg-primary-400/0 group-hover/card:bg-primary-400/10 dark:group-hover/card:bg-primary-600/10 transition-all duration-300"
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400 transition-colors">
              {item.role || item.title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 font-semibold text-base mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {item.company || item.organization}
            </p>

            {/* Meta Info - Enhanced */}
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
              {item.duration && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-md">
                  <Calendar className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                  <span className="font-medium">{item.duration}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-md">
                  <MapPin className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                  <span className="font-medium">{item.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-sm">
              {item.description}
            </p>
          )}

          {/* Responsibilities/Highlights - Enhanced */}
          {item.responsibilities && item.responsibilities.length > 0 && (
            <ul className="space-y-1.5 mb-3">
              {item.responsibilities.map((responsibility, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Technologies/Skills - Enhanced */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded border border-primary-300 dark:border-primary-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
    </motion.div>
  )
}

const Experience = () => {
  const { experience } = portfolioData

  // Combine experience and training, sorted by date if available
  const allExperience = [...(experience || [])]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <section
      id="experience"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
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
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-primary-400 dark:bg-primary-600 rounded-full blur-xl"
            />
            <span className="px-4 py-2 bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 dark:from-primary-900/40 dark:via-primary-800/40 dark:to-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border border-primary-300 dark:border-primary-700 relative z-10">
              <Briefcase className="w-3.5 h-3.5" />
              Career Journey
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-2"
          >
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-400 dark:via-primary-300 dark:to-primary-500 bg-clip-text text-transparent">
              Experience & Training
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            My professional journey and continuous learning path in software development
          </motion.p>
        </motion.div>

        {/* Timeline */}
        {allExperience.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {allExperience.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLast={index === allExperience.length - 1}
                type={item.type || (item.role ? 'experience' : 'training')}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20 glass-card"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Briefcase className="w-24 h-24 text-primary-300 dark:text-primary-700 mx-auto mb-4" />
            </motion.div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No experience data available yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Experience
