"use client";

import { motion } from 'framer-motion'
import { Calendar, BookOpen, Users, TrendingUp, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface YearHeaderProps {
  currentYear: {
    title: string;
    description: string;
    semesters: any[];
  }
}

export const YearHeader = ({ currentYear }: YearHeaderProps) => {
  const router = useRouter()
  
  const stats = [
    { icon: Calendar, label: 'Semesters', value: currentYear.semesters.length.toString(), color: 'text-blue-600 bg-blue-50' },
    { icon: BookOpen, label: 'Total Resources', value: currentYear.semesters.reduce((acc, sem) => acc + sem.resources, 0).toString(), color: 'text-purple-600 bg-purple-50' },
    { icon: Users, label: 'Active Students', value: '2,450', color: 'text-green-600 bg-green-50' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%', color: 'text-orange-600 bg-orange-50' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-left gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
             <button onClick={() => router.push('/')} className="hover:text-primary-600 transition-colors">Home</button>
             <span>/</span>
             <span className="text-primary-600">{currentYear.title}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            Engineering <span className="text-primary-600">{currentYear.title}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
            {currentYear.description}
          </p>
        </div>
        
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl font-black transition-all border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none hover:bg-gray-50 active:scale-95 group"
        >
          <ChevronRight className="h-5 w-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
          <span>Change Year</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`card p-8 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden relative group`}
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
               <stat.icon className="w-24 h-24 text-gray-900 dark:text-white" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center p-3 shadow-lg group-hover:scale-110 transition-transform`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-1">{stat.value}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 m-1">{stat.label}</p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
