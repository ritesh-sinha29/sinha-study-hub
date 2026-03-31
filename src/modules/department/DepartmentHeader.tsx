"use client";

import { motion } from 'framer-motion'
import { ArrowLeft, Users, BookOpen, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DepartmentHeaderProps {
  department: {
    name: string;
    description: string;
    icon: any;
    color: string;
    stats: {
      students: string;
      resources: string;
      subjects: number;
    };
  }
}

export const DepartmentHeader = ({ department }: DepartmentHeaderProps) => {
  const router = useRouter()
  const IconComponent = department.icon

  return (
    <div className={`bg-gradient-to-r ${department.color} text-white py-16 shadow-2xl relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-8 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/')}
              className="p-4 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all border border-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="p-5 rounded-[2rem] bg-white text-gray-900 shadow-xl shadow-black/10 rotate-3 animate-pulse-slow">
                <IconComponent className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3">
                  {department.name}
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  {department.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {[
              { icon: Users, label: 'Active Students', value: department.stats.students },
              { icon: BookOpen, label: 'Resources', value: department.stats.resources },
              { icon: Star, label: 'Subjects', value: department.stats.subjects },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 min-w-[140px] text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-white/70" />
                <p className="text-2xl font-black mb-1">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
