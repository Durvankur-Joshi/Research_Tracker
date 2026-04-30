import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Layout>
              <HomePage />
            </Layout>
          </motion.div>
        } />
        <Route path="/dashboard/:topicId" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Layout>
              <DashboardPage />
            </Layout>
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default App