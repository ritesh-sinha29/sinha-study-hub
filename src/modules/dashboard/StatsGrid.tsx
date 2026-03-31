"use client";

import { motion } from 'framer-motion'
import { Download, Target, BookOpen, TrendingUp } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAnalyticsStore } from '@/store/analyticsStore'

export const StatsGrid = () => {
  const { user } = useAuthStore()
  const { getUserAnalytics } = useAnalyticsStore()
  const userAnalytics = user ? getUserAnalytics(user.id) : null

  const stats = [
    {
      label: 'Resources Downloaded',
      value: userAnalytics?.totalDownloads || 0,
      change: userAnalytics?.totalDownloads ? `${userAnalytics.totalDownloads} total` : 'No downloads yet',
      icon: Download,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Study Streak',
      value: userAnalytics?.studyStreak || 0,
      change: userAnalytics?.studyStreak ? `${userAnalytics.studyStreak} days` : 'Start studying!',
      icon: Target,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      label: 'Resources Uploaded',
      value: userAnalytics?.resourcesUploaded || 0,
      change: userAnalytics?.resourcesUploaded ? `${userAnalytics.resourcesUploaded} shared` : 'Share your first resource',
      icon: BookOpen,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Community Points',
      value: userAnalytics?.totalUpvotes || 0,
      change: userAnalytics?.totalUpvotes ? `${userAnalytics.totalUpvotes} upvotes` : 'Engage with community',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
