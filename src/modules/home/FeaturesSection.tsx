"use client";

import { motion } from 'framer-motion'
import { FileText, Video, MessageSquare, Award } from 'lucide-react'

const FEATURES = [
  {
    icon: FileText,
    title: 'Comprehensive Notes',
    description: 'Handwritten and digital notes from top students and professors, verified for accuracy.',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
  },
  {
    icon: Video,
    title: 'Video Lectures',
    description: 'Curated video content from the best educators on YouTube, organized by subject.',
    color: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
  },
  {
    icon: MessageSquare,
    title: 'Community Support',
    description: 'Get help from peers, join study groups, and contribute to vibrant academic discussions.',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Earn points, badges, and recognition for your contributions and academic active participation.',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
  }
]

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1]"
          >
            Empowering Your <span className="text-primary-600">Learning</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium"
          >
            Everything you need to excel in your GTU journey, unified in one platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 ${feature.color} rounded-[2rem] mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-current/5`}>
                  <Icon className="h-9 w-9" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
