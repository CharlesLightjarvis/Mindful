export type CourseLesson = {
    title: string
    duration: number
    free: boolean
}

export type CourseModule = {
    id: number
    title: string
    duration: number
    order: number
    lessons: CourseLesson[]
}

export type CourseTrainer = {
    name: string
    initials: string
    role: string | null
    bio: string | null
    courseCount?: number
    studentCount?: string
}

export type CourseObjective = {
    title: string
    description: string
}

export type CourseReview = {
    initials: string
    name: string
    role: string
    text: string
    rating: number
}

export type Course = {
    id: number
    title: string
    slug: string
    description: string
    price: string
    duration: number
    image: string
    featured: boolean
    category: string
    moduleCount: number
    lessonCount: number
    studentCount: number
    rating: number
    benefits: string[] | null
    objectives?: CourseObjective[]
    prerequisites: string[] | null
    trainer: CourseTrainer | null
    modules?: CourseModule[]
    reviews?: CourseReview[]
    is_enrolled: boolean
}
