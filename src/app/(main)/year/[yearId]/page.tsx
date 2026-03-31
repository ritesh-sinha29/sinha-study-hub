"use client";

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { YearHeader } from "@/modules/year/YearHeader"
import { YearSemesterCard } from "@/modules/year/YearSemesterCard"
import { YearAdditionalResources } from "@/modules/year/YearAdditionalResources"

const YearView = () => {
  const { yearId } = useParams()
  const router = useRouter()
  const year = yearId as string;

  const yearData = {
    'first-year': {
      title: 'First Year (FY)',
      description: 'The journey starts here. Build a rock-solid foundation with core engineering principles and interdisciplinary subjects.',
      semesters: [
        {
          id: 'semester-1',
          title: 'Semester 1',
          subjects: ['Maths 1', 'UHV', 'BME', 'BEE', 'EGD'],
          resources: 245
        },
        {
          id: 'semester-2',
          title: 'Semester 2',
          subjects: ['FAI', 'BE', 'Math 2', 'ETC', 'PPS', 'Physics'],
          resources: 198
        }
      ]
    },
    'second-year': {
      title: 'Second Year (SY)',
      description: 'Dive deep into your specialization. Master core engineering fundamentals, advanced programming, and specialized systems.',
      semesters: [
        {
          id: 'semester-3',
          title: 'Semester 3',
          subjects: ['Data Structures', 'Digital Electronics', 'Computer Organization', 'Discrete Mathematics', 'Object Oriented Programming'],
          resources: 312
        },
        {
          id: 'semester-4',
          title: 'Semester 4',
          subjects: ['Algorithms', 'Computer Networks', 'Operating Systems', 'Theory of Computation', 'Microprocessors'],
          resources: 289
        }
      ]
    },
    'third-year': {
      title: 'Third Year (TY)',
      description: 'Level up your expertise. Explore advanced technical topics, modern frameworks, and professional specialization tracks.',
      semesters: [
        {
          id: 'semester-5',
          title: 'Semester 5',
          subjects: ['Analysis of Algorithms', 'Computer Graphics', 'Web Tech', 'Compiler Design', 'Machine Learning'],
          resources: 267
        },
        {
          id: 'semester-6',
          title: 'Semester 6',
          subjects: ['AI', 'Mobile Computing', 'Cloud Computing', 'Big Data Analytics', 'IoT', 'Project-I'],
          resources: 234
        }
      ]
    },
    'final-year': {
      title: 'Final Year (BE)',
      description: 'Prepare for the industry. Focus on capstone projects, professional electives, and career-readiness mastery.',
      semesters: [
        {
          id: 'semester-7',
          title: 'Semester 7',
          subjects: ['Distributed Systems', 'Blockchain', 'NLP', 'Cyber Security', 'Elective-I', 'Project-II'],
          resources: 189
        },
        {
          id: 'semester-8',
          title: 'Semester 8',
          subjects: ['Industry Internship', 'Major Project', 'Seminar', 'Elective-II', 'Ethics'],
          resources: 156
        }
      ]
    }
  }

  const currentYear = yearData[year as keyof typeof yearData]

  if (!currentYear) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-50 p-12 rounded-[2.5rem] shadow-2xl max-w-md border border-gray-100">
          <h1 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Year Not Found</h1>
          <p className="text-gray-500 font-medium mb-8 leading-relaxed">The academic year you're trying to explore doesn't exist yet.</p>
          <button onClick={() => router.push('/')} className="px-10 py-4 bg-primary-600 text-white rounded-2xl font-black shadow-xl shadow-primary-500/20 active:scale-95 transition-all">Go Home</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <YearHeader currentYear={currentYear} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {currentYear.semesters.map((semester, index) => (
            <YearSemesterCard 
              key={semester.id} 
              semester={semester} 
              idx={index} 
              yearId={year} 
            />
          ))}
        </div>

        <YearAdditionalResources yearTitle={currentYear.title} />
      </div>
    </div>
  )
}

export default function Page() {
  return <YearView />
}
