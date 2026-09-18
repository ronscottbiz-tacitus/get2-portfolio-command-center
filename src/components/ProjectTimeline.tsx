import React from 'react';
import { EXPERIENCE, CERTIFICATIONS } from '../data/profile';

export default function ProjectTimeline() {
  return (
    <div>
      <div className="rounded-xl mb-4" style={{ padding: 24, background: '#0c0d10', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 800, fontSize: 14, color: '#fff', margin: '0 0 4px' }}>
          Certifications & Education
        </h3>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#7B818C', margin: '0 0 18px' }}>
          Validated credentials and academic background
        </p>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="rounded-lg" style={{ padding: 13, background: '#050506', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontWeight: 700, fontSize: 12.5, color: '#fff', margin: 0 }}>{cert.name}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#6C93FF', margin: '4px 0 0' }}>{cert.issuer}</p>
              {cert.description && <p style={{ fontSize: 11, color: '#8A8F98', margin: '6px 0 0', lineHeight: 1.5 }}>{cert.description}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl" style={{ padding: 24, background: '#0c0d10', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 800, fontSize: 14, color: '#fff', margin: '0 0 4px' }}>
          Professional Experience
        </h3>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#7B818C', margin: '0 0 18px' }}>Roles, in order</p>
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className="flex gap-5" style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="shrink-0" style={{ width: 90, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7B818C', paddingTop: 2 }}>
              {exp.timeline}
            </span>
            <div>
              <h4 style={{ fontFamily: "'Archivo Expanded', sans-serif", fontWeight: 800, fontSize: 14, color: '#fff', margin: 0 }}>
                {exp.org} &bull; {exp.title}
              </h4>
              <p style={{ fontSize: 12.5, color: '#8A8F98', margin: '6px 0 0', lineHeight: 1.6 }}>{exp.summary}</p>
              {exp.highlights.length > 0 && (
                <ul style={{ margin: '10px 0 0', paddingLeft: 16 }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{ fontSize: 12, color: '#C7CAD1', lineHeight: 1.6, marginBottom: 4 }}>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
