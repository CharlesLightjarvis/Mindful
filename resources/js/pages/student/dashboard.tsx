import { Head, usePage } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import student from '@/routes/student';

type Props = {
    stats: {
        enrolledCourses: number;
    };
};

export default function StudentDashboard() {
    const { stats } = usePage<Props>().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="container mx-auto space-y-6 p-4">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Bienvenue sur votre espace étudiant.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">Formations suivies</p>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="mt-2 text-3xl font-bold">{stats.enrolledCourses}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

StudentDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: student.dashboard() }],
};
