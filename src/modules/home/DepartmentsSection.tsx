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

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x px-4"
        >
          {DEPARTMENTS.map((dept) => {
            const stats = isMounted ? departmentStats[dept.id] : { students: 0, resources: 0, subjects: 0 }
            const Icon = dept.icon

            return (
              <motion.div
                key={dept.id}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  show: { opacity: 1, x: 0 }
                }}
                whileHover={{ y: -12, scale: 1.02 }}
                onClick={() => router.push(`/resources?department=${dept.id}`)}
                className="group cursor-pointer flex-shrink-0 w-72 md:w-80 snap-center"
              >
                <div className="card h-full p-8 flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:border-primary-500/30 transition-all duration-500">
                  <div className={`w-full h-32 bg-gradient-to-br ${dept.color} rounded-2xl mb-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden shadow-lg`}>
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                    <Icon className="h-10 w-10 text-white relative z-10" />
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 font-bold text-[10px] text-white uppercase tracking-widest border border-white/20">
                      {dept.shortName}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                    {dept.name}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                    {dept.description}
                  </p>

                  <div className="space-y-2 mb-8 flex-1">
                    {dept.subjects.slice(0, 2).map((subject) => (
                      <div key={subject} className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-bold group-hover:text-primary-500 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2.5 shadow-sm shadow-primary-500/50" />
                        <span className="truncate">{subject}</span>
                      </div>
                    ))}
                    {dept.subjects.length > 2 && (
                      <div className="text-[10px] text-primary-600 dark:text-primary-400 font-black uppercase tracking-widest ml-4">
                        +{dept.subjects.length - 2} more subjects
                      </div>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 py-6 border-t border-b border-gray-50 dark:border-gray-700/50 mb-6 font-bold uppercase tracking-tight">
                    <div className="text-center">
                      <div className="text-sm text-gray-900 dark:text-white">{stats.students}</div>
                      <div className="text-[8px] text-gray-500">Students</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-100 dark:border-gray-700">
                      <div className="text-sm text-gray-900 dark:text-white">{stats.resources}</div>
                      <div className="text-[8px] text-gray-500">Resources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-900 dark:text-white">{stats.subjects}</div>
                      <div className="text-[8px] text-gray-500">Subjects</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-sm font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Department</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

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
