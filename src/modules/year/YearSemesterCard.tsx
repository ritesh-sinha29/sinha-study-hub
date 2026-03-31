"use client";

import { motion } from 'framer-motion'
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'

interface Semester {
  id: string;
  title: string;
  subjects: string[];
  resources: number;
}

interface YearSemesterCardProps {
  semester: Semester;
  idx: number;
  yearId: string;
}

export const YearSemesterCard = ({ semester, idx, yearId }: YearSemesterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.15 }}
      className="card group p-0 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none hover:shadow-primary-500/10 transition-all duration-500 overflow-hidden"
    >
      <Link href={`/year/${yearId}/semester/${semester.id}`} className="block h-full">
        <div className="p-10 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative transition-all duration-500 group-hover:p-14">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-150 transition-transform duration-700 font-black text-6xl">
            {idx + 1}
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-black tracking-tight mb-2">{semester.title}</h3>
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                 <GraduationCap className="w-3 h-3" />
                 <span>Curriculum Pathway</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-primary-600 transition-all shadow-xl">
               <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-10 space-y-10">
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700 pb-8">
             <div className="space-y-1">
                <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{semester.resources}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resources Available</p>
             </div>
             <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl flex items-center justify-center text-primary-600 border border-gray-100 dark:border-gray-700 group-hover:rotate-12 transition-transform">
                <BookOpen className="w-6 h-6" />
             </div>
          </div>

          <div className="space-y-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-primary-600">Core Subjects</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {semester.subjects.slice(0, 4).map((subject, i) => (
                 <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 group-hover:border-primary-100 dark:group-hover:border-primary-900/50 transition-all group-hover:bg-white dark:group-hover:bg-gray-800">
                   <div className="w-2 h-2 rounded-full bg-primary-600 anima-pulse" />
                   <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                     {subject}
                   </span>
                 </div>
               ))}
             </div>
             {semester.subjects.length > 4 && (
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                   + {semester.subjects.length - 4} more specialized topics
                </p>
             )}
          </div>

          <div className="flex items-center space-x-2 text-primary-600 group-hover:translate-x-2 transition-transform pt-4">
             <span className="text-sm font-black tracking-tight">Explore the semester curriculum</span>
             <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
