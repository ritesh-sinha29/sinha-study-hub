"use client";

import { Search, RotateCcw } from 'lucide-react'
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
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Try adjusting your filters or search terms to find what you're looking for. 
        We're constantly adding new study materials!
      </p>
      <Link
        href="/resources"
        className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-500/20 hover:-translate-y-0.5 active:translate-y-0"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Reset All Filters</span>
      </Link>
    </div>
  )
}
