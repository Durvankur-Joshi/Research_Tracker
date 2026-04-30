import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const FloatingAddButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-xl transition-all duration-300"
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  )
}

export default FloatingAddButton