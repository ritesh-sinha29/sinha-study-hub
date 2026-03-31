"use client";

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Cpu, Building, FlaskConical, Zap, Settings } from 'lucide-react'
import { DepartmentHeader } from "@/modules/department/DepartmentHeader"
import { SemesterCard } from "@/modules/department/SemesterCard"
import { SemesterModal } from "@/modules/department/SemesterModal"

const DepartmentView = () => {
    const { departmentId } = useParams()
    const router = useRouter()
    const [selectedSemester, setSelectedSemester] = useState<any>(null)
    const [showModal, setShowModal] = useState(false)

    const departmentData = {
        computer: {
            name: 'Computer Engineering',
            shortName: 'CE',
            icon: Cpu,
            color: 'from-indigo-600 via-purple-600 to-pink-600',
            description: 'Master the art of software development, complex algorithms, and state-of-the-art computer systems.',
            stats: { students: '4,200+', resources: '2,100+', subjects: 15 }
        },
        civil: {
            name: 'Civil Engineering',
            shortName: 'CIVIL',
            icon: Building,
            color: 'from-slate-600 via-gray-600 to-zinc-600',
            description: 'Design the future through sustainable infrastructure, construction, and structural engineering.',
            stats: { students: '3,800+', resources: '1,900+', subjects: 12 }
        },
        chemical: {
            name: 'Chemical Engineering',
            shortName: 'CHEM',
            icon: FlaskConical,
            color: 'from-emerald-600 via-teal-600 to-cyan-600',
            description: 'Innovate with process design, advanced materials, and industrial chemistry solutions.',
            stats: { students: '2,500+', resources: '1,300+', subjects: 10 }
        },
        electrical: {
            name: 'Electrical Engineering',
            shortName: 'EE',
            icon: Zap,
            color: 'from-amber-600 via-orange-600 to-red-600',
            description: 'Power the world with expertise in power systems, electronics, and smart electrical circuits.',
            stats: { students: '3,600+', resources: '1,800+', subjects: 13 }
        },
        mechanical: {
            name: 'Mechanical Engineering',
            shortName: 'ME',
            icon: Settings,
            color: 'from-blue-600 via-sky-600 to-indigo-600',
            description: 'Engineer modern machines, advanced manufacturing, and high-efficiency thermal systems.',
            stats: { students: '3,900+', resources: '1,700+', subjects: 14 }
        }
    }

    const department = departmentData[departmentId as keyof typeof departmentData]

    const semesters = [
        {
            id: 'sem1',
            name: 'Semester 1',
            number: 1,
            subjects: ['Maths 1', 'UHV', 'BME', 'BEE', 'EGD'],
            stats: { students: '850+', resources: '420+', subjects: 5 },
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'sem2',
            name: 'Semester 2',
            number: 2,
            subjects: ['FAI', 'BE', 'Math 2', 'ETC', 'PPS', 'Physics'],
            stats: { students: '820+', resources: '380+', subjects: 6 },
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'sem3',
            name: 'Semester 3',
            number: 3,
            subjects: ['Data Structures', 'Object Oriented Programming', 'Digital Electronics', 'Computer Organization', 'Discrete Mathematics'],
            stats: { students: '780+', resources: '450+', subjects: 5 },
            color: 'from-green-500 to-teal-500'
        },
        {
            id: 'sem4',
            name: 'Semester 4',
            number: 4,
            subjects: ['Database Management Systems', 'Computer Networks', 'Operating Systems', 'Software Engineering', 'Computer Graphics'],
            stats: { students: '750+', resources: '420+', subjects: 5 },
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 'sem5',
            name: 'Semester 5',
            number: 5,
            subjects: ['Advanced Algorithms', 'Web Technologies', 'Mobile Computing', 'Artificial Intelligence', 'Computer Vision'],
            stats: { students: '720+', resources: '480+', subjects: 5 },
            color: 'from-indigo-500 to-purple-500'
        },
        {
            id: 'sem6',
            name: 'Semester 6',
            number: 6,
            subjects: ['Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Big Data Analytics', 'Internet of Things'],
            stats: { students: '690+', resources: '460+', subjects: 5 },
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: 'sem7',
            name: 'Semester 7',
            number: 7,
            subjects: ['Deep Learning', 'Blockchain Technology', 'DevOps', 'Project Management', 'Professional Ethics'],
            stats: { students: '650+', resources: '520+', subjects: 5 },
            color: 'from-yellow-500 to-orange-500'
        },
        {
            id: 'sem8',
            name: 'Semester 8',
            number: 8,
            subjects: ['Capstone Project', 'Industry Internship', 'Research Methodology', 'Entrepreneurship', 'Technical Writing'],
            stats: { students: '620+', resources: '580+', subjects: 5 },
            color: 'from-emerald-500 to-green-500'
        }
    ]

    const getSubjectDescription = (subject: string): string => {
        const descriptions: { [key: string]: string } = {
            'Maths 1': 'Engineering Mathematics covering calculus, linear algebra, and differential equations.',
            'UHV': 'Universal Human Values focusing on ethics, values, and professional conduct.',
            'BME': 'Basic Mechanical Engineering covering mechanics, materials, and manufacturing processes.',
            'BEE': 'Basic Electrical Engineering covering circuits, electronics, and electrical systems.',
            'EGD': 'Engineering Graphics & Design teaching technical drawing and CAD fundamentals.',
            'FAI': 'Fundamentals of Artificial Intelligence introducing AI concepts and machine learning basics.',
            'BE': 'Basic Electronics covering electronic components, circuits, and digital logic.',
            'Math 2': 'Advanced Engineering Mathematics including complex analysis and numerical methods.',
            'ETC': 'Electronic Technical Communication focusing on technical writing and presentation skills.',
            'PPS': 'Programming for Problem Solving teaching programming fundamentals and problem-solving techniques.',
            'Physics': 'Engineering Physics covering mechanics, thermodynamics, and wave phenomena.',
            'Data Structures': 'Fundamental data structures and algorithms for efficient problem solving.',
            'Object Oriented Programming': 'OOP concepts, design patterns, and software development principles.',
            'Digital Electronics': 'Digital logic design, Boolean algebra, and sequential circuits.',
            'Computer Organization': 'Computer architecture, memory systems, and processor design.',
            'Discrete Mathematics': 'Mathematical foundations for computer science and logic.',
            'Database Management Systems': 'Database design, SQL, and data management principles.',
            'Computer Networks': 'Network protocols, architecture, and communication systems.',
            'Operating Systems': 'OS concepts, process management, and system programming.',
            'Software Engineering': 'Software development lifecycle, methodologies, and project management.',
            'Computer Graphics': 'Graphics programming, rendering techniques, and visualization.',
            'Advanced Algorithms': 'Complex algorithms, optimization techniques, and computational complexity.',
            'Web Technologies': 'Web development, frameworks, and modern web applications.',
            'Mobile Computing': 'Mobile app development, platforms, and mobile technologies.',
            'Artificial Intelligence': 'AI algorithms, neural networks, and intelligent systems.',
            'Computer Vision': 'Image processing, pattern recognition, and computer vision applications.',
            'Machine Learning': 'ML algorithms, statistical learning, and predictive modeling.',
            'Cloud Computing': 'Cloud platforms, virtualization, and distributed systems.',
            'Cybersecurity': 'Security principles, cryptography, and network security.',
            'Big Data Analytics': 'Data processing, analytics, and big data technologies.',
            'Internet of Things': 'IoT architecture, sensors, and connected systems.',
            'Deep Learning': 'Neural networks, deep learning frameworks, and advanced AI applications.',
            'Blockchain Technology': 'Blockchain principles, cryptocurrencies, and distributed ledgers.',
            'DevOps': 'Development operations, CI/CD, and software deployment practices.',
            'Project Management': 'Project planning, execution, and management methodologies.',
            'Professional Ethics': 'Ethical considerations in technology and professional conduct.',
            'Capstone Project': 'Comprehensive project integrating all learned concepts and technologies.',
            'Industry Internship': 'Real-world industry experience and professional development.',
            'Research Methodology': 'Research methods, data analysis, and academic writing.',
            'Entrepreneurship': 'Business development, innovation, and startup fundamentals.',
            'Technical Writing': 'Technical documentation, communication, and writing skills.'
        }
        return descriptions[subject] || 'Core subject covering fundamental concepts and practical applications in computer engineering.'
    }

    if (!department) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-gray-50 p-12 rounded-[2.5rem] shadow-2xl max-w-md border border-gray-100">
                    <h1 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Department Not Found</h1>
                    <p className="text-gray-500 font-medium mb-8 leading-relaxed">The academic path you're looking for doesn't exist yet.</p>
                    <button onClick={() => router.push('/')} className="px-10 py-4 bg-primary-600 text-white rounded-2xl font-black shadow-xl shadow-primary-500/20 active:scale-95 transition-all">Go Home</button>
                </motion.div>
            </div>
        )
    }

    const handleSemesterClick = (semesterId: string) => {
        const semester = semesters.find(s => s.id === semesterId)
        if (semester) {
            setSelectedSemester(semester)
            setShowModal(true)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 pb-24">
            <DepartmentHeader department={department} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-16">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Academic Journey</h2>
                    <p className="text-xl text-gray-400 font-black uppercase tracking-widest">4 Years • 8 Semesters • Comprehensive Curriculum</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-12">
                    {semesters.map((semester, idx) => (
                        <SemesterCard 
                            key={semester.id} 
                            semester={semester} 
                            idx={idx} 
                            onClick={handleSemesterClick} 
                        />
                    ))}
                </div>

                {/* Quick Navigation Section */}
                <div className="mt-32 card p-12 bg-white dark:bg-gray-800 border-none shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[3rem]">
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-10 tracking-tight">Jump to Semester</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {semesters.map((semester) => (
                            <button
                                key={semester.id}
                                onClick={() => handleSemesterClick(semester.id)}
                                className="group p-6 rounded-3xl bg-gray-50 dark:bg-gray-900/50 hover:bg-primary-600 border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <p className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-white transition-colors">{semester.number}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60 transition-colors">Sem</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <SemesterModal 
                isOpen={showModal} 
                onClose={() => { setShowModal(false); setSelectedSemester(null); }} 
                semester={selectedSemester} 
                getSubjectDescription={getSubjectDescription} 
            />
        </div>
    )
}

export default function Page() {
    return <DepartmentView />
}
