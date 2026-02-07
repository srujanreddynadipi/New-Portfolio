import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { motion } from 'framer-motion'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary Gradient Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1.1, 1],
              x: [0, 100, -50, 0],
              y: [0, -80, 50, 0],
              rotate: [0, 90, 180, 360],
              opacity: [0.3, 0.5, 0.4, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 dark:from-primary-900 dark:via-primary-800 dark:to-primary-700 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1.2, 1],
              x: [0, -120, 80, 0],
              y: [0, 100, -60, 0],
              rotate: [0, -90, -180, -360],
              opacity: [0.2, 0.4, 0.35, 0.2],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400 dark:from-primary-800 dark:via-primary-700 dark:to-primary-600 rounded-full blur-3xl"
          />
          
          {/* Additional Accent Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 60, 0],
              y: [0, -40, 0],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-400 dark:bg-primary-800 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 60, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-primary-300 dark:bg-primary-900 rounded-full blur-3xl"
          />

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-primary-100/50 dark:to-dark-900/50" />
        </div>
      </div>

      <Navbar />
      <main className="flex-grow pt-16 relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
