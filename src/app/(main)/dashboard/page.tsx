"use client";

import { DashboardHeader } from "@/modules/dashboard/DashboardHeader"
import { StatsGrid } from "@/modules/dashboard/StatsGrid"
import { RecentActivity } from "@/modules/dashboard/RecentActivity"
import { QuickActions } from "@/modules/dashboard/QuickActions"
import { Achievements } from "@/modules/dashboard/Achievements"
import { UpcomingDeadlines } from "@/modules/dashboard/UpcomingDeadlines"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Module */}
        <DashboardHeader />

        {/* Statistics Grid Module */}
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <RecentActivity />

          {/* Sidebar Area */}
          <div className="space-y-8">
            <QuickActions />
            <Achievements />
            <UpcomingDeadlines />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return <Dashboard />
}
