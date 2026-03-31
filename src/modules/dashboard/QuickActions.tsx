"use client";

import { motion } from 'framer-motion'
import { BookOpen, Users } from 'lucide-react'
import { Link } from '@/lib/router'

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="card p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Quick Actions
      </h3>
      <div className="space-y-4">
        <Link
          to="/resources"
          className="flex items-center space-x-3 p-4 bg-primary-50/50 dark:bg-primary-900/10 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all border border-transparent hover:border-primary-100 dark:hover:border-primary-800 group"
        >
          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-xl group-hover:scale-110 transition-transform">
            <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span className="text-sm font-bold text-primary-700 dark:text-primary-300">
            Browse Resources
          </span>
        </Link>
        <Link
          to="/community"
          className="flex items-center space-x-3 p-4 bg-secondary-50/50 dark:bg-secondary-900/10 rounded-2xl hover:bg-secondary-50 dark:hover:bg-secondary-900/20 transition-all border border-transparent hover:border-secondary-100 dark:hover:border-secondary-800 group"
        >
          <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-xl group-hover:scale-110 transition-transform">
            <Users className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
          </div>
          <span className="text-sm font-bold text-secondary-700 dark:text-secondary-300">
            Join Discussion
          </span>
        </Link>
      </div>
    </motion.div>
  )
}
