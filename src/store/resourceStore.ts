import { create } from 'zustand'
import { useAnalyticsStore } from './analyticsStore'
import { useAuthStore } from './authStore'

export interface Resource {
  id: string
  title: string
  type: 'textbook' | 'notes' | 'video' | 'pyq' | 'solution' | 'lab' | 'syllabus'
  subject: string
  year: string
  semester: string
  department?: string
  description: string
  fileUrl?: string
  videoUrl?: string
  thumbnailUrl?: string
  uploadedBy: string
  uploadedAt: string
  downloads: number
  rating: number
  tags: string[]
  size?: string
}

export interface Comment {
  id: string
  resourceId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
  upvotes: number
  downvotes: number
  replies: Comment[]
  userVotes: { [userId: string]: 'up' | 'down' | null } // Track user votes
}

interface ResourceState {
  resources: Resource[]
  comments: Comment[]
  favorites: string[]
  searchQuery: string
  filters: {
    year: string
    semester: string
    subject: string
    type: string
    department: string
  }
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<ResourceState['filters']>) => void
  addToFavorites: (resourceId: string) => void
  removeFromFavorites: (resourceId: string) => void
  addResource: (resource: Omit<Resource, 'id' | 'downloads' | 'rating' | 'uploadedAt'>) => void
  removeResource: (resourceId: string) => void
  downloadResource: (resourceId: string) => void
  rateResource: (resourceId: string, userId: string, rating: number) => void
  addComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'replies' | 'userVotes'>) => void
  addReply: (parentCommentId: string, reply: Omit<Comment, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'replies' | 'userVotes'>) => void
  updateComment: (commentId: string, newContent: string) => void
  deleteComment: (commentId: string) => void
  voteComment: (commentId: string, type: 'up' | 'down', userId: string) => void
}

// Mock data
const mockResources: Resource[] = []

// Mock comments data
const mockComments: Comment[] = []

export const useResourceStore = create<ResourceState>((set, get) => ({
  resources: mockResources,
  comments: mockComments,
  favorites: [],
  searchQuery: '',
  filters: {
    year: '',
    semester: '',
    subject: '',
    type: '',
    department: ''
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  addToFavorites: (resourceId) => set((state) => ({
    favorites: [...state.favorites, resourceId]
  })),

  removeFromFavorites: (resourceId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== resourceId)
  })),

  addResource: (resourceData) => {
    const analyticsStore = useAnalyticsStore.getState()
    const newResource: Resource = {
      ...resourceData,
      id: Date.now().toString(),
      downloads: 0,
      rating: 0,
      uploadedAt: new Date().toISOString()
    }

    set((state) => ({
      resources: [...state.resources, newResource]
    }))

    // Track resource addition in analytics
    analyticsStore.incrementResourceCount()

    // Track user resource upload for achievements
    analyticsStore.trackUserResourceUpload(resourceData.uploadedBy)

    // Update department stats if resource has a department
    if (resourceData.department) {
      const currentStats = analyticsStore.getDepartmentStats(resourceData.department)
      analyticsStore.updateDepartmentStats(resourceData.department, {
        resources: currentStats.resources + 1
      })
    }
  },

  removeResource: (resourceId) => {
    const analyticsStore = useAnalyticsStore.getState()

    set((state) => {
      const resourceToRemove = state.resources.find(r => r.id === resourceId)
      const newResources = state.resources.filter(r => r.id !== resourceId)

      // Track resource removal in analytics
      if (resourceToRemove) {
        analyticsStore.decrementResourceCount()

        // Update department stats if resource has a department
        if (resourceToRemove.department) {
          const currentStats = analyticsStore.getDepartmentStats(resourceToRemove.department)
          analyticsStore.updateDepartmentStats(resourceToRemove.department, {
            resources: Math.max(0, currentStats.resources - 1)
          })
        }
      }

      return { resources: newResources }
    })
  },

  downloadResource: (resourceId: string) => {
    const analyticsStore = useAnalyticsStore.getState()
    const authStore = useAuthStore.getState()

    set((state) => ({
      resources: state.resources.map(resource =>
        resource.id === resourceId
          ? { ...resource, downloads: resource.downloads + 1 }
          : resource
      )
    }))

    // Track download in analytics
    analyticsStore.incrementDownload(resourceId)

    // Track study activity for the current user (if logged in)
    if (authStore.user) {
      analyticsStore.trackUserDownload(authStore.user.id, resourceId)
      analyticsStore.trackStudyActivity(authStore.user.id)
    }
  },

  rateResource: (resourceId: string, userId: string, rating: number) => {
    const analyticsStore = useAnalyticsStore.getState()

    set((state) => ({
      resources: state.resources.map(resource =>
        resource.id === resourceId
          ? { ...resource, rating: rating }
          : resource
      )
    }))

    // Track rating in analytics
    analyticsStore.addRating(resourceId, userId, rating)
  },

  addComment: (commentData) => {
    console.log('ResourceStore: Adding comment:', commentData)
    const analyticsStore = useAnalyticsStore.getState()

    set((state) => ({
      comments: [...state.comments, {
        ...commentData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        userVotes: {},
        replies: []
      }]
    }))

    // Track user comment for achievements
    analyticsStore.trackUserComment(commentData.userId)
  },

  addReply: (parentCommentId, replyData) => {
    console.log('ResourceStore: Adding reply to comment:', parentCommentId, 'reply:', replyData)
    const analyticsStore = useAnalyticsStore.getState()

    set((state) => ({
      comments: state.comments.map(comment => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...comment.replies, {
              ...replyData,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              upvotes: 0,
              downvotes: 0,
              userVotes: {},
              replies: []
            }]
          }
        }
        return comment
      })
    }))

    // Track user comment for achievements
    analyticsStore.trackUserComment(replyData.userId)
  },

  updateComment: (commentId: string, newContent: string) => {
    set((state) => ({
      comments: state.comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content: newContent }
        }
        return comment
      })
    }))
  },

  deleteComment: (commentId: string) => {
    set((state) => ({
      comments: state.comments.filter(comment => comment.id !== commentId)
    }))
  },

  voteComment: (commentId: string, type: 'up' | 'down', userId: string) => {
    const analyticsStore = useAnalyticsStore.getState()

    set((state) => ({
      comments: state.comments.map(comment => {
        if (comment.id === commentId) {
          const currentVote = comment.userVotes[userId]
          let newUpvotes = comment.upvotes
          let newDownvotes = comment.downvotes
          const newUserVotes = { ...comment.userVotes }

          if (currentVote === type) {
            // Remove vote
            if (type === 'up') newUpvotes--
            else newDownvotes--
            newUserVotes[userId] = null
          } else {
            // Add or change vote
            if (currentVote === 'up') newUpvotes--
            else if (currentVote === 'down') newDownvotes--

            if (type === 'up') newUpvotes++
            else newDownvotes++
            newUserVotes[userId] = type
          }

          return {
            ...comment,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVotes: newUserVotes
          }
        }
        return comment
      })
    }))

    // Track user vote for achievements
    analyticsStore.trackUserVote(userId, commentId, type)
  }
}))