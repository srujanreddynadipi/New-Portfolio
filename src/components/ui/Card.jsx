import { motion } from 'framer-motion'

export const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`glass-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card
