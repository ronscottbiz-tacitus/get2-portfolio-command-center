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
    id: 'get2share',
    imageUrl: '/projects/get2share.jpg',
    name: 'Get2Share',
    tagline: 'You Get2 be in the picture — live event photo sharing, no app to install',
    category: 'Events / Social Product',
    status: 'Live',
    liveUrl: 'https://share.get2.one',
    githubRepo: 'ronscottbiz-tacitus/get2Share',
    caseStudyUrl: 'https://get2.one/work/share',
    domain: 'share.get2.one',
    accent: '#3D7BFF',
    note: 'Premium video effects (a bullet-time "matrix" shot and a swim-through-the-crowd shot) and video capture are planned "Next" features, not built yet — any imagery of them is an AI-generated concept. Payments/paid tiers are also not built yet. The photos shown in demo screenshots and the fictional sample party ("Mina\'s 30th") are AI-generated sample content, not a real event; the app screens themselves are real.',
    description:
      "A no-app, live event photo-sharing web app that turns every guest's phone into one shared camera system. Born from Ron's own experience of being in great event photos he never got back, and always being the one holding the phone for the group shot instead of standing in it. Guests join by QR code or event code; every photo lands in one live gallery everyone sees in real time.",
    highlights: [
      'Share Spots: the host sets up phones or tablets as stationary cameras; guests see each spot on their own phone with its availability and fire the shot with a countdown, so nobody has to stay behind the lens. Walk-up guests can also tap the Share Spot screen and scan a QR code to keep the photo',
      'Borrow: any guest can ask another guest to lend their camera for a shot, with a live preview for the asker and the photo credited to both. Off by default; the host turns it on — Ron calls it one of the main reasons he created the app',
      'TV portal: the live gallery plays on a smart TV so the whole room watches photos land as they are taken',
      'Host controls: photo review or auto-approve, and save permissions — guests can always save their own photos, and the host decides when guests can save the rest of the album. Live gallery is the default, not a delayed "disposable camera" reveal',
      'Load-tested against the real Firebase backend with a custom script of simulated guests who sign in, watch, post full-size photos and love shots like real phones: at both 25 and 50 guests, a new photo appeared on everyone else\'s screen in about 0.2 s (median), joining took ~0.8–0.9 s and uploads ~1.0 s — doubling the crowd did not slow it down',
      'The load test surfaced two real scaling findings: loves drove 73% of database reads (love traffic grows with the square of the crowd, so there is a known throttling fix), and Firebase\'s ~100 new sign-ins per hour per network limit is a real risk on shared venue Wi-Fi at large events',
      'Ran scripted think-aloud usability sessions with a scored task list (goals not directions, time boxes, 1–7 ease ratings). Testing changed the product: a bigger high-contrast close button, swipe-back closes a photo instead of leaving the event, separate Camera and Upload buttons (the combined picker broke camera access on some phones), and one "Love" reaction instead of thumbs up/down',
      'Documented in a User Flows deck covering six guest, host and device flows built from real app screens',
      'Build path: prototyped in Emergent, rebuilt in Google AI Studio, then moved off AI Studio entirely to build with Claude — now runs on Vercel with its own Firebase project, auto-deploys from GitHub, and uses preview branches so every feature is tested before it goes live',
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Firebase', 'Vercel'],
  },
  {
    id: 'the-board',
    imageUrl: '/projects/the-board.jpg',
    name: 'The Board',
    tagline: 'Parole Suitability Hearing Simulator',
    category: 'Civic Tech / Social Impact',
    status: 'Live',
    liveUrl: 'https://theboard.get2.one',
    // githubRepo: 'ronscottbiz-tacitus/BHP', — hidden: repo is private/not ready to show
    caseStudyUrl: 'https://get2.one/work/theboard',
    domain: 'theboard.get2.one',
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
    // githubRepo: 'ronscottbiz-tacitus/gr727', — hidden: repo is private/not ready to show
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
