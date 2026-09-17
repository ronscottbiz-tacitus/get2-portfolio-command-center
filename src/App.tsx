import React, { useState } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectTimeline from './components/ProjectTimeline';
import ChatSandbox from './components/ChatSandbox';
import { X } from 'lucide-react';
import { PROFILE_INFO, EXPERIENCE, CERTIFICATIONS, SKILLS } from './data/profile';

const mono = "'JetBrains Mono', monospace";
const display = "'Archivo Expanded', sans-serif";
const condensed = "'Archivo Condensed', sans-serif";

function buildPlainTextResume(): string {
  const experience = EXPERIENCE.map((e) => {
    const bullets = e.highlights.map((h) => `- ${h}`).join('\n');
    return `${e.org} | ${e.title} | ${e.timeline}\n${e.summary}${bullets ? '\n' + bullets : ''}`;
  }).join('\n\n');
  const certs = CERTIFICATIONS.map((c) => `- ${c.name}: ${c.issuer}`).join('\n');
  const skills = Object.entries(SKILLS)
    .map(([category, items]) => `- ${category}: ${items.join(', ')}`)
    .join('\n');
  return `${PROFILE_INFO.name}\n${PROFILE_INFO.role}\nportfolio.get2.one | rscott.framer.ai | get2.one | linkedin.com/in/ronaldscott\n\nWHO I AM\n${PROFILE_INFO.bio}\n\nPROFESSIONAL EXPERIENCE\n${experience}\n\nEDUCATION & CERTIFICATIONS\n${certs}\n\nSKILLS\n${skills}`;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="h-1.5 w-1.5 shrink-0" style={{ background: '#0052FF' }} />
      <h2 className="uppercase" style={{ fontFamily: condensed, fontWeight: 800, fontSize: 12, color: '#8A8F98', letterSpacing: '0.12em', margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

export default function App() {
  React.useEffect(() => {
    document.title = 'Ron Scott | Portfolio';
  }, []);

  const [projectTrigger, setProjectTrigger] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeCopied, setResumeCopied] = useState(false);

  const handleSelectProjectForChat = (projectName: string) => {
    setProjectTrigger(projectName);
    setTimeout(() => {
      document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050506', color: '#F5F6F8', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
      <nav className="sticky top-0 z-50" style={{ background: '#050506', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 20px' }}>
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-3.5">
          <div className="flex items-center gap-3">
            <a href="https://get2.one" target="_blank" rel="noopener noreferrer" className="flex items-baseline">
              <img src="/brand/get2-wordmark.png" alt="Get2" style={{ height: 22, width: 'auto' }} />
            </a>
            <span className="h-4 w-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <div>
              <span className="block uppercase" style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, color: '#6C93FF', letterSpacing: '0.1em', lineHeight: 1 }}>
                Portfolio
              </span>
              <span className="block" style={{ fontFamily: mono, fontSize: 10, color: '#5B6069', lineHeight: 1, marginTop: 2 }}>
                {PROFILE_INFO.name}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="rounded-md cursor-pointer"
              style={{ padding: '8px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#34D399', fontSize: 12, fontWeight: 700 }}
            >
              Resume / CV
            </button>
            <a
              href="https://rscott.framer.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md"
              style={{ padding: '8px 14px', background: 'rgba(0,82,255,0.08)', border: '1px solid rgba(0,82,255,0.3)', color: '#6C93FF', fontSize: 12, fontWeight: 700 }}
            >
              UX Portfolio
            </a>
            <a
              href="https://get2.one"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md"
              style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#C7CAD1', fontSize: 12, fontWeight: 700 }}
            >
              Get2 Brand Hub
            </a>
          </div>
        </div>
      </nav>

      <Header />

      <section className="px-5 pb-11">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>At a Glance</SectionLabel>
          <KPICards />
        </div>
      </section>

      <section className="px-5 pb-11">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>Get2 Product Family</SectionLabel>
          <ProjectsGrid onSelectProjectForChat={handleSelectProjectForChat} />
        </div>
      </section>

      <section className="px-5 pb-11">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>Experience &amp; Credentials</SectionLabel>
          <ProjectTimeline />
        </div>
      </section>

      <section id="chat-section" className="px-5 pb-16 scroll-mt-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>Ask About Ron</SectionLabel>
          <ChatSandbox preloadedPrompt={projectTrigger} onClearPreloadedPrompt={() => setProjectTrigger(null)} />
        </div>
      </section>

      <footer
        className="text-center pt-8 pb-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: mono, fontSize: 10, color: '#5B6069' }}
      >
        <p style={{ margin: 0 }}>{PROFILE_INFO.name} | Portfolio</p>
        <p style={{ margin: '4px 0 0' }}>&copy; 2026 {PROFILE_INFO.name}.</p>
      </footer>

      {isResumeOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: 'rgba(5,5,6,0.85)' }}>
          <div className="absolute inset-0" onClick={() => setIsResumeOpen(false)} />
          <div
            className="relative w-full max-w-[680px] max-h-[85vh] overflow-y-auto rounded-[14px]"
            style={{ background: '#0b0c0f', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div
              className="sticky top-0 flex items-center justify-between"
              style={{ background: '#0b0c0f', padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: '#34D399' }}>RESUME</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(buildPlainTextResume());
                    setResumeCopied(true);
                    setTimeout(() => setResumeCopied(false), 1500);
                  }}
                  className="rounded-md cursor-pointer"
                  style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#C7CAD1', fontSize: 11 }}
                >
                  {resumeCopied ? '✓ Copied' : 'Copy Plain Text'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="rounded-md cursor-pointer"
                  style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#C7CAD1', fontSize: 11 }}
                >
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="rounded-md cursor-pointer flex items-center"
                  style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#8A8F98' }}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="p-7">
              <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: 26, color: '#fff', margin: 0 }}>{PROFILE_INFO.name}</h2>
              <p style={{ fontFamily: mono, fontSize: 12, color: '#6C93FF', margin: '6px 0 0' }}>{PROFILE_INFO.role}</p>
              <p style={{ fontFamily: mono, fontSize: 11, color: '#5B6069', margin: '2px 0 0' }}>{PROFILE_INFO.location}</p>
              <div className="flex flex-wrap gap-3 mt-2" style={{ fontFamily: mono, fontSize: 11, color: '#6C93FF' }}>
                <a href="https://portfolio.get2.one" target="_blank" rel="noopener noreferrer">portfolio.get2.one</a>
                <a href="https://rscott.framer.ai" target="_blank" rel="noopener noreferrer">rscott.framer.ai</a>
                <a href="https://get2.one" target="_blank" rel="noopener noreferrer">get2.one</a>
                <a href="https://linkedin.com/in/ronaldscott" target="_blank" rel="noopener noreferrer">linkedin.com/in/ronaldscott</a>
              </div>

              <div className="mt-6">
                <h3 className="uppercase" style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700, color: '#6C93FF', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                  Who I Am
                </h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.7, color: '#C7CAD1', margin: 0 }}>{PROFILE_INFO.bio}</p>
              </div>

              <div className="mt-6">
                <h3 className="uppercase" style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700, color: '#6C93FF', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                  Professional Experience
                </h3>
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} style={{ padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex flex-wrap justify-between gap-1">
                      <h4 style={{ fontWeight: 700, fontSize: 13, color: '#fff', margin: 0 }}>
                        {exp.org} &bull; {exp.title}
                      </h4>
                      <span style={{ fontFamily: mono, fontSize: 11, color: '#5B6069' }}>{exp.timeline}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: '#8A8F98', margin: '4px 0 0', lineHeight: 1.6 }}>{exp.summary}</p>
                    {exp.highlights.length > 0 && (
                      <ul style={{ margin: '8px 0 0', paddingLeft: 16 }}>
                        {exp.highlights.map((h, j) => (
                          <li key={j} style={{ fontSize: 11.5, color: '#C7CAD1', lineHeight: 1.6, marginBottom: 3 }}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="uppercase" style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700, color: '#6C93FF', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                  Education &amp; Certifications
                </h3>
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className="rounded-md" style={{ padding: 12, background: '#050506', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p style={{ fontWeight: 700, fontSize: 12, color: '#fff', margin: 0 }}>{cert.name}</p>
                      <p style={{ fontFamily: mono, fontSize: 10.5, color: '#6C93FF', margin: '4px 0 0' }}>{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="uppercase" style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700, color: '#6C93FF', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                  Skills
                </h3>
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                  {Object.entries(SKILLS).map(([category, items]) => (
                    <div key={category} className="rounded-md" style={{ padding: 12, background: '#050506', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="uppercase" style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: '#6C93FF', letterSpacing: '0.06em', margin: '0 0 6px' }}>
                        {category}
                      </p>
                      <p style={{ fontSize: 11.5, color: '#C7CAD1', margin: 0, lineHeight: 1.6 }}>{items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
