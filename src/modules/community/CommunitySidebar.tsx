"use client";

import { motion } from 'framer-motion'
import { Star, TrendingUp, HelpCircle } from 'lucide-react'

interface CommunitySidebarProps {
  topContributors: any[];
  helpfulMembers: any[];
  recentAnswers: any[];
  getUserName: (userId: string) => string;
}

export const CommunitySidebar = ({ 
  topContributors, 
  helpfulMembers, 
  recentAnswers, 
  getUserName 
}: CommunitySidebarProps) => {
  return (
    <div className="space-y-12">
      {/* Top Contributors */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="card p-8 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none"
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Top Contributors
          </h3>
        </div>
        <div className="space-y-6">
          {topContributors.length > 0 ? (
            topContributors.map((contributor, index) => (
              <div key={contributor.userId} className="flex items-center space-x-4 group">
                <div className="flex-shrink-0 relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-xl shadow-gray-200 dark:shadow-none transition-transform group-hover:scale-110 ${index === 0 ? 'bg-gradient-to-tr from-yellow-500 to-amber-300' :
                    index === 1 ? 'bg-gradient-to-tr from-gray-400 to-gray-300' : 
                    'bg-gradient-to-tr from-orange-500 to-orange-400'
                    }`}>
                    {index + 1}
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow-sm text-[10px]">👑</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight group-hover:text-primary-600 transition-colors">
                    {getUserName(contributor.userId)}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
                    {contributor.resourcesUploaded} Resources
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 font-medium text-center py-6">
              Be the first contributor!
            </p>
          )}
        </div>
      </motion.div>

      {/* Helpful Members */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="card p-8 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none"
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Helpful Members
          </h3>
        </div>
        <div className="space-y-6">
          {helpfulMembers.length > 0 ? (
            helpfulMembers.map((member, index) => (
              <div key={member.userId} className="flex items-center space-x-4 group">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-xl shadow-gray-200 dark:shadow-none transition-transform group-hover:scale-110 ${index === 0 ? 'bg-gradient-to-tr from-green-500 to-emerald-400' :
                    index === 1 ? 'bg-gradient-to-tr from-blue-500 to-indigo-400' : 
                    'bg-gradient-to-tr from-purple-500 to-pink-400'
                    }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight group-hover:text-primary-600 transition-colors">
                    {getUserName(member.userId)}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
                    {member.helpfulComments} Upvotes
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 font-medium text-center py-6">
              Help a pier to win points!
            </p>
          )}
        </div>
      </motion.div>

      {/* Recent Activity / Q&A */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="card p-8 bg-gradient-to-br from-primary-600 to-primary-800 border-none shadow-2xl shadow-primary-500/20 text-white"
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20">
            <HelpCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Recent Answers
          </h3>
        </div>
        <div className="space-y-6">
          {recentAnswers.map((answer, index) => (
            <div key={index} className="space-y-3 pb-6 border-b border-white/10 last:border-0 last:pb-0 group cursor-pointer">
              <p className="text-sm font-black leading-tight text-white/90 group-hover:text-yellow-300 transition-colors">
                "{answer.question}"
              </p>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                <span>By {answer.author}</span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{answer.upvotes}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
