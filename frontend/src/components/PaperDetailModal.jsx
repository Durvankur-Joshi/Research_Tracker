import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Calendar, User, Quote } from 'lucide-react'

const PaperDetailModal = ({ isOpen, onClose, papers, title }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative glass-card rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
        >
          <div className="p-6 border-b border-white/20 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Research Papers
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Related to: {title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="space-y-4">
              {papers.map((paper, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {paper.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{paper.authors}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{paper.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Quote className="w-3 h-3" />
                      <span>{paper.citations.toLocaleString()} citations</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {paper.abstract}
                  </p>
                  
                  <button className="text-purple-600 dark:text-purple-400 text-sm flex items-center space-x-1 hover:underline">
                    <span>Read more</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default PaperDetailModal