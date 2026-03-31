"use client";

import { motion } from 'framer-motion'
import { Calendar, ChevronRight } from 'lucide-react'

interface Semester {
  id: string;
  name: string;
  number: number;
  subjects: string[];
  stats: {
    students: string;
    resources: string;
    subjects: number;
  };
  color: string;
}

interface SemesterCardProps {
  semester: Semester;
  idx: number;
  onClick: (id: string) => void;
}

export const SemesterCard = ({ semester, idx, onClick }: SemesterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onClick={() => onClick(semester.id)}
      className="card group cursor-pointer p-0 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none hover:shadow-primary-500/10 transition-all duration-500"
    >
      <div className={`p-8 bg-gradient-to-br ${semester.color} text-white rounded-t-[2.5rem] relative overflow-hidden group-hover:p-12 transition-all duration-500`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
           <Calendar className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-3xl font-black tracking-tight">{semester.name}</h3>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </div>
          <p className="text-lg font-bold text-white/80">Semester {semester.number}</p>
        </div>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Students', value: semester.stats.students },
            { label: 'Resources', value: semester.stats.resources },
            { label: 'Subjects', value: semester.stats.subjects },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary-600">Core Subjects</p>
          <div className="flex flex-wrap gap-2">
            {semester.subjects.slice(0, 4).map((subject, i) => (
              <span key={i} className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 transition-colors group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:border-primary-100 dark:group-hover:border-primary-900/50">
                {subject}
              </span>
            ))}
            {semester.subjects.length > 4 && (
              <span className="px-4 py-2 bg-primary-100/50 dark:bg-primary-900/20 rounded-xl text-[10px] font-black text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-900/50">
                +{semester.subjects.length - 4} More
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
