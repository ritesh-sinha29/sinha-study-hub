"use client";

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface CommunityHeaderProps {
  onNewDiscussion: () => void;
}

export const CommunityHeader = ({ onNewDiscussion }: CommunityHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            Community <span className="text-primary-600">Discussions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            Connect with fellow students, ask questions, and share knowledge.
          </p>
        </div>
        <button
          onClick={onNewDiscussion}
          className="w-full md:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-primary-500/20 active:scale-95 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Discussion</span>
        </button>
      </div>
    </motion.div>
  )
}
