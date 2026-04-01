"use client";

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronRight, Cpu, Building, FlaskConical, Zap, Settings, ArrowRight } from 'lucide-react'
import { useAnalyticsStore } from '@/store/analyticsStore'
import { useEffect, useState } from 'react'

const DEPARTMENTS = [
  {
    id: 'computer',
    name: 'Computer Engineering',
    shortName: 'CE',
    description: 'Software development, algorithms, and computer systems',
    icon: Cpu,
    color: 'from-indigo-600 via-purple-600 to-pink-600',
    subjects: ['Data Structures', 'Database Systems', 'Computer Networks', 'Software Engineering']
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    description: 'Infrastructure, construction, and structural design',
    icon: Building,
    color: 'from-slate-600 via-gray-600 to-zinc-600',
    subjects: ['Structural Analysis', 'Concrete Technology', 'Transportation', 'Surveying']
  },
  {
    id: 'chemical',
    name: 'Chemical Engineering',
    shortName: 'CHEM',
    description: 'Process design, materials, and industrial chemistry',
    icon: FlaskConical,
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    subjects: ['Process Design', 'Thermodynamics', 'Fluid Mechanics', 'Reaction Engineering']
  },
  {
    id: 'electrical',
    name: 'Electrical Engineering',
    shortName: 'EE',
    description: 'Power systems, electronics, and electrical circuits',
    icon: Zap,
    color: 'from-amber-600 via-orange-600 to-red-600',
    subjects: ['Power Systems', 'Digital Electronics', 'Control Systems', 'Electromagnetic Theory']
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    shortName: 'ME',
    description: 'Machine design, manufacturing, and thermal systems',
    icon: Settings,
    color: 'from-blue-600 via-sky-600 to-indigo-600',
    subjects: ['Machine Design', 'Thermodynamics', 'Fluid Mechanics', 'Manufacturing']
  }
]

export const DepartmentsSection = () => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const analytics = useAnalyticsStore()
  const { departmentStats } = analytics.getAnalytics()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Engineering Departments
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium"
          >
            Access specialized study materials and resources for each engineering department
          </motion.p>
        </div>

        <div className="relative flex overflow-hidden w-full pb-12">
          {/* Gradient Edges using the background color (gray-50 / dark:gray-900) */}
          <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {[...DEPARTMENTS, ...DEPARTMENTS].map((dept, index) => {
              const stats = isMounted ? departmentStats[dept.id] : { students: 0, resources: 0, subjects: 0 }
              const Icon = dept.icon

              return (
                <div
                  key={`${dept.id}-${index}`}
                  onClick={() => router.push(`/resources?department=${dept.id}`)}
                  className="group cursor-pointer flex-shrink-0 w-60 md:w-72"
                >
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="card h-full p-6 flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:border-primary-500/30 transition-all duration-300"
                  >
                    <div className={`w-full h-24 bg-gradient-to-br ${dept.color} rounded-2xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden shadow-lg`}>
                      {/* Glossy overlay */}
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                      <Icon className="h-8 w-8 text-white relative z-10" />
                      <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md rounded-full px-2 py-0.5 font-bold text-[9px] text-white uppercase tracking-widest border border-white/20">
                        {dept.shortName}
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                      {dept.name}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-4 line-clamp-2 leading-relaxed font-medium min-h-[2.5rem]">
                      {dept.description}
                    </p>

                    <div className="space-y-1.5 mb-6 flex-1">
                      {dept.subjects.slice(0, 2).map((subject) => (
                        <div key={subject} className="flex items-center text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-bold group-hover:text-primary-500 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2 shadow-sm shadow-primary-500/50 flex-shrink-0" />
                          <span className="truncate">{subject}</span>
                        </div>
                      ))}
                      {dept.subjects.length > 2 && (
                        <div className="text-[9px] text-primary-600 dark:text-primary-400 font-black uppercase tracking-widest ml-3.5 pt-1">
                          +{dept.subjects.length - 2} more
                        </div>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-1 py-4 border-t border-b border-gray-50 dark:border-gray-700/50 mb-4 font-bold uppercase tracking-tight">
                      <div className="text-center">
                        <div className="text-xs md:text-sm text-gray-900 dark:text-white">{stats.students}</div>
                        <div className="text-[7px] md:text-[8px] text-gray-500">Students</div>
                      </div>
                      <div className="text-center border-l border-r border-gray-100 dark:border-gray-700">
                        <div className="text-xs md:text-sm text-gray-900 dark:text-white">{stats.resources}</div>
                        <div className="text-[7px] md:text-[8px] text-gray-500">Resources</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs md:text-sm text-gray-900 dark:text-white">{stats.subjects}</div>
                        <div className="text-[7px] md:text-[8px] text-gray-500">Subjects</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-xs md:text-sm font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/resources')}
            className="inline-flex items-center space-x-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-gray-200/50 dark:shadow-none hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 transition-all group"
          >
            <span>View All Departments</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
