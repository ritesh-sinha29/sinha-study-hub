"use client";

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, BookOpen, ChevronRight, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  semester: {
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
  } | null;
  getSubjectDescription: (subject: string) => string;
}

export const SemesterModal = ({ isOpen, onClose, semester, getSubjectDescription }: SemesterModalProps) => {
  const router = useRouter()
  if (!semester) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 max-h-[90vh] overflow-y-auto"
          >
            <div className={`p-10 md:p-16 bg-gradient-to-br ${semester.color} text-white relative`}>
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-4 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all border border-white/20 group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
                <div className="p-6 rounded-[2.5rem] bg-white/20 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/10">
                  <Calendar className="w-12 h-12" />
                </div>
                <div>
                   <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{semester.name}</h2>
                   <p className="text-xl font-bold text-white/80 tracking-wide uppercase">Engineering Semester {semester.number}</p>
                </div>
              </div>
            </div>

            <div className="p-10 md:p-16 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Core Subjects', value: semester.stats.subjects, icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Active Students', value: semester.stats.students, icon: Award, color: 'text-purple-600 bg-purple-50' },
                    { label: 'Available Resources', value: semester.stats.resources, icon: ChevronRight, color: 'text-green-600 bg-green-50' },
                ].map((stat, idx) => (
                    <div key={idx} className={`${stat.color} p-6 rounded-[2rem] flex items-center space-x-6 border border-transparent hover:border-current transition-all group`}>
                        <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 m-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-1 bg-primary-600 rounded-full" />
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Curriculum Breakdown</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {semester.subjects.map((subject, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-6 bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-900/50 transition-all group hover:bg-white dark:hover:bg-gray-900"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 font-black text-primary-600 text-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 tracking-tight">{subject}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">
                                        "{getSubjectDescription(subject)}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4">
                <button
                    onClick={() => {
                        onClose()
                        router.push(`/resources?semester=${semester.id}`)
                    }}
                    className="flex-1 py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-[2rem] font-black text-lg transition-all shadow-xl shadow-primary-500/20 active:scale-95 group flex items-center justify-center space-x-4"
                >
                    <span>View Learning Resources</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                    onClick={onClose}
                    className="flex-1 py-5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-[2rem] font-bold text-lg transition-all border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95"
                >
                    Close Overview
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
