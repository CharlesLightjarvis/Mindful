import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, GraduationCap, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { EnrolledCourse } from '@/types';

function EnrolledCourseCard({
    enrollment,
    index,
}: {
    enrollment: EnrolledCourse;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
        >
            <Card className="group flex h-full flex-col overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/60 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                    <img
                        src={enrollment.image ?? ''}
                        alt={enrollment.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {enrollment.category && (
                        <div className="absolute top-3 left-3">
                            <Badge
                                variant="secondary"
                                className="border-white/20 bg-white/10 text-white backdrop-blur"
                            >
                                {enrollment.category}
                            </Badge>
                        </div>
                    )}

                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/80 text-[10px] font-bold text-primary-foreground">
                            {enrollment.trainer_initials}
                        </div>
                        <span className="text-xs font-medium text-white/90">
                            {enrollment.trainer}
                        </span>
                    </div>
                </div>

                <CardContent className="flex flex-1 flex-col gap-3 p-4">
                    <div>
                        <h2 className="line-clamp-2 text-sm leading-snug font-semibold">
                            {enrollment.title}
                        </h2>
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {enrollment.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {enrollment.module_count} module
                            {enrollment.module_count > 1 ? 's' : ''}
                        </span>
                        <span>
                            {enrollment.lesson_count} leçon
                            {enrollment.lesson_count > 1 ? 's' : ''}
                        </span>
                    </div>

                    {enrollment.enrolled_at && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                            <Calendar className="h-3 w-3" />
                            <span>Inscrit le {enrollment.enrolled_at}</span>
                        </div>
                    )}

                    <div className="mt-auto pt-2">
                        <Button className="w-full gap-2" size="sm" asChild>
                            <Link
                                href={`/student/courses/${enrollment.course_id}`}
                            >
                                <PlayCircle className="h-4 w-4" />
                                Accéder au cours
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-lg font-semibold">
                Aucune formation achetée
            </h2>
            <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                Explorez notre catalogue et trouvez la formation qui correspond
                à vos objectifs.
            </p>
            <Button asChild>
                <Link href="/courses">Découvrir les formations</Link>
            </Button>
        </div>
    );
}

export default function StudentCoursesIndex() {
    const { enrollments } = usePage<{ enrollments: EnrolledCourse[] }>().props;

    return (
        <>
            <Head title="Mes formations" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Mes formations
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {enrollments.length > 0
                                ? `${enrollments.length} formation${enrollments.length > 1 ? 's' : ''} achetée${enrollments.length > 1 ? 's' : ''}`
                                : 'Aucune formation pour le moment'}
                        </p>
                    </div>
                </div>

                {enrollments.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {enrollments.map((enrollment, index) => (
                            <EnrolledCourseCard
                                key={enrollment.course_id}
                                enrollment={enrollment}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

StudentCoursesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Mes formations', href: '/student/courses' },
    ],
};
