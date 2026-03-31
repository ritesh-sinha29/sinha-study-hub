"use client";

import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useForm } from 'react-hook-form'

interface ProfileForm {
  name: string
  email: string
  registrationId: string
  year: string
  branch: string
}

interface EditProfileFormProps {
  onCancel: () => void;
}

export const EditProfileForm = ({ onCancel }: EditProfileFormProps) => {
  const { user, updateProfile } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      registrationId: user?.registrationId || '',
      year: user?.year || '',
      branch: user?.branch || ''
    }
  })

  const years = ['First Year', 'Second Year', 'Third Year', 'Final Year']
  const branches = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Automobile Engineering'
  ]

  const onSubmit = (data: ProfileForm) => {
    updateProfile(data)
    onCancel() // Close form after successful update
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card p-8 mb-8 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none bg-white dark:bg-gray-800"
    >
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Edit Your Profile
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-xl transition-colors"
        >
          <X className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">
              Full Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-bold text-gray-900 dark:text-white"
            />
            {errors.name && (
              <p className="text-[10px] font-black uppercase text-red-500 ml-1 mt-1 font-mono tracking-widest">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">
              Email Address
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-bold text-gray-900 dark:text-white"
            />
            {errors.email && (
              <p className="text-[10px] font-black uppercase text-red-500 ml-1 mt-1 font-mono tracking-widest">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">
              Registration ID
            </label>
            <input
              {...register('registrationId', { required: 'Registration ID is required' })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-bold text-gray-900 dark:text-white"
            />
            {errors.registrationId && (
              <p className="text-[10px] font-black uppercase text-red-500 ml-1 mt-1 font-mono tracking-widest">{errors.registrationId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">
              Academic Year
            </label>
            <select
              {...register('year', { required: 'Year is required' })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-bold text-gray-900 dark:text-white appearance-none cursor-pointer"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && (
              <p className="text-[10px] font-black uppercase text-red-500 ml-1 mt-1 font-mono tracking-widest">{errors.year.message}</p>
            )}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">
              Engineering Branch
            </label>
            <select
              {...register('branch', { required: 'Branch is required' })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-bold text-gray-900 dark:text-white appearance-none cursor-pointer"
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            {errors.branch && (
              <p className="text-[10px] font-black uppercase text-red-500 ml-1 mt-1 font-mono tracking-widest">{errors.branch.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            type="submit" 
            className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-primary-500/20 active:scale-95 group"
          >
            <Save className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Update Profile</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 sm:flex-none px-10 py-5 border border-gray-200 dark:border-gray-700 rounded-2xl font-black text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all active:scale-95"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}
