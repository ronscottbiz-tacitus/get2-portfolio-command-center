import React, { useState, useRef } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import CompetencyGrid from './components/CompetencyGrid';
import ProjectTimeline from './components/ProjectTimeline';
import ChatSandbox from './components/ChatSandbox';
import { Sparkles, Terminal, Activity, Compass, ListTodo, MessageSquare, ExternalLink, FileText, X } from 'lucide-react';
import { PROFILE_INFO } from './data';
import get2Logo from '/get2-logo-wht.svg';

export default function App() {
  React.useEffect(() => {
    document.title = "Ron Scott | Portfolio Hub";
  }, []);

  // Capture dynamic competency selection to bubble up and trigger on the Chat Sandbox
  const [competencyTrigger, setCompetencyTrigger] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeCopied, setResumeCopied] = useState(false);

  const handleSelectCompetencyForChat = (compTitle: string) => {
    setCompetencyTrigger(compTitle);
    
    // Smooth scroll down to the chatbot portal
    setTimeout(() => {
      const chatSection = document.getElementById('chat-sandbox-section');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleClearPreloadedPrompt = () => {
    setCompetencyTrigger(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#0052FF]/30 selection:text-white relative overflow-x-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-[#0052FF]/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#0052FF]/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-[#0052FF]/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10 animate-fade-in">
        
        {/* Modern Horizontal Navigation Bar */}
        <nav className="w-full rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 shadow-lg sticky top-4 z-50">
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <a
                href="https://get2.one"
                target="_blank"
                rel="noopener noreferrer"
                className="group/logo relative h-10 px-2 flex items-center justify-center rounded-xl overflow-hidden border border-white/10 hover:border-white/25 bg-slate-950/80 hover:bg-slate-950 shadow-inner transition-all duration-300 cursor-pointer animate-fade-in"
                title="Visit Get2"
              >
                <img
                  src={get2Logo}
                  alt="Get2 Logo"
                  className="h-9 w-auto max-h-[36px] object-contain transition-all duration-300 group-hover/logo:scale-105 cursor-pointer"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/get2-logo-wht.svg";
                  }}
                />
              </a>
              <div>
                <span className="font-display font-black text-sm tracking-wide text-white block">
                  Ron Scott
                </span>
                <span className="text-[9px] font-mono font-medium text-[#0052FF] uppercase tracking-wider block leading-none">
                  Portfolio Hub
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full sm:flex sm:flex-row sm:flex-nowrap sm:items-center sm:gap-3 sm:w-auto">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/50 p-2.5 sm:px-3.5 sm:py-2 text-[10.5px] sm:text-xs font-semibold text-emerald-400 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)] cursor-pointer w-full text-center whitespace-nowrap"
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden md:inline font-sans">View Resume / CV</span>
              <span className="md:hidden font-sans">Resume</span>
            </button>
            <a
              href="https://rscott.framer.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0052FF]/10 hover:bg-[#0052FF]/20 border border-[#0052FF]/20 hover:border-[#0052FF]/50 p-2.5 sm:px-3.5 sm:py-2 text-[10.5px] sm:text-xs font-semibold text-[#0052FF] hover:text-white transition-all shadow-[0_0_15px_rgba(0,82,255,0.05)] cursor-pointer w-full text-center whitespace-nowrap"
            >
              <span className="hidden md:inline font-sans">UX Design Portfolio</span>
              <span className="md:hidden font-sans">UX Portfolio</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
            <a
              href="https://get2.one"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-purple-500/20 hover:border-pink-500/40 p-2.5 sm:px-3.5 sm:py-2 text-[10.5px] sm:text-xs font-semibold text-pink-400 hover:text-white transition-all shadow-[0_0_15px_rgba(236,72,153,0.05)] cursor-pointer w-full text-center whitespace-nowrap"
            >
              <span className="hidden md:inline font-sans">Get2 Brand Launch</span>
              <span className="md:hidden font-sans">Get2 Launch</span>
              <ExternalLink className="h-3.5 w-3.5 text-pink-400 shrink-0" />
            </a>
          </div>
        </nav>
        
        {/* Main Dashboard Navigation Header */}
        <Header />

        {/* SECTION 1: Top Row (KPI Dashboard Cards) */}
        <section id="kpi-dashboard-section" className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#0052FF] animate-pulse" />
            <h2 className="font-display font-black text-xs uppercase tracking-widest text-slate-400">
              Executive KPI Metrics
            </h2>
          </div>
          <KPICards />
        </section>

        {/* SECTION 2: Middle Section (Interactive Core Competencies) */}
        <section id="core-competencies-section" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#0052FF]" />
              <h2 className="font-display font-black text-xs uppercase tracking-widest text-slate-400">
                Culture & Belonging Core Competency Pillars
              </h2>
            </div>
            <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
              Interactive Matrix &bull; Click to Inspect
            </span>
          </div>
          <CompetencyGrid onSelectCompetencyForChat={handleSelectCompetencyForChat} />
        </section>

        {/* SUPPLEMENTAL SECTION: Project Timeline, Certifications, and Efficiency Goal */}
        <section id="timeline-tracker-section" className="space-y-4">
          <div className="flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-[#0052FF]" />
            <h2 className="font-display font-black text-xs uppercase tracking-widest text-slate-400">
              Deliverables Inventory & Optimization Targets
            </h2>
          </div>
          <ProjectTimeline />
        </section>

        {/* SECTION 3: Bottom Section (The Chat Sandbox Portal) */}
        <section id="chat-sandbox-section" className="space-y-4 scroll-mt-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#0052FF]" />
            <h2 className="font-display font-black text-xs uppercase tracking-widest text-slate-400">
              Apprenticeship Command Sandbox Portal
            </h2>
          </div>
          <ChatSandbox 
            preloadedPrompt={competencyTrigger} 
            onClearPreloadedPrompt={handleClearPreloadedPrompt} 
          />
        </section>

        {/* Footer info label */}
        <footer className="text-center pt-8 border-t border-white/10 text-[10px] font-mono text-slate-400 space-y-1">
          <p>Ron Scott | Portfolio Hub.</p>
          <p>© 2026 Ron Scott. Built with Google AI Studio.</p>
        </footer>
        
        {/* INTERACTIVE RESUME SPEC MODAL */}
        {isResumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in print:bg-white print:p-0">
            <div className="absolute inset-0" onClick={() => setIsResumeOpen(false)} />
            
            <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 shadow-3xl flex flex-col focus:outline-none animate-scale-up print:border-none print:bg-white print:shadow-none print:max-h-none print:overflow-visible">
              
              {/* Modal Sticky Header controls */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-900/90 backdrop-blur-md px-6 py-4 print:hidden">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-emerald-400">Verifiably Grounded Resume Spec</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const plainTextResume = `RON SCOTT
Designer · Builder · AI Practitioner · Community Advocate
ronaldscott.ca@gmail.com | portfolio.get2.one | rscott.framer.ai | get2.one | linkedin.com/in/ronaldscott

WHO I AM
I'm a designer, builder, and AI practitioner based in Oakland, CA. I spent 27 years incarcerated. I didn't waste them. I turned a cell into a study-tank — earning two Associate degrees with honors, completing certifications, mentoring other students, and spending every available hour learning to think differently about what was possible. I always believed technology could be the great equalizer. When I came home in 2023, I built three consumer apps from zero. I spoke at Figma's global headquarters. I was featured on the Figma blog. I joined Lyft where I now run AI-enabled programs at scale. Get2 is the company I founded on that premise: we don't got to — we get to.

PROFESSIONAL EXPERIENCE
Lyft | AI Transformation Lead / Project Specialist | 08/2025 – Present
Currently embedded at Lyft on the Culture & Belonging team, driving AI-enabled programs and operational infrastructure at scale.
- Helped build a company-wide AI literacy program — owned the full pipeline from intake through vetting to onboarding, achieving full coverage across every major business unit.
- Designed and deployed a three-tiered AI literacy credential system from scratch — defined learning objectives, skill proficiency levels, and a digital badge framework deployed across the entire active cohort.
- Designed the cohort deliberately for equity — balancing skill diversity across novice, intermediate, and expert learners.
- Led a feasibility study to consolidate multiple AI coaching tools into a single discovery dashboard — evaluated LLM instruction capacity limits and mapped a consolidation plan.
- Evaluated an enterprise automation platform for workflow optimization — defined requirements, mapped existing processes, and validated use cases.
- Built and maintained the team's central project tracker using AI-generated formulas — enabling real-time program health monitoring.
- Worked in Articulate 360 on an active e-learning project with hands-on authoring experience.
- Coordinated cross-functional program delivery with senior stakeholders across HR, Engineering, and Operations.
- Stepped in independently to manage new hire onboarding communications during a resource gap.
- Built an AI-powered interactive program portfolio at portfolio.get2.one.

Get2 | Founder & Product Lead | 06/2023 – 05/2026
- Built a portfolio of consumer apps (GroceryGo!, The Board, 3Ceipt!) from zero — owned the full product lifecycle including user research, UX/UI design, interactive prototyping, front-end development, usability testing, and iteration.
- Built all interactive prototypes in Figma and Framer — shipped production-ready front-end code in HTML, CSS, and JS with full WCAG accessibility compliance.
- Built the Get2 brand identity from scratch — designed the logo, motion graphics, animated character assets, and visual system.
- Designed and launched get2.one — the brand's public-facing landing page.

CROP Organization | UX/UI Design & Software Development Intern | 03/2023 – 04/2024
- Designed and prototyped digital reentry tools in Figma — applied user research, accessibility standards, and iterative usability testing.
- Built responsive web platforms from scratch in HTML, CSS, and JS with full WCAG accessibility compliance.
- Featured in a Figma blog article and spoke at Figma's global headquarters at a hands-on community event.

Aspire Education | Academic Tutor | 12/2024 – Present
Urban Alchemy | Care Coordinator | 12/2023 – 08/2025

EDUCATION & CERTIFICATIONS
- Associate of Arts, Mathematics & Science: Coastline College — Honors, 3.75 GPA
- Associate of Science, General Business: Coastline College — Honors, 3.75 GPA
- Google UX Design Professional Certificate: Coursera / Google
- Google AI Essentials Certificate: Coursera / Google
- Google Prompting Essentials Certificate: Coursera / Google
- Google Project Management Professional Certificate: Coursera / Google
- Workato Agentic AI Basics: Workato Academy
- Peer Literacy Mentor Certification: CDCR Office of Correctional Education

TECHNICAL SKILLS & COMPETENCIES
- Product & Experience Design: Figma, Framer, HTML/CSS/JS, WCAG accessibility, interaction design.
- AI & Emerging Technology: AI literacy program design, LLM evaluation, prompt engineering, multi-agent frameworks, Workato, Articulate 360.
- Program & Project Management: End-to-end program ownership, agile frameworks, cross-functional stakeholder coordination, real-time metrics tracking.`;
                      navigator.clipboard.writeText(plainTextResume);
                      setResumeCopied(true);
                      setTimeout(() => setResumeCopied(false), 2000);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 text-xs text-slate-300 font-semibold cursor-pointer transition-all"
                  >
                    {resumeCopied ? "✓ Copied!" : "📋 Copy Plain Text"}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-450 hover:text-white px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all"
                  >
                    🖨️ Print / Save PDF
                  </button>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Printable, beautiful resume sheet layout */}
              <div className="p-6 sm:p-8 space-y-8 text-slate-300 print:text-black print:bg-white print:p-0">
                {/* Visual Header */}
                <div className="border-b border-white/10 pb-6 print:border-black/25">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <h2 className="font-display font-black text-3xl text-white tracking-tight print:text-black">
                        {PROFILE_INFO.name}
                      </h2>
                      <p className="text-sm font-semibold text-[#0052FF] font-mono mt-1 print:text-black">
                        AI Transformation Lead / Project Specialist
                      </p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5 print:text-black">
                        Lyft Culture & Belonging (C&B) Team | Oakland &amp; San Francisco, CA
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 text-xs font-mono text-slate-400 print:text-black">
                      <a href="mailto:ronaldscott.ca@gmail.com" className="hover:text-white hover:underline transition-all flex items-center gap-1">
                        ✉ ronaldscott.ca@gmail.com
                      </a>
                      <div className="flex flex-wrap items-center md:justify-end gap-2 text-[11px] mt-1">
                        <a href="https://portfolio.get2.one" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all">
                          portfolio.get2.one
                        </a>
                        <span>&bull;</span>
                        <a href="https://rscott.framer.ai" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all">
                          rscott.framer.ai
                        </a>
                        <span>&bull;</span>
                        <a href="https://get2.one" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all">
                          get2.one
                        </a>
                        <span>&bull;</span>
                        <a href="https://linkedin.com/in/ronaldscott" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all">
                          linkedin.com/in/ronaldscott
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Who I Am / Statement */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF] print:text-black">
                    Who I Am
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300 print:text-black font-sans">
                    I'm a designer, builder, and AI practitioner based in Oakland, CA. I spent 27 years incarcerated. I didn't waste them. I turned a cell into a study-tank — earning two Associate degrees with honors, completing certifications, mentoring other students, and spending every available hour learning to think differently about what was possible. I always believed technology could be the great equalizer. When I came home in 2023, I built three consumer apps from zero. I spoke at Figma's global headquarters. I was featured on the Figma blog. I joined Lyft where I now run AI-enabled programs at scale. Get2 is the company I founded on that premise: we don't got to — we get to.
                  </p>
                </div>

                {/* Primary Work Experience */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF] print:text-black">
                    Professional Experience
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="relative pl-4 border-l-2 border-[#0052FF]/30 print:border-black/25">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h4 className="font-semibold text-white text-sm print:text-black font-sans">
                          Lyft &bull; AI Transformation Lead / Project Specialist
                        </h4>
                        <span className="font-mono text-xs text-slate-400 print:text-black">
                          08/2025 – Present
                        </span>
                      </div>
                      <p className="text-[11px] text-[#0052FF]/90 font-mono mt-0.5 print:text-black">
                        Culture &amp; Belonging (C&amp;B) Team | Hybrid San Francisco
                      </p>
                      
                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300 list-disc pl-4 print:text-black">
                        <li>
                          <strong className="text-white print:text-black font-bold">AI Literacy Program:</strong> Helped build a company-wide AI literacy program — owned the full pipeline from intake through vetting to onboarding, achieving full coverage across every major business unit.
                        </li>
                        <li>
                          <strong className="text-white print:text-black font-bold">Credentialing System:</strong> Designed and deployed a three-tiered AI literacy credential system from scratch — defined learning objectives, skill proficiency levels, and a digital badge framework deployed across the entire active cohort.
                        </li>
                        <li>
                          <strong className="text-white print:text-black font-bold">Cohort Equity Design:</strong> Designed the cohort deliberately for equity — balancing skill diversity across novice, intermediate, and expert learners.
                        </li>
                        <li>
                          <strong className="text-white print:text-black font-bold">AI Tooling Consolidation Study:</strong> Led a feasibility study to consolidate multiple AI coaching tools into a single discovery dashboard — evaluated LLM instruction capacity limits and mapped a consolidation plan.
                        </li>
                        <li>
                          <strong className="text-white print:text-black font-bold">Automation Evaluation:</strong> Evaluated an enterprise automation platform for workflow optimization — defined requirements, mapped existing processes, and validated use cases.
                        </li>
                        <li>
                          <strong className="text-white print:text-black font-bold">Project Tracker Architecture:</strong> Built and maintained the team's central project tracker using AI-generated formulas — enabling real-time program health monitoring.
                        </li>
                        <li>
                          Worked in Articulate 360 on an active e-learning project with hands-on authoring experience.
                        </li>
                        <li>
                          Coordinated cross-functional program delivery with senior stakeholders across HR, Engineering, and Operations.
                        </li>
                        <li>
                          Stepped in independently to manage new hire onboarding communications during a resource gap.
                        </li>
                        <li>
                          Built an AI-powered interactive program portfolio at portfolio.get2.one.
                        </li>
                      </ul>
                    </div>

                    {/* Get2 Experience */}
                    <div className="relative pl-4 border-l-2 border-[#0052FF]/30 print:border-black/25">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h4 className="font-semibold text-white text-sm print:text-black font-sans">
                          Get2 &bull; Founder &amp; Product Lead
                        </h4>
                        <span className="font-mono text-xs text-slate-400 print:text-black">
                          06/2023 – 05/2026
                        </span>
                      </div>
                      
                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300 list-disc pl-4 print:text-black">
                        <li>
                          Built a portfolio of consumer apps (GroceryGo!, The Board, 3Ceipt!) from zero — owned the full product lifecycle including user research, UX/UI design, interactive prototyping, front-end development, usability testing, and iteration.
                        </li>
                        <li>
                          Built all interactive prototypes in Figma and Framer — shipped production-ready front-end code in HTML, CSS, and JS with full WCAG accessibility compliance.
                        </li>
                        <li>
                          Built the Get2 brand identity from scratch — designed the logo, motion graphics, animated character assets, and visual system.
                        </li>
                        <li>
                          Designed and launched get2.one — the brand's public-facing landing page.
                        </li>
                      </ul>
                    </div>

                    {/* CROP Experience */}
                    <div className="relative pl-4 border-l-2 border-[#0052FF]/30 print:border-black/25">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h4 className="font-semibold text-white text-sm print:text-black font-sans">
                          CROP Organization &bull; UX/UI Design &amp; Software Development Intern
                        </h4>
                        <span className="font-mono text-xs text-slate-400 print:text-black">
                          03/2023 – 04/2024
                        </span>
                      </div>
                      
                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300 list-disc pl-4 print:text-black">
                        <li>
                          Designed and prototyped digital reentry tools in Figma — applied user research, accessibility standards, and iterative usability testing.
                        </li>
                        <li>
                          Built responsive web platforms from scratch in HTML, CSS, and JS with full WCAG accessibility compliance.
                        </li>
                        <li>
                          Featured in a Figma blog article and spoke at Figma's global headquarters at a hands-on community event.
                        </li>
                      </ul>
                    </div>

                    {/* Supplemental Experience */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="relative pl-4 border-l-2 border-[#0052FF]/30 print:border-black/25">
                        <h4 className="font-semibold text-white text-xs print:text-black font-sans">
                          Aspire Education &bull; Academic Tutor
                        </h4>
                        <span className="font-mono text-[10px] text-slate-400 print:text-black block">12/2024 – Present</span>
                      </div>
                      <div className="relative pl-4 border-l-2 border-[#0052FF]/30 print:border-black/25">
                        <h4 className="font-semibold text-white text-xs print:text-black font-sans">
                          Urban Alchemy &bull; Care Coordinator
                        </h4>
                        <span className="font-mono text-[10px] text-slate-400 print:text-black block">12/2023 – 08/2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF] print:text-black">
                    Education &amp; Academic Honors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">Associate of Arts (A.A.) &bull; Liberal Arts (Social &amp; Behavioral Science)</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Coastline College &bull; Graduated with Honors</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">Associate of Arts (A.A.) &bull; American Studies</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Coastline College &bull; Graduated with Honors</p>
                    </div>
                  </div>
                </div>

                {/* Industry Certifications */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF] print:text-black">
                    Industry Credentials &amp; Certifications
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">Google UX Design Professional Certificate</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Completed Nov 8, 2023</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">Google Project Management Professional Certificate</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Completed Jan 4, 2026</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">Google AI Essentials Certification</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Completed Jan 2, 2026</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">Google Prompting Essentials Certificate</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Completed Jan 1, 2026</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">Workato Agentic AI Basics Certificate</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Completed Jun 3, 2026</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 print:border-black/25">
                      <p className="font-semibold text-white text-xs print:text-black">CDCR Peer Literacy Mentor Certification</p>
                      <p className="text-[10px] text-[#0052FF] font-mono mt-0.5 print:text-black">Completed 2021</p>
                    </div>
                  </div>
                </div>

                {/* Core Competencies Tagged */}
                <div className="space-y-2 border-t border-white/10 pt-6 print:border-black/25 pb-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF] print:text-black">
                    Core Demonstrated Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                    <span className="bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 px-2.5 py-1 rounded-md print:border-black print:text-black">ACCOUNTABILITY</span>
                    <span className="bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 px-2.5 py-1 rounded-md print:border-black print:text-black">EXCELLENCE &amp; GROWTH</span>
                    <span className="bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 px-2.5 py-1 rounded-md print:border-black print:text-black">CUSTOMER FOCUS</span>
                    <span className="bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 px-2.5 py-1 rounded-md print:border-black print:text-black">COLLABORATION &amp; INCLUSION</span>
                    <span className="bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 px-2.5 py-1 rounded-md print:border-black print:text-black">STRATEGIC DATA ANALYTICS</span>
                  </div>
                </div>

              </div>

              {/* Modal sticky footer */}
              <div className="sticky bottom-0 z-20 flex items-center justify-end border-t border-white/10 bg-slate-900/90 backdrop-blur-md px-6 py-4 gap-3 print:hidden">
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(false)}
                  className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  Close Specification
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
