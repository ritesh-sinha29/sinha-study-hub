"use client";

import { useState } from 'react'
import { ProfileHeader } from "@/modules/profile/ProfileHeader"
import { EditProfileForm } from "@/modules/profile/EditProfileForm"
import { UserAchievements } from "@/modules/profile/UserAchievements"
import { ProfileRecentActivity } from "@/modules/profile/ProfileRecentActivity"
import { useAuthStore } from '@/store/authStore'
import { AnimatePresence } from 'framer-motion'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Module */}
        <ProfileHeader onEditClick={() => setIsEditing(true)} />

        {/* Edit Profile Form Module (Animated Entrance) */}
        <AnimatePresence>
          {isEditing && (
            <EditProfileForm onCancel={() => setIsEditing(false)} />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements Module */}
          <UserAchievements />

          {/* Recent Activity Module */}
          <ProfileRecentActivity />
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return <Profile />
}
