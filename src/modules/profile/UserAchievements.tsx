"use client";

import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { useAnalyticsStore } from '@/store/analyticsStore'

export const UserAchievements = () => {
  const { user } = useAuthStore()
  const { getUserAnalytics, getUserAchievements } = useAnalyticsStore()

  if (!user) return null

  const userAnalytics = getUserAnalytics(user.id)
  const userAchievements = getUserAchievements(user.id)

  const achievementsArr = [
    {
      icon: '🏆',
      title: 'Top Contributor',
      description: userAchievements?.topContributor 
        ? 'Achieved! Uploaded 5+ master-quality resources' 
        : `${userAnalytics?.resourcesUploaded || 0}/5 resources uploaded`,
      date: userAchievements?.topContributor ? '2024-01-15' : null,
      earned: userAchievements?.topContributor || false
    },
    {
      icon: '🔥',
      title: 'Study Streak',
      description: userAchievements?.studyStreak 
        ? 'Achieved! 7+ days of consistent excellence' 
        : `${userAnalytics?.studyStreak || 0}/7 days in a row`,
      date: userAchievements?.studyStreak ? '2024-01-25' : null,
      earned: userAchievements?.studyStreak || false
    },
    {
      icon: '💬',
      title: 'Helpful Member',
      description: userAchievements?.helpfulMember 
        ? 'Achieved! Received 50+ community upvotes' 
        : `${userAnalytics?.totalUpvotes || 0}/50 upvotes received`,
      date: userAchievements?.helpfulMember ? '2024-02-01' : null,
      earned: userAchievements?.helpfulMember || false
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="card p-8 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none bg-white dark:bg-gray-800"
    >
      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight underline decoration-primary-500 underline-offset-8">
        Your Achievements
      </h2>
      <div className="space-y-6">
        {achievementsArr.map((achievement, index) => (
          <div key={index} className={`flex items-center space-x-6 p-6 rounded-3xl transition-all duration-300 border ${achievement.earned
            ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 shadow-sm shadow-green-100'
            : 'bg-gray-50/50 dark:bg-gray-900/10 border-transparent opacity-60'
            }`}>
            <span className="text-4xl filter drop-shadow-md">{achievement.icon}</span>
            <div className="flex-1">
              <h3 className={`text-lg font-black tracking-tight ${achievement.earned
                ? 'text-green-800 dark:text-green-200'
                : 'text-gray-900 dark:text-white'
                }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm font-medium leading-relaxed mt-1 ${achievement.earned
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-400'
                }`}>
                {achievement.description}
              </p>
              {achievement.date && (
                <div className="mt-3 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-600/70">
                    Unlocked on {achievement.date}
                  </span>
                </div>
              )}
            </div>
            {achievement.earned && (
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full shadow-inner">
                <span className="text-green-600 dark:text-green-400 block h-4 w-4 text-[10px] flex items-center justify-center font-black">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
