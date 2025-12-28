
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResult from './components/AnalysisResult';
import { ScamAnalysis } from './types';
import { analyzeScam } from './services/geminiService';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScamAnalysis[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('scamshield_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  const handleAnalysis = async (text: string, image?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeScam(text, image);
      setAnalysis(result);
      const newHistory = [result, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('scamshield_history', JSON.stringify(newHistory));
    } catch (err: any) {
      console.error(err);
      setError("Forensic analysis failed. Please ensure your API key is valid and the content is accessible.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/30">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent tracking-tight">
            Advanced Cyber-Forensic Psychology
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Deconstruct malicious intent, psychological manipulation, and fraudulent threats using ScamShield's proprietary AI analysis protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12">
          <AnalysisForm onAnalyze={handleAnalysis} isLoading={isLoading} />
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-8 flex items-center space-x-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {analysis && !isLoading && (
          <div id="results-anchor" className="mb-12">
            <AnalysisResult analysis={analysis} />
          </div>
        )}

        {!analysis && !isLoading && history.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Recent Forensic Files
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnalysis(item)}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500/50 transition-all text-left group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                      item.verdict === 'DANGEROUS' ? 'bg-rose-500/10 text-rose-400' : 
                      item.verdict === 'SUSPICIOUS' ? 'bg-amber-500/10 text-amber-400' : 
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {item.verdict}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-2 group-hover:text-white transition-colors">
                    {item.summary}
                  </p>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    Score: {item.safetyScore}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <div className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer text-sm">Documentation</div>
            <div className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer text-sm">Privacy Protocol</div>
            <div className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer text-sm">API Integration</div>
          </div>
          <p className="text-slate-700 text-xs">
            &copy; {new Date().getFullYear()} ScamShield AI Forensic Systems. Utilizing advanced LLM logic for cyber-threat mitigation. 
            Designed for professional security researchers and safety-conscious individuals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
