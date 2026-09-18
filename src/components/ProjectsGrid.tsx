import React, { useState } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { GET2_PROJECTS, Get2Project, ProjectStatus } from '../data/projects';

interface ProjectsGridProps {
  onSelectProjectForChat: (projectName: string) => void;
}

const STATUS_META: Record<ProjectStatus, { color: string; bg: string; border: string }> = {
  Live: { color: '#34D399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  'In Development': { color: '#38BDF8', bg: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.3)' },
  Prototype: { color: '#38BDF8', bg: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.3)' },
  Concept: { color: '#FBBF24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  Archived: { color: '#94A3B8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)' },
};

function alpha(hex: string, a: string) {
  return '#' + hex.replace('#', '') + a;
}

function buildView(p: Get2Project) {
  const meta = STATUS_META[p.status];
  const shipped = p.status === 'Live';
  return {
    ...p,
    accentBorder: alpha(p.accent, '55'),
    accentSoft: alpha(p.accent, '14'),
    statusColor: meta.color,
    statusBg: meta.bg,
    statusBorder: meta.border,
    chromeStyle: shipped ? ('solid' as const) : ('dashed' as const),
    highlightCountLabel: `${p.highlights.length} highlight${p.highlights.length === 1 ? '' : 's'}`,
    githubUrl: p.githubRepo ? `https://github.com/${p.githubRepo}` : null,
  };
}

function BrowserChrome({ accent, domain, chromeStyle, onClose }: { accent: string; domain: string; chromeStyle: 'solid' | 'dashed'; onClose?: () => void }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-2"
      style={{ background: '#08090a', borderBottom: `1px ${chromeStyle} rgba(255,255,255,0.08)` }}
    >
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: accent }} />
      <span className="h-[7px] w-[7px] rounded-full bg-white/15" />
      <span className="h-[7px] w-[7px] rounded-full bg-white/15" />
      <span
        className="flex-1 text-center truncate"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#7B818C', letterSpacing: '0.03em' }}
      >
        {domain}
      </span>
      {onClose && (
        <button onClick={onClose} className="text-[#8A8F98] hover:text-white px-1 text-sm cursor-pointer leading-none">
          ×
        </button>
      )}
    </div>
  );
}

export default function ProjectsGrid({ onSelectProjectForChat }: ProjectsGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const views = GET2_PROJECTS.map(buildView);
  const selected = views.find((v) => v.id === selectedId) || null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {views.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className="cursor-pointer rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
            style={{ background: '#0c0d10', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <BrowserChrome accent={p.accent} domain={p.domain} chromeStyle={p.chromeStyle} />

            {p.videoUrl ? (
              <video
                className="aspect-video w-full border-b border-white/8 object-cover"
                style={{ objectPosition: 'top' }}
                src={p.videoUrl}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : p.imageUrl ? (
              <div
                className="aspect-video border-b border-white/8"
                style={{ backgroundImage: `url(${p.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
              />
            ) : (
              <div
                className="aspect-video flex items-center justify-center border-b border-white/8"
                style={{ background: p.accentSoft }}
              >
                <span
                  className="uppercase"
                  style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 900, fontSize: 15, color: p.accentBorder, letterSpacing: '0.1em' }}
                >
                  {p.status}
                </span>
              </div>
            )}

            <div className="p-[18px]">
              <div className="flex items-start justify-between gap-2.5">
                <h3 style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 800, fontSize: 18, color: '#fff', margin: 0 }}>
                  {p.name}
                </h3>
                <span
                  className="shrink-0 uppercase"
                  style={{
                    padding: '3px 8px', borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5,
                    fontWeight: 700, letterSpacing: '0.05em', background: p.statusBg, color: p.statusColor, border: `1px solid ${p.statusBorder}`,
                  }}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-1.5" style={{ fontSize: 13, color: '#8A8F98', lineHeight: 1.5 }}>
                {p.tagline}
              </p>
              <span
                className="inline-block mt-3 uppercase"
                style={{
                  padding: '3px 9px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 700, color: '#8A8F98', letterSpacing: '0.05em',
                }}
              >
                {p.category}
              </span>
              <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/8">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#7B818C' }}>
                  {p.highlightCountLabel}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: p.accent }}>
                  View →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: 'rgba(5,5,6,0.85)' }}>
          <div className="absolute inset-0" onClick={() => setSelectedId(null)} />
          <div
            className="relative w-full max-w-[640px] max-h-[85vh] overflow-y-auto rounded-[14px]"
            style={{ background: '#0b0c0f', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <BrowserChrome accent={selected.accent} domain={selected.domain} chromeStyle="solid" onClose={() => setSelectedId(null)} />

            {selected.videoUrl ? (
              <video
                className="aspect-video w-full border-b border-white/8 object-cover"
                style={{ objectPosition: 'top' }}
                src={selected.videoUrl}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : selected.imageUrl ? (
              <div
                className="aspect-video border-b border-white/8"
                style={{ backgroundImage: `url(${selected.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
              />
            ) : null}

            <div className="p-[22px]">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 900, fontSize: 22, color: '#fff', margin: 0 }}>
                  {selected.name}
                </h2>
                <span
                  className="uppercase"
                  style={{
                    padding: '3px 9px', borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
                    background: selected.statusBg, color: selected.statusColor, border: `1px solid ${selected.statusBorder}`,
                  }}
                >
                  {selected.status}
                </span>
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7B818C', margin: '6px 0 18px' }}>
                {selected.category}
              </p>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: '#C7CAD1', margin: 0 }}>{selected.description}</p>

              {selected.note && (
                <div
                  className="mt-3.5 rounded-lg"
                  style={{ padding: '12px 14px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', fontSize: 12, lineHeight: 1.6, color: '#FBBF24' }}
                >
                  {selected.note}
                </div>
              )}

              {selected.highlights.length > 0 && (
                <div className="mt-4.5 flex flex-col gap-2">
                  {selected.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex gap-2 rounded-lg"
                      style={{ padding: '10px 12px', background: '#050506', border: '1px solid rgba(255,255,255,0.06)', fontSize: 12, lineHeight: 1.6, color: '#C7CAD1' }}
                    >
                      <span className="shrink-0" style={{ color: selected.accent }}>✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {selected.techStack.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {selected.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md"
                      style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#9BA0A8' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4.5 flex flex-wrap gap-2">
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg"
                    style={{ padding: '7px 12px', background: 'rgba(0,82,255,0.08)', border: '1px solid rgba(0,82,255,0.3)', color: '#6C93FF', fontSize: 11.5, fontWeight: 700 }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View Live
                  </a>
                )}
                {selected.githubUrl && (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg"
                    style={{ padding: '7px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#C7CAD1', fontSize: 11.5, fontWeight: 700 }}
                  >
                    <Github className="h-3.5 w-3.5" /> Source
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 justify-end p-[16px_22px]" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {selected.caseStudyUrl && (
                <button
                  onClick={() => window.open(selected.caseStudyUrl, '_blank', 'noopener,noreferrer')}
                  className="rounded-lg cursor-pointer"
                  style={{ padding: '9px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#C7CAD1', fontSize: 12, fontWeight: 700 }}
                >
                  Read Full Case Study →
                </button>
              )}
              <button
                onClick={() => {
                  onSelectProjectForChat(selected.name);
                  setSelectedId(null);
                }}
                className="rounded-lg cursor-pointer"
                style={{ padding: '9px 16px', background: '#0052FF', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700 }}
              >
                Ask the Chatbot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
