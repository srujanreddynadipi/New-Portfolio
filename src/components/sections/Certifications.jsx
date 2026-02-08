import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink, Sparkles, Medal } from 'lucide-react'
import { useCertifications } from '../../hooks/usePortfolioData'
import Spinner from '../ui/Spinner'

// Reusable CertificationCard Component - Enhanced
const CertificationCard = ({ certification, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -12,
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      className="glass-card p-8 h-full group relative overflow-hidden"
    >
      {/* Top Accent Border */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700"
      />

      {/* Hover Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-primary-400/0 group-hover:bg-primary-400/10 dark:group-hover:bg-primary-600/10 transition-all duration-300"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Certificate Image or Icon */}
        {certification.image ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 rounded-xl overflow-hidden mb-4 shadow-lg group-hover:shadow-primary-500/50 transition-shadow"
          >
            <img
              src={certification.image}
              alt={certification.name || certification.title}
              className="w-full h-full object-contain bg-white dark:bg-dark-800"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 flex items-center justify-center" style={{ display: 'none' }}>
              <Award className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.15 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-primary-500/50 transition-shadow"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>
        )}

        {/* Certificate Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 min-h-[3.5rem]">
          {certification.name || certification.title}
        </h3>

        {/* Issuing Organization */}
        <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm mb-3">
          {certification.organization || certification.issuer}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-4">
          {certification.year && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{certification.year}</span>
            </div>
          )}
          {certification.date && !certification.year && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{certification.date}</span>
            </div>
          )}
        </div>

        {/* Description (Optional) */}
        {certification.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {certification.description}
          </p>
        )}

        {/* Link (Optional) */}
        {certification.link && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors mt-auto"
          >
            <span>View Certificate</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

const Certifications = () => {
  const { data: certifications, loading, error } = useCertifications()

  // Show loading spinner
  if (loading) {
    return (
      <section id="certifications" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex justify-center items-center min-h-[400px]">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error) console.error('Certifications error:', error)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section
      id="certifications"
      className="py-20 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold mb-4 inline-block">
              Achievements
            </span>
          </motion.div>

          <h2 className="section-title mt-4">Certifications & Awards</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Professional certifications and recognitions that validate my skills and expertise
          </p>
        </motion.div>

        {/* Certifications Grid */}
        {certifications && certifications.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {certifications.map((cert, index) => (
              <CertificationCard
                key={index}
                certification={cert}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Award className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No certifications available yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Certifications
