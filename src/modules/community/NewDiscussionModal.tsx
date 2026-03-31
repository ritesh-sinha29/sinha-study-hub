"use client";

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, MessageSquare, Tag, BookOpen } from 'lucide-react'
import { useState } from 'react'

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (discussion: { title: string; content: string; subject: string; tags: string }) => void;
}

export const NewDiscussionModal = ({ isOpen, onClose, onSubmit }: NewDiscussionModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: '',
    tags: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim() || !formData.subject.trim()) return
    onSubmit(formData)
    setFormData({ title: '', content: '', subject: '', tags: '' })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl">
                    <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Start a <span className="text-primary-600">Discussion</span>
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-2xl transition-all group"
                >
                  <X className="h-6 w-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center space-x-2">
                    <Tag className="h-3 w-3" />
                    <span>Topic Title</span>
                  </label>
                  <input
                    autoFocus
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 rounded-3xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400/50 text-lg"
                    placeholder="e.g., Best resources for Computer Networks?"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center space-x-2">
                      <BookOpen className="h-3 w-3" />
                      <span>Subject</span>
                    </label>
                    <input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 rounded-3xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400/50"
                      placeholder="e.g., Computer Networks"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center space-x-2">
                      <Plus className="h-3 w-3" />
                      <span>Tags (comma separated)</span>
                    </label>
                    <input
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 rounded-3xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400/50"
                      placeholder="e.g., networking, gtu, study-tips"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center space-x-2">
                    <MessageSquare className="h-3 w-3" />
                    <span>Description</span>
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                    className="w-full px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 rounded-[2rem] outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400/50 resize-none leading-relaxed"
                    placeholder="Share the details of your question or topic..."
                  />
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-3xl font-black text-lg transition-all shadow-xl shadow-primary-500/20 active:scale-95 group flex items-center justify-center space-x-3"
                  >
                    <span>Create Discussion</span>
                    <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
