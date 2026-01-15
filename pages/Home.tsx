
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { MOCK_ACTIVITIES, MOCK_COLLECTIONS, MOCK_DOCS } from '../constants';
import { Document } from '../types';

interface Source {
  title: string;
  uri?: string;
}

interface AIResult {
  text: string;
  sources: Source[];
  followUps: string[];
}

const Home: React.FC = () => {
  const [searchMode, setSearchMode] = useState<'Search' | 'AskAI'>('Search');
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [docResults, setDocResults] = useState<Document[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchStep, setSearchStep] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [filterType, setFilterType] = useState<string>('All');
  const [filterOwner, setFilterOwner] = useState<string>('All');

  const navigate = useNavigate();

  const steps = [
    "Indexing document workspace...",
    "Scanning metadata...",
    "Applying semantic filters...",
    "Ranking relevance..."
  ];

  const performDocSearch = () => {
    setIsProcessing(true);
    setAiResult(null);
    setDocResults(null);
    
    setTimeout(() => {
      const filtered = MOCK_DOCS.filter(doc => {
        const matchesQuery = query.trim() === '' || doc.name.toLowerCase().includes(query.toLowerCase());
        const matchesType = filterType === 'All' || doc.type === filterType;
        const matchesOwner = filterOwner === 'All' || doc.owner === filterOwner;
        return matchesQuery && matchesType && matchesOwner;
      });
      setDocResults(filtered);
      setIsProcessing(false);
    }, 600);
  };

  // Re-run search when filters change if we are already looking at results
  useEffect(() => {
    if (docResults !== null && searchMode === 'Search') {
      performDocSearch();
    }
  }, [filterType, filterOwner]);

  const performAiAsk = async () => {
    setIsProcessing(true);
    setAiResult(null);
    setDocResults(null);
    setError(null);

    let stepIdx = 0;
    const stepInterval = setInterval(() => {
      setSearchStep(steps[stepIdx % steps.length]);
      stepIdx++;
    }, 800);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const docContext = MOCK_DOCS.map(d => `${d.name} (${d.type}) by ${d.owner}`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: query,
        config: {
          systemInstruction: `You are Nexus AI. Your workspace contains the following documents: ${docContext}. 
          Answer questions based strictly on these documents. Mention document names. 
          Keep answers professional and structured.`,
        },
      });

      const text = response.text || "I couldn't find a specific answer in your documents.";
      const foundSources = MOCK_DOCS.filter(d => text.toLowerCase().includes(d.name.toLowerCase()))
        .map(d => ({ title: d.name }));

      setAiResult({
        text,
        sources: foundSources,
        followUps: [`Summarize ${foundSources[0]?.title || 'the key points'}`, 'Who is the owner?', 'Extract action items']
      });

      clearInterval(stepInterval);
    } catch (err: any) {
      setError(err.message || "AI failed to process.");
      clearInterval(stepInterval);
    } finally {
      setIsProcessing(false);
      setSearchStep('');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'Search') performDocSearch();
    else {
      if (!query.trim()) return;
      performAiAsk();
    }
  };

  const uniqueTypes = ['All', ...new Set(MOCK_DOCS.map(d => d.type))];
  const uniqueOwners = ['All', ...new Set(MOCK_DOCS.map(d => d.owner))];

  const isFocusMode = docResults !== null || aiResult !== null || isProcessing;
  const hasActiveFilters = filterType !== 'All' || filterOwner !== 'All';

  return (
    <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-8 h-full overflow-hidden">
      {/* Workspace Header */}
      <header className="h-14 border-b border-border-light flex items-center justify-between bg-white/50 backdrop-blur-sm z-30 hidden lg:flex shrink-0">
        <div className="flex items-center gap-3 text-[11px] font-bold text-text-muted uppercase tracking-[0.1em]">
          <span className="hover:text-text-main cursor-pointer" onClick={() => navigate('/')}>Workspace</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-text-main">Intelligence Console</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
             <span className="material-symbols-outlined text-[16px] fill-current">cloud_done</span>
             Cloud Synchronized
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col py-8 overflow-hidden">
        
        {/* Search Engine Area */}
        <div className={`w-full flex flex-col items-center transition-all duration-500 ease-in-out shrink-0 ${isFocusMode ? 'mb-4 scale-95' : 'mb-10 mt-4'}`}>
          {!isFocusMode && (
            <h1 className="text-5xl font-extrabold mb-8 text-text-main tracking-tighter text-center leading-[1.1] animate-in fade-in slide-in-from-top-4 duration-700">
              Intelligence at <br/>the <span className="text-primary italic">speed of flow.</span>
            </h1>
          )}
          
          <div className="flex items-center p-1 bg-slate-100/80 rounded-2xl mb-6 border border-border-light shadow-sm backdrop-blur-md">
            <button 
              onClick={() => { setSearchMode('Search'); setAiResult(null); setDocResults(null); }}
              className={`px-8 py-2.5 text-[11px] font-bold transition-all rounded-xl flex items-center gap-2.5 ${searchMode === 'Search' ? 'bg-white text-text-main shadow-sm border border-border-light' : 'text-text-muted hover:text-text-main'}`}
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              Search
            </button>
            <button 
              onClick={() => { setSearchMode('AskAI'); setAiResult(null); setDocResults(null); }}
              className={`px-8 py-2.5 text-[11px] font-bold transition-all rounded-xl flex items-center gap-2.5 ${searchMode === 'AskAI' ? 'bg-white text-accent-ai shadow-sm border border-indigo-100' : 'text-text-muted hover:text-text-main'}`}
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              Ask AI
            </button>
          </div>

          <div className="w-full max-w-3xl flex flex-col gap-3">
            <form onSubmit={handleSearch} className={`w-full relative group rounded-3xl border-2 transition-all duration-500 bg-white shadow-2xl ${searchMode === 'AskAI' ? 'border-indigo-200 shadow-indigo-100/50' : 'border-slate-200 shadow-slate-100'}`}>
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                {isProcessing ? (
                  <div className={`size-5 border-2 ${searchMode === 'AskAI' ? 'border-accent-ai' : 'border-primary'} border-t-transparent rounded-full animate-spin`}></div>
                ) : (
                  <span className={`material-symbols-outlined text-2xl ${searchMode === 'AskAI' ? 'text-accent-ai' : 'text-slate-400'}`}>
                    {searchMode === 'AskAI' ? 'psychology' : 'search'}
                  </span>
                )}
              </div>
              <input 
                autoFocus 
                className="w-full h-16 bg-transparent border-none rounded-3xl pl-16 pr-44 text-lg font-medium text-text-main placeholder:text-slate-300 focus:ring-0" 
                placeholder={searchMode === 'AskAI' ? "Consult the knowledge base..." : "Find any document..."}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isProcessing}
              />
              <div className="absolute inset-y-0 right-4 flex items-center gap-3">
                {searchMode === 'Search' && (
                  <button 
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-xl border transition-all relative ${showFilters ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                  >
                    <span className="material-symbols-outlined text-xl">tune</span>
                    {hasActiveFilters && <span className="absolute -top-1 -right-1 size-2.5 bg-accent-ai rounded-full border-2 border-white"></span>}
                  </button>
                )}
                <button 
                  type="submit"
                  disabled={isProcessing || (searchMode === 'AskAI' && !query.trim())}
                  className={`px-6 h-10 rounded-xl text-white text-[11px] font-bold transition-all uppercase tracking-widest shadow-lg disabled:opacity-30 ${searchMode === 'AskAI' ? 'bg-accent-ai hover:bg-indigo-700' : 'bg-primary hover:bg-slate-800'}`}
                >
                  {isProcessing ? 'Thinking' : 'Submit'}
                </button>
              </div>
            </form>

            {/* Compact Filter Ribbon */}
            {showFilters && searchMode === 'Search' && (
              <div className="w-full flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 p-1 bg-white/50 backdrop-blur-md rounded-xl border border-border-light shadow-sm">
                  <div className="flex items-center gap-1.5 px-3">
                    <span className="material-symbols-outlined text-xs text-text-muted">category</span>
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="bg-transparent border-none p-0 text-[10px] font-bold uppercase tracking-wider text-text-main focus:ring-0 cursor-pointer"
                    >
                      {uniqueTypes.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
                    </select>
                  </div>
                  <div className="w-px h-4 bg-border-light"></div>
                  <div className="flex items-center gap-1.5 px-3">
                    <span className="material-symbols-outlined text-xs text-text-muted">person</span>
                    <select 
                      value={filterOwner}
                      onChange={(e) => setFilterOwner(e.target.value)}
                      className="bg-transparent border-none p-0 text-[10px] font-bold uppercase tracking-wider text-text-main focus:ring-0 cursor-pointer"
                    >
                      {uniqueOwners.map(o => <option key={o} value={o}>{o === 'All' ? 'All Owners' : o}</option>)}
                    </select>
                  </div>
                </div>
                {hasActiveFilters && (
                  <button 
                    onClick={() => { setFilterType('All'); setFilterOwner('All'); }}
                    className="text-[9px] font-extrabold text-accent-ai uppercase tracking-[0.15em] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Intelligence Shelf */}
        {!isFocusMode && (
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Left Column: Recent Activity Intelligence */}
            <div className="flex flex-col min-h-0 bg-slate-50/50 rounded-[2rem] border border-border-light overflow-hidden backdrop-blur-sm">
              <div className="p-6 pb-4 flex items-center justify-between shrink-0 bg-white/40 backdrop-blur-md">
                <h3 className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  Pulse & Activity
                </h3>
                <button onClick={() => navigate('/history')} className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">History</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-2 space-y-4">
                {MOCK_ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="p-5 rounded-2xl bg-white border border-border-light hover:border-slate-300 transition-all cursor-pointer group shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-bold text-text-muted uppercase bg-slate-100 px-2 py-0.5 rounded-full">{activity.time.split(',')[0]}</span>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">{activity.action === 'uploaded' ? 'description' : 'draw'}</span>
                    </div>
                    <h4 className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{activity.target}</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-1">{activity.comment || `Modified document in workspace.`}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Collection Catalog */}
            <div className="flex flex-col min-h-0 bg-slate-50/50 rounded-[2rem] border border-border-light overflow-hidden backdrop-blur-sm">
              <div className="p-6 pb-4 flex items-center justify-between shrink-0 bg-white/40 backdrop-blur-md">
                <h3 className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">bookmark_manager</span>
                  Knowledge Catalog
                </h3>
                <button onClick={() => navigate('/collections/new')} className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">+ New</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-2 space-y-3">
                {MOCK_COLLECTIONS.map((col) => (
                  <div 
                    key={col.id} 
                    onClick={() => navigate(`/collections/${col.id}`)}
                    className="p-4 rounded-2xl bg-white border border-border-light flex items-center gap-4 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all shadow-sm group"
                  >
                    <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center border border-border-light group-hover:bg-primary/5 transition-colors">
                      <span className="material-symbols-outlined text-text-main text-[20px]">{col.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-text-main truncate">{col.name}</h4>
                      <p className="text-[9px] text-text-muted font-bold uppercase tracking-tight">{col.itemCount} Items · {col.visibility}</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_right_alt</span>
                  </div>
                ))}
                <div 
                  onClick={() => navigate('/collections/new')}
                  className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center cursor-pointer hover:border-primary/40 hover:bg-white transition-all group"
                >
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] group-hover:text-primary">Expand Ecosystem</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Area */}
        {isFocusMode && (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 animate-in fade-in zoom-in-95 duration-500">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center border animate-pulse ${searchMode === 'AskAI' ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`material-symbols-outlined text-2xl ${searchMode === 'AskAI' ? 'text-accent-ai' : 'text-primary'}`}>
                    {searchMode === 'AskAI' ? 'neurology' : 'manage_search'}
                  </span>
                </div>
                <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.2em]">{searchStep || 'Accessing Knowledge...'}</p>
              </div>
            ) : (
              <div className="space-y-6 pb-10">
                {/* Search Results */}
                {docResults && (
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between px-2 mb-2">
                       <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.2em]">Found {docResults.length} matches</p>
                       {hasActiveFilters && <span className="text-[9px] font-bold text-accent-ai uppercase">Filters Applied</span>}
                    </div>
                    {docResults.length === 0 ? (
                      <div className="py-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">
                        <p className="text-sm font-bold">No matches found with current parameters.</p>
                      </div>
                    ) : (
                      docResults.map(doc => (
                        <div key={doc.id} onClick={() => navigate(`/documents/${doc.id}`)} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group flex items-center gap-6">
                          <div className="size-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                            <span className="material-symbols-outlined text-2xl">article</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors truncate">{doc.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-1.5 py-0.5 rounded">{doc.type}</span>
                              <span className="text-[9px] text-text-muted font-bold">By {doc.owner}</span>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors">arrow_forward</span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* AI Output */}
                {aiResult && (
                  <div className="space-y-8">
                    <div className="p-10 rounded-[2.5rem] bg-white border border-indigo-100 shadow-2xl relative overflow-hidden">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="size-10 rounded-xl bg-accent-ai text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                          <span className="material-symbols-outlined text-xl">auto_awesome</span>
                        </div>
                        <h2 className="text-base font-extrabold text-text-main tracking-tight">AI Synthesis</h2>
                      </div>
                      <p className="text-lg text-text-main leading-relaxed font-medium mb-10">{aiResult.text}</p>
                      {aiResult.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                          {aiResult.sources.map((s, i) => (
                            <button key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-accent-ai">
                              <span className="material-symbols-outlined text-[14px]">description</span>
                              {s.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {aiResult.followUps.map((f, i) => (
                        <button key={i} onClick={() => setQuery(f)} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left hover:border-accent-ai/30 hover:bg-white transition-all group">
                          <p className="text-[11px] font-bold text-text-main leading-tight mb-2">{f}</p>
                          <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-accent-ai transition-colors">north_east</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => { setAiResult(null); setDocResults(null); setQuery(''); setFilterType('All'); setFilterOwner('All'); }} 
                  className="w-full py-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] border-2 border-dashed border-slate-200 rounded-3xl hover:border-slate-400 hover:text-text-main transition-all"
                >
                  Exit Focus Mode
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default Home;
