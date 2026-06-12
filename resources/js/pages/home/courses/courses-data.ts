import { CheckCircle2 } from 'lucide-react';

export type CourseLesson = {
    title: string;
    duration: string;
    free?: boolean;
};

export type CourseModule = {
    number: number;
    title: string;
    duration: string;
    lessons: CourseLesson[];
};

export type CourseTrainer = {
    initials: string;
    name: string;
    role: string;
    bio?: string;
    courseCount?: number;
    studentCount?: string;
};

export type CourseObjective = {
    icon: typeof CheckCircle2;
    title: string;
    description: string;
};

export type CourseReview = {
    initials: string;
    name: string;
    role: string;
    text: string;
    rating: number;
};

export type Course = {
    id: number;
    image: string;
    category: string;
    title: string;
    description: string;
    price: string;
    duration: string;
    language: string;
    studentCount: number;
    moduleCount: number;
    rating: number;
    featured?: boolean;
    benefits?: string[];
    modules?: CourseModule[];
    trainer?: CourseTrainer;
    objectives?: CourseObjective[];
    prerequisites?: string[];
    reviews?: CourseReview[];
};

export const allCourses: Course[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        category: 'Mindfulness',
        title: 'Introduction au Mindfulness : Vivre le Moment Présent',
        description:
            'Découvrez les fondamentaux de la pleine conscience pour réduire le stress, améliorer votre concentration et retrouver la sérénité au quotidien.',
        price: '29 €',
        duration: '6h de contenu',
        language: 'Français',
        studentCount: 1248,
        moduleCount: 5,
        rating: 4.9,
        featured: true,
        benefits: [
            'Accès à vie',
            '6h de vidéos guidées',
            'Exercices de pleine conscience',
            'Méditations audio incluses',
            'Attestation de complétion',
        ],
        modules: [
            {
                number: 1,
                title: "Qu'est-ce que le mindfulness ?",
                duration: '45 min',
                lessons: [
                    {
                        title: 'Histoire et origines de la pleine conscience',
                        duration: '10 min',
                        free: true,
                    },
                    {
                        title: 'Les bénéfices prouvés par la science',
                        duration: '12 min',
                        free: true,
                    },
                    {
                        title: 'Les idées reçues sur la méditation',
                        duration: '8 min',
                    },
                    {
                        title: 'Installer sa pratique au quotidien',
                        duration: '15 min',
                    },
                ],
            },
            {
                number: 2,
                title: 'La respiration consciente',
                duration: '1h 10 min',
                lessons: [
                    { title: 'La respiration comme ancre', duration: '15 min' },
                    {
                        title: 'Techniques : 4-7-8 et cohérence cardiaque',
                        duration: '20 min',
                    },
                    {
                        title: 'Pratique guidée : 10 minutes de respiration',
                        duration: '10 min',
                    },
                    {
                        title: 'Intégrer la respiration consciente dans la journée',
                        duration: '25 min',
                    },
                ],
            },
            {
                number: 3,
                title: 'Scan corporel et ancrage',
                duration: '1h 05 min',
                lessons: [
                    {
                        title: 'Comprendre le scan corporel',
                        duration: '10 min',
                    },
                    {
                        title: 'Pratique guidée : scan corporel complet',
                        duration: '25 min',
                    },
                    {
                        title: "Techniques d'ancrage rapide",
                        duration: '15 min',
                    },
                    {
                        title: "Exercices d'ancrage au quotidien",
                        duration: '15 min',
                    },
                ],
            },
            {
                number: 4,
                title: 'Gestion des émotions et des pensées',
                duration: '1h 20 min',
                lessons: [
                    {
                        title: "Observer ses pensées sans s'y identifier",
                        duration: '18 min',
                    },
                    {
                        title: "L'accueil des émotions difficiles",
                        duration: '20 min',
                    },
                    {
                        title: 'Pratique RAIN (Reconnaître, Accueillir, Investiguer, Nourrir)',
                        duration: '22 min',
                    },
                    {
                        title: 'Journal mindfulness : exercice pratique',
                        duration: '20 min',
                    },
                ],
            },
            {
                number: 5,
                title: 'Construire une pratique durable',
                duration: '1h 40 min',
                lessons: [
                    {
                        title: 'Créer sa routine de méditation',
                        duration: '20 min',
                    },
                    {
                        title: 'Surmonter les obstacles à la pratique',
                        duration: '25 min',
                    },
                    {
                        title: 'Méditation en mouvement et pleine conscience informelle',
                        duration: '30 min',
                    },
                    {
                        title: "Plan d'action personnel : 30 jours de mindfulness",
                        duration: '25 min',
                    },
                ],
            },
        ],
        trainer: {
            initials: 'SL',
            name: 'Sophie Lefèvre',
            role: 'Coach certifiée MBSR · Praticienne mindfulness depuis 12 ans',
            bio: "Sophie est enseignante certifiée MBSR (Mindfulness-Based Stress Reduction) formée à l'université de Bangor. Elle accompagne plus de 1 200 personnes dans leur pratique de la pleine conscience.",
            courseCount: 4,
            studentCount: '3 800+',
        },
        objectives: [
            {
                icon: CheckCircle2,
                title: 'Réduire le stress',
                description:
                    "Appliquer des techniques de pleine conscience pour apaiser le système nerveux et diminuer l'anxiété.",
            },
            {
                icon: CheckCircle2,
                title: 'Améliorer la concentration',
                description:
                    "Entraîner votre attention pour mieux vous focaliser sur l'essentiel au quotidien.",
            },
            {
                icon: CheckCircle2,
                title: 'Gérer vos émotions',
                description:
                    'Développer une relation saine avec vos pensées et émotions sans vous y laisser emporter.',
            },
            {
                icon: CheckCircle2,
                title: 'Créer une pratique durable',
                description:
                    'Mettre en place une routine de méditation réaliste et adaptée à votre vie.',
            },
        ],
        prerequisites: [
            'Aucun prérequis',
            'Ouvert à tous, débutants bienvenus',
            'Aucun matériel nécessaire',
        ],
        reviews: [
            {
                initials: 'AM',
                name: 'Amélie M.',
                role: 'Infirmière — Paris',
                text: 'Ce cours a changé ma façon de gérer le stress au travail. Après 3 semaines de pratique, je me sens beaucoup plus sereine.',
                rating: 5,
            },
            {
                initials: 'TC',
                name: 'Thomas C.',
                role: 'Entrepreneur — Lyon',
                text: 'Simple, accessible et profond à la fois. Sophie explique avec une clarté remarquable. Je recommande à 100 %.',
                rating: 5,
            },
            {
                initials: 'NB',
                name: 'Nathalie B.',
                role: 'Mère de famille — Bordeaux',
                text: "J'avais essayé plusieurs applis de méditation sans succès. Ce cours m'a vraiment donné les bases pour pratiquer régulièrement.",
                rating: 4,
            },
        ],
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        category: 'Chakras',
        title: 'Équilibrage des 7 Chakras : Énergie et Harmonie',
        description:
            'Plongez dans la science ancestrale des chakras. Apprenez à identifier, équilibrer et activer vos centres énergétiques pour retrouver harmonie et vitalité.',
        price: '49 €',
        duration: '9h de contenu',
        language: 'Français',
        studentCount: 876,
        moduleCount: 7,
        rating: 4.8,
        benefits: [
            'Accès à vie',
            '9h de vidéos',
            'Méditations chakras guidées',
            'Fiches pratiques PDF',
            'Attestation de complétion',
        ],
        modules: [
            {
                number: 1,
                title: 'Introduction aux chakras',
                duration: '50 min',
                lessons: [
                    {
                        title: "Qu'est-ce qu'un chakra ?",
                        duration: '12 min',
                        free: true,
                    },
                    {
                        title: 'Le système énergétique humain',
                        duration: '15 min',
                        free: true,
                    },
                    {
                        title: 'Comment détecter un chakra bloqué',
                        duration: '23 min',
                    },
                ],
            },
            {
                number: 2,
                title: 'Muladhara — Chakra Racine',
                duration: '1h 15 min',
                lessons: [
                    {
                        title: 'Comprendre le chakra racine',
                        duration: '20 min',
                    },
                    {
                        title: 'Signes de déséquilibre et causes',
                        duration: '15 min',
                    },
                    {
                        title: "Pratiques d'ancrage et méditation guidée",
                        duration: '40 min',
                    },
                ],
            },
            {
                number: 3,
                title: 'Svadhisthana — Chakra Sacré',
                duration: '1h 10 min',
                lessons: [
                    {
                        title: 'Énergie créatrice et émotionnelle',
                        duration: '20 min',
                    },
                    {
                        title: 'Libérer les blocages du chakra sacré',
                        duration: '25 min',
                    },
                    {
                        title: 'Méditation et mouvement sacré',
                        duration: '25 min',
                    },
                ],
            },
            {
                number: 4,
                title: 'Manipura — Plexus Solaire',
                duration: '1h',
                lessons: [
                    {
                        title: 'Le siège du pouvoir personnel',
                        duration: '18 min',
                    },
                    {
                        title: 'Renforcer la confiance et la volonté',
                        duration: '22 min',
                    },
                    { title: 'Méditation feu intérieur', duration: '20 min' },
                ],
            },
            {
                number: 5,
                title: 'Anahata — Chakra Cœur',
                duration: '1h 20 min',
                lessons: [
                    {
                        title: "L'amour inconditionnel et l'ouverture du cœur",
                        duration: '20 min',
                    },
                    {
                        title: 'Guérir les blessures émotionnelles',
                        duration: '30 min',
                    },
                    {
                        title: 'Méditation metta (bienveillance aimante)',
                        duration: '30 min',
                    },
                ],
            },
            {
                number: 6,
                title: 'Vishuddha, Ajna & Sahasrara',
                duration: '2h',
                lessons: [
                    {
                        title: 'Chakra gorge : exprimer sa vérité',
                        duration: '35 min',
                    },
                    {
                        title: 'Chakra troisième œil : intuition et clarté',
                        duration: '35 min',
                    },
                    {
                        title: 'Chakra couronne : connexion spirituelle',
                        duration: '50 min',
                    },
                ],
            },
            {
                number: 7,
                title: 'Pratique intégrative complète',
                duration: '1h 25 min',
                lessons: [
                    {
                        title: "Séquence d'équilibrage global des 7 chakras",
                        duration: '45 min',
                    },
                    {
                        title: 'Créer son rituel énergétique quotidien',
                        duration: '40 min',
                    },
                ],
            },
        ],
        trainer: {
            initials: 'KM',
            name: 'Kiran Mehta',
            role: 'Praticien Ayurveda · Enseignant de yoga et chakras depuis 18 ans',
            bio: "Formé en Inde à l'école de yoga Sivananda, Kiran enseigne la philosophie des chakras et les pratiques énergétiques en Europe depuis 2006. Il a accompagné plus de 2 500 élèves.",
            courseCount: 6,
            studentCount: '5 100+',
        },
        objectives: [
            {
                icon: CheckCircle2,
                title: 'Comprendre vos chakras',
                description:
                    'Identifier chacun des 7 centres énergétiques et leur rôle dans votre santé physique et émotionnelle.',
            },
            {
                icon: CheckCircle2,
                title: 'Détecter les blocages',
                description:
                    "Reconnaître les signes d'un chakra déséquilibré et comprendre les causes profondes.",
            },
            {
                icon: CheckCircle2,
                title: "Pratiquer l'équilibrage",
                description:
                    'Utiliser méditation, sons, visualisations et postures pour rééquilibrer votre énergie.',
            },
            {
                icon: CheckCircle2,
                title: 'Créer votre rituel',
                description:
                    "Mettre en place une pratique quotidienne d'entretien énergétique adaptée à votre vie.",
            },
        ],
        prerequisites: [
            'Notions de base en méditation souhaitées',
            'Ouvert aux débutants motivés',
        ],
        reviews: [
            {
                initials: 'CL',
                name: 'Claire L.',
                role: 'Thérapeute — Genève',
                text: "Une formation d'une richesse exceptionnelle. Kiran transmet avec une profondeur et une bienveillance rares.",
                rating: 5,
            },
            {
                initials: 'RB',
                name: 'Romain B.',
                role: 'Ingénieur — Toulouse',
                text: "Sceptique au départ, j'ai été surpris par la précision et la clarté des explications. Les méditations guidées sont puissantes.",
                rating: 5,
            },
        ],
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
        category: 'Yoga',
        title: 'Yoga Vinyasa : Fluidité, Force et Conscience',
        description:
            'Développez votre pratique du yoga Vinyasa avec des séquences dynamiques adaptées à tous niveaux. Unissez mouvement, respiration et présence.',
        price: '39 €',
        duration: '12h de contenu',
        language: 'Français',
        studentCount: 2105,
        moduleCount: 8,
        rating: 4.7,
        benefits: [
            'Accès à vie',
            '12h de séances vidéo',
            'Guide des postures PDF',
            'Programme 8 semaines inclus',
            'Attestation de complétion',
        ],
        modules: [
            {
                number: 1,
                title: 'Fondamentaux du Vinyasa',
                duration: '1h 30 min',
                lessons: [
                    {
                        title: 'La philosophie du Vinyasa',
                        duration: '15 min',
                        free: true,
                    },
                    {
                        title: 'La salutation au soleil A',
                        duration: '30 min',
                        free: true,
                    },
                    { title: 'La salutation au soleil B', duration: '45 min' },
                ],
            },
            {
                number: 2,
                title: 'Postures debout',
                duration: '2h',
                lessons: [
                    { title: 'Guerrier I, II, III', duration: '45 min' },
                    {
                        title: "Triangle et postures d'équilibre",
                        duration: '45 min',
                    },
                    { title: 'Séquence debout complète', duration: '30 min' },
                ],
            },
            {
                number: 3,
                title: 'Postures au sol et inversions douces',
                duration: '1h 45 min',
                lessons: [
                    {
                        title: 'Postures assises et torsions',
                        duration: '40 min',
                    },
                    {
                        title: 'Chien tête en bas, enfant, cobra',
                        duration: '35 min',
                    },
                    {
                        title: 'Introduction aux inversions',
                        duration: '30 min',
                    },
                ],
            },
        ],
        trainer: {
            initials: 'ML',
            name: 'Marie-Laure Dubois',
            role: 'Professeure de yoga certifiée RYT-500 · Spécialiste Vinyasa & Yin',
            bio: 'Enseignante de yoga depuis 10 ans, Marie-Laure est certifiée RYT-500 et formée en Inde et à Bali. Elle accompagne tous les profils, des débutants aux praticiens avancés.',
            courseCount: 5,
            studentCount: '6 200+',
        },
        objectives: [
            {
                icon: CheckCircle2,
                title: 'Maîtriser les postures de base',
                description:
                    "Apprendre l'alignement correct et les ajustements pour pratiquer en toute sécurité.",
            },
            {
                icon: CheckCircle2,
                title: 'Fluidifier votre pratique',
                description:
                    'Enchaîner les postures avec fluidité en synchronisant mouvement et respiration.',
            },
            {
                icon: CheckCircle2,
                title: 'Renforcer corps et esprit',
                description:
                    'Développer force, souplesse et équilibre tout en cultivant la présence intérieure.',
            },
            {
                icon: CheckCircle2,
                title: 'Pratiquer de façon autonome',
                description:
                    'Construire des séquences personnelles et adapter la pratique à vos besoins du jour.',
            },
        ],
        prerequisites: [
            'Aucun prérequis — tous niveaux bienvenus',
            'Tapis de yoga recommandé',
        ],
        reviews: [
            {
                initials: 'PE',
                name: 'Pierre E.',
                role: 'Cadre — Paris',
                text: "J'ai commencé sans aucune expérience. En 8 semaines, j'ai une pratique quotidienne et je me sens transformé.",
                rating: 5,
            },
            {
                initials: 'FD',
                name: 'Florence D.',
                role: 'Enseignante — Nice',
                text: 'Les vidéos sont claires, progressives et bien filmées. Marie-Laure a un don pour rendre le yoga accessible.',
                rating: 4,
            },
        ],
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
        category: 'Sophrologie',
        title: 'Sophrologie & Relaxation Profonde',
        description:
            'Maîtrisez les techniques de sophrologie pour gérer le stress, retrouver le sommeil et renforcer votre confiance en vous grâce à des exercices accessibles à tous.',
        price: '39 €',
        duration: '7h de contenu',
        language: 'Français',
        studentCount: 632,
        moduleCount: 6,
        rating: 4.8,
        benefits: [
            'Accès à vie',
            '7h de contenu vidéo',
            'Séances audio MP3 téléchargeables',
            'Fiches techniques PDF',
            'Attestation de complétion',
        ],
        modules: [
            {
                number: 1,
                title: 'Introduction à la sophrologie',
                duration: '55 min',
                lessons: [
                    {
                        title: 'Histoire et fondements de la sophrologie',
                        duration: '15 min',
                        free: true,
                    },
                    {
                        title: 'Le fonctionnement du stress',
                        duration: '20 min',
                        free: true,
                    },
                    {
                        title: 'Les niveaux de conscience sophrologique',
                        duration: '20 min',
                    },
                ],
            },
            {
                number: 2,
                title: 'Relaxation dynamique',
                duration: '1h 20 min',
                lessons: [
                    {
                        title: 'Exercices de détente physique',
                        duration: '30 min',
                    },
                    {
                        title: 'Respiration abdominale et contrôle du souffle',
                        duration: '25 min',
                    },
                    {
                        title: 'Pratique guidée de relaxation dynamique',
                        duration: '25 min',
                    },
                ],
            },
        ],
        trainer: {
            initials: 'VR',
            name: 'Valérie Renaud',
            role: 'Sophrologue certifiée RNCP · Formatrice en entreprise',
            bio: 'Valérie est sophrologue diplômée depuis 15 ans. Elle intervient en entreprise pour la prévention du burnout et accompagne des particuliers dans la gestion du stress et du sommeil.',
            courseCount: 3,
            studentCount: '2 100+',
        },
        objectives: [
            {
                icon: CheckCircle2,
                title: 'Gérer le stress durablement',
                description:
                    'Acquérir des outils concrets pour anticiper et désamorcer les situations stressantes.',
            },
            {
                icon: CheckCircle2,
                title: 'Améliorer votre sommeil',
                description:
                    "Utiliser des techniques de relaxation pour faciliter l'endormissement et la qualité du sommeil.",
            },
            {
                icon: CheckCircle2,
                title: 'Renforcer votre confiance',
                description:
                    "Travailler sur l'estime de soi et la positivité grâce à la visualisation sophrologique.",
            },
            {
                icon: CheckCircle2,
                title: 'Pratiquer en autonomie',
                description:
                    "Disposer d'une boîte à outils complète pour gérer votre bien-être au quotidien.",
            },
        ],
        prerequisites: ['Aucun prérequis', 'Un endroit calme pour pratiquer'],
        reviews: [
            {
                initials: 'HL',
                name: 'Hélène L.',
                role: 'Commerciale — Nantes',
                text: "Je souffrais d'insomnies depuis 2 ans. Après 3 semaines de pratique, je dors enfin normalement. Merci Valérie !",
                rating: 5,
            },
            {
                initials: 'MD',
                name: 'Marc D.',
                role: 'Médecin généraliste — Strasbourg',
                text: 'Je recommande cette formation à mes patients. Les techniques sont rigoureuses et les explications claires.',
                rating: 5,
            },
        ],
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
        category: 'Nutrition holiste',
        title: 'Nutrition Holistique : Nourrir Corps, Âme et Esprit',
        description:
            "Explorez l'alimentation comme outil de guérison et d'éveil. Comprenez les liens entre ce que vous mangez, votre énergie, vos émotions et votre conscience.",
        price: '59 €',
        duration: '10h de contenu',
        language: 'Français',
        studentCount: 418,
        moduleCount: 7,
        rating: 4.9,
        benefits: [
            'Accès à vie',
            '10h de contenu vidéo',
            'Recettes et plans alimentaires',
            'Guide des superaliments PDF',
            'Attestation de complétion',
        ],
        modules: [
            {
                number: 1,
                title: 'Les fondements de la nutrition holiste',
                duration: '1h 20 min',
                lessons: [
                    {
                        title: "L'alimentation comme information",
                        duration: '20 min',
                        free: true,
                    },
                    {
                        title: 'Les connexions intestin-cerveau-émotions',
                        duration: '30 min',
                        free: true,
                    },
                    {
                        title: 'Ayurveda et alimentation selon les doshas',
                        duration: '30 min',
                    },
                ],
            },
            {
                number: 2,
                title: 'Les aliments vivants et leur énergie',
                duration: '1h 30 min',
                lessons: [
                    {
                        title: 'Crudités, germinations et aliments vivants',
                        duration: '35 min',
                    },
                    {
                        title: 'Les superaliments et leurs propriétés',
                        duration: '35 min',
                    },
                    {
                        title: "Cuisiner avec conscience : l'intention dans l'alimentation",
                        duration: '20 min',
                    },
                ],
            },
        ],
        trainer: {
            initials: 'LN',
            name: 'Léa Naouri',
            role: 'Naturopathe & nutritionniste holiste · Formatrice certifiée',
            bio: "Léa est naturopathe diplômée et spécialisée en nutrition holistique. Elle combine les enseignements de l'Ayurveda, la naturopathie et la médecine fonctionnelle pour une approche globale.",
            courseCount: 4,
            studentCount: '1 700+',
        },
        objectives: [
            {
                icon: CheckCircle2,
                title: 'Comprendre votre alimentation',
                description:
                    "Décrypter l'impact des aliments sur votre énergie, vos humeurs et votre conscience.",
            },
            {
                icon: CheckCircle2,
                title: 'Éliminer les toxines',
                description:
                    'Identifier et réduire les aliments qui polluent votre corps et votre esprit.',
            },
            {
                icon: CheckCircle2,
                title: 'Nourrir votre énergie vitale',
                description:
                    'Choisir des aliments vivants et vibratoires pour soutenir votre pratique spirituelle.',
            },
            {
                icon: CheckCircle2,
                title: 'Créer votre alimentation idéale',
                description:
                    'Concevoir un programme alimentaire personnalisé selon vos besoins et votre constitution.',
            },
        ],
        prerequisites: [
            'Notions de base en nutrition appréciées',
            'Ouvert à tous les profils alimentaires',
        ],
        reviews: [
            {
                initials: 'SV',
                name: 'Sarah V.',
                role: 'Praticienne bien-être — Montpellier',
                text: 'Cette formation a révolutionné ma relation à la nourriture. Je comprends enfin pourquoi je me sens si différemment selon ce que je mange.',
                rating: 5,
            },
        ],
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
        category: 'Développement spirituel',
        title: 'Éveil Spirituel : Retrouver le Sens et la Direction',
        description:
            "Un voyage intérieur guidé pour explorer les grandes questions de l'existence, développer votre discernement spirituel et aligner votre vie avec vos valeurs profondes.",
        price: '49 €',
        duration: '8h de contenu',
        language: 'Français',
        studentCount: 753,
        moduleCount: 6,
        rating: 4.8,
        benefits: [
            'Accès à vie',
            '8h de contenu vidéo',
            'Journal de voyage intérieur PDF',
            'Méditations guidées audio',
            'Attestation de complétion',
        ],
        modules: [
            {
                number: 1,
                title: "Qu'est-ce que l'éveil ?",
                duration: '1h',
                lessons: [
                    {
                        title: "Démystifier l'éveil spirituel",
                        duration: '20 min',
                        free: true,
                    },
                    {
                        title: 'Les différents chemins et traditions',
                        duration: '20 min',
                        free: true,
                    },
                    {
                        title: "L'éveil dans la vie ordinaire",
                        duration: '20 min',
                    },
                ],
            },
            {
                number: 2,
                title: 'Connais-toi toi-même',
                duration: '1h 30 min',
                lessons: [
                    {
                        title: "L'ego, le Soi et la conscience",
                        duration: '30 min',
                    },
                    {
                        title: 'Identifier ses croyances limitantes',
                        duration: '30 min',
                    },
                    {
                        title: "Pratique d'introspection guidée",
                        duration: '30 min',
                    },
                ],
            },
        ],
        trainer: {
            initials: 'AB',
            name: 'Antoine Bourget',
            role: 'Guide spirituel · Auteur · Méditant zen depuis 20 ans',
            bio: 'Antoine a étudié avec des maîtres zen au Japon et au Myanmar. Auteur de deux ouvrages sur la spiritualité laïque, il guide des retraites et des groupes de pratique depuis 2005.',
            courseCount: 7,
            studentCount: '4 400+',
        },
        objectives: [
            {
                icon: CheckCircle2,
                title: 'Clarifier vos valeurs profondes',
                description:
                    'Identifier ce qui compte vraiment pour vous et aligner vos choix de vie en conséquence.',
            },
            {
                icon: CheckCircle2,
                title: 'Développer votre discernement',
                description:
                    "Apprendre à distinguer la voix de l'ego de celle de l'intuition profonde.",
            },
            {
                icon: CheckCircle2,
                title: 'Cultiver la paix intérieure',
                description:
                    'Trouver un ancrage stable face aux turbulences extérieures et intérieures.',
            },
            {
                icon: CheckCircle2,
                title: 'Vivre avec sens',
                description:
                    'Construire une vie alignée avec votre nature profonde et vos aspirations spirituelles.',
            },
        ],
        prerequisites: [
            'Ouvert à tous, croyants ou non',
            'Une curiosité sincère pour les questions existentielles',
        ],
        reviews: [
            {
                initials: 'JM',
                name: 'Julien M.',
                role: 'Chef de projet — Rennes',
                text: "Antoine ne prêche pas, il éveille. Ce cours m'a aidé à traverser une période de doute profond et à retrouver le sens de ce que je fais.",
                rating: 5,
            },
            {
                initials: 'CB',
                name: 'Camille B.',
                role: 'Psychologue — Marseille',
                text: "Un équilibre parfait entre réflexion philosophique et pratiques concrètes. Je l'intègre dans mon accompagnement thérapeutique.",
                rating: 5,
            },
        ],
    },
];
