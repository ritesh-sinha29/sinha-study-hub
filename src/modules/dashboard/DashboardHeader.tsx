"use client";

import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'

export const DashboardHeader = () => {
  const { user } = useAuthStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome back, {user?.name}! 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Here's what's happening with your studies today
      </p>
    </motion.div>
  )
}
