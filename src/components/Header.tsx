import React from 'react';
import { User, Calendar, MapPin, Award } from 'lucide-react';
import { PROFILE_INFO } from '../data';

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-6 lg:p-8 shadow-2xl">
      {/* Background radial gradient accent */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#0052FF]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#0052FF]/5 blur-2xl" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start md:items-center gap-5">
          {/* Lyft Colored Cyber-Avatar */}
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#0052FF] via-blue-600 to-indigo-500 opacity-75 blur animate-pulse-slow" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 border border-white/10">
              <span className="text-xl font-bold tracking-wider text-[#0052FF]">RS</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 sm:text-3xl">
                {PROFILE_INFO.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0052FF]/5 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#0052FF] border border-[#0052FF]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                Lyft Apprentice
              </span>
            </div>
            
            <p className="mt-1 text-base font-medium text-slate-300 font-sans">
              AI Transformation Lead / Project Specialist | Culture & Belonging (C&B) Team
            </p>

            {/* Quick Metadata Badges */}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#0052FF]" />
                {PROFILE_INFO.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#0052FF]" />
                {PROFILE_INFO.timeline}
              </span>
            </div>
          </div>
        </div>

        {/* Supervision / Leadership details */}
        <div className="rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-5 font-sans text-xs space-y-4 max-w-sm w-full">
          <div className="text-slate-300 font-bold tracking-wide uppercase text-[10px] pb-1 border-b border-white/10">Command Oversight</div>
          
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 font-sans text-[10px] uppercase tracking-wider">Sponsor / Manager</span>
            <div className="flex flex-col">
              <span className="text-white font-black text-sm">Tiara R.</span>
              <span className="text-xs text-slate-400 mt-0.5">Senior Manager, TME Programs</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-400 font-sans text-[10px] uppercase tracking-wider">Prior Sponsor</span>
            <div className="flex flex-col">
              <span className="text-slate-200 font-semibold text-sm">Jasmine D.</span>
              <span className="text-xs text-slate-400 mt-0.5">Global Head of Culture and Belonging</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-400 font-sans text-[10px] uppercase tracking-wider">Mentorship Lead</span>
            <div className="flex flex-col">
              <span className="text-slate-200 font-semibold text-sm">Travis W.</span>
              <span className="text-xs text-slate-400 mt-0.5">Design Program Manager</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
            <span className="text-slate-400 font-sans uppercase text-[9px] tracking-wider">Status Assessment</span>
            <span className="text-emerald-400 font-bold inline-flex items-center gap-1 font-sans">
              <Award className="h-3.5 w-3.5 text-emerald-400" />
              Exceeding Expectations
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
