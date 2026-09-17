import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Sparkles, MessageSquare, Trash2, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface ChatSandboxProps {
  preloadedPrompt: string | null;
  onClearPreloadedPrompt: () => void;
}

const SUGGESTED_QUERIES = [
  { label: "Walk through the Get2 projects", query: "What are the Get2 projects and what did you build in each?" },
  { label: "Ask about the Lyft apprenticeship", query: "Tell me about your AI Transformation Lead apprenticeship at Lyft." },
  { label: "See skills & certifications", query: "What are your core skills and certifications?" },
  { label: "How to get in touch", query: "How can I get in touch with Ron?" }
];

export default function ChatSandbox({ preloadedPrompt, onClearPreloadedPrompt }: ChatSandboxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hey — I'm here to help you get to know Ron's work. Ask me anything about the Get2 projects, his time at Lyft, his skills, or his background as a builder. This chat is grounded in his real project data and resume history, so I'll stick to what's actually true rather than guessing.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle activation from a Project card's "Ask the Chatbot" button
  useEffect(() => {
    if (preloadedPrompt) {
      const queryText = `Tell me more about the ${preloadedPrompt} project — what it does and how it was built.`;
      onClearPreloadedPrompt();
      triggerSendMessage(queryText);
    }
  }, [preloadedPrompt]);

  const triggerSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsgId = 'msg-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      // Package conversation history for prompt formatting context on the backend
      // Keep only the last 8 messages to stay within prompt margins
      const historyToSend = messages
        .filter(m => m.id !== 'welcome')
        .slice(-8)
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: historyToSend }),
      });

      if (!res.ok) {
        throw new Error("Local query endpoint returned an active status error.");
      }

      const data = await res.json();
      
      const modelMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'model',
        text: data.text || "No insights could be drawn from the apprenticeship history.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);

    } catch (err: any) {
      console.error("Chat sandbox error:", err);
      setErrorStatus("Connection timeout on Server-Sent Grounding channels. Operating offline.");
      
      // Inject standard response as fallback so user experience is kept intact
      setTimeout(() => {
        const m = textToSend.toLowerCase();
        let fallbackText = "";

        if (m.includes("status") || m.includes("rating") || m.includes("performance") || m.includes("expectations")) {
          fallbackText = "### Current Performance Evaluation\nRon Scott's rating is **Exceeding Expectations** for his Culture & Belonging Mid-Year 2026 evaluation. This assessment is endorsed by Sponsor **Tiara R.** (Senior Manager, TME Programs), Prior Sponsor **Jasmine D.** (Global Head of Culture and Belonging), and Mentor **Travis W.** (Design Program Manager).\n\n- Key performance achievements include his autonomous structured digital badges logic matrix.\n- Maintains **95%+ accuracy metrics** across large vetting datasets.";
        } else if (m.includes("certification") || m.includes("credential") || m.includes("google") || m.includes("workato") || m.includes("badge")) {
          fallbackText = "### Completed Credentials & Certifications\nRon holds multiple highly recognized professional credentials completed during the timeline:\n\n1. Completed **Workato Agentic AI Basics** (Completed Jun 3, 2026; verified via academy.workato.com) — Mastering multi-agent workflows, cognitive pipeline blueprints, and automated system-to-system integrations.\n2. Completed **Google Project Management Professional Certificate** (Completed Jan 4, 2026; verified via Coursera) Completing Agile frameworks, project scheduling, and deliverables rework-free ahead of April 30 projected timeline.\n3. Completed **Google AI Essentials Certification** (Completed Jan 2, 2026; verified via Coursera).\n4. Completed **Google Prompting Essentials Certificate** (Completed Jan 1, 2026; verified via Coursera).\n\nAdditionally, Ron designed and deployed Lyft's own **internal multi-tier digital credentialing (badge) system** to map localized technical and culture-carrying skills across employee profiles!";
        } else if (m.includes("accountability") || m.includes("competency") || m.includes("excellence") || m.includes("customer") || m.includes("collaboration") || m.includes("inclusion") || m.includes("pillar")) {
          fallbackText = "### Core Competency Pillars & Performance Achievements\nRon has demonstrated high proficiency across Lyft's Culture & Belonging competency pillars:\n\n1. **Accountability**: Entirely created and owned the digital badge system template. Owned the logical database architecture and multi-tier badge-mapping templates, delivering them **100% rework-free** to international program heads.\n2. **Excellence & Growth**: Developed multi-pivot vetting model systems parsing hundreds of nominations, optimizing timezone representation, functional diversity, and tenure levels. Maintained a **91% onboarding/conversion rate**.\n3. **Customer Focus**: Designed credentialing metadata taxonomies that map directly to how employees search for localized training, making it easy for peers to self-service. Collaborated on visual mock-ups for Lyft's corporate recognition sites and mentorship portals.\n4. **Collaboration & Inclusion**: Standardized company brand guidelines across 100% of the team's active briefs, balanced regional office networks, and step-entered during a resource gap to run new-hire messaging and onboarding operations without delay.";
        } else if (m.includes("progress") || m.includes("timeline") || m.includes("complete") || m.includes("percent") || m.includes("how far") || m.includes("milestone") || m.includes("date") || m.includes("handover")) {
          fallbackText = "### Program Progress & Infrastructure Handover\nRon Scott has achieved **90% Program Progress**, reflecting the scope-adjusted completion of all AI Champions program infrastructure, selection frameworks, badging systems, and enablement tools engineered for permanent organizational handover—built to run independently beyond the 12-month apprenticeship term.\n\nKey progress indicators:\n- **First 90 Days Plan**: 100% Complete\n- **Project Trackers (2025/2026)**: 100% Complete\n- **Monthly Slack updates**: 80% Complete\n- **C&B Event (SF)**: In Progress (75% Complete - hosting and supporting events like Lyft Linkups, Take Your Kids To Work Day, and Self eSTEM orientations)\n- **Internal AI Tool Consolidation**: 100% Complete (Led leadership study in Feb-Jun 2026 to stress-test & merge specialist coaching tools into a single discovery dashboard)\n- **Process Improvement Report**: Scheduled for July 15 – August 15, 2026.";
        } else if (m.includes("weakness") || m.includes("growth area") || m.includes("improve") || m.includes("development") || m.includes("focus")) {
          fallbackText = "### Ron Scott's Key Development & Growth Focus Areas\nRon's mid-year feedback highlights two specific, strategic development trajectories:\n\n1. **Strategic Analytics**: Shifting from basic database or document compilation to proactive trend synthesis (e.g., auditing utilization patterns in the badge system to recommend engagement strategies).\n2. **Autonomous Stakeholder Sourcing**: Assuming full operational ownership of ambiguous project phases, driving stakeholder alignment syncs, and configuring layout discovery tools independently without administrative hands-on oversight.";
        } else {
          fallbackText = `### Ron Scott's Virtual Chief of Staff - Portfolio Brief\n*Ron is a highly proficient Project Specialist Apprentice within Lyft's Culture & Belonging (C&B) team. Maintained metrics from original source records:*\n\n- **Overall Rating**: **Exceeding Expectations** (concurred by Jasmine D., Tiara R., and Travis W.)\n- **Task On-Time Rate**: 90%+ delivered completely rework-free\n- **Core Document Accuracy**: 95%+ maintained across master datasets\n- **Completed Certifications**: Workato Agentic AI, Google Project Management Professional, Google AI Essentials\n\nFeel free to ask any open-ended question about Ron Scott's accomplishments, timeline, metrics, or professional resumes!`;
        }

        const fallbackModelMsg: ChatMessage = {
          id: 'msg-err-fallback-' + Date.now(),
          role: 'model',
          text: `*(Local groundings fallback active)*\n\n${fallbackText}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, fallbackModelMsg]);
      }, 800);

    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSendMessage(inputVal);
  };

  const handleClearHistory = () => {
    if (confirm("Clear this conversation?")) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: "Hey — I'm here to help you get to know Ron's work. Ask me anything about the Get2 projects, his time at Lyft, his skills, or his background as a builder. This chat is grounded in his real project data and resume history, so I'll stick to what's actually true rather than guessing.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="rounded-xl flex flex-col h-[500px] overflow-hidden" style={{ background: '#0c0d10', border: '1px solid rgba(255,255,255,0.08)' }}>
      
      {/* Sandbox Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2.5">
          {/* Pulsing indicator core */}
          <div className="relative">
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#0052FF' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#0052FF' }} />
            </span>
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-wide text-white">
              Ask About Ron's Work
            </span>
            <span className="block text-[10px] font-mono text-slate-400">
              Grounded in real project and resume data
            </span>
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClearHistory}
          className="rounded-xl p-2 hover:bg-white/10 text-slate-300 hover:text-red-400 border border-white/5 hover:border-white/15 transition-colors cursor-pointer"
          title="Clear Conversation History"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Message Output Thread */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4" style={{ background: '#050506' }}>
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-3.5 max-w-[85%] ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* User / Agent Avatar badge */}
              <div
                className={`relative flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full border text-xs font-bold leading-none ${
                  isUser
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-[#0052FF]/10 border-[#0052FF]/20 text-[#0052FF]'
                }`}
              >
                {isUser ? 'U' : <Sparkles className="h-3.5 w-3.5 animate-pulse" />}
              </div>

              {/* Message box */}
              <div className="space-y-1">
                <div
                  className={`rounded-2xl px-4 py-3 text-[12.5px] leading-relaxed select-text ${
                    isUser
                      ? 'bg-[#0052FF] text-white font-sans font-semibold rounded-tr-none'
                      : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none font-sans shadow-md backdrop-blur-md'
                  }`}
                >
                  {/* Simplistic renderer for bold elements and markdown headings/lists */}
                  {message.text.split('\n').map((line, lIdx) => {
                    if (line.startsWith('### ')) {
                      return <h4 key={lIdx} className="font-display font-semibold text-sm text-[#0052FF] mb-1.5 mt-2 first:mt-0">{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('* ') || line.startsWith('- ')) {
                      return (
                        <ul key={lIdx} className="list-disc pl-4 my-1 space-y-1">
                          <li className="font-sans leading-relaxed text-slate-200">{line.substring(2)}</li>
                        </ul>
                      );
                    }
                    if (line.match(/^\d+\.\s/)) {
                      const text = line.replace(/^\d+\.\s/, '');
                      const num = line.match(/^\d+/)?.[0];
                      return (
                        <div key={lIdx} className="flex gap-2 my-1 pl-2">
                          <span className="font-mono font-bold text-[#0052FF]">{num}.</span>
                          <span className="flex-1 font-sans leading-relaxed text-slate-200">{text}</span>
                        </div>
                      );
                    }
                    if (line.trim() === "") {
                      return <div key={lIdx} className="h-2" />;
                    }
                    
                    // Simple replacement for rendering basic bold text (**text**)
                    let parts = [];
                    let remaining = line;
                    while (remaining.includes('**')) {
                      const firstIdx = remaining.indexOf('**');
                      const secondIdx = remaining.indexOf('**', firstIdx + 2);
                      if (secondIdx !== -1) {
                        parts.push(remaining.substring(0, firstIdx));
                        parts.push(<strong key={remaining+firstIdx} className="font-bold text-white shadow-sm">{remaining.substring(firstIdx + 2, secondIdx)}</strong>);
                        remaining = remaining.substring(secondIdx + 2);
                      } else {
                        break;
                      }
                    }
                    parts.push(remaining);

                    return <p key={lIdx} className="mb-1 last:mb-0 leading-relaxed font-sans">{parts}</p>;
                  })}
                </div>
                {/* Time Indicator */}
                <span className={`block text-[9px] font-mono text-slate-500 ${isUser ? 'text-right' : 'text-left'}`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Loading / Writing State */}
        {isLoading && (
          <div className="flex items-start gap-3.5 max-w-[80%] mr-auto">
            <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full border bg-[#0052FF]/10 border-[#0052FF]/20 text-[#0052FF]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            </div>
            <div className="rounded-2xl px-4 py-3 bg-white/5 text-slate-200 border border-white/10 rounded-tl-none text-xs flex items-center gap-2 backdrop-blur-md">
              <span className="block italic animate-pulse">Mapping portfolio nodes...</span>
            </div>
          </div>
        )}

        <div ref={scrollToBottom} />
      </div>

      {/* Suggested Queries Chips */}
      <div className="px-6 py-4 flex flex-wrap gap-2.5 items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 inline-flex items-center gap-1.5 shrink-0 font-bold">
          <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
          Suggested:
        </span>
        <div className="flex flex-wrap gap-2 overflow-x-auto py-0.5">
          {SUGGESTED_QUERIES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => triggerSendMessage(item.query)}
              disabled={isLoading}
              className="text-[11px] font-medium rounded-full border border-white/10 bg-white/5 hover:bg-white/15 px-3 py-1 text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shrink-0 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Field */}
      <form onSubmit={handleFormSubmit} className="px-6 py-4 flex items-center gap-3.5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={isLoading ? "Thinking..." : "Ask about a project, a role, or a skill..."}
          disabled={isLoading}
          className="flex-1 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#0052FF]/40 focus:ring-1 focus:ring-[#0052FF]/10 transition-all font-sans outline-none"
          style={{ background: '#050506', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isLoading}
          className="rounded-2xl bg-[#0052FF] hover:bg-[#0052FF]/95 p-3 text-white shadow-lg cursor-pointer hover:shadow-[#0052FF]/20 disabled:opacity-50 disabled:pointer-events-none disabled:bg-slate-800 transition-all active:scale-[0.98]"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
      
    </div>
  );
}
