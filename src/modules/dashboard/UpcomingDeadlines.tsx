"use client";

import { motion } from 'framer-motion'

export const UpcomingDeadlines = () => {
  const upcomingDeadlines = [
    {
      title: 'Software Engineering Project',
      date: '2024-02-20',
      priority: 'medium'
    },
    {
      title: 'Computer Networks Lab',
      date: '2024-02-25',
      priority: 'low'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="card p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Upcoming Deadlines
      </h3>
      <div className="space-y-4">
        {upcomingDeadlines.map((deadline, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all shadow-sm">
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {deadline.title}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {deadline.date}
              </p>
            </div>
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${deadline.priority === 'high'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800'
              : deadline.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800'
              }`}>
              {deadline.priority}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
