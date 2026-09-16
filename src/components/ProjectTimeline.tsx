import React, { useState } from 'react';
import { ListTodo, CheckCircle2, Timer, AlertCircle, Circle, Award, Plus, Minus, TrendingUp, ExternalLink, X, Eye, FileText, Download } from 'lucide-react';
import { PROJECT_TIMELINE, CERTIFICATIONS, EFFICIENCY_GOAL, DEVELOPMENT_AREAS } from '../data';

export default function ProjectTimeline() {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(true);
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS[0] | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Complete':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          dot: 'bg-emerald-500',
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        };
      case 'In Progress':
        return {
          bg: 'bg-[#0052FF]/10 text-[#0052FF] border-[#0052FF]/20',
          dot: 'bg-[#0052FF] animate-pulse',
          icon: <Timer className="h-4 w-4 text-[#0052FF]" />
        };
      case 'On Hold / Blocked':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          dot: 'bg-rose-500',
          icon: <AlertCircle className="h-4 w-4 text-rose-400" />
        };
      default:
        return {
          bg: 'bg-slate-800 text-slate-400 border-slate-700/60',
          dot: 'bg-slate-600',
          icon: <Circle className="h-4 w-4 text-slate-500" />
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Certifications and Process Efficiency Goal Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Professional & AI Certifications Block */}
        <div className="rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2.5 mb-4 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="rounded-lg bg-[#0052FF]/10 border border-[#0052FF]/20 p-2 text-[#0052FF]">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">Professional & AI Certifications</h3>
                  <p className="text-[10px] text-slate-400">Validated industry credentials and learning paths</p>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
              {CERTIFICATIONS.map((cert, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setSelectedCert(cert);
                  }}
                  className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3.5 hover:bg-white/10 hover:border-white/20 transition-all shadow-sm cursor-pointer group relative"
                  title="Click to view digital certificate PDF replica"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0052FF]/10 text-[9.5px] font-mono font-bold text-[#0052FF] mt-0.5 group-hover:bg-[#0052FF] group-hover:text-white transition-colors">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-200 leading-snug group-hover:text-[#0052FF] transition-colors">{cert.name}</h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                          <p className="text-[10px] font-mono text-slate-400">
                            {cert.issuer} {cert.date && `• ${cert.date}`}
                          </p>
                          <span className="text-[8px] font-mono bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-slate-400 group-hover:bg-[#0052FF]/15 group-hover:text-[#0052FF] group-hover:border-[#0052FF]/20 transition-all flex items-center gap-0.5">
                            <Eye className="h-2 w-2" /> View PDF Replica
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="rounded-lg bg-white/5 border border-white/10 p-1.5 text-slate-400 hover:text-white hover:bg-[#0052FF]/20 hover:border-[#0052FF]/45 transition-all shrink-0 cursor-pointer"
                        title="Verify original link on Coursera/Issuer platform"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  
                  {cert.description && (
                    <p className="text-[10.5px] leading-relaxed text-slate-300 font-sans pl-7.5">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Efficiency Goal Block */}
        <div className="rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-2 text-indigo-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">Apprenticeship Process Efficiency Goal</h3>
                <p className="text-[10px] text-slate-400">Lyft Culture Team execution phase optimizations</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              To address a historical baseline where team initiatives averaged a 75% on-time completion rate, Ron serves as the operational engine driving roadmap velocity. He engineered and deployed centralized 2025/2026 team project tracking systems powered by AI-generated formulas to enable real-time program health monitoring. By bringing cross-functional stakeholders together to log milestones and establish strict input integrity, Ron actively keeps the team's core deliverables on deadline—successfully maintaining a ~90% project-phase efficiency rating.
            </p>
          </div>

          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">TEAM BASELINE</span>
                <span className="font-display text-xl font-extrabold text-slate-400">{EFFICIENCY_GOAL.baseline}</span>
              </div>
              <div className="rounded-2xl bg-indigo-500/10 border border-white/10 p-3.5 text-center">
                <span className="text-[10px] font-mono text-indigo-400 uppercase block">TARGET EFFICIENCY</span>
                <span className="font-display text-xl font-extrabold text-indigo-400">{EFFICIENCY_GOAL.target.split(' ')[0]}</span>
              </div>
            </div>

            {/* Custom progress comparison indicator bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Baseline ({EFFICIENCY_GOAL.baseline})</span>
                <span>Optimized Target (90%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-white/5 border border-white/10 flex overflow-hidden">
                <div className="h-full bg-slate-600 border-r border-slate-950" style={{ width: '75%' }} />
                <div className="h-full bg-indigo-500 animate-pulse" style={{ width: '15%' }} />
              </div>
              <div className="text-[9px] text-slate-400 leading-tight">
                *Targeting 90%+ rework-free on-time deliverable distributions by target date: August 15, 2026.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Structured Development & Growth Focus Areas */}
      <div className="rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 p-6 shadow-2xl font-sans">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
          <h3 className="font-display font-bold text-sm text-white">Strategic Development & Growth Areas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {DEVELOPMENT_AREAS.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-1 hover:bg-white/10 transition-colors">
              <h4 className="text-xs font-bold text-[#0052FF] inline-flex items-center gap-1.5 uppercase font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF]" />
                {item.area}
              </h4>
              <p className="text-[11.5px] leading-relaxed text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Collapsible Project Tracker */}
      <div className="rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl overflow-hidden">
        
        {/* Timeline Table Toggle Header */}
        <div 
          onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
          className="px-6 py-5 bg-white/5 hover:bg-white/10 border-b border-white/10 flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ListTodo className="h-4 w-4 text-[#0052FF]" />
            <div>
              <h3 className="font-display font-bold text-sm text-white">Full Apprenticeship Project Tracker</h3>
              <p className="text-[10px] text-slate-400">Real-time status tracking across 9 core initiatives</p>
            </div>
          </div>
          <button className="rounded-lg bg-white/5 border border-white/10 p-1.5 text-slate-400 hover:text-white transition-colors">
            {isTimelineExpanded ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Project List Table */}
        {isTimelineExpanded && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase font-semibold text-slate-400 border-b border-white/10">
                  <th className="px-5 py-3 font-mono">INITIATIVE / WORKSTREAM</th>
                  <th className="px-4 py-3 font-mono">TIMELINE</th>
                  <th className="px-4 py-3 font-mono">STATUS</th>
                  <th className="px-4 py-3 font-mono text-right">COMPLETION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-white/5">
                {PROJECT_TIMELINE.map((item, idx) => {
                  const statusInfo = getStatusStyle(item.status);
                  return (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3.5 max-w-sm">
                        <span className="font-semibold text-slate-200 block">{item.name}</span>
                        <span className="text-[10.5px] text-slate-300 leading-normal block mt-0.5">{item.description}</span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                        {item.timeline}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold border ${statusInfo.bg}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-[11.5px] font-bold text-slate-200">
                        {item.progress}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Interactive Certificate PDF Replica Modal Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          {/* Modal Container */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* PDF Reader Header Bar */}
            <div className="bg-slate-950 px-5 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-rose-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                  PDF
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-md">
                    {selectedCert.name.replace("Certificate", "").trim()}.pdf
                  </h4>
                  <p className="text-[9px] text-slate-400 font-mono">
                    Ronald_Scott_Credential_Replica_v1.0 (Digital Copy)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {selectedCert.link && (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-[#0052FF]/20 border border-white/10 text-xs font-semibold px-3 py-1.5 text-slate-300 hover:text-white transition-all pointer-events-auto"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="hidden sm:inline">Verify Original</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Document Workspace scrolling body */}
            <div className="flex-grow overflow-y-auto bg-slate-950/50 p-6 sm:p-10 flex justify-center items-start">
              
              {/* Document Paper Container */}
              <div className="w-full max-w-3xl bg-white text-slate-900 rounded-lg shadow-xl overflow-hidden relative border border-slate-200/80 min-h-[480px]">
                
                {selectedCert.issuer === "Workato Academy" ? (
                  /* WORKATO CERTIFICATE */
                  <div className="font-sans flex flex-col h-full justify-between min-h-[500px]">
                    {/* Teal Brand Header Row */}
                    <div className="bg-[#0e4a41] px-6 sm:px-8 py-5 flex items-center justify-between text-white border-b-4 border-emerald-400">
                      <div className="flex items-center gap-2.5">
                        {/* Custom Workato Connected Circles Logo */}
                        <div className="flex items-center gap-1">
                          <span className="h-4 w-4 bg-emerald-400 rounded-full flex items-center justify-center animate-pulse">
                            <span className="h-2 w-2 bg-[#0e4a41] rounded-full" />
                          </span>
                          <span className="font-bold tracking-tight text-white font-sans text-sm">workato</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-mono font-medium border-l border-emerald-500/40 pl-2.5 uppercase tracking-wider">ACADEMY</span>
                      </div>
                      
                      <div className="text-[9px] font-mono tracking-widest text-emerald-400 bg-white/10 px-2 py-0.5 rounded">
                        COMPLETED
                      </div>
                    </div>

                    {/* Central Body area */}
                    <div className="flex-1 px-6 sm:px-8 py-10 flex flex-col items-center text-center justify-center space-y-6">
                      
                      {/* Trophy Mint Circle Badge */}
                      <div className="relative">
                        <div className="relative h-14 w-14 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center shadow-sm">
                          <span className="text-2xl select-none">🏆</span>
                        </div>
                      </div>

                      {/* Heading titles */}
                      <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-[#0e4a41]">
                          Certificate of Completion
                        </h2>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                          Agentic AI Basics Course
                        </span>
                      </div>

                      {/* Awarded To section */}
                      <div className="w-full max-w-md space-y-1 pt-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">AWARDED TO</span>
                        <div className="border-b border-slate-200 pb-2">
                          <p className="text-2xl sm:text-32l font-serif font-semibold italic text-slate-800 tracking-wider">
                            Ronald Scott [C]
                          </p>
                        </div>
                        <span className="text-[10.5px] text-slate-500 block mt-1 px-4">
                          This certificate validates that the recipient has passed a assessment proving a degree of proficiency in the knowledge, skills, and abilities presented in this course.
                        </span>
                      </div>

                      {/* Expiry metadata block */}
                      <div className="grid grid-cols-2 gap-4 pt-4 w-full max-w-sm border-t border-slate-100/80">
                        <div className="text-left">
                          <span className="text-[9px] font-mono text-slate-400 uppercase block">Awarded Date</span>
                          <span className="text-xs font-bold font-mono text-slate-700">{selectedCert.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono text-slate-400 uppercase block">Credential Period</span>
                          <span className="text-xs font-bold font-mono text-slate-700">2 Years (Valid till 2028)</span>
                        </div>
                      </div>

                    </div>

                    {/* Teal Footer validation Row */}
                    <div className="bg-[#0e4a41]/5 px-6 sm:px-8 py-4 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between text-[9.5px] text-slate-500 gap-2">
                      <p className="text-center sm:text-left leading-normal">
                        Presented by Workato Academy • academy.workato.com
                      </p>
                      <span className="font-mono font-bold text-slate-600 block shrink-0">
                        VERIFIED ID: 6/3/2026
                      </span>
                    </div>

                  </div>
                ) : (
                  /* GOOGLE CERTS (PM, AI Essentials, Prompting Essentials) */
                  <div className="font-sans flex flex-col h-full justify-between min-h-[500px] bg-slate-50 p-6 sm:p-10 relative">
                    
                    {/* Double Academic Thin Borders */}
                    <div className="absolute inset-4 sm:inset-6 border border-amber-800/10 rounded-md pointer-events-none" />
                    <div className="absolute inset-5 sm:inset-7 border border-amber-800/20 rounded-md pointer-events-none" />

                    <div className="relative flex-1 flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-stretch mt-3">
                      
                      {/* Left Major Certification Information Panel (75%) */}
                      <div className="flex-grow flex flex-col justify-between space-y-6">
                        
                        {/* Top: Google brand logo representation */}
                        <div className="flex items-center">
                          {/* Elegant HTML/CSS Google Logo */}
                          <div className="flex items-center text-xl font-extrabold tracking-tight select-none">
                            <span className="text-[#4285F4]">G</span>
                            <span className="text-[#EA4335]">o</span>
                            <span className="text-[#FBBC05]">o</span>
                            <span className="text-[#4285F4]">g</span>
                            <span className="text-[#34A853]">l</span>
                            <span className="text-[#EA4335]">e</span>
                          </div>
                        </div>

                        {/* Middle body */}
                        <div className="space-y-4">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">{selectedCert.date}</span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                              Ronald Scott
                            </h2>
                            <p className="text-xs text-slate-500 font-sans">
                              has successfully completed
                            </p>
                          </div>

                          <div className="space-y-1.5 border-l-4 border-[#0052FF]/30 pl-4 py-0.5">
                            <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-800 leading-tight">
                              {selectedCert.name}
                            </h3>
                            <p className="text-[10.5px] leading-relaxed text-slate-500 max-w-lg font-sans">
                              an online non-credit course authorized by Google and offered through Coursera
                            </p>
                          </div>

                          {/* Specific structures block for the Google Project Management 7 Courses list */}
                          {selectedCert.name.includes("Project Management") && (
                            <div className="bg-slate-200/50 p-3 rounded-lg border border-slate-200 text-[10px] space-y-1.5">
                              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">7-Course Specialization Curriculum:</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 font-sans text-slate-700">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Foundations of Project Management
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Project Initiation Frameworks
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Project Planning & Logistics
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Project Execution Operations
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Agile Project Management
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Real-World PM Capstone Apply
                                </div>
                                <div className="flex items-center gap-1.5 sm:col-span-2">
                                  <span className="text-[#34A853] font-bold">✔</span> Accelerate Your Job Search with AI Tools
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Specific structures block for the Google UX Design 7 Courses list */}
                          {selectedCert.name.includes("UX Design") && (
                            <div className="bg-slate-200/50 p-3 rounded-lg border border-slate-200 text-[10px] space-y-1.5">
                              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">7-Course Specialization Curriculum:</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 font-sans text-slate-700">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Foundations of User Experience (UX) Design
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Start the UX Design Process: Empathize, Define, and Ideate
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Build Wireframes and Low-Fidelity Prototypes
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Conduct UX Research and Test Early Concepts
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Create High-Fidelity Designs and Prototypes in Figma
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#34A853] font-bold">✔</span> Build Dynamic User Interfaces (UI) for Websites
                                </div>
                                <div className="flex items-center gap-1.5 sm:col-span-2">
                                  <span className="text-[#34A853] font-bold">✔</span> Design a User Experience for Social Good & Prepare for Jobs
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Descriptive course summary text */}
                          {!selectedCert.name.includes("Project Management") && !selectedCert.name.includes("UX Design") && selectedCert.description && (
                            <p className="text-[10.5px] leading-relaxed text-slate-600 max-w-lg bg-slate-200/40 p-3 rounded-lg border border-slate-200/80 font-sans">
                              {selectedCert.description}
                            </p>
                          )}
                        </div>

                        {/* Bottom: Signature line */}
                        <div className="pt-2 flex items-end">
                          <div className="space-y-0.5">
                            <p className="font-serif italic text-sm font-semibold text-slate-800 select-none">
                              Amanda Brophy
                            </p>
                            <div className="border-t border-slate-300 w-32" />
                            <p className="text-[8px] text-slate-400 font-sans tracking-wide">
                              Global Director of Google Career Certificates
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Right Branding vertical ribbon (25%) */}
                      <div className="w-full sm:w-40 shrink-0 bg-slate-200/60 rounded-lg p-3 text-center flex flex-col justify-between items-center border border-slate-300">
                        <div>
                          <div className="bg-[#1D2B49] text-white py-0.5 px-2 rounded font-bold text-[8.5px] uppercase tracking-widest inline-block shadow-sm">
                            COURSERA
                          </div>
                          <p className="text-[8px] text-slate-400 font-mono mt-1 block">OFFICIAL CREDENTIAL</p>
                        </div>

                        {/* Circular education laurel ribbon emblem */}
                        <div className="my-3 h-14 w-14 rounded-full bg-white border border-slate-300 flex items-center justify-center relative">
                          <div className="text-center">
                            <span className="text-[8px] font-bold text-slate-800 block">VALID</span>
                            <span className="text-[#0052FF] text-[8px] block my-0.5">★</span>
                            <span className="text-[7px] font-mono text-slate-500 block leading-none">CERTIFICATE</span>
                          </div>
                        </div>

                        <div className="text-[7.5px] text-slate-500 font-sans leading-tight">
                          Verification hash:<br />
                          <span className="font-mono text-slate-700 font-semibold select-all block mt-0.5 text-[8.5px]">
                            {selectedCert.link ? selectedCert.link.split('/').pop()?.toUpperCase() : 'N/A'}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Coursera Footer validation link details */}
                    <div className="pt-3 border-t border-slate-200 relative flex flex-col sm:flex-row sm:items-center justify-between text-[8px] text-slate-400 font-sans gap-1 mt-6">
                      <p>
                        Coursera verified individual identity & course participation.
                      </p>
                      {selectedCert.link && (
                        <span className="font-mono text-[#0052FF] truncate max-w-xs sm:max-w-md">
                          {selectedCert.link}
                        </span>
                      )}
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Modal Bottom control bar */}
            <div className="bg-slate-950 px-5 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
              <div className="flex items-center gap-1.5 font-mono text-slate-500">
                <span>Rendering Context: Secure Sandbox Web Replica</span>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      const divToPrint = document.querySelector('.w-full.max-w-3xl.bg-white')?.outerHTML || '';
                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>Print Certificate - ${selectedCert.name}</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <style>
                              body { background: #fff; margin: 0; padding: 40px; display: flex; justify-content: center; align-items: center; min-h: screen; -webkit-print-color-adjust: exact; }
                              @media print {
                                body { padding: 0; }
                                .border-slate-200\\/50 { border-color: transparent !important; }
                              }
                            </style>
                          </head>
                          <body>
                            <div class="w-[800px]">
                              ${divToPrint}
                            </div>
                            <script>
                              window.onload = function() {
                                window.print();
                                setTimeout(function() { window.close(); }, 500);
                              };
                            </script>
                          </body>
                        </html>
                      `);
                      printWindow.document.close();
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all font-semibold flex items-center justify-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  Print / Save Certificate
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#0052FF] hover:bg-[#0052FF]/95 text-white transition-all font-bold flex items-center justify-center"
                >
                  Close Document
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
