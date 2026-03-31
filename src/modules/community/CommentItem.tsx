"use client";

import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Reply, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

export interface DiscussionComment {
  id: string
  discussionId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
  upvotes: number
  downvotes: number
  replies: DiscussionComment[]
  userVotes: { [userId: string]: 'up' | 'down' | null }
}

interface CommentItemProps {
  comment: DiscussionComment;
  level?: number;
  user: any;
  onVote: (commentId: string, type: 'up' | 'down') => void;
  onReply: (parentId: string, content: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
}

export const CommentItem = ({ 
  comment, 
  level = 0, 
  user, 
  onVote, 
  onReply, 
  onEdit, 
  onDelete 
}: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isEditing, setIsEditing] = useState(true)
  const [editContent, setEditContent] = useState(comment.content)
  const [showEdit, setShowEdit] = useState(false)

  const isVotedUp = user && comment.userVotes[user.id] === 'up'
  const isVotedDown = user && comment.userVotes[user.id] === 'down'

  const handleReplySubmit = () => {
    if (!replyContent.trim()) return
    onReply(comment.id, replyContent)
    setReplyContent('')
    setIsReplying(false)
  }

  const handleEditSubmit = () => {
    if (!editContent.trim()) return
    onEdit(comment.id, editContent)
    setShowEdit(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={`${level > 0 ? 'ml-6 md:ml-12 border-l-2 border-gray-100 dark:border-gray-700 pl-4 md:pl-8 mt-6' : 'mt-8 border-t border-gray-50 dark:border-gray-700 pt-8'}`}>
      <div className="group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/10">
              <span className="text-white text-sm font-black">
                {comment.userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
                {comment.userName}
              </div>
              <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-0.5">
                {formatDate(comment.createdAt)}
              </div>
            </div>
          </div>

          {user && comment.userId === user.id && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {showEdit ? (
          <div className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-primary-500/10 outline-none text-sm font-medium text-gray-900 dark:text-white resize-none"
              rows={3}
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-black shadow-lg shadow-primary-500/20 active:scale-95"
              >
                Save
              </button>
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-xl text-xs font-black border border-gray-200 dark:border-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-600 dark:text-gray-300 mb-4 text-sm font-medium leading-relaxed bg-white dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-50 dark:border-gray-700/50 group-hover:border-primary-100 dark:group-hover:border-primary-900/30 transition-all">
            {comment.content}
          </div>
        )}

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => onVote(comment.id, 'up')}
                className={`p-2 rounded-xl transition-all ${isVotedUp ? 'bg-green-50 text-green-600 dark:bg-green-900/20 shadow-sm' : 'text-gray-400 hover:text-green-600'}`}
              >
                <ThumbsUp className="h-4 w-4" />
              </button>
              <span className={`text-xs font-black tracking-tight ${isVotedUp ? 'text-green-600' : 'text-gray-500'}`}>
                {comment.upvotes}
              </span>
              <button
                onClick={() => onVote(comment.id, 'down')}
                className={`p-2 rounded-xl transition-all ${isVotedDown ? 'bg-red-50 text-red-600 dark:bg-red-900/20 shadow-sm' : 'text-gray-400 hover:text-red-600'}`}
              >
                <ThumbsDown className="h-4 w-4" />
              </button>
            </div>
            
            {user && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-black transition-all ${isReplying ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 shadow-sm' : 'text-gray-500 hover:text-primary-600'}`}
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            )}
          </div>
        </div>

        {isReplying && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-primary-500/10 outline-none text-sm font-medium text-gray-900 dark:text-white resize-none"
              placeholder="What are your thoughts?"
              rows={3}
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReplySubmit}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-xs font-black shadow-lg shadow-primary-500/20 active:scale-95"
              >
                Post Reply
              </button>
              <button
                onClick={() => setIsReplying(false)}
                className="px-6 py-2.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-xl text-xs font-black border border-gray-200 dark:border-gray-600"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {comment.replies.length > 0 && (
          <div className="space-y-6">
            {comment.replies.map(reply => (
              <CommentItem 
                key={reply.id} 
                comment={reply} 
                level={level + 1} 
                user={user}
                onVote={onVote}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
