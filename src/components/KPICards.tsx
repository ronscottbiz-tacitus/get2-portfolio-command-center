import React, { useState } from 'react';
import { Award, Timer, ShieldCheck, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { METRIC_CARDS } from '../data';

export default function KPICards() {
  const [activeInfoCard, setActiveInfoCard] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="h-6 w-6 text-emerald-400" />;
      case 'Progress':
        return <Timer className="h-6 w-6 text-[#0052FF]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-6 w-6 text-indigo-400" />;
      default:
        return <Award className="h-6 w-6 text-slate-400" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          glow: 'shadow-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          progressBg: 'bg-emerald-500/20',
          progressBar: 'bg-emerald-400'
        };
      case 'pink':
        return {
          glow: 'shadow-[#0052FF]/10 border-[#0052FF]/30 hover:border-[#0052FF]/40',
          badgeBg: 'bg-[#0052FF]/10 text-[#0052FF] border-[#0052FF]/20',
          progressBg: 'bg-[#0052FF]/20',
          progressBar: 'bg-[#0052FF]'
        };
      case 'indigo':
        return {
          glow: 'shadow-indigo-500/10 border-indigo-500/30 hover:border-indigo-500/50',
          badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          progressBg: 'bg-indigo-500/20',
          progressBar: 'bg-indigo-400'
        };
      default:
        return {
          glow: 'shadow-slate-500/10 border-slate-800 hover:border-slate-700',
          badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
          progressBg: 'bg-slate-800',
          progressBar: 'bg-slate-500'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {METRIC_CARDS.map((card, idx) => {
        const colors = getColorClasses(card.color);
        const isOpen = activeInfoCard === idx;

        return (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            {/* Corner Decorative Gradients */}
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-slate-800/10 blur-xl font-mono" />

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="text-xs font-semibold tracking-wide uppercase text-slate-400 font-mono">
                  {card.title}
                </span>

                <div className="mt-2.5 flex items-baseline gap-1">
                  <span className="font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
                    {card.value}
                  </span>
                </div>

                <span className="mt-1 block text-xs text-slate-400">
                  {card.subtext}
                </span>
              </div>

              {/* Icon Container */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 shadow-inner">
                {getIcon(card.icon)}
              </div>
            </div>

            {/* Custom Interactive Elements per card */}
            {card.icon === 'Award' && (
              <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-green-500/15 px-3 py-2 border border-green-500/20 shadow-inner">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-[11px] font-bold text-green-400 font-sans tracking-wide uppercase">
                  EXCEEDING EXPECTATIONS
                </span>
              </div>
            )}

            {card.icon === 'Progress' && (
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-3xl font-black text-white">{card.value}</span>
                  <span className="text-slate-400 text-xs pb-0.5">Handover Ready</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0052FF] h-full w-[90%]" />
                </div>
              </div>
            )}

            {card.icon === 'ShieldCheck' && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-200 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                  95%+ Accuracy
                </div>
                <span className="text-[10px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full">
                  + Accuracy
                </span>
              </div>
            )}

            {/* Info toggle button */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setActiveInfoCard(isOpen ? null : idx)}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
              >
                <HelpCircle className="h-3 w-3" />
                {isOpen ? "Hide Context Details" : "Show Analytics Context"}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Expanded details container with smooth height transitions */}
            {isOpen && (
              <div className="mt-3 overflow-hidden rounded-lg bg-slate-950/60 border border-white/10 p-3 text-[11.5px] leading-relaxed text-slate-300 animate-fade-in">
                {card.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
