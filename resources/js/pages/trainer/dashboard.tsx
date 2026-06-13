import { Head, usePage } from '@inertiajs/react';
import { BookOpen, CheckCircle, GraduationCap } from 'lucide-react';
import trainer from '@/routes/trainer';

type Props = {
    stats: {
        totalCourses: number;
        totalStudents: number;
        publishedCourses: number;
    };
};

export default function TrainerDashboard() {
    const { stats } = usePage<Props>().props;

    const cards = [
        { label: 'Mes formations', value: stats.totalCourses, icon: BookOpen },
        { label: 'Publiées', value: stats.publishedCourses, icon: CheckCircle },
        { label: 'Étudiants inscrits', value: stats.totalStudents, icon: GraduationCap },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="container mx-auto space-y-6 p-4">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Bienvenue sur votre espace formateur.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {cards.map(({ label, value, icon: Icon }) => (
                        <div
                            key={label}
                            className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="mt-2 text-3xl font-bold">{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

TrainerDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: trainer.dashboard() }],
};
