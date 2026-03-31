"use client";

import { motion } from 'framer-motion'
import { Download, Users, Star } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAnalyticsStore } from '@/store/analyticsStore'

export const RecentActivity = () => {
  const { user } = useAuthStore()
  const { getUserAnalytics } = useAnalyticsStore()
  const userAnalytics = user ? getUserAnalytics(user.id) : null

  const recentActivity = userAnalytics ? [
    ...(userAnalytics.totalDownloads > 0 ? [{
      type: 'download',
      title: `Downloaded ${userAnalytics.totalDownloads} resource${userAnalytics.totalDownloads > 1 ? 's' : ''}`,
      subject: 'Study Resources',
      time: 'Recently',
      icon: Download,
      color: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400'
    }] : []),
    ...(userAnalytics.resourcesUploaded > 0 ? [{
      type: 'favorite',
      title: `Uploaded ${userAnalytics.resourcesUploaded} resource${userAnalytics.resourcesUploaded > 1 ? 's' : ''}`,
      subject: 'Shared Content',
      time: 'Recently',
      icon: Star,
      color: 'bg-yellow-100 dark:bg-yellow-900',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    }] : []),
    ...(userAnalytics.commentsPosted > 0 ? [{
      type: 'comment',
      title: `Posted ${userAnalytics.commentsPosted} comment${userAnalytics.commentsPosted > 1 ? 's' : ''}`,
      subject: 'Community Engagement',
      time: 'Recently',
      icon: Users,
      color: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400'
    }] : [])
  ] : [
    {
      type: 'download',
      title: 'No activity yet',
      subject: 'Start exploring resources',
      time: 'Get started',
      icon: Download,
      color: 'bg-gray-100 dark:bg-gray-800',
      iconColor: 'text-gray-400'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2"
    >
      <div className="card p-6 h-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 underline decoration-primary-500 underline-offset-8">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-xl ${activity.color}`}>
                    <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {activity.subject} • {activity.time}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
