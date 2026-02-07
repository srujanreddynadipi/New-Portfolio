import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, Calendar, Users, Code, Sparkles, Rocket, ChevronLeft, ChevronRight } from 'lucide-react'
import { portfolioData } from '../../data/data'

// Project Card Component - Enhanced
const ProjectCard = ({ project, onClick, index }) => {
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
      whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="glass-card overflow-hidden cursor-pointer group h-full flex flex-col relative"
    >
      {/* Hover Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-primary-400/0 group-hover:bg-primary-400/10 dark:group-hover:bg-primary-600/10 transition-all duration-300 rounded-xl z-0"
      />

      {/* Project Image - Enhanced */}
      <div className="relative h-64 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 dark:from-primary-600 dark:via-primary-700 dark:to-primary-800 overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Code className="w-24 h-24 text-white/40" />
            </motion.div>
          </div>
        )}
        
        {/* Overlay on Hover - Enhanced */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/95 via-primary-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-white text-sm font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Click to view details
            <Sparkles className="w-4 h-4" />
          </motion.p>
        </div>

        {/* Status Badge - Enhanced */}
        {project.status && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute top-4 right-4 z-10"
          >
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5 ${
              project.status === 'Completed'
                ? 'bg-green-500/90 text-white'
                : project.status === 'In Progress'
                ? 'bg-yellow-500/90 text-white'
                : 'bg-blue-500/90 text-white'
            }`}>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {project.status}
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Card Content - Enhanced */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        {/* Title - Enhanced */}
        <motion.h3 
          whileHover={{ x: 5 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex items-center gap-2"
        >
          {project.title}
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className="w-5 h-5 text-primary-500" />
          </motion.div>
        </motion.h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-base mb-5 line-clamp-2 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies - Enhanced */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {((project.technologies || project.tech || []).slice(0, 4)).map((tech, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.15, y: -3, rotate: [0, -3, 3, 0] }}
              className="px-3 py-1.5 text-xs font-bold bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-700 dark:text-primary-300 rounded-lg border-2 border-primary-300 dark:border-primary-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all"
            >
              {tech}
            </motion.span>
          ))}
          {(project.technologies || project.tech || []).length > 4 && (
            <span className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg">
              +{(project.technologies || project.tech || []).length - 4} more
            </span>
          )}
        </div>

        {/* Footer - Enhanced */}
        <div className="flex items-center justify-between pt-5 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="View GitHub repository"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="View live demo"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
          
          {project.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.duration}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  
  if (!project) return null

  const projectImages = project.images || (project.image ? [project.image] : [])
  const technologies = project.technologies || project.tech || []

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card max-w-5xl w-full my-8 relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center group shadow-xl border-2 border-gray-200 dark:border-gray-600"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Modal Content */}
          <div className="max-h-[85vh] overflow-y-auto">
            {/* Project Image Gallery */}
            {projectImages.length > 0 ? (
              <div className="relative">
                <div className="relative h-80 md:h-96 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800">
                  <img
                    src={projectImages[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Image Navigation */}
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors flex items-center justify-center shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors flex items-center justify-center shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
                      </button>
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-full">
                        {currentImageIndex + 1} / {projectImages.length}
                      </div>
                    </>
                  )}
                </div>
                {/* Thumbnail Gallery */}
                {projectImages.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {projectImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex
                            ? 'border-primary-500 scale-105'
                            : 'border-gray-300 dark:border-gray-600 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center">
                <Code className="w-32 h-32 text-white/30" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {project.title}
                  </h2>
                  {project.status && (
                    <span className={`px-4 py-2 text-sm font-bold rounded-lg shadow-md whitespace-nowrap ${
                      project.status === 'Completed'
                        ? 'bg-green-500 text-white'
                        : project.status === 'In Progress'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {project.duration && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                  )}
                  {project.team && (
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{project.team}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 bg-primary-50 dark:bg-primary-900/20 p-5 rounded-xl border-l-4 border-primary-500">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  About the Project
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {project.description}
                </p>
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary-500" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 text-sm font-semibold bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-700 dark:text-primary-300 rounded-lg border-2 border-primary-200 dark:border-primary-700 hover:border-primary-400 dark:hover:border-primary-500 transition-all shadow-sm hover:shadow-md"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700 mt-2">
                {project.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary flex items-center justify-center gap-2 min-w-[200px] shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit Live Site
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-secondary flex items-center justify-center gap-2 min-w-[200px] shadow-lg hover:shadow-xl"
                  >
                    <Github className="w-5 h-5" />
                    View Source Code
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const { projects } = portfolioData

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
    <>
      <section
        id="projects"
       className="py-20 px-4 relative overflow-hidden"
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
                <Rocket className="w-4 h-4" />
                Portfolio
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
                Featured Projects
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="section-subtitle max-w-2xl mx-auto"
            >
              Showcasing my best work - from full-stack applications to innovative solutions
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Code className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No projects available yet. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

export default Projects
