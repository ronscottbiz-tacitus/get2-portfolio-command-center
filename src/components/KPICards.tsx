import React, { useState } from 'react';
import { GET2_PROJECTS } from '../data/projects';
import { CERTIFICATIONS } from '../data/profile';

const liveCount = GET2_PROJECTS.filter((p) => p.status === 'Live').length;
const totalCount = GET2_PROJECTS.length;

const CARDS = [
  {
    title: 'Get2 Products',
    value: `${liveCount} Live`,
    subtext: `${totalCount} total, spanning games, civic tech, and retail`,
    description: 'Every Get2 project is owned solo, end to end — design, front-end build, and deployment.',
  },
  {
    title: 'U.S. DOL Apprenticeship',
    value: 'Completed',
    subtext: 'Registered Apprenticeship — Project Manager, Aug 2025–Aug 2026',
    description: 'Completed at Lyft, sponsored by the City & County of San Francisco Office of Economic & Workforce Development (RAPIDS Code 3019CB V1).',
  },
  {
    title: 'Certifications',
    value: `${CERTIFICATIONS.length}`,
    subtext: 'Google, Workato, and CDCR credentials',
    description: 'Spanning UX design, project management, AI essentials/prompting, and agentic AI fundamentals.',
  },
];

export default function KPICards() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
      {CARDS.map((card, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className="rounded-[10px]" style={{ padding: 20, background: '#0c0d10', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#4A4E56' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="block uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 700, color: '#8A8F98', letterSpacing: '0.07em', marginTop: 8 }}
            >
              {card.title}
            </span>
            <span className="block" style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 900, fontSize: 26, color: '#fff', marginTop: 6 }}>
              {card.value}
            </span>
            <span className="block" style={{ fontSize: 12, color: '#8A8F98', marginTop: 4, lineHeight: 1.5 }}>
              {card.subtext}
            </span>
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="cursor-pointer"
              style={{ background: 'none', border: 'none', color: '#6C93FF', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, padding: 0, marginTop: 14 }}
            >
              {isOpen ? 'Hide details' : 'Show details'}
            </button>
            {isOpen && (
              <div className="rounded-md" style={{ marginTop: 10, padding: 12, background: '#050506', border: '1px solid rgba(255,255,255,0.06)', fontSize: 12, lineHeight: 1.6, color: '#C7CAD1' }}>
                {card.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
