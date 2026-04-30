import { getKnowledgeGraph, getTrendData, getGapList, getStats, getPapersForNode } from './mockData'

const API_BASE = '/api'

// Simulate network delay
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchKnowledgeGraph = async (topicId) => {
  await delay()
  return getKnowledgeGraph(topicId)
}

export const fetchTrendData = async (topicId) => {
  await delay(400)
  return getTrendData(topicId)
}

export const fetchGapList = async (topicId, filter = 'all') => {
  await delay(300)
  const gaps = getGapList(topicId)
  if (filter === 'unexplored') return gaps.filter(g => g.type === 'unexplored')
  if (filter === 'ongoing') return gaps.filter(g => g.type === 'ongoing')
  return gaps
}

export const fetchStats = async (topicId) => {
  await delay(200)
  return getStats(topicId)
}

export const fetchPapersForNode = async (nodeId) => {
  await delay(500)
  return getPapersForNode(nodeId)
}