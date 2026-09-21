// Ron Scott — professional profile data. Synthesized from master resume sources
// (Master Resume Portfolio, Figma/DA Resume, and Sept 2026 resume), cross-checked
// against live project data in projects.ts. Direct contact info intentionally
// omitted — see grounding.ts for chatbot contact-handling instructions.

export interface ProfileInfo {
  name: string;
  role: string;
  location: string;
  bio: string;
}

export interface ExperienceEntry {
  org: string;
  title: string;
  timeline: string;
  summary: string;
  highlights: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  description?: string;
  link?: string;
}

export const PROFILE_INFO: ProfileInfo = {
  name: 'Ron Scott',
  role: 'Designer, Builder & AI-Native Product Practitioner',
  location: 'Oakland, CA / San Francisco Bay Area',
  bio:
    "I'm a designer, builder, and AI practitioner based in Oakland, CA. I build things — always have. I hold two Associate degrees with honors, several certifications, and years of experience mentoring students. Since 2023, I've built a portfolio of consumer apps from zero, spoken at Figma's global headquarters, earned four Google Professional Certificates, completed a U.S. Department of Labor Registered Apprenticeship, and run AI-enabled programs at enterprise scale at Lyft. Get2 — the company I founded — is built on the premise that what you're obligated to do can become what you get to do.",
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    org: 'Lyft',
    title: 'AI Transformation Lead / Project Specialist (Apprentice)',
    timeline: 'Aug 2025 – Aug 2026',
    summary:
      'Culture & Belonging team. Designed, launched, and operated an enterprise AI-literacy program from zero; completed as a U.S. Department of Labor Registered Apprenticeship.',
    highlights: [
      'Built the Amplify AI Champions program end-to-end: intake model, prioritization framework, three-tiered credential system, playbooks, and tracking infrastructure',
      '879+ nominations processed, 91% conversion rate, 279 verified Champions across 100% of business units',
      'Evaluated Gemini 1.5 Pro instruction-capacity thresholds and Workato as an enterprise automation platform; consolidated 5 fragmented AI tools into one unified dashboard',
      'Maintained 90% project-phase efficiency and 95%+ documentation accuracy with zero rework',
      'Built the original AI-powered interactive portfolio at portfolio.get2.one — the direct predecessor to this site',
    ],
  },
  {
    org: 'Get2',
    title: 'Founder & Product Builder',
    timeline: 'Jun 2023 – Present',
    summary:
      'Founded and operate the Get2 product family solo — full 0-to-1 ownership of design, front-end development, and product decisions across every project (see projects.ts).',
    highlights: [
      'Shipped 7 live/prototype consumer products spanning games, civic tech, retail tech, and social apps',
      'Built the Get2 brand identity, motion system, and visual language from scratch',
      'Uses AI-native tools (Claude, Gemini, Morph, Emergent, Canva) as daily building instruments',
    ],
  },
  {
    org: 'Urban Alchemy',
    title: 'Care Coordinator & Data Systems',
    timeline: 'Dec 2023 – Aug 2025',
    summary:
      'Field coordination and service delivery for people navigating poverty, mental health challenges, addiction, and reentry across San Francisco.',
    highlights: [
      'Managed high-volume case data across Salesforce and municipal HMIS platforms',
      'Synthesized frontline feedback into procedural recommendations for executive leadership',
    ],
  },
  {
    org: 'CROP Organization',
    title: 'UX/UI Design & Software Development Intern/Fellow',
    timeline: 'Mar 2023 – Apr 2024',
    summary:
      'Built formal design/development practice designing digital reentry tools for a high-stakes user population.',
    highlights: [
      'Featured in a Figma blog article and delivered a featured address at Figma HQ',
      'Shipped responsive, WCAG-compliant web platforms from scratch',
    ],
  },
  {
    org: 'Aspire Education',
    title: 'Academic Tutor',
    timeline: 'Dec 2024 – Present',
    summary: 'Personalized math instruction for adult learners, one-on-one and small group.',
    highlights: [],
  },
  {
    org: 'Lyft',
    title: 'Driver',
    timeline: 'Oct 2023 – Jan 2024',
    summary: 'Returned to the workforce immediately after coming home; maintained a 5.0-star rating.',
    highlights: [],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: 'U.S. Department of Labor Registered Apprenticeship — Project Manager',
    issuer: 'City & County of San Francisco, Office of Economic & Workforce Development',
    description: 'RAPIDS Code 3019CB V1, earned through the Lyft AI Transformation Lead apprenticeship.',
  },
  { name: 'Google UX Design Professional Certificate', issuer: 'Google / Coursera' },
  { name: 'Google AI Essentials Certificate', issuer: 'Google / Coursera' },
  { name: 'Google Prompting Essentials Certificate', issuer: 'Google / Coursera' },
  { name: 'Google Project Management Professional Certificate', issuer: 'Google / Coursera' },
  { name: 'Workato Agentic AI Basics', issuer: 'Workato Academy' },
  {
    name: 'Peer Literacy Mentor Certification',
    issuer: 'CDCR Office of Correctional Education',
  },
  { name: 'Associate of Arts, Mathematics & Science — Honors, 3.75 GPA', issuer: 'Coastline College' },
  { name: 'Associate of Science, General Business — Honors, 3.75 GPA', issuer: 'Coastline College' },
];

export const SKILLS = {
  'Product & Experience Design': [
    '0-to-1 consumer product design',
    'UX research & customer discovery',
    'High-fidelity prototyping & usability testing',
    'Accessibility (WCAG)',
    'Figma (advanced)',
    'Framer',
    'Motion graphics & brand identity',
  ],
  'AI & Emerging Technology': [
    'AI literacy program design',
    'LLM evaluation & instruction-capacity testing',
    'Prompt engineering & model grounding',
    'Agentic AI frameworks',
    'Claude, Gemini, Morph, Emergent',
  ],
  'Program & Project Management': [
    'End-to-end program ownership',
    'Cross-functional stakeholder coordination',
    'Process documentation',
    'Risk mitigation',
  ],
  Development: [
    'HTML, CSS, JavaScript',
    'React / TypeScript / Vite',
    'Hardware/embedded prototyping (ESP32)',
  ],
};
