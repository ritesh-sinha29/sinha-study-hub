"use client";

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export const ResourceHeader = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const hasActiveFilters = Array.from(searchParams.keys()).length > 0

  const handleBack = () => {
    if (hasActiveFilters) {
      router.push('/resources')
    } else {
      router.push('/')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
    >
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          Sinha's Study HUB
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover comprehensive study materials for all GTU subjects
        </p>
      </div>

      <button
        onClick={handleBack}
        className="shrink-0 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-900/30 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all self-start"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-semibold">Back</span>
      </button>
    </motion.div>
  )
}
