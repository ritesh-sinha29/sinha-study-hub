"use client";

import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { useAnalyticsStore } from '@/store/analyticsStore'

export const Achievements = () => {
  const { user } = useAuthStore()
  const { getUserAnalytics, getUserAchievements } = useAnalyticsStore()
  const userAnalytics = user ? getUserAnalytics(user.id) : null
  const userAchievements = user ? getUserAchievements(user.id) : null

  const achievementsData = [
    {
      icon: '🏆',
      title: 'Top Contributor',
      description: userAchievements?.topContributor
        ? 'Achieved! Uploaded 5+ resources'
        : `${userAnalytics?.resourcesUploaded || 0}/5 resources uploaded`,
      earned: userAchievements?.topContributor || false
    },
    {
      icon: '🔥',
      title: 'Study Streak',
      description: userAchievements?.studyStreak
        ? 'Achieved! 7+ days in a row'
        : `${userAnalytics?.studyStreak || 0}/7 days in a row`,
      earned: userAchievements?.studyStreak || false
    },
    {
      icon: '⭐',
      title: 'Helpful Member',
      description: userAchievements?.helpfulMember
        ? 'Achieved! 50+ upvotes received'
        : `${userAnalytics?.totalUpvotes || 0}/50 upvotes received`,
      earned: userAchievements?.helpfulMember || false
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="card p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Achievements
      </h3>
      <div className="space-y-4">
        {achievementsData.map((achievement, index) => (
          <div key={index} className={`flex items-center space-x-4 p-4 rounded-2xl border transition-all ${achievement.earned
            ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 shadow-sm shadow-green-100'
            : 'bg-gray-50 dark:bg-gray-800 shadow-none border-gray-100 dark:border-gray-700 opacity-60'
            }`}>
            <span className="text-3xl filter drop-shadow-sm">{achievement.icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-bold ${achievement.earned
                ? 'text-green-800 dark:text-green-200'
                : 'text-gray-900 dark:text-white'
                }`}>
                {achievement.title}
              </p>
              <p className={`text-[11px] font-medium leading-relaxed mt-0.5 ${achievement.earned
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-400'
                }`}>
                {achievement.description}
              </p>
            </div>
            {achievement.earned && (
              <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full shadow-sm">
                <span className="text-green-600 dark:text-green-400 block h-4 w-4 text-[10px] flex items-center justify-center font-bold">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
