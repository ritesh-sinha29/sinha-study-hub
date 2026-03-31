"use client";

import { motion } from 'framer-motion'
import { Download, Upload, Award } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAnalyticsStore } from '@/store/analyticsStore'

export const ProfileRecentActivity = () => {
  const { user } = useAuthStore()
  const { getUserAnalytics } = useAnalyticsStore()

  if (!user) return null

  const userAnalytics = getUserAnalytics(user.id)

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
      icon: Upload,
      color: 'bg-yellow-100 dark:bg-yellow-900',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    }] : []),
    ...(userAnalytics.commentsPosted > 0 ? [{
      type: 'comment',
      title: `Posted ${userAnalytics.commentsPosted} comment${userAnalytics.commentsPosted > 1 ? 's' : ''}`,
      subject: 'Community Engagement',
      time: 'Recently',
      icon: Award,
      color: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400'
    }] : [])
  ] : [
    {
      type: 'download',
      title: 'No activity yet',
      subject: 'Explore the hub to get started',
      time: 'Begin now',
      icon: Download,
      color: 'bg-gray-100 dark:bg-gray-800',
      iconColor: 'text-gray-400'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="card p-8 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none bg-white dark:bg-gray-800"
    >
      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight underline decoration-secondary-500 underline-offset-8">
        Recent Activity
      </h2>
      <div className="space-y-6">
        {recentActivity.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex items-center space-x-6 p-6 bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all shadow-sm hover:shadow-md group">
              <div className="flex-shrink-0">
                <div className={`p-4 rounded-2xl ${activity.color}`}>
                  <Icon className={`h-6 w-6 ${activity.iconColor}`} />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg font-black text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  {activity.title}
                </p>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                  {activity.subject} • {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
