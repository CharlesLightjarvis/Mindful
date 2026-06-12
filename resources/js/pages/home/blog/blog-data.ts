export type Article = {
  id: number
  image: string
  categories: string[]
  titre: string
  description: string
  duree: string
  date: string
  featured?: boolean
}

export const allArticles: Article[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80',
    categories: ['Mindfulness', 'Science'],
    titre: 'Les 8 bénéfices prouvés de la méditation de pleine conscience',
    description: 'Revue des études scientifiques récentes sur les effets du mindfulness sur le stress, l\'anxiété, la concentration et la qualité du sommeil. Ce que la neuroscience nous apprend sur la transformation du cerveau.',
    duree: '10 min',
    date: '3 juin 2025',
    featured: true,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    categories: ['Chakras', 'Énergie'],
    titre: 'Comment équilibrer le chakra racine quand vous vous sentez déstabilisé',
    description: 'Signes d\'un chakra racine déséquilibré, causes fréquentes et pratiques concrètes pour retrouver l\'ancrage et la stabilité intérieure.',
    duree: '8 min',
    date: '28 mai 2025',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    categories: ['Yoga', 'Corps'],
    titre: 'Yoga du matin : la séquence de 15 minutes pour bien démarrer la journée',
    description: 'Une séquence Vinyasa douce et énergisante adaptée aux débutants. Pas de matériel requis, juste un tapis et 15 minutes avant le travail.',
    duree: '6 min',
    date: '20 mai 2025',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    categories: ['Sophrologie', 'Stress'],
    titre: 'Sophrologie et burnout : comment la pratiquer pour se reconstruire',
    description: 'Témoignages et protocoles de sophrologie utilisés dans l\'accompagnement du burnout professionnel. Le rôle de la relaxation dynamique dans la récupération.',
    duree: '11 min',
    date: '14 mai 2025',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    categories: ['Nutrition', 'Bien-être'],
    titre: 'Alimentation et conscience : pourquoi ce que vous mangez affecte votre énergie spirituelle',
    description: 'Les liens entre alimentation vivante, Ayurveda et pratique spirituelle. Comment choisir des aliments qui soutiennent votre éveil et votre vitalité.',
    duree: '9 min',
    date: '7 mai 2025',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80',
    categories: ['Spiritualité', 'Développement'],
    titre: 'Méditation Vipassana : ce que j\'ai appris lors de 10 jours de silence',
    description: 'Retour d\'expérience détaillé sur une retraite Vipassana. Les difficultés rencontrées, les insights transformateurs et comment intégrer cette pratique dans la vie quotidienne.',
    duree: '14 min',
    date: '30 avr. 2025',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    categories: ['Mindfulness', 'Quotidien'],
    titre: '5 micro-pratiques de pleine conscience pour les journées chargées',
    description: 'Techniques de mindfulness informel intégrables n\'importe où : dans les transports, au bureau ou pendant les repas. La pleine conscience sans tapis ni coussin.',
    duree: '5 min',
    date: '22 avr. 2025',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    categories: ['Chakras', 'Pratique'],
    titre: 'Sons et vibrations : utiliser les bols tibétains pour équilibrer vos chakras',
    description: 'Introduction à la sonothérapie et aux bols chantants. Comment les fréquences sonores agissent sur nos centres énergétiques et comment intégrer cette pratique chez soi.',
    duree: '7 min',
    date: '15 avr. 2025',
  },
]

export const trendingArticles = [
  { id: 1, titre: 'Méditation MBSR : le protocole complet en 8 semaines', categorie: 'Mindfulness' },
  { id: 5, titre: 'Les 7 chakras : guide complet pour débutants', categorie: 'Chakras' },
  { id: 7, titre: 'Respiration 4-7-8 : la technique anti-stress instantanée', categorie: 'Bien-être' },
]

export type SidebarSection =
  | { type: 'item'; label: string; value: string }
  | { type: 'group'; label: string; items: { label: string; value: string }[] }

export const sidebarSections: SidebarSection[] = [
  { type: 'item', label: 'Mindfulness',       value: 'Mindfulness' },
  { type: 'item', label: 'Spiritualité',      value: 'Spiritualité' },
  {
    type: 'group',
    label: 'Pratiques corporelles',
    items: [
      { label: 'Yoga',             value: 'Yoga' },
      { label: 'Sophrologie',      value: 'Sophrologie' },
      { label: 'Corps & mouvement', value: 'Corps' },
    ],
  },
  {
    type: 'group',
    label: 'Énergie & chakras',
    items: [
      { label: 'Chakras',          value: 'Chakras' },
      { label: 'Énergie vitale',   value: 'Énergie' },
      { label: 'Pratiques',        value: 'Pratique' },
    ],
  },
  {
    type: 'group',
    label: 'Alimentation & santé',
    items: [
      { label: 'Nutrition holiste', value: 'Nutrition' },
      { label: 'Bien-être global',  value: 'Bien-être' },
    ],
  },
  {
    type: 'group',
    label: 'Mode de vie',
    items: [
      { label: 'Quotidien & routine', value: 'Quotidien' },
      { label: 'Stress & burnout',    value: 'Stress' },
      { label: 'Science du bien-être', value: 'Science' },
    ],
  },
  {
    type: 'group',
    label: 'Développement personnel',
    items: [
      { label: 'Développement intérieur', value: 'Développement' },
    ],
  },
]
