"use client";

import { Search } from 'lucide-react'
import Link from 'next/link'

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in duration-500">
      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-full mb-6">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        No resources found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        Try adjusting your filters or use the back button at the top to clear all selections. 
        We're constantly adding new study materials!
      </p>
    </div>
  )
}
