"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { X, GraduationCap } from 'lucide-react'
import { ENGINEERING_DEPARTMENTS } from '../../lib/constants/resources'

interface DepartmentIndicatorProps {
  departmentId: string;
}

export const DepartmentIndicator = ({ departmentId }: DepartmentIndicatorProps) => {
  const department = ENGINEERING_DEPARTMENTS.find(d => d.id === departmentId)
  if (!department) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`p-3 rounded-xl bg-gradient-to-br ${department.color} text-white shadow-lg`}
        >
          <department.icon className="h-6 w-6" />
        </motion.div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Selected Department
            </span>
            <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {department.shortName}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
            {department.name}
          </h2>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
        <Link 
          href="/resources"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          title="Clear selection"
        >
          <X className="h-5 w-5" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
