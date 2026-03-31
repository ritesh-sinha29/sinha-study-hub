"use client";

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Zap, ArrowRight, Sparkles } from 'lucide-react'

export const CTASection = () => {
  const router = useRouter()

  return (
    <section className="py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white relative overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-400 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-yellow-400/20 backdrop-blur-md rounded-full border border-yellow-400/30 mb-8">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-xs font-black uppercase tracking-widest text-yellow-200">Start Your Success Journey</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight leading-[1.1]">
            Ready to Excel in Your <span className="text-blue-200">Studies?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-50 font-medium leading-relaxed">
            Join 10,000+ successful students and get instant access to premium GTU resources and community support.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={() => router.push('/auth/register')}
              className="w-full sm:w-auto bg-white text-primary-700 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary-900/30 hover:bg-blue-50 transition-all flex items-center justify-center space-x-3 active:scale-95 group"
            >
              <span>Get Started Free</span>
              <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500 group-hover:scale-125 transition-transform" />
            </button>
            <button
              onClick={() => router.push('/resources')}
              className="w-full sm:w-auto border-2 border-white/40 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-primary-700 transition-all flex items-center justify-center active:scale-95 shadow-xl group"
            >
              <span>Browse Resources</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
