"use client";

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BookOpen, ChevronRight, GraduationCap, Laptop, Building2, FlaskConical } from 'lucide-react'

const YEAR_CARDS = [
  {
    id: 'first-year',
    title: 'First Year (FY)',
    description: 'Foundation courses and basic engineering subjects',
    path: '/year/first-year',
    color: 'from-blue-500 to-cyan-500',
    icon: GraduationCap,
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Engineering Graphics'],
    stats: { students: '3,500+', resources: '1,200+', subjects: 8 }
  },
  {
    id: 'second-year',
    title: 'Second Year (SY)',
    description: 'Core engineering fundamentals and programming',
    path: '/year/second-year',
    color: 'from-purple-500 to-pink-500',
    icon: Laptop,
    subjects: ['Data Structures', 'Digital Electronics', 'Thermodynamics', 'Mechanics'],
    stats: { students: '4,200+', resources: '1,800+', subjects: 10 }
  },
  {
    id: 'third-year',
    title: 'Third Year (TY)',
    description: 'Advanced topics and specialization subjects',
    path: '/year/third-year',
    color: 'from-green-500 to-teal-500',
    icon: Building2,
    subjects: ['Database Systems', 'Computer Networks', 'Software Engineering', 'Algorithms'],
    stats: { students: '3,800+', resources: '2,100+', subjects: 12 }
  },
  {
    id: 'final-year',
    title: 'Final Year (BE)',
    description: 'Capstone projects and industry-ready skills',
    path: '/year/final-year',
    color: 'from-orange-500 to-red-500',
    icon: FlaskConical,
    subjects: ['Machine Learning', 'Cloud Computing', 'Project Work', 'Internship'],
    stats: { students: '3,200+', resources: '1,900+', subjects: 8 }
  }
]

export const YearSelectionSection = () => {
  const router = useRouter()

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Academic Foundation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium"
          >
            Structured curriculum access for every step of your engineering journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {YEAR_CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="group cursor-pointer"
                onClick={() => router.push(card.path)}
              >
                <div className="card h-full p-8 relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-100/50 dark:shadow-none hover:border-primary-500/30 transition-all duration-500">
                  {/* Subtle hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed font-medium">
                    {card.description}
                  </p>

                  <div className="space-y-2 mb-8 flex-1">
                    {card.subjects.slice(0, 3).map((subject) => (
                      <div key={subject} className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-bold group-hover:text-primary-500 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mr-2.5 shadow-sm shadow-primary-500/20" />
                        <span className="truncate">{subject}</span>
                      </div>
                    ))}
                    {card.subjects.length > 3 && (
                      <div className="text-[10px] text-primary-600 font-black uppercase tracking-widest ml-4">
                        +{card.subjects.length - 3} more subjects
                      </div>
                    )}
                  </div>

                  {/* Year Stats */}
                  <div className="grid grid-cols-3 gap-2 py-6 border-t border-b border-gray-50 dark:border-gray-700/50 mb-6 font-bold uppercase tracking-tight">
                    <div className="text-center">
                      <div className="text-sm text-gray-900 dark:text-white">{card.stats.students}</div>
                      <div className="text-[8px] text-gray-400">Students</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-100 dark:border-gray-700">
                      <div className="text-sm text-gray-900 dark:text-white">{card.stats.resources}</div>
                      <div className="text-[8px] text-gray-400">Resources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-900 dark:text-white">{card.stats.subjects}</div>
                      <div className="text-[8px] text-gray-400">Subjects</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Year</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
