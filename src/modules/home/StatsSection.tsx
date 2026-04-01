"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Download, Star } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const StatsSection = () => {
  const globalStats = useQuery(api.resources.getGlobalStats);

  const statsList = [
    {
      icon: Users,
      label: "Active Students",
      value: globalStats ? `${globalStats.totalUsers}+` : "Loading...",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: BookOpen,
      label: "Resources",
      value: globalStats ? `${globalStats.totalResources}+` : "Loading...",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Download,
      label: "Downloads",
      value: globalStats ? `${globalStats.totalDownloads}+` : "195+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: globalStats ? globalStats.averageRating.toFixed(1) : "4.5",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-100/20 dark:bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statsList.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-[2rem] mb-6 shadow-xl shadow-gray-200 dark:shadow-none group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
