"use client";

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter } from 'lucide-react'
import { SEMESTER_MAP, RESOURCE_TYPES, ENGINEERING_DEPARTMENTS } from '../../lib/constants/resources'

interface ActiveFiltersDisplayProps {
  filters: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const ActiveFiltersDisplay = ({ filters, searchParams }: ActiveFiltersDisplayProps) => {
  const entries = Object.entries(filters).filter(([_, value]) => value !== '')
  if (entries.length === 0) return null

  const getRemoveLink = (keyToRemove: string) => {
    const params = new URLSearchParams()
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string' && key !== keyToRemove) {
          params.set(key, value)
        }
      })
    }
    return `/resources?${params.toString()}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-wrap items-center gap-2 mb-6"
    >
      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mr-2">
        <Filter className="h-4 w-4" />
        <span>Active Filters:</span>
      </div>
      
      <AnimatePresence mode="popLayout">
        {entries.map(([key, value]) => {
          let displayValue = value as string;
          
          if (key === 'semester') {
            displayValue = SEMESTER_MAP[displayValue] || displayValue;
          } else if (key === 'type') {
            displayValue = RESOURCE_TYPES.find(t => t.value === displayValue)?.label || displayValue;
          } else if (key === 'department') {
            displayValue = ENGINEERING_DEPARTMENTS.find(d => d.id === displayValue)?.shortName || displayValue;
          }

          return (
            <motion.div
              key={key}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              layout
            >
              <Link
                href={getRemoveLink(key)}
                className="flex items-center space-x-1 px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full border border-primary-100 dark:border-primary-800 hover:bg-primary-100 transition-colors"
              >
                <span className="capitalize">{key}:</span>
                <span className="font-semibold">{displayValue}</span>
                <span className="ml-1 text-primary-400">×</span>
              </Link>
            </motion.div>
          )
        })}
      </AnimatePresence>

      <motion.div layout>
        <Link
          href="/resources"
          className="text-xs text-gray-500 hover:text-primary-600 transition-colors ml-2 underline underline-offset-4"
        >
          Clear All
        </Link>
      </motion.div>
    </motion.div>
  )
}
