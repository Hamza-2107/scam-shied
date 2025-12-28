
import React from 'react';

interface Props {
  score: number;
}

const SafetyGauge: React.FC<Props> = ({ score }) => {
  const getGradient = () => {
    if (score > 70) return 'from-emerald-500 to-emerald-400';
    if (score > 40) return 'from-amber-500 to-amber-400';
    return 'from-rose-600 to-rose-400';
  };

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-slate-800"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="64"
          cy="64"
        />
        <circle
          className={`transition-all duration-1000 ease-out`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="url(#gradient)"
          fill="transparent"
          r="40"
          cx="64"
          cy="64"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-color-rose-500" stopColor={score > 40 ? (score > 70 ? '#10b981' : '#f59e0b') : '#e11d48'} />
            <stop offset="100%" className="stop-color-rose-400" stopColor={score > 40 ? (score > 70 ? '#34d399' : '#fbbf24') : '#fb7185'} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Safety</span>
      </div>
    </div>
  );
};

export default SafetyGauge;
