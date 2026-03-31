"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ENGINEERING_DEPARTMENTS } from '../../lib/constants/resources'

export const DepartmentsHub = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="mb-12 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Engineering Departments
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Access specialized study materials and resources for each engineering department
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {ENGINEERING_DEPARTMENTS.map((dept) => {
          return (
            <motion.div key={dept.id} variants={item}>
              <Link
                href={`/resources?department=${dept.id}`}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer border border-transparent hover:border-primary-500/30 transition-all duration-300 h-full flex flex-col hover:-translate-y-2 group"
              >
                {/* Department Visual Header */}
                <div className={`bg-gradient-to-br ${dept.color} p-8 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md rounded-full px-2 py-0.5">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{dept.shortName}</span>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl"
                  >
                    <dept.icon className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                <div className="p-6 flex-1 flex flex-col items-center text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{dept.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2rem] leading-relaxed">
                    {dept.description}
                  </p>
                  
                  <div className="w-full space-y-2 mb-6 text-left">
                    {dept.subjects.slice(0, 2).map((subject, idx) => (
                      <div key={idx} className="flex items-center text-[10px] text-primary-600 dark:text-primary-400 font-medium">
                        <span className="mr-1.5">•</span>
                        <span className="truncate">{subject}</span>
                      </div>
                    ))}
                    {dept.subjects.length > 2 && (
                      <div className="text-[10px] text-gray-400 italic pl-3">
                        +{dept.subjects.length - 2} more subjects
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
                    <div className="flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-300">
                      Explore Department <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
