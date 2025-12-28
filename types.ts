
export type Verdict = 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
export type FearLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Language = 'English' | 'Roman Urdu' | 'Urdu';

export interface Trick {
  name: string;
  description: string;
  psychologyExplanation: string;
}

export interface FearFactor {
  level: FearLevel;
  threatType: 'Financial Loss' | 'Legal Action' | 'Social Shame' | string;
  amygdalaTrigger: string;
}

export interface CounterScripts {
  timeWaster: string;
  legalThreat: string;
  ghost: string;
}

export interface ScamAnalysis {
  verdict: Verdict;
  safetyScore: number;
  system1Score: number; // Logic Bypass factor
  summary: string;
  language: Language;
  tricks: Trick[];
  fearFactor: FearFactor;
  recommendation: string;
  counterScripts: CounterScripts;
  highlights: string[];
  originalText?: string;
  timestamp: number;
}
