"use client";

import { useState } from 'react'
import { CommunityHeader } from "@/modules/community/CommunityHeader"
import { DiscussionCard, Discussion } from "@/modules/community/DiscussionCard"
import { CommunitySidebar } from "@/modules/community/CommunitySidebar"
import { NewDiscussionModal } from "@/modules/community/NewDiscussionModal"
import { useAuthStore } from '@/store/authStore'
import { useAnalyticsStore } from '@/store/analyticsStore'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const Community = () => {
  const { user, registeredUsers } = useAuthStore()
  const { getTopContributors, getHelpfulMembers, trackUserComment, trackUserVote } = useAnalyticsStore()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: '1',
      title: 'Best approach for learning Data Structures?',
      author: 'Priya Patel',
      subject: 'Data Structures',
      content: 'I\'m struggling with understanding the implementation of various data structures. Can anyone share their learning approach or recommend good resources?',
      replies: [
        {
          id: '1-1',
          discussionId: '1',
          userId: 'user2',
          userName: 'Rahul Shah',
          content: 'I found that implementing them from scratch really helps. Start with simple ones like arrays and linked lists, then move to trees and graphs.',
          createdAt: '2024-01-20T11:15:00Z',
          upvotes: 8,
          downvotes: 0,
          userVotes: {},
          replies: []
        },
        {
          id: '1-2',
          discussionId: '1',
          userId: 'user3',
          userName: 'Anjali Mehta',
          content: 'Visualization tools like VisuAlgo are amazing for understanding the concepts before coding.',
          createdAt: '2024-01-20T12:30:00Z',
          upvotes: 12,
          downvotes: 0,
          userVotes: {},
          replies: []
        }
      ],
      upvotes: 45,
      lastActivity: '2 hours ago',
      tags: ['algorithms', 'programming', 'study-tips'],
      showComments: false,
      userVotes: {}
    },
    {
      id: '2',
      title: 'DBMS Assignment Help - Normalization',
      author: 'Rahul Shah',
      subject: 'Database Management',
      content: 'I need help understanding normalization forms. Can someone explain 3NF with examples?',
      replies: [
        {
          id: '2-1',
          discussionId: '2',
          userId: 'user4',
          userName: 'Kiran Modi',
          content: '3NF means no transitive dependencies. Think of it as: if A→B and B→C, then A→C should not exist.',
          createdAt: '2024-01-20T10:45:00Z',
          upvotes: 6,
          downvotes: 0,
          userVotes: {},
          replies: []
        }
      ],
      upvotes: 28,
      lastActivity: '4 hours ago',
      tags: ['database', 'normalization', 'help'],
      showComments: false,
      userVotes: {}
    }
  ])

  // Mock static data for sidebar
  const recentAnswers = [
    {
      question: 'How to implement binary search tree?',
      author: 'Prof. Kumar',
      upvotes: 15
    },
    {
      question: 'Difference between SQL and NoSQL?',
      author: 'Ravi Joshi',
      upvotes: 12
    }
  ]

  const getUserName = (userId: string) => {
    const foundUser = registeredUsers.find(u => u.id === userId)
    return foundUser ? foundUser.name : `User ${userId.slice(-4)}`
  }

  const handleVote = (id: string, type: 'up') => {
    if (!user) return
    setDiscussions(prev => prev.map(d => d.id === id ? {
      ...d,
      upvotes: d.userVotes[user.id] === 'up' ? d.upvotes - 1 : d.upvotes + 1,
      userVotes: { ...d.userVotes, [user.id]: d.userVotes[user.id] === 'up' ? null : 'up' }
    } : d))
  }

  const handleCreateDiscussion = (data: { title: string; content: string; subject: string; tags: string }) => {
    if (!user) return
    const newDisc: Discussion = {
      id: Date.now().toString(),
      title: data.title,
      author: user.name,
      subject: data.subject,
      content: data.content,
      replies: [],
      upvotes: 0,
      lastActivity: 'Just now',
      tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
      showComments: false,
      userVotes: {}
    }
    setDiscussions(prev => [newDisc, ...prev])
    setShowModal(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-md">
          <h1 className="text-3xl font-black text-gray-900 mb-6">Join the Community</h1>
          <p className="text-gray-500 font-medium mb-8 leading-relaxed">Log in to collaborate with peers, ask questions, and share your academic journey.</p>
          <button onClick={() => router.push('/auth/login')} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black shadow-xl shadow-primary-500/20 active:scale-95 transition-all">Login Now</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommunityHeader onNewDiscussion={() => setShowModal(true)} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-8">
            {discussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                user={user}
                onVote={handleVote}
                onCommentVote={() => {}} // Integration placeholders
                onCommentReply={() => {}}
                onCommentEdit={() => {}}
                onCommentDelete={() => {}}
                onPostComment={() => {}}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CommunitySidebar
              topContributors={getTopContributors(5)}
              helpfulMembers={getHelpfulMembers(5)}
              recentAnswers={recentAnswers}
              getUserName={getUserName}
            />
          </div>
        </div>
      </div>

      <NewDiscussionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateDiscussion}
      />
    </div>
  )
}

export default function Page() {
  return <Community />
}
