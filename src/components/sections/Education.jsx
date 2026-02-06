import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award, Sparkles, Book } from 'lucide-react'
import { portfolioData } from '../../data/data'

// Reusable EducationCard Component - Enhanced
const EducationCard = ({ education, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="glass-card overflow-hidden group relative"
    >
      {/* Left Accent Border */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700 group-hover:w-2 transition-all"
      />

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-primary-400/0 group-hover:bg-primary-400/10 dark:group-hover:bg-primary-600/10 transition-all duration-300" />

      {/* Content */}
      <div className="relative p-6 pl-8">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-primary-500/50 transition-shadow"
        >
          <GraduationCap className="w-7 h-7 text-white" />
        </motion.div>

        {/* Degree/Level */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {education.degree || education.level}
        </h3>

        {/* Institution */}
        <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
          {education.institution}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          {/* Duration */}
          {education.duration && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{education.duration}</span>
            </div>
          )}

          {/* Location */}
          {education.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{education.location}</span>
            </div>
          )}

          {/* CGPA or Percentage */}
          {(education.cgpa || education.percentage) && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Award className="w-4 h-4 flex-shrink-0" />
              <span>
                {education.cgpa && `CGPA: ${education.cgpa}`}
                {education.percentage && `${education.percentage}%`}
              </span>
            </div>
          )}
        </div>

        {/* Additional Details */}
        {education.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
            {education.description}
          </p>
        )}

        {/* Achievements/Highlights */}
        {education.achievements && education.achievements.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
              Highlights:
            </p>
            <ul className="space-y-1">
              {education.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                >
                  <span className="w-1 h-1 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const Education = () => {
  const { education } = portfolioData

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      id="education"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
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
            <span className="px-6 py-3 bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 dark:from-primary-900/40 dark:via-primary-800/40 dark:to-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full text-sm font-bold mb-4 inline-flex items-center gap-2 border-2 border-primary-300 dark:border-primary-700 shadow-lg relative z-10">
              <Book className="w-4 h-4" />
              Academic Background
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
              Education
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section-subtitle max-w-2xl mx-auto"
          >
            My academic journey and qualifications that built the foundation for my career
          </motion.p>
        </motion.div>

        {/* Education Grid */}
        {education && education.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {education.map((edu, index) => (
              <EducationCard key={index} education={edu} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <GraduationCap className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No education data available yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Education
