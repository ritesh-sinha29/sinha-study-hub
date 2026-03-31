"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { ENGINEERING_DEPARTMENTS } from '../../lib/constants/resources'

interface DepartmentPillsProps {
  activeDepartment: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const DepartmentPills = ({ activeDepartment, searchParams }: DepartmentPillsProps) => {
  const getLink = (deptId: string) => {
    const params = new URLSearchParams()
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string' && key !== 'department') {
          params.set(key, value)
        }
      })
    }
    if (deptId) params.set('department', deptId)
    else params.delete('department')
    
    return `/resources?${params.toString()}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-8 overflow-x-auto pb-2 scrollbar-hide"
    >
      <div className="flex flex-nowrap gap-3">
        <Link
          href={getLink('')}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-full transition-colors shrink-0",
            !activeDepartment
              ? "bg-primary-600 text-white shadow-lg"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
          )}
        >
          <span>All Departments</span>
        </Link>
        {ENGINEERING_DEPARTMENTS.map((dept, idx) => {
          const Icon = dept.icon
          return (
            <motion.div
              key={dept.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={getLink(dept.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full transition-colors shadow-sm shrink-0",
                  activeDepartment === dept.id
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{dept.shortName}</span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
