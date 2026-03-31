"use client";

import { useState, useCallback, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { 
  Search, 
  Filter as FilterIcon, 
  Grid, 
  List, 
  ChevronDown,
  X
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { YEARS, SEMESTERS } from '../../lib/constants/resources'

interface FilterBarProps {
  initialViewMode: 'grid' | 'list';
  initialSearch: string;
  initialFilters: {
    year?: string;
    semester?: string;
    department?: string;
    type?: string;
  };
}

export const FilterBar = ({ 
  initialViewMode, 
  initialSearch, 
  initialFilters 
}: FilterBarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [showFilters, setShowFilters] = useState(false)
  const [localSearch, setLocalSearch] = useState(initialSearch)

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      
      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === '') {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      }
      
      return newParams.toString()
    },
    [searchParams]
  )

  const handleSearchChange = (value: string) => {
    setLocalSearch(value)
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ search: value })}`)
    })
  }

  const handleFilterChange = (key: string, value: string) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ [key]: value })}`)
    })
  }

  const toggleViewMode = (mode: 'grid' | 'list') => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ view: mode })}`)
    })
  }

  const viewMode = (searchParams.get('view') as 'grid' | 'list') || initialViewMode

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 group">
          <Search className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
            isPending ? "text-primary-500 animate-pulse" : "text-gray-400 group-focus-within:text-primary-500"
          )} />
          <input
            type="text"
            placeholder="Search by title, subject, or topic..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-3">
          {/* View Toggles */}
          <div className="flex items-center bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'grid' 
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" 
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              )}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => toggleViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' 
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" 
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center space-x-2 px-4 py-3 rounded-xl transition-all font-medium border shadow-sm",
              showFilters
                ? "bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
          >
            <FilterIcon className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Dropdown */}
      {showFilters && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-300">
          {/* Year Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <span>Filter by Year</span>
            </label>
            <div className="relative group">
              <select
                value={searchParams.get('year') || ''}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none text-sm"
              >
                <option value="">All Years</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-focus-within:text-primary-500 transition-colors" />
            </div>
          </div>

          {/* Semester Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Filter by Semester
            </label>
            <div className="relative group">
              <select
                value={searchParams.get('semester') || ''}
                onChange={(e) => handleFilterChange('semester', e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none text-sm"
              >
                <option value="">All Semesters</option>
                {SEMESTERS.map((semester, idx) => (
                  <option key={idx} value={`sem${idx + 1}`}>{semester}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-focus-within:text-primary-500 transition-colors" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
