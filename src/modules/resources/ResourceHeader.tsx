"use client";

import { motion } from 'framer-motion'

export const ResourceHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Study Resources
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Discover comprehensive study materials for all GTU subjects
      </p>
    </motion.div>
  )
}
