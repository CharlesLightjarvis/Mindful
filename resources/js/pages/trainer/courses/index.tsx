import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import trainer from '@/routes/trainer';
import CourseList from './partials/course-list';
import type { Paginated } from '@/types/pagination';
import type { Course } from '@/types/course';

type Props = {
    courses: Paginated<Course>;
};

export default function CourseIndex() {
    const { courses } = usePage<Props>().props;

    return (
        <>
            <Head title="Mes formations" />

            <div className="container mx-auto space-y-6 p-4">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Mes formations
                    </h1>
                    <p className="text-muted-foreground">
                        Créez, modifiez et gérez vos formations.
                    </p>
                </div>

                <CourseList courses={courses} />
            </div>
        </>
    );
}

CourseIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: trainer.dashboard() },
        { title: 'Mes formations', href: trainer.courses.index() },
    ],
};
