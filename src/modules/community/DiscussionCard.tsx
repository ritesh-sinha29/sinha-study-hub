"use client";

import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, MessageSquare, Tag } from 'lucide-react'
import { CommentItem, DiscussionComment } from './CommentItem'
import { useState } from 'react'

export interface Discussion {
  id: string
  title: string
  author: string
  authorAvatar?: string
  subject: string
  content: string
  replies: DiscussionComment[]
  upvotes: number
  lastActivity: string
  tags: string[]
  showComments: boolean
  userVotes: { [userId: string]: 'up' | 'down' | null }
}

interface DiscussionCardProps {
  discussion: Discussion;
  user: any;
  onVote: (id: string, type: 'up') => void;
  onCommentVote: (id: string, type: 'up' | 'down') => void;
  onCommentReply: (parentId: string, content: string) => void;
  onCommentEdit: (id: string, content: string) => void;
  onCommentDelete: (id: string) => void;
  onPostComment: (id: string, content: string) => void;
}

export const DiscussionCard = ({
  discussion,
  user,
  onVote,
  onCommentVote,
  onCommentReply,
  onCommentEdit,
  onCommentDelete,
  onPostComment
}: DiscussionCardProps) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const isVotedUp = user && discussion.userVotes[user.id] === 'up'

  const handlePostComment = () => {
    if (!newComment.trim()) return
    onPostComment(discussion.id, newComment)
    setNewComment('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card p-8 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none mb-10 group hover:ring-2 hover:ring-primary-500/20 transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-secondary-600 to-secondary-400 rounded-2xl flex items-center justify-center shadow-xl shadow-secondary-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white text-xl font-black">
              {discussion.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-1 group-hover:text-primary-600 transition-colors">
              {discussion.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="text-gray-900 dark:text-gray-300">{discussion.author}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-primary-600">{discussion.subject}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{discussion.lastActivity}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => onVote(discussion.id, 'up')}
            className={`p-3 rounded-2xl transition-all shadow-lg ${isVotedUp ? 'bg-primary-600 text-white shadow-primary-500/30' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700'}`}
          >
            <ThumbsUp className={`h-6 w-6 ${isVotedUp ? 'fill-current' : ''}`} />
          </button>
          <span className="text-xs font-black mt-2 text-gray-900 dark:text-white">{discussion.upvotes}</span>
        </div>
      </div>

      <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 rounded-3xl mb-8 border border-gray-50 dark:border-gray-700/50 leading-relaxed font-medium text-gray-700 dark:text-gray-300">
        {discussion.content}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-gray-50 dark:border-gray-700 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          {discussion.tags.map((tag) => (
            <div key={tag} className="flex items-center space-x-1.5 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary-100 dark:border-primary-900/50">
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-black text-sm transition-all border ${showComments ? 'bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-500/20' : 'bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{discussion.replies.length} Replies</span>
        </button>
      </div>

      {/* Unified Search Comments Section Animation */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-12 space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center space-x-2">
                <span className="w-8 h-[2px] bg-primary-500" />
                <span>Join the conversation</span>
              </div>
              
              <div className="space-y-2">
                {discussion.replies.map(comment => (
                  <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    user={user}
                    onVote={onCommentVote}
                    onReply={onCommentReply}
                    onEdit={onCommentEdit}
                    onDelete={onCommentDelete}
                  />
                ))}
              </div>

              {user && (
                <div className="mt-12 space-y-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Write your answer</h4>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-primary-500/10 outline-none text-sm font-medium text-gray-900 dark:text-white resize-none shadow-sm"
                    placeholder="Contribute to the success of this thread..."
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handlePostComment}
                      className="px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black shadow-xl shadow-primary-500/20 transition-all active:scale-95"
                    >
                      Share Insights
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
