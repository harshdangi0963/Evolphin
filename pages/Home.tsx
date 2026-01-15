
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ACTIVITIES, MOCK_COLLECTIONS, MOCK_DOCS } from '../constants';
import { Document, Activity } from '../types';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: { title: string }[];
  followUps?: string[];
}

const Home: React.FC = () => {
  const [searchMode, setSearchMode] = useState<'Search' | 'AI'>('Search');
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [docResults, setDocResults] = useState<Document[] | null>(null);
  const [searchStep, setSearchStep] = useState<string>('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0 || isProcessing) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isProcessing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && isSheetOpen) {
        setIsSheetOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSheetOpen]);

  const performDocSearch = () => {
    setIsProcessing(true);
    setChatHistory([]);
    setDocResults(null);

    setTimeout(() => {
      const filtered = MOCK_DOCS.filter(doc =>
        query.trim() === '' || doc.name.toLowerCase().includes(query.toLowerCase())
      );
      setDocResults(filtered);
      setIsProcessing(false);
    }, 400);
  };

  const performAiAsk = async (explicitQuery?: string) => {
    const finalQuery = explicitQuery || query;
    if (!finalQuery.trim()) return;

    setIsProcessing(true);
    setDocResults(null);

    setChatHistory(prev => [...prev, { id: Date.now().toString(), role: 'user', text: finalQuery }]);
    setQuery('');

    const steps = ["Analyzing...", "Searching...", "Synthesizing..."];
    let stepIdx = 0;
    const stepInterval = setInterval(() => {
      setSearchStep(steps[stepIdx % steps.length]);
      stepIdx++;
    }, 600);

    await new Promise(resolve => setTimeout(resolve, 1800));

    const mentionDoc = MOCK_DOCS[Math.floor(Math.random() * MOCK_DOCS.length)];

    setChatHistory(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: `Based on "${mentionDoc.name}", I found relevant information. The document by ${mentionDoc.owner} contains the details you're looking for.`,
      sources: [{ title: mentionDoc.name }],
      followUps: ['Tell me more', 'Find related']
    }]);

    clearInterval(stepInterval);
    setIsProcessing(false);
    setSearchStep('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (searchMode === 'Search') performDocSearch();
    else performAiAsk();
  };

  const resetWorkspace = () => {
    setChatHistory([]);
    setDocResults(null);
    setQuery('');
    searchInputRef.current?.focus();
  };

  const isChatActive = searchMode === 'AI' && chatHistory.length > 0;
  const isSearchActive = searchMode === 'Search' && docResults !== null;
  const isFocusMode = isChatActive || isSearchActive || isProcessing;

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative bg-bg">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-glow-top pointer-events-none"></div>

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-edge shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-md bg-accent flex items-center justify-center">
            <span className="material-symbols-outlined text-bg text-base">hub</span>
          </div>
          <span className="text-sm font-semibold text-content">Nexus</span>
        </div>

        <div className="flex items-center gap-2">
          {isFocusMode && (
            <button onClick={resetWorkspace} className="btn btn-ghost btn-sm">
              <span className="material-symbols-outlined text-base">add</span>
              New
            </button>
          )}
          <button
            onClick={() => setIsSheetOpen(true)}
            className="btn btn-ghost btn-icon-sm"
          >
            <span className="material-symbols-outlined text-lg">menu</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">

        {/* Hero Search */}
        {!isFocusMode && (
          <div className="w-full max-w-xl px-6 flex flex-col items-center animate-fade-in">

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className={`relative flex items-center h-14 bg-bg-elevated border rounded-xl transition-all duration-200 ${searchMode === 'AI'
                  ? 'border-accent/30 shadow-glow'
                  : 'border-edge hover:border-edge-hover'
                }`}>

                {/* Mode Toggle */}
                <div className="flex items-center h-full pl-1.5">
                  <div className="flex bg-bg-muted rounded-lg p-0.5 h-10">
                    <button
                      type="button"
                      onClick={() => { setSearchMode('Search'); setChatHistory([]); setDocResults(null); }}
                      className={`px-3 h-full rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${searchMode === 'Search' ? 'bg-bg-elevated text-content' : 'text-content-muted hover:text-content'
                        }`}
                    >
                      <span className="material-symbols-outlined text-sm">search</span>
                      Search
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSearchMode('AI'); setChatHistory([]); setDocResults(null); }}
                      className={`px-3 h-full rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${searchMode === 'AI' ? 'bg-bg-elevated text-accent' : 'text-content-muted hover:text-content'
                        }`}
                    >
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      AI
                    </button>
                  </div>
                </div>

                {/* Input */}
                <input
                  ref={searchInputRef}
                  className="flex-1 h-full bg-transparent border-none px-4 text-sm font-medium text-content placeholder:text-content-muted focus:ring-0 focus:outline-none"
                  placeholder={searchMode === 'AI' ? "Ask anything..." : "Search documents..."}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isProcessing}
                />

                {/* Submit */}
                <div className="pr-1.5">
                  <button
                    type="submit"
                    disabled={isProcessing || !query.trim()}
                    className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 ${searchMode === 'AI'
                        ? 'bg-accent text-bg hover:bg-accent/90'
                        : 'bg-white text-bg hover:bg-white/90'
                      }`}
                  >
                    {isProcessing ? (
                      <div className="size-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin"></div>
                    ) : (
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Keyboard hint */}
            <p className="mt-4 text-xs text-content-muted flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-bg-muted border border-edge rounded text-[10px] font-mono">⌘K</kbd>
              to focus
            </p>

            {/* Quick actions */}
            <div className="flex items-center gap-2 mt-12">
              {[
                { label: 'Collections', icon: 'folder', action: () => navigate('/collections') },
                { label: 'Team', icon: 'group', action: () => navigate('/collaborators') },
                { label: 'History', icon: 'schedule', action: () => navigate('/history') }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="btn btn-secondary btn-sm"
                >
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Focus Mode Results */}
        {isFocusMode && (
          <div className="w-full h-full flex flex-col overflow-hidden">

            {/* Compact Search */}
            <div className="shrink-0 px-6 py-4 border-b border-edge bg-bg">
              <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto">
                <div className={`relative flex items-center h-11 bg-bg-subtle border rounded-lg transition-all ${searchMode === 'AI' ? 'border-accent/20' : 'border-edge'
                  }`}>
                  <div className="flex items-center h-full pl-1">
                    <div className="flex bg-bg-muted rounded p-0.5 h-8">
                      <button
                        type="button"
                        onClick={() => { setSearchMode('Search'); setChatHistory([]); setDocResults(null); }}
                        className={`px-2 h-full rounded text-xs font-medium flex items-center ${searchMode === 'Search' ? 'bg-bg-elevated text-content' : 'text-content-muted'
                          }`}
                      >
                        <span className="material-symbols-outlined text-sm">search</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setSearchMode('AI'); setChatHistory([]); setDocResults(null); }}
                        className={`px-2 h-full rounded text-xs font-medium flex items-center ${searchMode === 'AI' ? 'bg-bg-elevated text-accent' : 'text-content-muted'
                          }`}
                      >
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      </button>
                    </div>
                  </div>
                  <input
                    className="flex-1 h-full bg-transparent border-none px-3 text-sm text-content placeholder:text-content-muted focus:ring-0 focus:outline-none"
                    placeholder={searchMode === 'AI' ? "Follow up..." : "Search..."}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isProcessing}
                  />
                  <div className="pr-1">
                    <button
                      type="submit"
                      disabled={isProcessing || !query.trim()}
                      className={`h-8 w-8 rounded-md flex items-center justify-center transition-all disabled:opacity-30 ${searchMode === 'AI' ? 'bg-accent text-bg' : 'bg-white text-bg'
                        }`}
                    >
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">

              {/* Document Results */}
              {searchMode === 'Search' && docResults && (
                <div className="max-w-xl mx-auto px-6 py-6">
                  <p className="text-xs text-content-muted mb-4">{docResults.length} results</p>

                  {docResults.length === 0 ? (
                    <div className="py-16 text-center">
                      <span className="material-symbols-outlined text-4xl text-content-muted mb-3 block">search_off</span>
                      <p className="text-sm text-content-muted">No results</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {docResults.map((doc, idx) => (
                        <button
                          key={doc.id}
                          onClick={() => navigate(`/documents/${doc.id}`)}
                          style={{ animationDelay: `${idx * 30}ms` }}
                          className="w-full card-interactive p-4 text-left flex items-center gap-4 animate-fade-in"
                        >
                          <div className="size-10 rounded-lg bg-bg-muted flex items-center justify-center text-content-muted">
                            <span className="material-symbols-outlined text-lg">article</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-content truncate">{doc.name}</p>
                            <p className="text-xs text-content-muted">{doc.type} · {doc.owner}</p>
                          </div>
                          <span className="material-symbols-outlined text-content-muted text-lg">chevron_right</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* AI Chat */}
              {searchMode === 'AI' && (
                <div className="max-w-xl mx-auto px-6 py-6 space-y-4">
                  {chatHistory.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                      {msg.role === 'user' ? (
                        <div className="max-w-[80%] bg-white text-bg px-4 py-3 rounded-xl rounded-tr-sm">
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      ) : (
                        <div className="max-w-[90%] flex gap-3">
                          <div className="size-8 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-bg text-base">auto_awesome</span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-bg-elevated border border-edge px-4 py-3 rounded-xl rounded-tl-sm">
                              <p className="text-sm text-content leading-relaxed">{msg.text}</p>

                              {msg.sources && msg.sources.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-edge">
                                  {msg.sources.map((s, i) => (
                                    <span key={i} className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                                      {s.title}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {msg.followUps && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {msg.followUps.map((f, i) => (
                                  <button
                                    key={i}
                                    onClick={() => performAiAsk(f)}
                                    className="btn btn-secondary btn-sm text-xs"
                                  >
                                    {f}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex gap-3 animate-fade-in">
                      <div className="size-8 rounded-lg bg-bg-muted flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-content-muted text-base animate-pulse-soft">auto_awesome</span>
                      </div>
                      <div className="bg-bg-elevated border border-edge px-4 py-3 rounded-xl rounded-tl-sm">
                        <p className="text-xs text-content-muted">{searchStep || 'Thinking...'}</p>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sheet Overlay */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
          onClick={() => setIsSheetOpen(false)}
        />
      )}

      {/* Context Sheet */}
      <aside className={`fixed top-0 right-0 bottom-0 w-80 bg-bg-elevated border-l border-edge z-50 flex flex-col transition-transform duration-300 ease-smooth ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="h-14 px-5 flex items-center justify-between border-b border-edge shrink-0">
          <span className="text-sm font-semibold text-content">Context</span>
          <button onClick={() => setIsSheetOpen(false)} className="btn btn-ghost btn-icon-sm">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">

          {/* Recent */}
          <section>
            <h3 className="text-caption text-content-muted uppercase mb-3">Recent</h3>
            <div className="space-y-1">
              {MOCK_DOCS.slice(0, 4).map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => { navigate(`/documents/${doc.id}`); setIsSheetOpen(false); }}
                  className="w-full p-3 rounded-lg hover:bg-bg-subtle transition-colors flex items-center gap-3 text-left"
                >
                  <span className="material-symbols-outlined text-content-muted text-lg">article</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-content truncate">{doc.name}</p>
                    <p className="text-xs text-content-muted">{doc.lastUpdated}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Activity */}
          <section>
            <h3 className="text-caption text-content-muted uppercase mb-3">Activity</h3>
            <div className="space-y-1">
              {MOCK_ACTIVITIES.slice(0, 4).map((activity) => (
                <div key={activity.id} className="p-3 rounded-lg hover:bg-bg-subtle transition-colors">
                  <p className="text-sm text-content">{activity.target}</p>
                  <p className="text-xs text-content-muted mt-0.5">{activity.time}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Collections */}
          <section>
            <h3 className="text-caption text-content-muted uppercase mb-3">Collections</h3>
            <div className="space-y-1">
              {MOCK_COLLECTIONS.slice(0, 3).map((col) => (
                <button
                  key={col.id}
                  onClick={() => { navigate(`/collections/${col.id}`); setIsSheetOpen(false); }}
                  className="w-full p-3 rounded-lg hover:bg-bg-subtle transition-colors flex items-center gap-3 text-left"
                >
                  <span className="material-symbols-outlined text-content-muted text-lg">{col.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-content truncate">{col.name}</p>
                    <p className="text-xs text-content-muted">{col.itemCount} items</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default Home;
