// Demo-mode fallback answers — used when no Gemini/model API key is configured.
// Replaces the old apprenticeship-review fallback content in server.ts's
// getFallbackAnswer(). Keep this in sync with grounding.ts's knowledge base.

import { GET2_PROJECTS } from './projects';
import { CERTIFICATIONS } from './profile';

interface FallbackSection {
  id: string;
  tags: string[];
  content: string;
}

const projectsSection = GET2_PROJECTS.map((p) => {
  const linkParts = [
    p.liveUrl ? `[live](${p.liveUrl})` : null,
    p.caseStudyUrl ? `[case study](${p.caseStudyUrl})` : null,
  ].filter(Boolean);
  const link = linkParts.length ? ` — ${linkParts.join(' · ')}` : '';
  const note = p.note ? ` *(${p.note})*` : '';
  return `* **${p.name}**${link} (${p.status}): ${p.description}${note}`;
}).join('\n');

const certsSection = CERTIFICATIONS.map((c) => `* **${c.name}** — ${c.issuer}`).join('\n');

export const FALLBACK_SECTIONS: FallbackSection[] = [
  {
    id: 'projects',
    tags: ['project', 'build', 'built', 'get2', 'app', 'product', 'portfolio', 'game', 'puzzle', 'pinochle', 'board', 'grocery'],
    content: `### 🛠️ The Get2 Project Family\n${projectsSection}`,
  },
  {
    id: 'experience',
    tags: ['experience', 'resume', 'work', 'job', 'career', 'history', 'employer', 'lyft', 'crop', 'urban alchemy', 'tutor', 'aspire'],
    content: `### 💼 Professional Experience Summary
* **Lyft — AI Transformation Lead / Project Specialist (Apprentice)** (Aug 2025 – Aug 2026): Built an enterprise AI-literacy program from zero — 879+ nominations processed, 279 verified participants, 100% business-unit coverage. Completed as a U.S. Department of Labor Registered Apprenticeship.
* **Get2 — Founder & Product Builder** (Jun 2023 – Present): Solo-built ${GET2_PROJECTS.length} consumer products spanning games, civic tech, and retail tech — from live launches to early-stage concepts.
* **Urban Alchemy — Care Coordinator & Data Systems** (Dec 2023 – Aug 2025): Field coordination and case-data systems work across Salesforce and municipal HMIS platforms.
* **CROP Organization — UX/UI Design & Development Intern/Fellow** (Mar 2023 – Apr 2024): Featured on the Figma blog and spoke at Figma's global headquarters.`,
  },
  {
    id: 'certifications',
    tags: ['certification', 'credential', 'google', 'workato', 'course', 'degree', 'education', 'college', 'gpa', 'apprenticeship', 'dol'],
    content: `### 🎓 Education & Credentials\n${certsSection}`,
  },
  {
    id: 'skills',
    tags: ['skill', 'stack', 'tech', 'technical', 'design', 'figma', 'ai', 'prompt', 'react', 'code', 'development'],
    content: `### ⚙️ Core Skills
* **Product & Design:** 0-to-1 consumer product design, UX research, Figma/Framer, accessibility (WCAG)
* **AI & Emerging Tech:** AI literacy program design, LLM evaluation, prompt engineering, agentic AI frameworks
* **Development:** HTML/CSS/JavaScript, React, TypeScript, Vite, embedded prototyping (ESP32)`,
  },
  {
    id: 'contact',
    tags: ['contact', 'reach', 'email', 'hire', 'available', 'linkedin', 'connect'],
    content: `### 📬 Get in Touch
The best way to reach Ron directly is via **[LinkedIn](https://linkedin.com/in/ronaldscott)** or the contact form on this site. This chatbot doesn't have direct contact details on file.`,
  },
];

export function getFallbackAnswer(message: string): string {
  const m = message.toLowerCase();
  for (const section of FALLBACK_SECTIONS) {
    if (section.tags.some((tag) => m.includes(tag))) {
      return section.content;
    }
  }
  return `### 👋 Welcome
I can tell you about Ron's Get2 projects, his experience at Lyft and elsewhere, his skills, certifications, or how to get in touch. What would you like to know?`;
}
