import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SummaryCards from '../components/SummaryCards'
import KnowledgeGraph from '../components/KnowledgeGraph'
import TrendChart from '../components/TrendChart'
import GapList from '../components/GapList'
import PaperDetailModal from '../components/PaperDetailModal'
import FloatingAddButton from '../components/FloatingAddButton'
import { fetchKnowledgeGraph, fetchTrendData, fetchGapList, fetchStats, fetchPapersForNode } from '../api'

const DashboardPage = () => {
  const { topicId } = useParams()
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [trendData, setTrendData] = useState([])
  const [gaps, setGaps] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPapers, setSelectedPapers] = useState([])
  const [selectedTitle, setSelectedTitle] = useState('')

  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      setLoading(true)
      try {
        const [graph, trends, gapsData, statsData] = await Promise.all([
          fetchKnowledgeGraph(topicId),
          fetchTrendData(topicId),
          fetchGapList(topicId),
          fetchStats(topicId),
        ])
        if (isMounted) {
          setGraphData(graph)
          setTrendData(trends)
          setGaps(gapsData)
          setStats(statsData)
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadData()
    return () => { isMounted = false }
  }, [topicId])

  const handleNodeClick = useCallback(async (node) => {
    const papers = await fetchPapersForNode(node.id)
    setSelectedPapers(papers)
    setSelectedTitle(node.label)
    setModalOpen(true)
  }, [])

  const handleGapClick = useCallback((gap) => {
    setSelectedPapers([
      { title: 'Research on ' + gap.title, authors: 'Various Authors', year: 2024, citations: 250, abstract: gap.description }
    ])
    setSelectedTitle(gap.title)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading research landscape for "{topicId}"...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Research Landscape: {topicId}</h1>
        <p className="text-gray-500">Interactive visualization of research areas, trends, and gaps</p>
      </div>

      <SummaryCards stats={stats} isLoading={loading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <KnowledgeGraph data={graphData} onNodeClick={handleNodeClick} isLoading={loading} />
        </div>
        <div>
          <TrendChart data={trendData} isLoading={loading} />
        </div>
      </div>

      <GapList gaps={gaps} onGapClick={handleGapClick} isLoading={loading} />

      <PaperDetailModal
        isOpen={modalOpen}
        onClose={closeModal}
        papers={selectedPapers}
        title={selectedTitle}
      />

      <FloatingAddButton onClick={() => console.log('Add research')} />
    </motion.div>
  )
}

export default DashboardPage