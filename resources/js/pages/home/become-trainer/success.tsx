import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BecomeTrainerSuccess() {
    return (
        <>
            <Head title="Inscription confirmée" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            Paiement confirmé !
                        </h1>
                        <p className="text-foreground/60">
                            Votre abonnement formateur est actif. Vous allez recevoir un email avec vos identifiants de connexion dans quelques instants.
                        </p>
                    </div>

                    <Button asChild className="rounded-full px-8">
                        <Link href="/login">Se connecter</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
