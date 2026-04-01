"use client";

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const HeroSection = () => {
  const router = useRouter()

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Trusted by 10,000+ Students</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              Elevate Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 animate-gradient-x">
                GTU Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-blue-50/90 leading-relaxed font-medium">
              Your ultimate destination for curated study resources, vibrant community support, and academic excellence in engineering.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <button
              onClick={() => router.push('/resources')}
              className="w-full sm:w-auto bg-white text-primary-700 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-primary-900/20 active:scale-95 group text-sm md:text-base"
            >
              <span>Explore Resources</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push('/auth/register')}
              className="w-full sm:w-auto border border-white/30 backdrop-blur-sm text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-primary-700 transition-all flex items-center justify-center active:scale-95 shadow-lg text-sm md:text-base"
            >
              Join Our Community
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 -left-10 opacity-30 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-1/4 -right-10 opacity-30 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
            <Users className="h-16 w-16 text-white" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
