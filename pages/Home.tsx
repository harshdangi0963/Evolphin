
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ACTIVITIES, MOCK_COLLECTIONS, MOCK_DOCS } from '../constants';
import { Document, Activity } from '../types';

interface Source {
  title: string;
  uri?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: Source[];
  followUps?: string[];
}

const Home: React.FC = () => {
  const [searchMode, setSearchMode] = useState<'Search' | 'AskAI'>('Search');
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [docResults, setDocResults] = useState<Document[] | null>(null);
  const [searchStep, setSearchStep] = useState<string>('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatHistory.length > 0 || isProcessing) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isProcessing]);

  const performDocSearch = () => {
    setIsProcessing(true);
    setDocResults(null);
    setTimeout(() => {
      const filtered = MOCK_DOCS.filter(doc => doc.name.toLowerCase().includes(query.toLowerCase()));
      setDocResults(filtered);
      setIsProcessing(false);
    }, 400);
  };

  const performAiAsk = async (explicitQuery?: string) => {
    const finalQuery = explicitQuery || query;
    if (!finalQuery.trim()) return;

    setIsProcessing(true);
    setChatHistory(prev => [...prev, { id: Date.now().toString(), role: 'user', text: finalQuery }]);
    setQuery('');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const aiMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      text: "Based on your workspace records, I've synthesized a contextual response. The primary assets involved are indexed below for verification.",
      sources: [{ title: 'Product Roadmap 2024' }],
      followUps: ['Deep dive into roadmap', 'Check owner status']
    };

    setChatHistory(prev => [...prev, aiMsg]);
    setIsProcessing(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'Search') performDocSearch();
    else performAiAsk();
  };

  const resetWorkspace = () => {
    setChatHistory([]);
    setDocResults(null);
    setQuery('');
  };

  const isChatActive = searchMode === 'AskAI' && chatHistory.length > 0;
  const isSearchActive = searchMode === 'Search' && docResults !== null;
  const isFocusMode = isChatActive || isSearchActive || isProcessing;

  const SearchInput = ({ atBottom = false }: { atBottom?: boolean }) => (
    <div className={`w-full max-w-3xl mx-auto transition-all duration-700 ${atBottom ? 'translate-y-0' : ''}`}>
      <form 
        onSubmit={handleSearchSubmit}
        className={`relative flex items-center p-1.5 rounded-[20px] bg-white border border-slate-200 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] ring-4 ring-slate-100/50 transition-all duration-500 ${
          searchMode === 'AskAI' ? 'ring-primary/10 border-primary/30' : ''
        }`}
      >
        <div className="relative flex bg-slate-100 rounded-[14px] p-0.5 shrink-0 overflow-hidden w-[160px]">
          <div 
            className={`absolute top-0.5 bottom-0.5 w-[78px] bg-white rounded-[12px] shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              searchMode === 'Search' ? 'translate-x-0' : 'translate-x-[79px]'
            }`}
          />
          <button 
            type="button"
            onClick={() => setSearchMode('Search')}
            className={`relative z-10 flex-1 h-8 text-[10px] font-black uppercase tracking-tight transition-colors ${searchMode === 'Search' ? 'text-slate-900' : 'text-slate-400'}`}
          >
            Search
          </button>
          <button 
            type="button"
            onClick={() => setSearchMode('AskAI')}
            className={`relative z-10 flex-1 h-8 text-[10px] font-black uppercase tracking-tight transition-colors ${searchMode === 'AskAI' ? 'text-primary' : 'text-slate-400'}`}
          >
            Ask AI
          </button>
        </div>

        <input 
          className="flex-1 bg-transparent border-none px-4 text-[13px] font-bold text-slate-900 placeholder:text-slate-300 focus:ring-0"
          placeholder={searchMode === 'AskAI' ? "Describe your intent..." : "Search anything..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button 
          type="submit"
          className="h-10 px-5 rounded-[12px] bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all active:scale-95 disabled:opacity-30"
          disabled={!query.trim() && !atBottom}
        >
          {isProcessing ? '...' : 'Exec'}
        </button>
      </form>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto px-6 h-full relative">
      <div className={`flex-1 flex flex-col pt-12 transition-all duration-700 ${isFocusMode ? 'pb-40' : 'pb-12'}`}>
        
        {!isFocusMode && (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black text-primary uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Neural Mesh v4.0 Active
            </div>
            <h1 className="text-[64px] font-black tracking-[-0.04em] leading-[0.95] text-slate-950 mb-6">
              Search <span className="text-slate-300">without</span> boundaries.
            </h1>
            <p className="text-slate-500 font-bold text-sm max-w-md mx-auto leading-relaxed">
              Synthesize institutional knowledge with a single prompt. Encrypted, distributed, and context-aware.
            </p>
          </div>
        )}

        {!isChatActive && <div className={`${isFocusMode ? 'scale-90' : ''} transition-transform duration-700`}><SearchInput /></div>}

        {isChatActive && (
          <div className="max-w-2xl mx-auto w-full space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-slate-950 text-white p-4 rounded-[20px] rounded-tr-none shadow-xl' : ''}`}>
                  {msg.role === 'assistant' ? (
                    <div className="flex gap-5">
                      <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                         <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                      </div>
                      <div className="space-y-4">
                        <p className="text-[13px] font-bold leading-relaxed text-slate-700">{msg.text}</p>
                        {msg.sources && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {msg.sources.map((s, i) => (
                              <div key={i} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[9px] font-black uppercase tracking-tight text-slate-900 shadow-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                                {s.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[13px] font-bold tracking-tight">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-5 animate-pulse">
                <div className="size-10 rounded-xl bg-slate-50 border border-slate-100"></div>
                <div className="h-10 w-48 bg-slate-50 rounded-xl"></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {isSearchActive && docResults && (
          <div className="max-w-3xl mx-auto w-full mt-12 grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-4">
             {docResults.map(doc => (
               <div key={doc.id} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/50 transition-all cursor-pointer group flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">description</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{doc.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{doc.type} • {doc.owner}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors">north_east</span>
               </div>
             ))}
          </div>
        )}
      </div>

      {isChatActive && (
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-workspace-bg via-workspace-bg to-transparent z-50">
          <SearchInput atBottom={true} />
        </div>
      )}
    </div>
  );
};

export default Home;
