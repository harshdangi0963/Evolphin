
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_DOCS } from '../constants';
import { Document } from '../types';
import { Particles } from '../components/ui/Particles';
import { BorderBeam } from '../components/ui/BorderBeam';
import { FlipClock } from '../components/ui/FlipClock';

interface Source {
  title: string;
  uri?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: Source[];
}

interface SearchInputProps {
  searchMode: 'Search' | 'AskAI';
  setSearchMode: (mode: 'Search' | 'AskAI') => void;
  query: string;
  setQuery: (query: string) => void;
  isProcessing: boolean;
  handleSearchSubmit: (e: React.FormEvent) => void;
  stickyBottom?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  searchMode, 
  setSearchMode, 
  query, 
  setQuery, 
  isProcessing, 
  handleSearchSubmit,
  stickyBottom = false 
}) => {
  const smoothSpring = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 0.8
  };

  const isAi = searchMode === 'AskAI';

  return (
    <motion.div 
      layout
      className={`w-full max-w-4xl mx-auto px-6 ${stickyBottom ? 'fixed bottom-8 left-1/2 -translate-x-1/2 z-50' : 'relative mt-2'}`}
    >
      <motion.form 
        layout
        onSubmit={handleSearchSubmit}
        animate={{
          boxShadow: isAi 
            ? '0 30px 60px -12px rgba(99, 102, 241, 0.25), 0 0 30px -10px rgba(99, 102, 241, 0.4)'
            : '0 30px 60px -12px rgba(0,0,0,0.1), 0 0 20px -5px rgba(0,0,0,0.05)',
          borderColor: isAi ? '#818cf8' : '#e2e8f0',
          scale: isProcessing ? 0.99 : 1
        }}
        className="relative flex items-center p-1.5 rounded-[22px] bg-white border border-slate-200 shadow-xl ring-4 ring-slate-100/50 transition-all duration-500"
      >
        <BorderBeam 
          size={isAi ? 300 : 220} 
          duration={isAi ? 6 : 10} 
          colorFrom={isAi ? "#6366f1" : "#94a3b8"} 
          borderRadius={22}
          borderWidth={isAi ? 2 : 1.5}
          className={isAi ? "opacity-80" : "opacity-60"}
        />
        
        <div className="flex bg-slate-100 rounded-[14px] p-1 shrink-0 w-[164px] relative h-11 items-center">
          <motion.div 
            animate={{ x: searchMode === 'Search' ? 0 : 78 }}
            transition={smoothSpring}
            className="absolute top-1 bottom-1 w-[78px] bg-white rounded-[10px] shadow-sm z-0"
          />
          <button 
            type="button"
            onClick={() => setSearchMode('Search')}
            className={`relative z-10 flex-1 h-full text-[10px] font-black uppercase tracking-tight transition-colors duration-500 ${searchMode === 'Search' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Search
          </button>
          <button 
            type="button"
            onClick={() => setSearchMode('AskAI')}
            className={`relative z-10 flex-1 h-full text-[10px] font-black uppercase tracking-tight transition-colors duration-500 ${searchMode === 'AskAI' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Ask AI
          </button>
        </div>

        <div className="flex-1 flex items-center h-11 ml-1">
          <input 
            className="flex-1 bg-transparent border-none px-4 text-[14px] font-bold text-slate-900 placeholder:text-slate-300 focus:ring-0 h-full"
            placeholder={isAi ? "Describe your intent..." : "Find anything in your workspace..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <motion.button 
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          className={`h-11 px-6 rounded-[14px] flex items-center gap-2 transition-all disabled:opacity-30 disabled:pointer-events-none group shrink-0 ${
            isAi 
            ? 'bg-primary shadow-[0_8px_20px_-4px_rgba(99, 102, 241, 0.4)] hover:bg-slate-900' 
            : 'bg-slate-950 hover:bg-primary shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)]'
          }`}
          disabled={!query.trim() && !isProcessing}
        >
          <span className="text-white text-[10px] font-black uppercase tracking-[0.15em]">
            {isProcessing ? 'Thinking' : (searchMode === 'Search' ? 'Search' : 'Ask AI')}
          </span>
          {!isProcessing && (
            <motion.span 
              animate={isAi ? { rotate: [0, 15, -15, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="material-symbols-outlined text-[18px] text-white/70 group-hover:text-white transition-colors"
            >
              {searchMode === 'Search' ? 'arrow_forward' : 'auto_awesome'}
            </motion.span>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<'Search' | 'AskAI'>('Search');
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [docResults, setDocResults] = useState<Document[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0 || isProcessing || docResults) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isProcessing, docResults]);

  const performDocSearch = () => {
    if (!query.trim() && activeFilter === 'All') return;
    setIsProcessing(true);
    setDocResults(null);
    setTimeout(() => {
      const filtered = MOCK_DOCS.filter(doc => {
        const matchesQuery = query.trim() === '' || doc.name.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = activeFilter === 'All' || doc.type === activeFilter;
        return matchesQuery && matchesFilter;
      });
      setDocResults(filtered);
      setIsProcessing(false);
    }, 600);
  };

  const performAiAsk = async () => {
    if (!query.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: query };
    setChatHistory(prev => [...prev, userMsg]);
    setIsProcessing(true);
    setQuery('');

    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: "Based on the internal documentation, I've found that the Ethics of Autonomous Systems is a recurring theme in the latest research cycles. There's a strong emphasis on maintaining human accountability as the decision speed increases.",
      sources: [{ title: 'Ethics of Autonomous Systems' }]
    };

    setChatHistory(prev => [...prev, aiMsg]);
    setIsProcessing(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'Search') performDocSearch();
    else performAiAsk();
  };

  const isConversationActive = searchMode === 'AskAI' && chatHistory.length > 0;
  const isSearchActive = searchMode === 'Search' && docResults !== null;
  const isFocusMode = isConversationActive || isSearchActive || isProcessing;

  const filters = [
    { name: 'All', icon: 'apps' },
    { name: 'PDF', icon: 'picture_as_pdf' },
    { name: 'DOCX', icon: 'description' },
    { name: 'SQL', icon: 'database' }
  ];

  const smoothSpring = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 0.8
  };

  const handleSetSearchMode = (mode: 'Search' | 'AskAI') => {
    setSearchMode(mode);
    setDocResults(null);
    if (mode === 'Search') setChatHistory([]);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full relative bg-white">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Particles 
          className="absolute inset-0 z-0" 
          quantity={120} 
          staticity={30} 
          ease={70} 
          color="#6366f1"
          size={0.6}
        />
        <motion.div 
          animate={{ opacity: isFocusMode ? 0.2 : 0.6 }}
          className="absolute inset-0 dot-grid hero-mask"
        />
        <motion.div 
          animate={{ 
            top: isFocusMode ? '0%' : '20%',
            opacity: isFocusMode ? 0.3 : 1
          }}
          className="absolute left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto relative z-10 px-6">
        <div className={`flex-1 flex flex-col transition-all duration-500 ${isConversationActive ? 'pt-6' : 'pt-12'}`}>
          <AnimatePresence mode="wait">
            {!isFocusMode && (
              <motion.div 
                key="hero-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-black text-primary uppercase tracking-widest mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                  </span>
                  Neural Mesh v.4.0 Active
                </div>
                <h1 className="text-[52px] lg:text-[72px] font-black tracking-[-0.05em] leading-[0.85] text-slate-950 mb-6">
                  Search <span className="text-slate-200">without</span><br/>boundaries.
                </h1>
                <p className="text-slate-400 font-bold text-xs max-w-[280px] mx-auto leading-relaxed">
                  Unified intelligence for your memory.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isConversationActive && (
            <SearchInput 
              searchMode={searchMode}
              setSearchMode={handleSetSearchMode}
              query={query}
              setQuery={setQuery}
              isProcessing={isProcessing}
              handleSearchSubmit={handleSearchSubmit}
            />
          )}

          {searchMode === 'Search' && !isConversationActive && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mt-6"
            >
              <div className="flex bg-slate-100/40 backdrop-blur-md p-1 rounded-[16px] border border-slate-200/50 shadow-sm relative overflow-hidden">
                {filters.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => {
                      setActiveFilter(f.name);
                      if (query) performDocSearch();
                    }}
                    className={`relative px-4 py-2 rounded-xl flex items-center gap-2 transition-all group z-10`}
                  >
                    {activeFilter === f.name && (
                      <motion.div
                        layoutId="filter-active-pill"
                        transition={smoothSpring}
                        className="absolute inset-0 bg-white shadow-sm border border-slate-200/60 rounded-xl"
                      />
                    )}
                    
                    <span className={`material-symbols-outlined text-[16px] relative z-20 transition-all duration-500 ${activeFilter === f.name ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {f.icon}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] relative z-20 transition-all duration-500 ${activeFilter === f.name ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {f.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className={`mt-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 px-2 ${isConversationActive ? 'pb-32' : 'pb-8'}`}>
            {searchMode === 'AskAI' && chatHistory.map((msg, i) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 text-white p-4 rounded-[20px] rounded-tr-none shadow-lg' 
                  : 'flex gap-3'
                }`}>
                  {msg.role === 'assistant' ? (
                    <>
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10 shrink-0 self-start">
                         <span className="material-symbols-outlined text-primary text-base font-bold">auto_awesome</span>
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="p-4 bg-white border border-slate-100 rounded-[20px] rounded-tl-none shadow-sm">
                          <p className="text-[13px] font-bold leading-relaxed text-slate-700">{msg.text}</p>
                        </div>
                        {msg.sources && (
                          <div className="flex flex-wrap gap-2 pt-0.5">
                            {msg.sources.map((s, idx) => (
                              <motion.div 
                                whileHover={{ scale: 1.02 }}
                                key={idx} 
                                onClick={() => navigate('/documents/d1')}
                                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[9px] font-black uppercase tracking-tight text-slate-900 shadow-sm flex items-center gap-2 cursor-pointer hover:border-primary transition-all"
                              >
                                <span className="material-symbols-outlined text-[14px] text-primary">description</span>
                                {s.title}
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-[13px] font-bold tracking-tight">{msg.text}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {searchMode === 'Search' && docResults && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
                className="grid grid-cols-1 gap-2.5 max-w-3xl mx-auto w-full"
              >
                 {docResults.length > 0 ? docResults.map(doc => (
                   <motion.div 
                     variants={{
                       hidden: { opacity: 0, x: -5 },
                       visible: { opacity: 1, x: 0 }
                     }}
                     key={doc.id} 
                     onClick={() => navigate(`/documents/${doc.id}`)}
                     className="p-4 rounded-xl bg-white border border-slate-100 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3"
                   >
                      <div className="size-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors border border-slate-100">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-xl">
                          {doc.type === 'PDF' ? 'picture_as_pdf' : doc.type === 'SQL' ? 'database' : 'description'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{doc.name}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                           <span className="px-1 py-0.5 rounded bg-slate-100 text-[7px] font-black text-slate-500 uppercase tracking-widest">{doc.type}</span>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doc.lastUpdated}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-all text-sm">arrow_forward_ios</span>
                   </motion.div>
                 )) : (
                   <div className="text-center py-12">
                     <span className="material-symbols-outlined text-3xl text-slate-200 mb-2">search_off</span>
                     <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No matches</p>
                   </div>
                 )}
              </motion.div>
            )}

            {isProcessing && (
              <div className="flex justify-center py-8">
                <div className="flex flex-col items-center gap-3">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="size-6 rounded-full border-2 border-primary border-t-transparent"
                  />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary animate-pulse">Scanning Mesh</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isConversationActive && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent z-50 pointer-events-none"
          >
            <div className="pointer-events-auto">
               <SearchInput 
                  searchMode={searchMode}
                  setSearchMode={handleSetSearchMode}
                  query={query}
                  setQuery={setQuery}
                  isProcessing={isProcessing}
                  handleSearchSubmit={handleSearchSubmit}
                  stickyBottom 
                />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ 
          opacity: isFocusMode ? 0.2 : 0.8, 
          y: 0 
        }}
        whileHover={{ opacity: 1 }}
        className="fixed bottom-6 right-8 z-[60] pointer-events-none"
      >
        <FlipClock time={currentTime} />
      </motion.div>
    </div>
  );
};

export default Home;
