import { 
  BookOpen, 
  FileText, 
  Video, 
  HelpCircle, 
  Star, 
  Wrench, 
  ClipboardList,
  Cpu,
  Building,
  FlaskConical,
  Zap,
  Settings
} from 'lucide-react'

export const RESOURCE_TYPES = [
  { value: 'textbook', label: 'Textbooks', icon: BookOpen, color: 'text-blue-600' },
  { value: 'notes', label: 'Notes', icon: FileText, color: 'text-green-600' },
  { value: 'video', label: 'Videos', icon: Video, color: 'text-red-600' },
  { value: 'pyq', label: 'PYQs', icon: HelpCircle, color: 'text-purple-600' },
  { value: 'solution', label: 'Solutions', icon: Star, color: 'text-yellow-600' },
  { value: 'lab', label: 'Lab Manuals', icon: Wrench, color: 'text-orange-600' },
  { value: 'syllabus', label: 'Syllabus', icon: ClipboardList, color: 'text-pink-600' }
]

export const ENGINEERING_DEPARTMENTS = [
  {
    id: 'computer',
    name: 'Computer Engineering',
    shortName: 'CE',
    description: 'Software development, algorithms, and computer systems',
    icon: Cpu,
    color: 'from-indigo-600 via-purple-600 to-pink-600',
    subjects: ['Data Structures', 'Database Systems', 'Computer Networks', 'Software Engineering']
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    description: 'Infrastructure, construction, and structural design',
    icon: Building,
    color: 'from-slate-600 via-gray-600 to-zinc-600',
    subjects: ['Structural Analysis', 'Concrete Technology', 'Transportation', 'Surveying']
  },
  {
    id: 'chemical',
    name: 'Chemical Engineering',
    shortName: 'CHEM',
    description: 'Process design, materials, and industrial chemistry',
    icon: FlaskConical,
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    subjects: ['Process Design', 'Thermodynamics', 'Fluid Mechanics', 'Reaction Engineering']
  },
  {
    id: 'electrical',
    name: 'Electrical Engineering',
    shortName: 'EE',
    description: 'Power systems, electronics, and electrical circuits',
    icon: Zap,
    color: 'from-amber-600 via-orange-600 to-red-600',
    subjects: ['Power Systems', 'Digital Electronics', 'Control Systems', 'Electromagnetic Theory']
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    shortName: 'ME',
    description: 'Machine design, manufacturing, and thermal systems',
    icon: Settings,
    color: 'from-blue-600 via-sky-600 to-indigo-600',
    subjects: ['Machine Design', 'Thermodynamics', 'Fluid Mechanics', 'Manufacturing']
  }
]

export const YEARS = ['First Year', 'Second Year', 'Third Year', 'Final Year']
export const SEMESTERS = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8']

export const SEMESTER_MAP: { [key: string]: string } = {
  'sem1': 'Semester 1',
  'sem2': 'Semester 2',
  'sem3': 'Semester 3',
  'sem4': 'Semester 4',
  'sem5': 'Semester 5',
  'sem6': 'Semester 6',
  'sem7': 'Semester 7',
  'sem8': 'Semester 8'
}
