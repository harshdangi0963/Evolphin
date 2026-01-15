
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
  const [showFilters, setShowFilters] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom when history updates
  useEffect(() => {
    if (chatHistory.length > 0 || isProcessing) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isProcessing]);

  // Filter States
  const [filterType, setFilterType] = useState<string>('All');
  const [filterOwner, setFilterOwner] = useState<string>('All');

  const steps = [
    "Initializing Nexus Neural Engine...",
    "Scanning document workspace...",
    "Cross-referencing metadata...",
    "Applying semantic filters...",
    "Synthesizing knowledge clusters...",
    "Finalizing response..."
  ];

  const performDocSearch = () => {
    setIsProcessing(true);
    setChatHistory([]); 
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

  const performAiAsk = async (explicitQuery?: string) => {
    const finalQuery = explicitQuery || query;
    if (!finalQuery.trim()) return;

    setIsProcessing(true);
    setDocResults(null);
    
    // Add User Message to History
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: finalQuery
    };
    setChatHistory(prev => [...prev, userMsg]);
    setQuery(''); // Clear input

    let stepIdx = 0;
    const stepInterval = setInterval(() => {
      setSearchStep(steps[stepIdx % steps.length]);
      stepIdx++;
    }, 500);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 2800));

    // Dynamic mock response
    const mentionDoc = MOCK_DOCS[Math.floor(Math.random() * MOCK_DOCS.length)];
    const mockResponses = [
      `Based on the analysis of your workspace, specifically within "${mentionDoc.name}", I've identified key trends indicating a shift in project priority for the upcoming quarter. The document authored by ${mentionDoc.owner} outlines several critical milestones that should be cross-referenced with your current activity feed.`,
      `According to the documentation for "${mentionDoc.name}", there are several technical dependencies that require immediate attention. I've also found related entries in your recent history that suggest a high degree of correlation between these assets.`,
      `I have synthesized the content from your collection. "${mentionDoc.name}" serves as the primary source of truth here. The overall state of the knowledge base is current, though I recommend reviewing the latest updates from ${mentionDoc.owner} to ensure full alignment.`
    ];

    const selectedText = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    const foundSources = MOCK_DOCS.filter(d => selectedText.includes(d.name)).map(d => ({ title: d.name }));

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: selectedText,
      sources: foundSources.length > 0 ? foundSources : [{ title: mentionDoc.name }],
      followUps: [`Summarize ${mentionDoc.name}`, 'Who is the owner?', 'Show related entries']
    };

    setChatHistory(prev => [...prev, aiMsg]);
    clearInterval(stepInterval);
    setIsProcessing(false);
    setSearchStep('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'Search') performDocSearch();
    else performAiAsk();
  };

  const handleActivityClick = (activity: Activity) => {
    const doc = MOCK_DOCS.find(d => d.name === activity.target);
    if (doc) navigate(`/documents/${doc.id}`);
    else navigate(`/documents/d1`);
  };

  const resetWorkspace = () => {
    setChatHistory([]);
    setDocResults(null);
    setQuery('');
    setFilterType('All');
    setFilterOwner('All');
    setShowFilters(false);
  };

  const isChatActive = searchMode === 'AskAI' && chatHistory.length > 0;
  const isSearchActive = searchMode === 'Search' && docResults !== null;
  const isFocusMode = isChatActive || isSearchActive || isProcessing;
  const hasActiveFilters = filterType !== 'All' || filterOwner !== 'All';

  /**
   * Reusable Search Input UI - Unified Design with Smooth Transitions
   */
  const SearchInput = ({ atBottom = false }: { atBottom?: boolean }) => (
    <div className={`w-full max-w-4xl flex flex-col gap-3 transition-all duration-500 ${atBottom ? 'mx-auto' : ''}`}>
      <form 
        onSubmit={handleSearchSubmit} 
        className={`w-full relative flex items-center p-1.5 gap-2 rounded-[24px] border-2 transition-all duration-500 bg-white shadow-2xl ${
          searchMode === 'AskAI' 
            ? 'border-indigo-200 shadow-indigo-100/50 ring-4 ring-indigo-50/50' 
            : 'border-slate-200 shadow-slate-100 ring-4 ring-slate-50/30'
        }`}
      >
        {/* Animated Toggle Switcher */}
        <div className="relative flex bg-slate-50/80 rounded-[18px] p-1 border border-slate-100 shrink-0 h-11 w-[180px] overflow-hidden">
          {/* Sliding Highlight Background */}
          <div 
            className={`absolute top-1 bottom-1 w-[84px] bg-white rounded-[14px] shadow-sm border border-border-light transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              searchMode === 'Search' ? 'translate-x-0' : 'translate-x-[86px]'
            }`}
          />
          
          <button 
            type="button"
            onClick={() => { setSearchMode('Search'); setChatHistory([]); setDocResults(null); }}
            className={`relative z-10 flex-1 px-3 py-1.5 text-[10px] font-extrabold transition-colors duration-300 flex items-center justify-center gap-2 ${
              searchMode === 'Search' ? 'text-text-main' : 'text-text-muted hover:text-text-main/70'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${searchMode === 'Search' ? 'scale-110' : 'scale-90'}`}>description</span>
            Search
          </button>
          
          <button 
            type="button"
            onClick={() => { setSearchMode('AskAI'); setChatHistory([]); setDocResults(null); }}
            className={`relative z-10 flex-1 px-3 py-1.5 text-[10px] font-extrabold transition-colors duration-300 flex items-center justify-center gap-2 ${
              searchMode === 'AskAI' ? 'text-accent-ai' : 'text-text-muted hover:text-text-main/70'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${searchMode === 'AskAI' ? 'scale-110' : 'scale-90 animate-pulse'}`}>auto_awesome</span>
            Ask AI
          </button>
        </div>

        {/* Status Indicator / Search Icon */}
        <div className="flex items-center pl-3 shrink-0">
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isProcessing ? (
              <div className={`absolute inset-0 border-2 rounded-full border-t-transparent animate-spin ${searchMode === 'AskAI' ? 'border-accent-ai' : 'border-slate-400'}`}></div>
            ) : (
              <span className={`material-symbols-outlined text-xl transition-all duration-300 ${searchMode === 'AskAI' ? 'text-accent-ai scale-110 rotate-12' : 'text-slate-300 scale-100 rotate-0'}`}>
                {searchMode === 'AskAI' ? 'psychology' : 'search'}
              </span>
            )}
          </div>
        </div>

        {/* Controlled Input with Mode-Specific Styling */}
        <input 
          autoFocus={!atBottom}
          className={`flex-1 h-11 bg-transparent border-none px-2 text-sm font-semibold transition-colors duration-300 focus:ring-0 ${
            searchMode === 'AskAI' ? 'text-indigo-900 placeholder:text-indigo-200' : 'text-text-main placeholder:text-slate-300'
          }`}
          placeholder={searchMode === 'AskAI' ? "Describe your intent..." : "Find any document or workspace file..."}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isProcessing}
        />

        {/* Action Buttons Container */}
        <div className="flex items-center gap-2 px-2">
          {searchMode === 'Search' && !atBottom && (
            <button 
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`group p-2.5 rounded-xl border transition-all duration-300 relative ${
                showFilters 
                  ? 'bg-primary/5 border-primary text-primary shadow-inner' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">tune</span>
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 size-2.5 bg-accent-ai rounded-full border-2 border-white shadow-sm animate-pulse"></span>
              )}
            </button>
          )}
          
          <button 
            type="submit"
            disabled={isProcessing || (!query.trim())}
            className={`px-6 h-10 rounded-xl text-white text-[10px] font-extrabold transition-all duration-500 uppercase tracking-widest shadow-xl disabled:opacity-20 disabled:scale-95 disabled:shadow-none shrink-0 transform active:scale-95 ${
              searchMode === 'AskAI' 
                ? 'bg-gradient-to-r from-accent-ai to-indigo-700 hover:shadow-indigo-200' 
                : 'bg-gradient-to-r from-primary to-slate-800 hover:shadow-slate-200'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                Thinking <span className="flex gap-0.5"><span className="animate-bounce">.</span><span className="animate-bounce [animation-delay:0.2s]">.</span><span className="animate-bounce [animation-delay:0.4s]">.</span></span>
              </span>
            ) : 'Execute'}
          </button>
        </div>
      </form>
    </div>
  );

  const uniqueTypes = ['All', ...new Set(MOCK_DOCS.map(d => d.type))];
  const uniqueOwners = ['All', ...new Set(MOCK_DOCS.map(d => d.owner))];

  return (
    <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-8 h-full overflow-hidden relative">
      {/* Workspace Header */}
      <header className="h-14 border-b border-border-light flex items-center justify-between bg-white/50 backdrop-blur-sm z-30 hidden lg:flex shrink-0">
        <div className="flex items-center gap-3 text-[11px] font-bold text-text-muted uppercase tracking-[0.1em]">
          <span className="hover:text-text-main cursor-pointer" onClick={() => navigate('/')}>Workspace</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className={`transition-colors duration-500 ${searchMode === 'AskAI' ? 'text-accent-ai' : 'text-text-main'}`}>
            {isChatActive ? 'Neural Chat' : 'Intelligence Console'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={resetWorkspace}
            className={`text-[10px] font-bold text-text-muted hover:text-text-main transition-all duration-300 ${isFocusMode ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
          >
            Reset Workspace
          </button>
          <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
             <span className="material-symbols-outlined text-[16px] fill-current animate-pulse">check_circle</span>
             Encrypted
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col py-8 overflow-hidden relative">
        
        {/* Top UI - Input Section */}
        {!isChatActive && (
          <div className={`w-full flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${isFocusMode ? 'scale-90 -translate-y-4 mb-2' : 'mb-10 mt-8'}`}>
            {!isFocusMode && (
              <h1 className="text-6xl font-extrabold mb-12 text-text-main tracking-tighter text-center leading-[1] animate-in fade-in slide-in-from-top-6 duration-1000">
                Unlock <span className="text-primary/40">collective</span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-slate-900 to-accent-ai animate-gradient-x">intelligence.</span>
              </h1>
            )}
            
            <SearchInput />

            {showFilters && searchMode === 'Search' && (
              <div className="w-full max-w-3xl flex items-center justify-center gap-3 mt-6 animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                <div className="flex items-center gap-2 p-1.5 bg-white/60 backdrop-blur-xl rounded-2xl border border-border-light shadow-lg">
                  <div className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-sm text-text-muted group-hover:text-primary transition-colors">category</span>
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="bg-transparent border-none p-0 text-[11px] font-bold uppercase tracking-wider text-text-main focus:ring-0 cursor-pointer"
                    >
                      {uniqueTypes.map(t => <option key={t} value={t}>{t === 'All' ? 'All Formats' : t}</option>)}
                    </select>
                  </div>
                  <div className="w-px h-6 bg-border-light opacity-50"></div>
                  <div className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-sm text-text-muted group-hover:text-primary transition-colors">fingerprint</span>
                    <select 
                      value={filterOwner}
                      onChange={(e) => setFilterOwner(e.target.value)}
                      className="bg-transparent border-none p-0 text-[11px] font-bold uppercase tracking-wider text-text-main focus:ring-0 cursor-pointer"
                    >
                      {uniqueOwners.map(o => <option key={o} value={o}>{o === 'All' ? 'Everyone' : o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Views */}
        {!isFocusMode && (
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="flex flex-col min-h-0 bg-slate-50/40 rounded-[32px] border border-border-light/50 overflow-hidden backdrop-blur-sm group hover:border-slate-200 transition-all">
              <div className="p-8 pb-4 flex items-center justify-between shrink-0">
                <h3 className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="size-2 bg-primary/40 rounded-full animate-pulse"></span>
                  Activity Pulse
                </h3>
                <button onClick={() => navigate('/history')} className="text-[10px] font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-[0.1em]">View Log</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-2 space-y-4">
                {MOCK_ACTIVITIES.map((activity) => (
                  <div key={activity.id} onClick={() => handleActivityClick(activity)} className="p-6 rounded-3xl bg-white border border-border-light/50 hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group/card">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-extrabold text-text-muted uppercase bg-slate-100 px-3 py-1 rounded-full">{activity.time.split(',')[0]}</span>
                      <span className={`material-symbols-outlined text-slate-200 group-hover/card:text-primary transition-all duration-500 ${activity.action === 'uploaded' ? 'scale-110' : 'rotate-12'}`}>{activity.action === 'uploaded' ? 'cloud_done' : 'history_edu'}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-text-main group-hover/card:text-primary transition-colors">{activity.target}</h4>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-2 italic">{activity.comment || `Asset synchronized across local clusters.`}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col min-h-0 bg-slate-50/40 rounded-[32px] border border-border-light/50 overflow-hidden backdrop-blur-sm group hover:border-slate-200 transition-all">
              <div className="p-8 pb-4 flex items-center justify-between shrink-0">
                <h3 className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="size-2 bg-accent-ai/40 rounded-full animate-pulse"></span>
                  Domain Clusters
                </h3>
                <button onClick={() => navigate('/collections/new')} className="text-[10px] font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-[0.1em]">Create New</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-2 space-y-3">
                {MOCK_COLLECTIONS.map((col) => (
                  <div key={col.id} onClick={() => navigate(`/collections/${col.id}`)} className="p-5 rounded-3xl bg-white border border-border-light/50 flex items-center gap-5 hover:border-accent-ai/30 hover:shadow-xl hover:shadow-indigo-100/30 cursor-pointer transition-all group/col shadow-sm">
                    <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-border-light group-hover/col:bg-accent-ai/5 group-hover/col:border-accent-ai/20 transition-all duration-500">
                      <span className="material-symbols-outlined text-text-main text-2xl group-hover/col:scale-110 transition-transform">{col.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-text-main truncate group-hover/col:text-accent-ai transition-colors">{col.name}</h4>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-tight mt-0.5">{col.itemCount} Elements • {col.visibility}</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-200 group-hover/col:text-accent-ai group-hover/col:translate-x-1 transition-all duration-500">arrow_right_alt</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Focus Mode Area */}
        {isFocusMode && (
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
            
            {/* Search Result View */}
            {searchMode === 'Search' && docResults && (
              <div className="max-w-4xl mx-auto space-y-4 pb-12">
                <div className="flex items-center justify-between px-4 mb-4">
                   <p className="text-[11px] font-extrabold text-text-muted uppercase tracking-[0.25em] flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">database</span>
                     Found {docResults.length} neural matches
                   </p>
                </div>
                {docResults.length === 0 ? (
                  <div className="py-24 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/30">
                    <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">troubleshoot</span>
                    <p className="text-sm font-bold tracking-tight uppercase">Search yielded zero results.</p>
                    <p className="text-xs mt-1">Try broadening your semantic filters.</p>
                  </div>
                ) : (
                  docResults.map((doc, idx) => (
                    <div 
                      key={doc.id} 
                      onClick={() => navigate(`/documents/${doc.id}`)} 
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className="p-6 rounded-[28px] bg-white border border-slate-100 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer group flex items-center gap-8 animate-in fade-in slide-in-from-bottom-4"
                    >
                      <div className="size-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                        <span className="material-symbols-outlined text-3xl">article</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-lg text-text-main group-hover:text-primary transition-colors truncate tracking-tight">{doc.name}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">{doc.type}</span>
                          <span className="text-xs text-text-muted font-bold flex items-center gap-2">
                            <img src={`https://picsum.photos/seed/${doc.owner}/32/32`} className="size-4 rounded-full grayscale opacity-50" />
                            {doc.owner}
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-200 group-hover:text-primary group-hover:scale-125 transition-all duration-500">chevron_right</span>
                    </div>
                  ))
                )}
                <button onClick={resetWorkspace} className="w-full mt-10 py-5 text-[11px] font-extrabold text-text-muted uppercase tracking-[0.3em] border-2 border-dashed border-slate-100 rounded-[32px] hover:border-slate-300 hover:text-text-main transition-all group">
                  <span className="group-hover:rotate-180 inline-block transition-transform duration-700 mr-2">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </span>
                  Terminate Current Session
                </button>
              </div>
            )}

            {/* AI Chat View */}
            {searchMode === 'AskAI' && (
              <div className="max-w-4xl mx-auto flex flex-col gap-10">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out`}>
                    {msg.role === 'user' ? (
                      <div className="max-w-[85%] bg-slate-900 text-white px-6 py-4 rounded-[28px] rounded-tr-none shadow-xl border border-slate-800 ring-1 ring-white/10">
                        <p className="text-sm font-medium leading-relaxed tracking-tight">{msg.text}</p>
                      </div>
                    ) : (
                      <div className="w-full flex gap-6">
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-accent-ai to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0 mt-0.5 ring-4 ring-indigo-50/50">
                          <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div className="p-8 bg-white border border-indigo-100/40 rounded-[32px] rounded-tl-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                               <span className="material-symbols-outlined text-[100px] text-accent-ai">neurology</span>
                            </div>
                            <h4 className="text-[9px] font-extrabold text-accent-ai/60 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                               <span className="material-symbols-outlined text-[14px]">psychology</span>
                               Neural Inference
                            </h4>
                            <p className="text-base text-text-main leading-relaxed font-semibold tracking-tight">{msg.text}</p>
                            {msg.sources && msg.sources.length > 0 && (
                              <div className="flex flex-wrap gap-2.5 pt-8 mt-8 border-t border-slate-50">
                                {msg.sources.map((s, i) => (
                                  <button key={i} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-indigo-50/50 border border-indigo-100/50 text-[10px] font-extrabold text-accent-ai hover:bg-indigo-100 transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                    {s.title}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isProcessing && searchMode === 'AskAI' && (
                  <div className="flex gap-6 animate-in fade-in duration-500">
                    <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center animate-pulse shrink-0 border border-slate-100">
                      <span className="material-symbols-outlined text-slate-300 text-2xl">hub</span>
                    </div>
                    <div className="flex-1 p-8 bg-slate-50/50 border border-slate-200/50 rounded-[32px] rounded-tl-none flex flex-col gap-4 shadow-sm">
                      <div className="flex items-center gap-2.5">
                         <div className="size-2 bg-accent-ai rounded-full animate-bounce [animation-duration:1s]"></div>
                         <div className="size-2 bg-accent-ai rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:1s]"></div>
                         <div className="size-2 bg-accent-ai rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:1s]"></div>
                      </div>
                      <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.3em] animate-pulse">{searchStep || 'Reconfiguring Neural Paths...'}</p>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} className="h-4" />
              </div>
            )}
          </div>
        )}

        {/* Sticky Bottom Interface Area */}
        {isChatActive && (
          <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 bg-gradient-to-t from-white via-white/95 to-transparent z-40 animate-in slide-in-from-bottom-12 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="max-w-4xl mx-auto">
              
              {/* Contextual Suggestions */}
              <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                {chatHistory[chatHistory.length - 1]?.followUps?.map((f, i) => (
                  <button 
                    key={i} 
                    onClick={() => performAiAsk(f)}
                    className="px-5 py-2.5 rounded-[16px] bg-white border border-indigo-100 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.12)] text-[10px] font-extrabold text-text-main hover:border-accent-ai hover:bg-indigo-50/50 hover:-translate-y-0.5 transition-all flex items-center gap-2.5 group"
                  >
                    {f}
                    <span className="material-symbols-outlined text-[16px] text-accent-ai group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">north_east</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={resetWorkspace}
                  title="Clear Nexus Context"
                  className="size-14 rounded-[20px] bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-white hover:text-red-500 transition-all duration-300 shrink-0 shadow-lg border border-slate-100 group"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-180 transition-transform duration-700">refresh</span>
                </button>
                <div className="flex-1">
                  <SearchInput atBottom={true} />
                </div>
              </div>
              <p className="text-[8px] text-center mt-8 text-text-muted font-black uppercase tracking-[0.5em] opacity-40">Nexus Core OS • Neural Mesh 0x4A2</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
