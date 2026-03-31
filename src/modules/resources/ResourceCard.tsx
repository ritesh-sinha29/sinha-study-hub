"use client";

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Download, Eye, MessageSquare, Star } from 'lucide-react'
import { cn } from '../../utils/cn'
import { RESOURCE_TYPES, ENGINEERING_DEPARTMENTS, SEMESTER_MAP } from '../../lib/constants/resources'
import CommentSection from '../../components/CommentSection'
import { useResourceStore } from '../../store/resourceStore'
import { useAnalyticsStore } from '../../store/analyticsStore'

interface ResourceCardProps {
  resource: any;
  index: number;
  viewMode: 'grid' | 'list';
}

export const ResourceCard = ({
  resource,
  index,
  viewMode,
}: ResourceCardProps) => {
  const [showComments, setShowComments] = useState(false)
  const { favorites, toggleFavorite, downloadResource } = useResourceStore(state => ({
    favorites: state.favorites,
    toggleFavorite: (id: string) => state.favorites.includes(id) ? state.removeFromFavorites(id) : state.addToFavorites(id),
    downloadResource: state.downloadResource
  }))
  
  const analytics = useAnalyticsStore()
  
  const isFavorite = favorites.includes(resource._id || resource.id)
  const resourceType = RESOURCE_TYPES.find(rt => rt.value === resource.type)
  const Icon = resourceType?.icon || Star
  const iconColor = resourceType?.color || 'text-gray-600'

  const handleDownload = () => {
    if (resource.fileUrl) {
      downloadResource(resource._id || resource.id)
      const link = document.createElement('a')
      link.href = resource.fileUrl
      link.download = resource.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert('Download link not available')
    }
  }

  const handleWatch = () => {
    if (resource.videoUrl) {
      window.open(resource.videoUrl, '_blank')
    } else {
      alert('Video link not available')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "card p-6 group hover:shadow-xl transition-all duration-300",
        viewMode === 'list' && "flex items-center space-x-6"
      )}
    >
      {/* Thumbnail/Icon */}
      <div className={cn(
        "relative",
        viewMode === 'grid' ? "mb-4" : "flex-shrink-0"
      )}>
        {resource.thumbnailUrl ? (
          <img
            src={resource.thumbnailUrl}
            alt={resource.title}
            className={cn(
              "rounded-lg object-cover",
              viewMode === 'grid' ? "w-full h-48" : "w-24 h-24"
            )}
          />
        ) : (
          <div className={cn(
            "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center",
            viewMode === 'grid' ? "w-full h-48" : "w-24 h-24"
          )}>
            <Icon className={cn(
              "h-12 w-12",
              iconColor
            )} />
          </div>
        )}
        <div className="absolute top-2 left-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm">
          <Icon className={cn(
            "h-4 w-4",
            iconColor
          )} />
        </div>
        <button
          onClick={() => toggleFavorite(resource._id || resource.id)}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Heart className={cn(
            "h-4 w-4 transition-colors",
            isFavorite ? "text-red-500 fill-current" : "text-gray-400 hover:text-red-500"
          )} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {resource.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {resource.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[10px] font-bold uppercase tracking-wider rounded-md border border-primary-100 dark:border-primary-800">
            {resource.subject}
          </span>
          <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-100 dark:border-gray-700">
            {resource.year}
          </span>
          <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-100 dark:border-gray-700">
            {SEMESTER_MAP[resource.semester] || resource.semester}
          </span>
          {resource.department && (
            <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold uppercase tracking-wider rounded-md border border-green-100 dark:border-green-800">
              {ENGINEERING_DEPARTMENTS.find(d => d.id === resource.department)?.shortName || resource.department}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mb-5">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Download className="h-3.5 w-3.5" />
              <span>{resource.downloads || analytics.getResourceDownloads(resource._id || resource.id)}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
              <span>{resource.rating?.toFixed(1) || analytics.getResourceRating(resource._id || resource.id).averageRating.toFixed(1)}</span>
            </div>
            {resource.size && (
              <span className="opacity-60">{resource.size}</span>
            )}
          </div>
          <span className="italic">
            by {resource.uploadedBy}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {resource.fileUrl && (
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-primary-500/20 active:scale-95" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          )}
          {resource.videoUrl && (
            <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95" onClick={handleWatch}>
              <Eye className="h-4 w-4" />
              <span>Watch</span>
            </button>
          )}
          <button
            onClick={() => setShowComments(!showComments)}
            className={cn(
              "p-2 rounded-xl transition-all border active:scale-95",
              showComments 
                ? "bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400" 
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
            title="Discuss"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-300">
            <CommentSection
              resourceId={resource._id || resource.id}
              resourceTitle={resource.title}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
