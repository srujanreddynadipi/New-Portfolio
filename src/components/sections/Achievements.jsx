import { motion } from 'framer-motion'
import { Trophy, Star, Calendar, Sparkles, Award } from 'lucide-react'
import { useAchievements } from '../../hooks/usePortfolioData'
import Spinner from '../ui/Spinner'

// Reusable AchievementCard Component - Enhanced
const AchievementCard = ({ achievement, index }) => {
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
        scale: 1.08,
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="glass-card p-8 h-full group relative overflow-hidden"
    >
      {/* Glow Effect on Hover */}
      <motion.div 
        className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 dark:group-hover:bg-yellow-600/10 transition-all duration-300"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Achievement Image or Icon */}
        {achievement.image ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 rounded-xl overflow-hidden mb-4 shadow-lg group-hover:shadow-yellow-500/50 transition-shadow"
          >
            <img
              src={achievement.image}
              alt={achievement.title || achievement.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700 flex items-center justify-center" style={{ display: 'none' }}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              scale: 1.15,
            }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-yellow-500/50 transition-shadow relative"
          >
            <Trophy className="w-8 h-8 text-white" />
            {/* Shine Effect */}
            <motion.div
              animate={{
                x: [-100, 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {achievement.title || achievement.name}
        </h3>

        {/* Description */}
        {achievement.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-1">
            {achievement.description}
          </p>
        )}

        {/* Footer with Year/Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          {achievement.year && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{achievement.year}</span>
            </div>
          )}
          
          <motion.div
            whileHover={{ scale: 1.2, rotate: 72 }}
            transition={{ duration: 0.3 }}
          >
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const Achievements = () => {
  const { data: achievements, loading, error } = useAchievements()

  // Show loading spinner
  if (loading) {
    return (
      <section id="achievements" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex justify-center items-center min-h-[400px]">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error) console.error('Achievements error:', error)

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
      id="achievements"
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
            <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-semibold mb-4 inline-block">
              Recognition
            </span>
          </motion.div>

          <h2 className="section-title mt-4">Achievements & Awards</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Milestones and recognitions that mark my journey of continuous growth and excellence
          </p>
        </motion.div>

        {/* Achievements Grid */}
        {achievements && achievements.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                achievement={achievement}
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
            <Trophy className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No achievements available yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Achievements
