
import React, { useState, useRef } from 'react';

interface Props {
  onAnalyze: (text: string, image?: string) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<Props> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text && !image) return;
    onAnalyze(text, image || undefined);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste message, email content, or Roman Urdu text (e.g., 'Jeeto Pakistan waly bol rha hn...')"
            className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none font-sans"
          />
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors border border-slate-700"
              title="Upload Screenshot"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {image && (
          <div className="relative inline-block mt-2">
            <img src={image} alt="Preview" className="h-20 w-auto rounded-lg border border-slate-700" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-lg"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (!text && !image)}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${
            isLoading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing Behavioral Patterns...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span>Scan for Fraud Patterns</span>
            </div>
          )}
        </button>
      </form>
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-slate-500">
        <span className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1.5" /> NLP Engine v3.0</span>
        <span className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1.5" /> Cyber-Psychology Matrix</span>
        <span className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1.5" /> Multi-Dialect Support</span>
      </div>
    </div>
  );
};

export default AnalysisForm;
