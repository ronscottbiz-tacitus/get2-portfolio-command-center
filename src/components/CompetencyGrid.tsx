import React, { useState } from 'react';
import { Compass, TrendingUp, UserCheck, Users, X, CheckSquare, MessageSquare, ArrowRight } from 'lucide-react';
import { COMPETENCY_HIGHLIGHTS, CompetencyHighlight } from '../data';

interface CompetencyGridProps {
  onSelectCompetencyForChat: (competencyName: string) => void;
}

export default function CompetencyGrid({ onSelectCompetencyForChat }: CompetencyGridProps) {
  const [selectedComp, setSelectedComp] = useState<CompetencyHighlight | null>(null);

  const getIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className={`h-6 w-6 text-${colorClass}-400`} />;
      case 'TrendingUp':
        return <TrendingUp className={`h-6 w-6 text-${colorClass}-400`} />;
      case 'UserCheck':
        return <UserCheck className={`h-6 w-6 text-${colorClass}-400`} />;
      case 'Users':
        return <Users className={`h-6 w-6 text-${colorClass}-400`} />;
      default:
        return <Compass className="h-6 w-6 text-slate-400" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          border: 'border-purple-500/30 hover:border-purple-500/60',
          bg: 'bg-purple-500/5',
          text: 'text-purple-400',
          gBorder: 'group-hover:border-purple-500/50',
          gradient: 'from-purple-500/10 to-transparent',
          lineColor: 'border-purple-500'
        };
      case 'amber':
        return {
          border: 'border-amber-500/30 hover:border-amber-500/60',
          bg: 'bg-amber-500/5',
          text: 'text-amber-400',
          gBorder: 'group-hover:border-amber-500/50',
          gradient: 'from-amber-500/10 to-transparent',
          lineColor: 'border-amber-500'
        };
      case 'sky':
        return {
          border: 'border-sky-500/30 hover:border-sky-500/60',
          bg: 'bg-sky-500/5',
          text: 'text-sky-400',
          gBorder: 'group-hover:border-sky-500/50',
          gradient: 'from-sky-500/10 to-transparent',
          lineColor: 'border-sky-500'
        };
      case 'pink':
        return {
          border: 'border-pink-500/30 hover:border-pink-500/60',
          bg: 'bg-pink-500/5',
          text: 'text-pink-400',
          gBorder: 'group-hover:border-pink-500/50',
          gradient: 'from-pink-500/10 to-transparent',
          lineColor: 'border-pink-500'
        };
      default:
        return {
          border: 'border-slate-800 hover:border-slate-700',
          bg: 'bg-slate-900/5',
          text: 'text-slate-400',
          gBorder: 'group-hover:border-slate-700',
          gradient: 'from-slate-500/10 to-transparent',
          lineColor: 'border-slate-500'
        };
    }
  };

  return (
    <div>
      {/* 2x2 Grid of Competency Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {COMPETENCY_HIGHLIGHTS.map((comp) => {
          const style = getColorClasses(comp.color);
          
          // Generate realistic tags matching the competency for premium visual detail
          const tags = comp.id === 'accountability' ? ['Ownership', 'Databases', 'Rework-Free']
                     : comp.id === 'excellence-growth' ? ['Vetting Sheets', 'PM Certified', 'AI Literacy']
                     : comp.id === 'customer-focus' ? ['Metadata Taxonomy', 'Site Mockups', 'Recognition']
                     : ['Team Alignments', 'Slack Digests', 'Crisis Cover'];

          return (
            <div
              key={comp.id}
              onClick={() => setSelectedComp(comp)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              {/* Corner decorative light element */}
              <div className={`absolute top-0 right-0 h-28 w-28 bg-gradient-to-br ${style.gradient} rounded-full blur-2xl opacity-60`} />

              <div className="flex items-start space-x-5">
                <div className={`rounded-2xl bg-white/5 border border-white/10 p-3.5 shadow-inner text-${comp.color === 'purple' ? 'purple-400' : comp.color === 'amber' ? 'amber-400' : comp.color === 'sky' ? 'blue-400' : 'orange-400'}`}>
                  {getIcon(comp.icon, comp.color)}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-black text-xl text-white group-hover:text-[#0052FF] transition-colors">
                    {comp.title}
                  </h3>
                  <p className="mt-1.5 text-slate-400 text-sm leading-relaxed font-sans line-clamp-2">
                    {comp.definition}
                  </p>
                  
                  {/* Frosted Glass Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action items counter & Quick glimpse */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400 inline-flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${comp.color === 'purple' ? 'bg-purple-500' : comp.color === 'amber' ? 'bg-amber-500' : comp.color === 'sky' ? 'bg-sky-500' : 'bg-pink-500'}`} />
                  {comp.highlights.length} Project Highlights
                </span>
                <span className="text-[#0052FF] group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1 font-bold hover:underline">
                  Explore Highlights
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up Modality / Detail Overlay with Backdrop Blur */}
      {selectedComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl bg-[#090b14]/95 shadow-2xl">
            {/* Ambient category glow in background */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-40 w-80 bg-gradient-to-b ${getColorClasses(selectedComp.color).gradient} blur-3xl opacity-40`} />

            {/* Header Block */}
            <div className="relative px-6 pt-6 pb-4 border-b border-white/10 flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-2.5 text-white">
                  {getIcon(selectedComp.icon, selectedComp.color)}
                </div>
                <div>
                  <h2 className="font-display text-xl font-black text-white leading-tight">
                    {selectedComp.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">Competency Pillar Description</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedComp(null)}
                className="rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Scroll Container */}
            <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-5 relative">
              {/* Definition */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 bg-gradient-to-r from-slate-900/40 to-transparent">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">Pillar Definition</span>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedComp.definition}
                </p>
              </div>

              {/* Concrete accomplishments */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">Specific Project Deliverables</span>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedComp.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
                    >
                      <CheckSquare className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed text-slate-300 font-sans">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deep Context Narrative */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-300 tracking-wider font-bold">Action Narrative</span>
                <p className="text-xs leading-relaxed text-slate-400 p-3.5 rounded-xl border border-white/5 bg-slate-950/40 font-sans">
                  {selectedComp.fullDetails}
                </p>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="relative border-t border-white/10 bg-slate-950/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
              <span className="text-[10.5px] text-slate-400 leading-normal text-center sm:text-left">
                Want to learn more about Ron's work in {selectedComp.title}?
              </span>
              <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                <button
                  onClick={() => setSelectedComp(null)}
                  className="w-full sm:w-auto rounded-lg px-4 py-2 text-xs font-semibold border border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  Close Glimpse
                </button>
                <button
                  onClick={() => {
                    onSelectCompetencyForChat(selectedComp.title);
                    setSelectedComp(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0052FF] hover:bg-[#0052FF]/95 px-4 py-2 text-xs text-white font-bold shadow-md cursor-pointer transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Ask Command Core
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
