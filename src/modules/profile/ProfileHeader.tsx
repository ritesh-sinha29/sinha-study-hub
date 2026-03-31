"use client";

import { motion } from 'framer-motion'
import { Edit, Upload, Download, Calendar, Award } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAnalyticsStore } from '@/store/analyticsStore'

interface ProfileHeaderProps {
  onEditClick: () => void;
}

export const ProfileHeader = ({ onEditClick }: ProfileHeaderProps) => {
  const { user } = useAuthStore()
  const { getUserAnalytics } = useAnalyticsStore()

  if (!user) return null

  const userAnalytics = getUserAnalytics(user.id)

  const stats = [
    {
      label: 'Resources Uploaded',
      value: userAnalytics?.resourcesUploaded || 0,
      icon: Upload,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Downloads',
      value: userAnalytics?.totalDownloads || 0,
      icon: Download,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Study Streak',
      value: userAnalytics?.studyStreak || 0,
      icon: Calendar,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      label: 'Community Points',
      value: userAnalytics?.totalUpvotes || 0,
      icon: Award,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-8 mb-8 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 space-y-6 md:space-y-0 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0">
          {/* Avatar */}
          <div className="w-28 h-28 bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-3xl flex items-center justify-center shadow-xl shadow-primary-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-4xl font-black text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Basic Info */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              {user.name}
            </h1>
            <div className="flex flex-col space-y-1">
              <p className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">
                {user.registrationId} • {user.branch}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                {user.year} • Member since {new Date(user.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEditClick}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all border border-gray-200 dark:border-gray-600 font-bold text-sm text-gray-700 dark:text-gray-200 group shadow-sm hover:shadow-md"
        >
          <Edit className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="group p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
