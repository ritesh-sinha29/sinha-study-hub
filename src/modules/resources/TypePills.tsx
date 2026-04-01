"use client";

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'
import { RESOURCE_TYPES } from '../../lib/constants/resources'

interface TypePillsProps {
  activeType: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const TypePills = ({ activeType, searchParams }: TypePillsProps) => {
  const getLink = (type: string) => {
    const params = new URLSearchParams()
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string' && key !== 'type') {
          params.set(key, value)
        }
      })
    }
    if (type) params.set('type', type)
    else params.delete('type')
    
    return `/resources?${params.toString()}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-wrap gap-3">
        {RESOURCE_TYPES.map((type, idx) => {
          const Icon = type.icon
          return (
            <motion.div
              key={type.value}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={getLink(type.value)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full transition-colors",
                  activeType === type.value
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{type.label}</span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
