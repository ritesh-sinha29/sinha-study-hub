"use client";

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Priya Patel',
    year: 'Final Year CE',
    content: "SINHA'S STUDY HUB helped me ace my exams with their amazing PYQ collection and verified notes!",
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  },
  {
    name: 'Rahul Shah',
    year: 'Third Year IT',
    content: 'The community here is so supportive. Got help with my doubts instantly during finals week.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
  },
  {
    name: 'Anjali Mehta',
    year: 'Second Year EC',
    content: 'Best platform for GTU students. The notes are comprehensive and incredibly well-organized.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali'
  }
]

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800 relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative">
          <Quote className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-10 h-24 w-24 text-primary-500" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1]"
          >
            Student <span className="text-secondary-600">Success</span> Stories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium"
          >
            Join thousands of successful GTU students already using our platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="card h-full p-8 bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none relative group-hover:border-secondary-500/30 transition-all duration-500">
                <div className="flex items-center mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-8 italic text-lg leading-relaxed font-medium">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-100 bg-gray-100 mr-4 shadow-sm">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                      {testimonial.year}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
