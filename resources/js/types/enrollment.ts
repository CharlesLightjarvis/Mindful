export type EnrolledCourse = {
    course_id: number;
    title: string;
    description: string | null;
    image: string | null;
    trainer: string;
    trainer_initials: string;
    category: string | null;
    module_count: number;
    lesson_count: number;
    enrolled_at: string | null;
};
