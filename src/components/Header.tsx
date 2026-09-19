import React from 'react';
import { PROFILE_INFO } from '../data/profile';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="px-5 pt-14 pb-10">
      <div className="max-w-[1200px] mx-auto flex flex-wrap gap-8 items-start">
        <div className="flex-1 min-w-[280px]">
          <div className="flex gap-5 items-center">
            <div
              className="h-[104px] w-[104px] shrink-0 rounded-[14px] overflow-hidden"
              style={{ background: '#0c0d10', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <video
                src="/brand/profile-loop.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full uppercase"
                style={{
                  padding: '4px 10px', background: 'rgba(0,82,255,0.08)', border: '1px solid rgba(0,82,255,0.3)',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 700, color: '#6C93FF', letterSpacing: '0.06em',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                Open to Work
              </span>
              <h1
                className="mt-2.5"
                style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 900, fontSize: 'clamp(28px,4vw,40px)', color: '#fff', letterSpacing: '-0.01em', margin: '10px 0 0' }}
              >
                {PROFILE_INFO.name}
              </h1>
              <p style={{ fontSize: 15, color: '#B8BBC2', margin: '4px 0 0' }}>{PROFILE_INFO.role}</p>
              <div className="flex flex-wrap gap-4 mt-3" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: '#8A8F98' }}>
                <span>{PROFILE_INFO.location}</span>
                <a href="https://linkedin.com/in/ronaldscott" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/ronaldscott
                </a>
              </div>
            </div>
          </div>

          <div
            className="mt-6 rounded-[10px]"
            style={{ padding: 22, background: '#0c0d10', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span
              className="block uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 700, color: '#6C93FF', letterSpacing: '0.08em', marginBottom: 8 }}
            >
              Who I Am
            </span>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#C7CAD1', margin: 0 }}>{PROFILE_INFO.bio}</p>
          </div>
        </div>

        {children}
      </div>
    </header>
  );
}
