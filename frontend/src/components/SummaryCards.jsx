import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, GraduationCap, AlertTriangle, BookOpen } from 'lucide-react'
import CountUp from 'react-countup'

const SummaryCards = ({ stats, isLoading = false }) => {
  const cards = [
    { title: 'Solved Areas', value: stats?.solved || 0, icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
    { title: 'Ongoing Research', value: stats?.ongoing || 0, icon: GraduationCap, color: 'from-yellow-500 to-orange-500' },
    { title: 'Unexplored Territories', value: stats?.unexplored || 0, icon: AlertTriangle, color: 'from-red-500 to-rose-500' },
    { title: 'Total Papers', value: stats?.totalPapers || 0, icon: BookOpen, color: 'from-blue-500 to-indigo-500' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="glass-card-hover p-6 rounded-2xl border border-white/20 transition-all duration-300"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg mb-4`}>
            <card.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {isLoading ? <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" /> : <CountUp end={card.value} duration={2} separator="," />}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default SummaryCards