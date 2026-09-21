// Get2 project family — structured data for portfolio display and chatbot grounding.

export type ProjectStatus = 'Live' | 'In Development' | 'Prototype' | 'Concept' | 'Archived';

export interface Get2Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: ProjectStatus;
  liveUrl?: string;
  githubRepo?: string; // owner/repo
  caseStudyUrl?: string; // full written case study, e.g. get2.one/work/[slug]
  imageUrl?: string; // screenshot shown on the project card, from /public/projects/
  videoUrl?: string; // looping muted video shown in place of imageUrl, from /public/projects/ (takes priority over imageUrl when present)
  domain: string; // shown in the browser-chrome address bar (real domain, or a status label)
  accent: string; // per-project accent hex, used for the chrome dot / borders / highlight ticks
  note?: string; // authenticity/framing caveat surfaced verbatim to the chatbot and UI
  description: string;
  highlights: string[];
  techStack: string[];
}

export const GET2_PROJECTS: Get2Project[] = [
  {
    id: 'the-board',
    imageUrl: '/projects/the-board.jpg',
    name: 'The Board',
    tagline: 'Parole Suitability Hearing Simulator',
    category: 'Civic Tech / Social Impact',
    status: 'Live',
    liveUrl: 'https://get2.live',
    githubRepo: 'ronscottbiz-tacitus/BHP',
    caseStudyUrl: 'https://get2.one/work/theboard',
    domain: 'get2.live',
    accent: '#C9A227',
    description:
      "An interactive simulation modeling California parole suitability hearings — built to teach insight, accountability, and the complex dynamics of institutional release. Models high-stakes institutional hearing procedures and narrative logic so users can prepare and practice.",
    highlights: [
      'Validated through iterative usability testing that randomizing answer logic drove genuine engagement over pattern-gaming, and reshaped the core interaction model around that finding',
      'Active from 2023–2026; previously submitted to Emergent\'s "Builder Fest" contest before being replaced by Bus\' A Lead as the active submission',
    ],
    techStack: [],
  },
  {
    id: 'bus-a-lead-pinochle',
    imageUrl: '/projects/bus-a-lead-pinochle.jpg',
    videoUrl: '/projects/bus-a-lead-pinochle.mp4',
    name: "Bus' A Lead: Cutthroat Pinochle",
    tagline: 'Prison Rules cutthroat pinochle, reimagined for the web',
    category: 'Interactive Fiction / Card Games',
    status: 'Live',
    liveUrl: 'https://pinochle.get2.one',
    githubRepo: 'ronscottbiz-tacitus/Bust-A-Lead_Pinochle',
    caseStudyUrl: 'https://get2.one/work/pinochle',
    domain: 'pinochle.get2.one',
    accent: '#E8930B',
    description:
      'An interactive web-based adaptation of California prison-style cutthroat pinochle, featuring character AI, a custom cutscene engine ("Yard Reels"), and reactive animations.',
    highlights: [
      'Current active entry in Emergent\'s "Builder Fest" contest (partnered with Kevin O\'Leary)',
      '"Pick Your Hustler" — a 5-character roster (each a real face reimagined in GTA San Andreas-style art) with an Opponent Picker to hand-pick both AI rivals',
      'Built a custom cutscene engine ("Yard Reels") with character-specific animations and a cooldown/priority throttling system, plus a "Play All" slideshow view',
      'Offered as a no-signup-required alternative to the contest voting flow',
    ],
    techStack: [],
  },
  {
    id: 'get2puzzle',
    imageUrl: '/projects/get2puzzle.jpg',
    videoUrl: '/projects/get2puzzle.mp4',
    name: 'Get2Puzzle',
    tagline: 'A rotatable jigsaw puzzle app — Classic and Live (video) modes',
    category: 'Games / Product',
    status: 'Live',
    liveUrl: 'https://puzzle.get2.one',
    githubRepo: 'ronscottbiz-tacitus/get2-jigsaw',
    caseStudyUrl: 'https://get2.one/work/puzzle',
    domain: 'puzzle.get2.one',
    accent: '#8B5CF6',
    description:
      'A web-based jigsaw puzzle app where pieces can be freely rotated rather than just dragged, with rotation-based difficulty tiers as the core differentiator. Includes a "Classic" static-image mode (personally curated image library) and a "Live" mode where puzzle pieces show slivers of a looping video.',
    highlights: [
      'Built in Claude Design, then Vite + React + TypeScript; deployed via Vercel at a custom subdomain',
      'Personally curated the static-image library via AI generation (Google AI Studio) across 6 categories: Landscapes/Nature, Animals/Wildlife, Architecture/Cityscapes, Space/Cosmic, Florals/Botanical, Abstract/Pattern Art',
      'Built "Live" video-puzzle scenes (e.g. bioluminescent jellyfish, starling murmuration) using Google AI Studio + Morph Studio image-to-video generation',
      'Added a faux-3D depth/thickness visual effect to puzzle pieces (cardboard rim + glossy sheen) without CSS filters, for performance',
      'Built an optional gamified "wager mode" (stake capped at $5, persistent fake balance)',
      'Free/Premium plan already in place: Free covers all difficulty tiers and a curated selection across Classic/Live; Premium (waitlist) unlocks the full library plus custom uploads',
      'Device-local persistence (browser localStorage) for best times and mid-puzzle resume; cross-device sync deferred to a future accounts/backend phase',
    ],
    techStack: ['Vite', 'React', 'TypeScript', 'Vercel'],
  },
  {
    id: 'grocerygo',
    imageUrl: '/projects/grocerygo.jpg',
    name: 'GroceryGo!',
    tagline: 'B2B integration demo app and SDK for retail navigation',
    category: 'Retail Tech / B2B',
    status: 'Live',
    liveUrl: 'https://get2.life',
    githubRepo: 'ronscottbiz-tacitus/gr727',
    caseStudyUrl: 'https://get2.one/work/grocerygo',
    domain: 'get2.life',
    accent: '#E23744',
    description:
      'A B2B integration demo app and SDK that uses AI to map shopping list items to specific retail store aisle coordinates, simplifying meal planning and shopping.',
    highlights: [
      'Built with React (frontend) and FastAPI (backend)',
      'Demonstrates AI-driven mapping of unstructured shopping-list text to structured store-layout coordinates',
    ],
    techStack: ['React', 'FastAPI'],
  },
  {
    id: 'get2share',
    imageUrl: '/projects/get2share.jpg',
    name: 'Get2Share',
    tagline: 'Live event photo sharing',
    category: 'Social / Events',
    status: 'In Development',
    liveUrl: 'https://get2share.ai.studio',
    githubRepo: 'ALGEBROTHA/Get2Share',
    domain: 'get2share.ai.studio',
    accent: '#22D3EE',
    note: 'Actively being rebuilt — the live link may show rough edges or incomplete features right now.',
    description: 'A live event photo-sharing web app, part of the Get2 product family.',
    highlights: [],
    techStack: [],
  },
  {
    id: '3ceipt',
    imageUrl: '/projects/3ceipt.jpg',
    name: '3Ceipt!',
    tagline: 'A UX case study in receipt scanning and management',
    category: 'UX Case Study / Mobile',
    status: 'Prototype',
    caseStudyUrl: 'https://get2.one/work/3ceipt',
    domain: 'case study',
    accent: '#EC4899',
    description:
      'A mobile app concept designed to simplify receipt scanning, storage, and sharing for busy professionals. Taken through a full UX process — research, personas, wireframes, and a tested high-fidelity prototype — during the CROP fellowship.',
    highlights: [
      'Conducted user interviews and built empathy maps, personas, and a user journey map to define the core problem',
      'Ran two rounds of usability studies, iterating from paper wireframes through a low-fidelity prototype to a refined high-fidelity mockup',
      'Applied accessibility considerations: high-contrast color choices, icon-led navigation, and vibrant visual cues',
      'This is a design case study (Figma prototype), not a shipped production app',
    ],
    techStack: ['Figma'],
  },
  {
    id: 'priceberg',
    imageUrl: '/projects/priceberg.jpg',
    name: 'Priceberg',
    tagline: 'A reverse-auction marketplace where prices drop over time',
    category: 'E-commerce',
    status: 'Live',
    liveUrl: 'https://priceberg.framer.ai',
    caseStudyUrl: 'https://get2.one/work/priceberg',
    domain: 'priceberg.framer.ai',
    accent: '#10B981',
    description:
      'A reverse-auction e-commerce concept: rather than bidding up, prices count down over time across categories like TVs, kitchen appliances, and computers, guiding shoppers to the best moment to buy.',
    highlights: [
      'Built and hosted as an interactive Framer prototype with live product browsing across multiple category pages',
      'Designed the "How It Works" narrative explaining the reverse-auction mechanic to first-time visitors',
    ],
    techStack: ['Framer'],
  },
  {
    id: 'beepboop',
    imageUrl: '/projects/beepboop.jpg',
    name: 'BeepBoop!',
    tagline: 'A concept for a pleasant, courteous alternative to the car horn',
    category: 'Hardware / Embedded (Concept)',
    status: 'Concept',
    domain: 'concept — unreleased',
    accent: '#F59E0B',
    note: 'Concept-stage only — no hardware has been built yet. The accompanying image is an AI-generated comic-style illustration created to visualize the idea, not a photo or footage of a real device. Should always be framed to hiring managers as an idea in development, not a shipped or prototyped product.',
    description:
      'An idea for an auxiliary "courtesy horn" — a secondary, pleasant-sounding car horn (short chirps and chords) for everyday communication like acknowledgment or thanks, distinct from the harsh emergency horn. Inspired by a real moment of wanting to say "thank you" at a 4-way intersection without the aggressive connotation of a standard horn. Developed through a structured concept-development process: problem framing, hardware feasibility research, an ESP32-based technical architecture, a bill-of-materials cost estimate (~$28/unit), competitive landscape analysis, and draft firmware logic.',
    highlights: [
      'Worked through real hardware constraints (why factory horns can\'t be reprogrammed, why EV exterior speakers are legally restricted from custom sounds post-Tesla "Boombox")',
      'Landed on an ESP32 + Class D amp + wireless RF trigger architecture, with a sketched firmware control loop for tap/double-tap/long-press gestures',
      'Ran a bill-of-materials estimate (~$28 per unit) and identified FCC certification as the primary cost/regulatory risk',
      'Mapped the competitive landscape (novelty horn brands, industrial air-horn makers, Tesla/EV sound features) to identify a "Road Empathy Tech" positioning gap',
    ],
    techStack: ['ESP32'],
  },
];
