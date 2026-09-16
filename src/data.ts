// Domain grounding data for Ron Scott's Lyft Project Specialist Apprenticeship Portfolio

export interface ProfileInfo {
  name: string;
  role: string;
  team: string;
  location: string;
  timeline: string;
  manager: string;
  mentor: string;
  currentStatus: string;
}

export interface MetricCard {
  title: string;
  value: string;
  subtext: string;
  icon: string;
  color: string;
  description: string;
}

export interface CompetencyHighlight {
  id: string; // e.g. "accountability"
  title: string;
  definition: string;
  color: string;
  icon: string;
  highlights: string[];
  fullDetails: string;
}

export interface ProjectItem {
  name: string;
  status: 'Complete' | 'In Progress' | 'On Hold / Blocked' | 'Not Started';
  progress: number; // percentage
  timeline: string;
  description: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date?: string;
  link?: string;
  description?: string;
}

export const PROFILE_INFO: ProfileInfo = {
  name: "Ron Scott",
  role: "AI Transformation Lead / Project Specialist",
  team: "Culture & Belonging (C&B) Team",
  location: "San Francisco/Hybrid",
  timeline: "August 18, 2025 – August 15, 2026 (12-Month Initiative)",
  manager: "Tiara R. (Sponsor/Manager) & Jasmine D. (Prior Sponsor/Manager)",
  mentor: "Travis W. (Design Program Manager)",
  currentStatus: "Exceeding Expectations (As of Mid-Year 2026)"
};

export const METRIC_CARDS: MetricCard[] = [
  {
    title: "Current Status",
    value: "Exceeding Expectations",
    subtext: "Mid-Year 2026 Evaluation",
    icon: "Award",
    color: "emerald",
    description: "Evaluated by Tiara R. (Sponsor) and Jasmine D., alongside Travis W. (Mentor). Outstanding ownership and high quality of deliverables."
  },
  {
    title: "Program Progress",
    value: "90%",
    subtext: "Core Engine Deployed | Handover Readiness",
    icon: "Progress",
    color: "pink",
    description: "Reflects 90% scope-adjusted completion of all program infrastructure, selection frameworks, badging systems, and enablement tools engineered for permanent organizational handover—built to run independently beyond the 12-month apprenticeship term."
  },
  {
    title: "Data Quality",
    value: "95%+ Accuracy Rate",
    subtext: "Maintained across all workstreams",
    icon: "ShieldCheck",
    color: "indigo",
    description: "Maintained 95%+ data accuracy in managing several hundred nominations, centralizing project briefs, and orchestrating the master waitlist true-ups."
  }
];

export const COMPETENCY_HIGHLIGHTS: CompetencyHighlight[] = [
  {
    id: "accountability",
    title: "Accountability",
    definition: "Takes complete ownership of work from start to finish, delivering high-quality, rework-free results.",
    color: "purple",
    icon: "Compass",
    highlights: [
      "Owned digital credentialing program logic from initial database design to multi-tier badge mapping.",
      "Generated clean, reusable template matrices delivered on time and zero-rework.",
      "Coordinated with multi-tier digital badge creators to implement systems in internal profiles.",
      "Overhauled C&B team's shared drive structure, standardizing active sheets."
    ],
    fullDetails: "Ron demonstrated exemplary accountability by creating and owning the execution of the digital badge system template. He didn't just coordinate—he designed the logical framework, mapped dependencies, and drafted structure documents to guide program leads on content placement and localized skills. Delivered 100% rework-free work that received commendation from international program heads."
  },
  {
    id: "excellence-growth",
    title: "Excellence & Growth",
    definition: "Pushes boundaries of high performance, vetting large datasets and adapting to complex operational environments.",
    color: "amber",
    icon: "TrendingUp",
    highlights: [
      "Vetted several hundred nominations against complex criteria including leveling guidelines, tenure data, and global location metrics.",
      "Optimized enterprise cohort cohort functional diversity through robust, multi-pivot evaluation sheets.",
      "Maintained a 90%+ nomination-to-onboarding conversion rate across all business units.",
      "Earned certifications: Google Project Management Professional, Google AI Essentials, and Google Prompting Essentials."
    ],
    fullDetails: "Excellence and growth shine through Ron's analytical rigor. Tasked with vetting candidate pools, he developed pivot-models parsing hundreds of cross-functional entries to ensure optimal functional, level, and timezone representation. He keeps continuous learning at the forefront, earning Google PM Professional, AI Essentials, and Prompting Essentials certificates to bring state-of-the-art methodology back to the team."
  },
  {
    id: "customer-focus",
    title: "Customer Focus",
    definition: "Designs tools and frameworks centered around user needs, simplifying searches for localized support.",
    color: "sky",
    icon: "UserCheck",
    highlights: [
      "Researched, designed, and deployed a multi-tier digital credentialing (badge) system mapped directly to how internal employees naturally search for localized peer AI support.",
      "Conducted a comprehensive competitor analysis of workplace culture visualization and finalized a corporate roadmap for third-party recognition awards.",
      "Engineered custom visual UX mock-ups for a new internal recognition platform feature and audited the master mentorship database to execute a complete data true-up.",
      "Facilitated a cross-functional kickoff and defined operational testing parameters to evaluate merging scattered specialist coaching tools into a single unified discovery dashboard."
    ],
    fullDetails: "Ron's approach directly bridges human-centered design with enterprise program execution. By treating Lyft employees as internal customers, he translates complex organizational workflows into intuitive digital frameworks—structuring metadata taxonomies, building visual interface mock-ups, and overhauling file repositories to drastically reduce administrative friction and optimize team self-service."
  },
  {
    id: "collaboration-inclusion",
    title: "Collaboration & Inclusion",
    definition: "Fosters psychological safety, aligns diverse program leads, and manages global office representation.",
    color: "pink",
    icon: "Users",
    highlights: [
      "Aligned multiple senior program stakeholders around a unified project brief layout.",
      "Ensured balanced regional representation across all major North American and global Hub locations during cohort planning.",
      "Covered critical technical onboarding operations and communications during teammate's leave with no operational delay.",
      "Established recurring C&B update systems communicating critical cultural milestones transparently on Slack."
    ],
    fullDetails: "Inclusivity is vital in Culture & Belonging. Ron successfully managed multi-stakeholder feedback loops between senior managers, hub leads, and design teams. When the team faced a resource gap, Ron stepped in to manage new hire messaging and onboarding systems. His proactive communication style and regular C&B Slack summaries keep the entire company aligned and feeling valued."
  }
];

export const PROJECT_TIMELINE: ProjectItem[] = [
  {
    name: "Onboarding & Tech Setup / Digital Literacy / First 90 Days Plan",
    status: "Complete",
    progress: 100,
    timeline: "Aug - Nov 2025",
    description: "Successfully onboarded, established cross-functional partnerships, and executed immediate culture initiatives."
  },
  {
    name: "First Independent Project (January C&B Update)",
    status: "Complete",
    progress: 100,
    timeline: "Dec 2025 - Jan 2026",
    description: "Strategized and deployed the first major independent culture and belonging communication digest."
  },
  {
    name: "Create and Launch Project Tracker 2025 & 2026",
    status: "Complete",
    progress: 100,
    timeline: "Jan - Mar 2026",
    description: "Built the central visual hub to log, track, and analyze all active 2025/2026 team projects."
  },
  {
    name: "Create Project Briefs for 2026",
    status: "Complete",
    progress: 100,
    timeline: "Mar - May 2026",
    description: "Authored and standardized the full inventory of project definition, brief templates, and guidelines."
  },
  {
    name: "Monthly C&B Slack Updates",
    status: "In Progress",
    progress: 80,
    timeline: "Ongoing",
    description: "Delivering continuous monthly cultural digests and project summaries to the wider workforce."
  },
  {
    name: "C&B Event (San Francisco)",
    status: "In Progress",
    progress: 75,
    timeline: "Ongoing",
    description: "Actively hosting and facilitating SF onsite events: supporting photography/presence at monthly Lyft Linkups, greeting/registering annual Take Your Kids to Work Day (TYKTWD) participants, and hosting Self eSTEM facilitator orientations."
  },
  {
    name: "Internal AI Tooling Consolidation — Project Leadership",
    status: "Complete",
    progress: 100,
    timeline: "Feb - Jun 2026",
    description: "Independently drove coordination and synthesis to stress-test and merge distinct specialist coaching tools into a single unified discovery dashboard, eliminating internal tool sprawl and reducing administrative friction."
  },
  {
    name: "Process Improvement Report",
    status: "Not Started",
    progress: 0,
    timeline: "Future",
    description: "Synthesis report analyzing efficiency baselines and outlining 90% optimization roadmap."
  },
  {
    name: "Final Program Completion",
    status: "Not Started",
    progress: 0,
    timeline: "July - August 2026",
    description: "Comprehensive program offboarding, transition reports, and cohort graduation delivery."
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "Workato Agentic AI Basics",
    issuer: "Workato Academy",
    date: "Jun 3, 2026",
    description: "Proficiency in agentic workflow design, multi-agent frameworks, cognitive pipelines, and intelligent integrations.",
    link: "https://academy.workato.com"
  },
  {
    name: "Google Project Management Professional Certificate",
    issuer: "Google",
    date: "Jan 4, 2026",
    description: "Double-tracked program completed ahead of schedule; covers agile frameworks, project planning, and AI tool delivery.",
    link: "https://coursera.org/verify/professional-cert/5ZMK6W8T24AQ"
  },
  {
    name: "Google AI Essentials Certification",
    issuer: "Google",
    date: "Jan 2, 2026",
    description: "Application of generative AI techniques, prompt engineering strategies, and modern productivity workflows.",
    link: "https://coursera.org/verify/PRQG0KSN5U97"
  },
  {
    name: "Google Prompting Essentials Certificate",
    issuer: "Google",
    date: "Jan 1, 2026",
    description: "Architecting robust model-grounding inputs, instruction testing, and high-precision outputs.",
    link: "https://coursera.org/verify/BPT8V2QB7CV1"
  },
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google",
    date: "Nov 8, 2023",
    description: "Hands-on, practice-based assessment covering user research, wireframing, high-fidelity prototyping in Figma, and usability testing.",
    link: "https://coursera.org/verify/professional-cert/LY7NGL6ZVLNU"
  }
];

export const EFFICIENCY_GOAL = {
  baseline: "75%",
  target: "90% by August 15, 2026",
  currentConfidence: "High"
};

export const DEVELOPMENT_AREAS = [
  {
    area: "Strategic Analytics",
    description: "Shifting from basic database compilation to proactive trend synthesis, such as auditing utilization patterns in the badge system to recommend active engagement strategies."
  },
  {
    area: "Autonomous Stakeholder Sourcing",
    description: "Assuming full operational ownership of ambiguous project phases, driving stakeholder alignment syncs, and configuring layout discovery tools independently."
  }
];
