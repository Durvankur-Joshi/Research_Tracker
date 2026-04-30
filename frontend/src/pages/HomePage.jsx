import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'

const HomePage = () => {
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!topic.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      navigate(`/dashboard/${encodeURIComponent(topic)}`)
    }, 1000)
  }

  const features = [
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Track research trends and publication patterns over time',
    },
    {
      icon: Sparkles,
      title: 'Gap Detection',
      description: 'Identify unexplored territories and research opportunities',
    },
    {
      icon: Search,
      title: 'Knowledge Mapping',
      description: 'Visualize research landscape with interactive graphs',
    },
  ]

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card mb-6">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium gradient-text">AI-Powered Research Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Research</span>
          <br />
          <span className="text-gray-800 dark:text-white">Landscape Explorer</span>
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover research trends, identify gaps, and explore the knowledge graph of any academic field
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative group">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a research topic (e.g., 'Artificial Intelligence', 'Climate Change')"
              className="w-full px-6 py-4 pl-14 rounded-2xl glass-card bg-white/50 dark:bg-gray-800/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-400"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Explore'
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-2xl text-center group cursor-pointer"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">10K+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Research Papers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">50+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Academic Fields</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">100K+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Citations Tracked</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage