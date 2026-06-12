import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CoursePurchaseSuccess() {
    return (
        <>
            <Head title="Achat confirmé" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-6 text-center">
                    <div className="flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Paiement confirmé !
                        </h1>
                        <p className="text-muted-foreground">
                            Votre accès à la formation a été activé. Vous pouvez dès maintenant accéder à vos cours.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button asChild className="gap-2 rounded-full px-8">
                            <Link href="/student/courses">
                                <GraduationCap className="h-4 w-4" />
                                Accéder à mes formations
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="rounded-full px-8">
                            <Link href="/courses">Continuer à explorer</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
