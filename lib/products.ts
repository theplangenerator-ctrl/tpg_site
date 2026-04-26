export type ProductStatus = 'available' | 'in-development'

export type CaseStudyVisualKey = 'auth' | 'plan' | 'track' | 'report'

export type CapabilityIcon =
  | 'fingerprint'
  | 'brain'
  | 'activity'
  | 'send'
  | 'shield'
  | 'zap'
  | 'users'
  | 'cloud'
  | 'gauge'
  | 'sparkles'
  | 'eye'
  | 'lock'

export interface Capability {
  number: string
  title: string
  description: string
  icon: CapabilityIcon
}

export interface CaseStudyPanel {
  number: string
  label: string
  title: string
  description: string
  caption: string
  visual: CaseStudyVisualKey
}

export interface CaseStudy {
  eyebrow: string
  headline: string
  panels: CaseStudyPanel[]
}

export interface Product {
  id: string
  number: string
  name: string
  category: string
  tagline: string
  description: string
  status: ProductStatus
  href?: string
  highlights?: string[]
  capabilities?: Capability[]
  caseStudy?: CaseStudy
}

// Default cards shown when no specific product is selected.
// These are company-level value propositions across the catalogue.
export const overviewCapabilities: Capability[] = [
  {
    number: '01',
    title: 'Personalised Workout Tracking',
    description:
      'Every member gets a plan that learns from them — never a one-size-fits-all template.',
    icon: 'sparkles',
  },
  {
    number: '02',
    title: 'Real-Time Member Intelligence',
    description:
      'Live signals from every set, every session — surfaced to owners without manual reports.',
    icon: 'gauge',
  },
  {
    number: '03',
    title: 'Friction-Free Authentication',
    description:
      'Biometric identity that takes under a second. Your members walk in and start moving.',
    icon: 'fingerprint',
  },
  {
    number: '04',
    title: 'Engineered for Scale',
    description:
      'Built to run a single studio or a 40-location chain — same hardware, same software, same SLA.',
    icon: 'zap',
  },
  {
    number: '05',
    title: 'Member-First Privacy',
    description:
      'Sensitive data stays on-site by default. Cloud sync is opt-in, encrypted, auditable.',
    icon: 'lock',
  },
  {
    number: '06',
    title: 'Built to Evolve',
    description:
      'New equipment ships into the same ecosystem — your gym grows without re-platforming.',
    icon: 'sparkles',
  },
]

export const products: Product[] = [
  {
    id: 'kiosk',
    number: '01',
    name: 'The Smart Kiosk',
    category: 'Member Intelligence',
    tagline: 'AI authentication, live muscle tracking, instant Telegram reports.',
    description:
      'A dual-monitor kiosk with biometric check-in, AI-generated workout plans, and per-muscle activation tracking. The first product in the TPG catalogue.',
    status: 'available',
    href: '/#capabilities',
    highlights: [
      'Sub-second fingerprint auth',
      '10+ muscle groups tracked live',
      'Telegram progress reports',
    ],
    capabilities: [
      {
        number: '01',
        title: 'Sub-Second Biometrics',
        description:
          'R307 fingerprint match in under a second. On return visits, face recognition takes over before a finger touches glass.',
        icon: 'fingerprint',
      },
      {
        number: '02',
        title: 'AI-Generated Plans',
        description:
          'Workouts assembled per member by goal, history, and aukat. The plan re-tunes itself week over week — no two are the same.',
        icon: 'brain',
      },
      {
        number: '03',
        title: 'Live Muscle Tracking',
        description:
          'A GLSL-driven body map updates per set. Members and trainers see exactly where effort and fatigue land.',
        icon: 'activity',
      },
      {
        number: '04',
        title: 'Telegram Auto-Reports',
        description:
          'A composite progress card lands in the member’s Telegram seconds after the last set. Streaks, stats, share-ready.',
        icon: 'send',
      },
      {
        number: '05',
        title: 'Buddy Plan Sharing',
        description:
          'Train together without copying spreadsheets. Plans transfer with consent and auto-scale by bodyweight ratio.',
        icon: 'users',
      },
      {
        number: '06',
        title: 'Owner Cloud Dashboard',
        description:
          'Retention, peak hours, plan adherence — surfaced live. Built for the owner who actually reads dashboards.',
        icon: 'cloud',
      },
    ],
    caseStudy: {
      eyebrow: 'Featured · The Smart Kiosk',
      headline: 'Four Steps. Zero Friction.',
      panels: [
        {
          number: '01',
          label: 'Authenticate',
          title: 'Member Identified.',
          description:
            'A R307 fingerprint sensor confirms identity in under a second. On return visits, face recognition takes over before the member even reaches the scanner.',
          caption: 'Sub-second biometric · zero queue time',
          visual: 'auth',
        },
        {
          number: '02',
          label: 'Plan',
          title: 'AI Picks the Plan.',
          description:
            'Each member receives a workout generated by goal, experience, and aukat. The plan adapts week over week — no two members ever get the same routine.',
          caption: 'Goal-aware · experience-tuned · self-revising',
          visual: 'plan',
        },
        {
          number: '03',
          label: 'Track',
          title: 'Every Muscle, Live.',
          description:
            'A GLSL-driven body map updates per set. Front, back, and side views show activation, fatigue, and peak effort as the workout unfolds.',
          caption: 'Per-set updates · GLSL-powered heatmap',
          visual: 'track',
        },
        {
          number: '04',
          label: 'Report',
          title: 'Straight to Telegram.',
          description:
            "Within seconds of finishing, a composite progress card lands in the member's Telegram — action shots, streaks, and stats. Members share. Friends sign up.",
          caption: 'Auto-delivered · share-ready · streak-aware',
          visual: 'report',
        },
      ],
    },
  },
  {
    id: 'product-02',
    number: '02',
    name: 'In Development',
    category: 'Coming Soon',
    tagline: 'A new piece of intelligent gym equipment is being designed and prototyped.',
    description:
      'We are expanding the catalogue. Sign up to hear about new releases as they ship.',
    status: 'in-development',
  },
  {
    id: 'product-03',
    number: '03',
    name: 'In Development',
    category: 'Coming Soon',
    tagline: 'Another product in research. Engineered to fit alongside the kiosk.',
    description:
      'We are expanding the catalogue. Sign up to hear about new releases as they ship.',
    status: 'in-development',
  },
]
