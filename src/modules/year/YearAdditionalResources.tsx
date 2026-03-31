"use client";

import { motion } from 'framer-motion'
import { BookOpen, Users, TrendingUp, ChevronRight } from 'lucide-react'

interface YearAdditionalResourcesProps {
  yearTitle: string;
}

export const YearAdditionalResources = ({ yearTitle }: YearAdditionalResourcesProps) => {
  const resources = [
    {
      title: 'Study Guides',
      description: 'Comprehensive study guides and exam preparation materials tailored for your year.',
      icon: BookOpen,
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      shadow: 'shadow-blue-500/10'
    },
    {
      title: 'Study Groups',
      description: 'Collaborate with your peers in dedicated groups for shared learning and support.',
      icon: Users,
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      shadow: 'shadow-green-500/10'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your academic journey and track your milestone achievements.',
      icon: TrendingUp,
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      shadow: 'shadow-purple-500/10'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mt-24 card p-12 md:p-16 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[3.5rem] overflow-hidden group"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 space-y-6 md:space-y-0 text-center md:text-left">
        <div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
             Elevate Your <span className="text-primary-600">Learning</span>
          </h2>
          <p className="text-xl text-gray-400 font-black uppercase tracking-widest leading-relaxed">
             Additional Resources for {yearTitle}
          </p>
        </div>
        <button className="flex items-center space-x-3 text-primary-600 font-black text-lg hover:translate-x-3 transition-transform group">
           <span>Explore all Hubs</span>
           <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {resources.map((res, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -15, scale: 1.02 }}
            className={`p-10 ${res.color} rounded-[2.5rem] border border-transparent hover:border-current transition-all cursor-pointer relative overflow-hidden group`}
          >
             <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-150 transition-transform duration-700">
               <res.icon className="w-32 h-32" />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-3xl flex items-center justify-center p-4 shadow-xl shadow-black/5 group-hover:rotate-12 transition-transform">
                   <res.icon className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-2xl font-black tracking-tight mb-3 text-gray-900 dark:text-white">{res.title}</h3>
                   <p className="text-sm font-medium opacity-80 leading-relaxed text-gray-700 dark:text-gray-300">
                     {res.description}
                   </p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
