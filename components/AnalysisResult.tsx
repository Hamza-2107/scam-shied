
import React from 'react';
import { ScamAnalysis, Verdict, FearLevel } from '../types';
import SafetyGauge from './SafetyGauge';

interface Props {
  analysis: ScamAnalysis;
}

const AnalysisResult: React.FC<Props> = ({ analysis }) => {
  const getVerdictColor = (v: Verdict) => {
    switch (v) {
      case 'SAFE': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'SUSPICIOUS': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'DANGEROUS': return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
    }
  };

  const getFearLevelColor = (l: FearLevel) => {
    switch (l) {
      case 'LOW': return 'bg-slate-700 text-slate-300';
      case 'MEDIUM': return 'bg-amber-500/20 text-amber-400';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400';
      case 'CRITICAL': return 'bg-rose-500/20 text-rose-400 animate-pulse';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const renderHighlightedText = (text: string, highlights: string[]) => {
    if (!text) return null;
    let parts = [text];
    highlights.forEach(h => {
      const newParts: string[] = [];
      parts.forEach(p => {
        // Escape special chars in highlight phrase for regex
        const escaped = h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const split = p.split(new RegExp(`(${escaped})`, 'gi'));
        newParts.push(...split);
      });
      parts = newParts;
    });

    return parts.map((part, i) => (
      highlights.some(h => h.toLowerCase() === part.toLowerCase()) ? 
        <span key={i} className="bg-rose-500/30 text-rose-300 px-1 rounded font-bold underline decoration-rose-500 underline-offset-4">{part}</span> : 
        part
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Banner: Score & Clinical Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
          <SafetyGauge score={analysis.safetyScore} />
          
          <div className="w-full space-y-1">
            <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest text-slate-500">
              <span>Cognitive Load</span>
              <span className="text-indigo-400">System 1 Overdrive</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 transition-all duration-1000 ease-out"
                style={{ width: `${analysis.system1Score}%` }}
              />
            </div>
          </div>
          
          <div className={`w-full text-center py-2 rounded-lg border text-xs font-bold uppercase tracking-widest ${getVerdictColor(analysis.verdict)}`}>
            {analysis.verdict}
          </div>
        </div>
        
        <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-200">Neural Threat Vector Analysis</h3>
            <div className="flex space-x-2">
               <span className="text-[10px] font-mono text-slate-400 px-2 py-1 bg-slate-800 rounded border border-slate-700">{analysis.language} detected</span>
               <span className="text-[10px] font-mono text-rose-400 px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded">Cognitive Warfare Active</span>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg mb-6 border-l-2 border-indigo-500/50 pl-4">{analysis.summary}</p>
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-sm leading-relaxed overflow-hidden">
            <span className="text-slate-600 block mb-2 text-[10px] uppercase font-bold">Input Forensic Stream:</span>
            <div className="text-slate-400 italic">
              "{renderHighlightedText(analysis.originalText || "", analysis.highlights)}"
            </div>
          </div>
        </div>
      </div>

      {/* Logic Bypass & Neural Activation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-6 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            System 1 (Emotional) Exploit List
          </h3>
          <div className="space-y-4">
            {analysis.tricks.map((trick, i) => (
              <div key={i} className="group p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 transition-all border-l-4 border-l-indigo-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-100">{trick.name}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 uppercase font-bold">Bias Target</span>
                </div>
                <p className="text-xs text-slate-400 mb-2 font-mono">Anchor: "{trick.description}"</p>
                <div className="text-[13px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-300 uppercase text-[10px] block mb-1">Psychological Forensic:</span>
                  {trick.psychologyExplanation}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-widest text-rose-400 mb-6 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Amygdala Activation Protocol
          </h3>
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-6">
              <div className={`px-4 py-2 rounded-lg font-black text-lg ${getFearLevelColor(analysis.fearFactor.level)}`}>
                {analysis.fearFactor.level}
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Neural Vector</div>
                <div className="text-slate-100 font-bold">{analysis.fearFactor.threatType}</div>
              </div>
            </div>
            <div className="bg-slate-950/70 p-6 rounded-2xl border border-rose-500/20 flex-grow relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 text-rose-600 opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none">
                 <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
               </div>
               <div className="relative z-10">
                 <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Panic Trigger Phrase:</div>
                 <p className="text-rose-400 font-black text-xl mb-4 italic leading-tight">"{analysis.fearFactor.amygdalaTrigger}"</p>
                 <div className="h-px bg-slate-800 w-full mb-4" />
                 <div className="text-[13px] text-slate-400 leading-relaxed font-light">
                   This linguistic anchor is specifically crafted to stimulate the fear center, bypassing prefrontal cortex deliberation and forcing an immediate, impulsive reaction.
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation & Counter Scripts */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 bg-emerald-500/5 border-b border-slate-800">
           <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center">
             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Baseline Restoration Protocol
           </h3>
           <p className="text-slate-100 text-lg font-bold">{analysis.recommendation}</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Flow Disruption</div>
            <div className="bg-slate-800/40 p-4 rounded-xl text-xs border border-slate-700/50 italic text-slate-400 hover:text-slate-100 transition-all cursor-pointer group hover:bg-slate-800">
              {analysis.counterScripts.timeWaster}
              <div className="mt-3 text-[8px] opacity-40 uppercase group-hover:opacity-80 transition-opacity font-bold">Disrupts scammer cognitive sequence.</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.2em]">Legal Authority Projection</div>
            <div className="bg-indigo-500/5 p-4 rounded-xl text-xs border border-indigo-500/20 italic text-slate-300 hover:bg-indigo-500/10 transition-all cursor-pointer group">
              {analysis.counterScripts.legalThreat}
              <div className="mt-3 text-[8px] opacity-40 uppercase group-hover:opacity-80 transition-opacity font-bold">Citing PECA 2016 for defensive leverage.</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[9px] text-rose-500 font-black uppercase tracking-[0.2em]">Attack Surface Termination</div>
            <div className="bg-rose-500/5 p-4 rounded-xl text-xs border border-rose-500/20 italic text-rose-200 hover:bg-rose-500/10 transition-all cursor-pointer group">
              {analysis.counterScripts.ghost}
              <div className="mt-3 text-[8px] opacity-40 uppercase group-hover:opacity-80 transition-opacity font-bold">Universal mitigation command.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
