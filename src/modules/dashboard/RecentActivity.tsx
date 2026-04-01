"use client";

import { motion } from "framer-motion";
import { Download, Users, Star } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const RecentActivity = () => {
  const user = useQuery(api.users.currentUser);

  const recentActivity = user
    ? [
        ...(user.points && user.points > 0
          ? [
              {
                type: "download",
                title: `Practiced ${Math.floor(user.points / 10)} resources`,
                subject: "Study Resources",
                time: "Recently",
                icon: Download,
                color: "bg-blue-100 dark:bg-blue-900",
                iconColor: "text-blue-600 dark:text-blue-400",
              },
            ]
          : []),
        ...(user.streak && user.streak > 1
          ? [
              {
                type: "streak",
                title: `${user.streak} day study streak!`,
                subject: "Consistency",
                time: "Today",
                icon: Star,
                color: "bg-yellow-100 dark:bg-yellow-900",
                iconColor: "text-yellow-600 dark:text-yellow-400",
              },
            ]
          : []),
        {
          type: "joined",
          title: "Joined Sinha Study Hub",
          subject: "Welcome",
          time: user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "Recently",
          icon: Users,
          color: "bg-green-100 dark:bg-green-900",
          iconColor: "text-green-600 dark:text-green-400",
        },
      ]
    : [
        {
          type: "download",
          title: "No activity yet",
          subject: "Start exploring resources",
          time: "Get started",
          icon: Download,
          color: "bg-gray-100 dark:bg-gray-800",
          iconColor: "text-gray-400",
        },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2"
    >
      <div className="card p-6 h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 underline decoration-indigo-500 underline-offset-8">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group"
              >
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-xl ${activity.color}`}>
                    <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {activity.subject} • {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
