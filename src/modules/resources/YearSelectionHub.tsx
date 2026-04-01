"use client";

import { motion } from 'framer-motion'
import { BookOpen, Users, GraduationCap, ChevronRight, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface YearSelectionHubProps {
  departmentId: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ACADEMIC_YEARS = [
  {
    id: '1',
    shortName: 'First Year (FY)',
    fullName: 'First Year (FY)',
    description: 'Foundation courses and basic engineering subjects',
    semesters: ['Sem 1', 'Sem 2'],
    stats: {
      students: '3,500+',
      resources: '1,200+',
      subjectsCount: 8
    },
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '2',
    shortName: 'Second Year (SY)',
    fullName: 'Second Year (SY)',
    description: 'Core engineering fundamentals and programming',
    semesters: ['Sem 3', 'Sem 4'],
    stats: {
      students: '4,200+',
      resources: '1,800+',
      subjectsCount: 10
    },
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: '3',
    shortName: 'Third Year (TY)',
    fullName: 'Third Year (TY)',
    description: 'Advanced topics and specialization subjects',
    semesters: ['Sem 5', 'Sem 6'],
    stats: {
      students: '3,800+',
      resources: '2,100+',
      subjectsCount: 12
    },
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: '4',
    shortName: 'Final Year (BE)',
    fullName: 'Final Year (BE)',
    description: 'Capstone projects and industry-ready skills',
    semesters: ['Sem 7', 'Sem 8'],
    stats: {
      students: '3,100+',
      resources: '1,500+',
      subjectsCount: 8
    },
    color: 'from-emerald-500 to-emerald-600'
  }
]

export const YearSelectionHub = ({ departmentId, searchParams }: YearSelectionHubProps) => {
  const router = useRouter()
  const getLink = (year: string, semester?: string) => {
    const params = new URLSearchParams()
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          params.set(key, value)
        }
      })
    }
    params.set('year', year)
    if (semester) {
      params.set('semester', semester)
    }
    return `/resources?${params.toString()}`
  }

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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Choose Your Academic Year
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
          Access organized study materials, notes, and resources tailored for your current year
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {ACADEMIC_YEARS.map((year) => (
          <motion.div key={year.id} variants={item} whileHover={{ y: -12 }} className="h-full">
            <div
              className="block group h-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:border-primary-500/30 transition-all duration-500"
            >
              <div className={`h-2 bg-gradient-to-r ${year.color}`} />
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${year.color} text-white shadow-lg shadow-gray-200 dark:shadow-none`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-wider">Top Rated</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {year.shortName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  {year.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {year.semesters.map((sem) => (
                    <div 
                      key={sem} 
                      onClick={(e) => {
                        e.stopPropagation();
                        const semNum = sem.split(' ')[1];
                        router.push(getLink(year.id, `sem${semNum}`));
                      }}
                      className="px-4 py-5 rounded-2xl bg-gray-50/50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-center cursor-pointer hover:border-primary-500/40 transition-all duration-300 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-gray-700/50 active:scale-95"
                    >
                      <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{sem}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 py-6 border-t border-b border-gray-50 dark:border-gray-700/50">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{year.stats.students}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-tighter">Students</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{year.stats.resources}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-tighter">Resources</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{year.stats.subjectsCount}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-tighter">Subjects</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
