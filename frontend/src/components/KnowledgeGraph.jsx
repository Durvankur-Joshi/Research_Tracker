import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { motion } from 'framer-motion'

const KnowledgeGraph = ({ data, onNodeClick, isLoading = false }) => {
  const graphRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  useEffect(() => {
    let timeoutId
    const updateDimensions = () => {
      const container = document.getElementById('graph-container')
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.min(container.clientHeight, 500),
        })
      }
    }

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 150)
    }

    updateDimensions()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  const statusColorMap = {
    solved: '#10B981',
    ongoing: '#F59E0B',
    unexplored: '#EF4444',
  }

  const paintNode = useCallback((node, ctx) => {
    const size = Math.max(4, (node.val || 10) / 4)
    ctx.beginPath()
    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI)
    ctx.fillStyle = statusColorMap[node.status] || '#94A3B8'
    ctx.fill()
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.font = `${Math.max(10, size)}px Inter`
    ctx.fillStyle = '#1F2937'
    ctx.fillText(node.label, node.x + size + 2, node.y - 4)
  }, [statusColorMap])

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="h-[500px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500">Loading graph...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div className="p-4 border-b border-white/20">
        <h3 className="text-lg font-semibold">Research Knowledge Map</h3>
        <p className="text-sm text-gray-500">Drag to explore – click on a node</p>
      </div>
      
      <div id="graph-container" className="w-full h-[500px]">
        <ForceGraph2D
          ref={graphRef}
          graphData={data}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="label"
          nodeCanvasObject={paintNode}
          nodeVal={node => node.val || 10}
          linkWidth={link => Math.sqrt(link.value || 1) / 10}
          linkColor={() => 'rgba(156, 163, 175, 0.3)'}
          onNodeClick={onNodeClick}
          cooldownTicks={50}
          warmupTicks={50}
          d3VelocityDecay={0.2}
          enablePanInteraction={true}
          enableZoomInteraction={true}
        />
      </div>

      <div className="p-3 border-t border-white/20 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Solved</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Ongoing</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Unexplored</div>
      </div>
    </motion.div>
  )
}

export default React.memo(KnowledgeGraph)