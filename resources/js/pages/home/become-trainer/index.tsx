import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    Users,
    Shield,
    Zap,
    Globe,
    HeartHandshake,
} from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BecomeTrainerHeader } from './partials/become-trainer-header';
import { TrainerCard, type TrainerProfile } from './partials/trainer-card';
import type { Plan } from '@/types';

const benefits = [
    {
        icon: TrendingUp,
        title: 'Développez votre activité',
        description:
            "Publiez vos cours et touchez des milliers d'apprenants motivés partout dans le monde francophone.",
    },
    {
        icon: Users,
        title: 'Une communauté engagée',
        description:
            'Rejoignez une plateforme dédiée au bien-être avec des étudiants réellement investis dans leur transformation.',
    },
    {
        icon: Shield,
        title: 'Plateforme sécurisée',
        description:
            'Vos contenus sont protégés, vos paiements sécurisés et votre profil mis en valeur auprès des bons apprenants.',
    },
    {
        icon: Zap,
        title: 'Outils simples et puissants',
        description:
            'Créez et gérez vos formations facilement depuis votre dashboard dédié, sans compétence technique.',
    },
    {
        icon: Globe,
        title: 'Visibilité internationale',
        description:
            'Votre profil et vos cours sont référencés et promus auprès de notre communauté en constante croissance.',
    },
    {
        icon: HeartHandshake,
        title: 'Support dédié',
        description:
            'Notre équipe vous accompagne à chaque étape : onboarding, création de cours et développement de votre audience.',
    },
];

const steps = [
    {
        number: '01',
        title: 'Choisissez votre plan',
        description:
            'Sélectionnez l\'abonnement qui correspond à votre activité et cliquez sur "Choisir ce plan".',
    },
    {
        number: '02',
        title: 'Paiement sécurisé via Stripe',
        description:
            'Vous êtes redirigé sur Stripe pour saisir vos informations de paiement en toute sécurité.',
    },
    {
        number: '03',
        title: 'Réception de vos accès',
        description:
            'Dès le paiement confirmé, vous recevez un email avec vos identifiants pour accéder à votre espace.',
    },
    {
        number: '04',
        title: 'Publiez et développez',
        description:
            'Publiez vos formations, accueillez vos premiers étudiants et développez votre activité sur pMindfull.',
    },
];

const featuredTrainers: TrainerProfile[] = [
    {
        initials: 'SL',
        name: 'Sophie Lefèvre',
        specialty: 'Coach MBSR · Mindfulness',
        bio: 'Enseignante certifiée MBSR depuis 12 ans, Sophie a accompagné plus de 1 200 personnes dans leur pratique de la pleine conscience.',
        courseCount: 4,
        studentCount: '3 800+',
        rating: 4.9,
    },
    {
        initials: 'KM',
        name: 'Kiran Mehta',
        specialty: 'Praticien Ayurveda · Chakras',
        bio: 'Formé en Inde, Kiran enseigne la philosophie des chakras et les pratiques énergétiques depuis 18 ans.',
        courseCount: 6,
        studentCount: '5 100+',
        rating: 4.8,
    },
    {
        initials: 'VR',
        name: 'Valérie Renaud',
        specialty: 'Sophrologue certifiée RNCP',
        bio: 'Sophrologue diplômée depuis 15 ans, Valérie intervient en entreprise et accompagne des particuliers dans la gestion du stress.',
        courseCount: 3,
        studentCount: '2 100+',
        rating: 4.8,
    },
];

export default function BecomeTrainer() {
    const { auth, plans } = usePage<{ plans: Plan[] }>().props;

    function handleCheckout(slug: string) {
        if (!auth.user) {
            router.visit(`/become-trainer/checkout/${slug}`);
            return;
        }
        router.post('/become-trainer/checkout', { plan_slug: slug });
    }

    return (
        <div className="relative min-h-screen">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/[0.03] blur-[150px] dark:bg-primary/[0.06]" />
            </div>

            <div className="relative w-full px-4 py-10 md:px-6 lg:px-10">
                {/* Header */}
                <BecomeTrainerHeader />

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 grid gap-4 rounded-2xl border border-border/30 bg-background/60 p-6 backdrop-blur-sm sm:grid-cols-3 dark:border-border/60 dark:bg-background/70"
                >
                    {[
                        {
                            value: '10 000+',
                            label: 'Étudiants actifs',
                            detail: 'Communauté internationale',
                        },
                        {
                            value: '200+',
                            label: 'Formateurs certifiés',
                            detail: 'Experts bien-être',
                        },
                        {
                            value: '4.8/5',
                            label: 'Note moyenne',
                            detail: 'Satisfaction étudiants',
                        },
                    ].map((stat) => (
                        <div key={stat.label} className="space-y-1 text-center">
                            <div className="text-3xl font-semibold text-foreground">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-foreground/70">
                                {stat.label}
                            </div>
                            <div className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
                                {stat.detail}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Benefits */}
                <section className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                            Pourquoi nous rejoindre
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                            Les avantages d'enseigner sur pMindfull
                        </h2>
                    </motion.div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((benefit, i) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.07,
                                    }}
                                >
                                    <Card className="h-full border-border/40 bg-background/60 backdrop-blur-sm dark:border-border/50 dark:bg-background/50">
                                        <CardContent className="p-6">
                                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Icon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <h3 className="mb-2 font-semibold text-foreground">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-foreground/60">
                                                {benefit.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* How it works */}
                <section className="mb-20 rounded-3xl bg-muted/30 p-8 md:p-12 dark:bg-foreground/[0.02]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 text-center"
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                            Comment rejoindre
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                            4 étapes pour démarrer
                        </h2>
                    </motion.div>

                    <div className="relative grid gap-8 lg:grid-cols-4">
                        <div className="absolute top-[2.6rem] right-0 left-0 hidden h-px bg-border/50 lg:block" />
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                            >
                                <div className="relative z-10 mb-5 flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-2xl border border-border/40 bg-background backdrop-blur-sm dark:border-border/50 dark:bg-background/80">
                                    <span className="text-2xl font-bold text-primary/40">
                                        {step.number}
                                    </span>
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="mb-2 font-semibold text-foreground">
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-foreground/60">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Plans */}
                <section id="plans" className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 text-center"
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                            Tarifs formateurs
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                            Choisissez votre plan
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-foreground/60">
                            Tous les plans incluent l'accès à notre plateforme,
                            vos outils de création de cours et notre support.
                            Sans engagement, résiliable à tout moment.
                        </p>
                    </motion.div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                            >
                                <Card
                                    className={`relative h-full ${plan.highlight ? 'border-primary/50 bg-primary/5 dark:border-primary/40 dark:bg-primary/10' : 'border-border/40 bg-background/60 dark:border-border/50 dark:bg-background/50'} backdrop-blur-sm`}
                                >
                                    {plan.highlight && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                                                Le plus populaire
                                            </span>
                                        </div>
                                    )}
                                    <CardContent className="p-6">
                                        <p className="mb-1 text-sm font-semibold text-foreground">
                                            {plan.name}
                                        </p>
                                        <div className="mb-5 flex items-end gap-1">
                                            <span className="text-4xl font-bold text-foreground">
                                                {plan.formatted_price}
                                            </span>
                                            <span className="mb-1 text-sm text-foreground/50">
                                                /
                                                {plan.interval_label.toLowerCase()}
                                            </span>
                                        </div>
                                        <ul className="mb-6 space-y-2">
                                            {plan.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-2 text-sm text-foreground/70"
                                                >
                                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary/60" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className="w-full rounded-full"
                                            variant={
                                                plan.highlight
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            onClick={() =>
                                                handleCheckout(plan.slug)
                                            }
                                        >
                                            Choisir ce plan
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Featured trainers */}
                <section className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                            Nos formateurs
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                            Ils ont rejoint pMindfull
                        </h2>
                    </motion.div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredTrainers.map((trainer, i) => (
                            <TrainerCard
                                key={trainer.name}
                                trainer={trainer}
                                index={i}
                            />
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-border/40 bg-background/60 px-8 py-14 text-center backdrop-blur-sm md:px-16 dark:border-border/50 dark:bg-background/50"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                        Prêt à vous lancer ?
                    </div>
                    <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                        Rejoignez nos formateurs dès aujourd'hui
                    </h2>
                    <p className="mx-auto mb-8 max-w-lg text-foreground/60">
                        Soumettez votre candidature en moins de 5 minutes. Notre
                        équipe vous répond sous 48h pour valider votre profil et
                        vous accompagner dans vos premiers pas.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            className="group gap-2 rounded-full px-8 text-base tracking-[0.2em] uppercase"
                            onClick={() =>
                                document
                                    .getElementById('plans')
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }
                        >
                            Choisir mon abonnement
                            <ArrowRight
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="rounded-full"
                            asChild
                        >
                            <Link href="/contact">Nous contacter</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
