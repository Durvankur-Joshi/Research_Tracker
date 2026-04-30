import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, AlertCircle, Clock, Target } from 'lucide-react'

const GapItem = React.memo(({ gap, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -20 }}
    whileHover={{ scale: 1.01 }}
    onClick={() => onClick(gap)}
    className="glass-card p-4 rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center flex-wrap gap-2 mb-2">
          {gap.type === 'unexplored' ? (
            <Target className="w-4 h-4 text-red-500" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-500" />
          )}
          <h4 className="font-semibold text-gray-800 dark:text-white">{gap.title}</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            gap.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
            gap.severity === 'high' ? 'bg-orange-100 text-orange-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>{gap.severity}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{gap.description}</p>
        <div className="flex items-center text-xs text-purple-600 mt-2">
          <span className="capitalize">{gap.type} territory</span>
          <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      </div>
      <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
        gap.severity === 'critical' ? 'text-red-500' :
        gap.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
      }`} />
    </div>
  </motion.div>
))

const GapList = ({ gaps, onGapClick, isLoading = false }) => {
  const [filter, setFilter] = useState('all')

  const filteredGaps = useMemo(() => {
    if (filter === 'all') return gaps
    return gaps.filter(g => g.type === filter)
  }, [gaps, filter])

  const handleClick = useCallback((gap) => {
    onGapClick(gap)
  }, [onGapClick])

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Research Gaps & Open Problems</h3>
          <p className="text-sm text-gray-500">{filteredGaps.length} gaps identified</p>
        </div>
        <div className="flex gap-2">
          {['all', 'unexplored', 'ongoing'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filter === f ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {filteredGaps.map(gap => (
            <GapItem key={gap.id} gap={gap} onClick={handleClick} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default React.memo(GapList)