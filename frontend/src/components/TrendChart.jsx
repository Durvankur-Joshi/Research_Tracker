import React, { memo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card p-2 text-sm">
        <p className="font-semibold">{label}</p>
        <p className="text-purple-600">Papers: {payload[0].value}</p>
        <p className="text-blue-600">Citations: {payload[1]?.value?.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

const TrendChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 h-[340px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500" />
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold">Publication Trends</h3>
      <p className="text-sm text-gray-500 mb-4">Papers & citations over time</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="papers" stroke="#8B5CF6" yAxisId="left" name="Papers" strokeWidth={2} />
          <Line type="monotone" dataKey="citations" stroke="#3B82F6" yAxisId="right" name="Citations" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(TrendChart)