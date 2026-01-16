
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_DOCS } from '../constants';
import { Document } from '../types';
import { Particles } from '../components/ui/Particles';
import { BorderBeam } from '../components/ui/BorderBeam';
import { FlipClock } from '../components/ui/FlipClock';
import { AnimatedThemeToggler } from '../components/ui/AnimatedThemeToggler';

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
            ? '0 30px 60px -12px rgba(79, 70, 229, 0.3), 0 0 30px -10px rgba(79, 70, 229, 0.4)'
            : '0 30px 60px -12px rgba(0,0,0,0.15), 0 0 20px -5px rgba(0,0,0,0.1)',
          borderColor: isAi ? '#4f46e5' : '#94a3b8', 
          scale: isProcessing ? 0.99 : 1
        }}
        className="relative flex items-center p-1.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-400/40 dark:border-white/10 shadow-2xl ring-8 ring-slate-200/50 dark:ring-white/5 transition-all duration-500"
      >
        <BorderBeam 
          size={isAi ? 300 : 220} 
          duration={isAi ? 6 : 10} 
          colorFrom={isAi ? "#4f46e5" : "#64748b"} 
          borderRadius={22}
          borderWidth={isAi ? 2.5 : 1.5}
          className={isAi ? "opacity-100" : "opacity-60"}
        />
        
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-[14px] p-1 shrink-0 w-[164px] relative h-11 items-center border border-slate-200 dark:border-white/5">
          <motion.div 
            animate={{ x: searchMode === 'Search' ? 0 : 78 }}
            transition={smoothSpring}
            className="absolute top-0.5 bottom-0.5 w-[78px] bg-white dark:bg-slate-950 rounded-[10px] shadow-md z-0 border border-slate-200 dark:border-white/10"
          />
          <button 
            type="button"
            onClick={() => setSearchMode('Search')}
            className={`relative z-10 flex-1 h-full text-[10px] font-black uppercase tracking-tight transition-colors duration-500 ${searchMode === 'Search' ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Search
          </button>
          <button 
            type="button"
            onClick={() => setSearchMode('AskAI')}
            className={`relative z-10 flex-1 h-full text-[10px] font-black uppercase tracking-tight transition-colors duration-500 ${searchMode === 'AskAI' ? 'text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Ask AI
          </button>
        </div>

        <div className="flex-1 flex items-center h-11 ml-1">
          <input 
            className="flex-1 bg-transparent border-none px-4 text-[14px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-0 h-full"
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
            ? 'bg-primary shadow-lg hover:bg-slate-900 dark:hover:bg-slate-700' 
            : 'bg-slate-900 dark:bg-slate-700 hover:bg-primary dark:hover:bg-primary shadow-md'
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
    <div className="flex-1 flex flex-col w-full h-full relative bg-workspace-bg dark:bg-slate-950 transition-colors duration-500">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Particles 
          className="absolute inset-0 z-0" 
          quantity={100} 
          staticity={30} 
          ease={70} 
          color="#4f46e5"
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
          className="absolute left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full dark:opacity-20"
        />
      </div>

      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto relative z-10 px-6">
        <div className={`flex-1 flex flex-col transition-all duration-500 ${isConversationActive ? 'pt-6' : 'pt-16'}`}>
          <AnimatePresence mode="wait">
            {!isFocusMode && (
              <motion.div 
                key="hero-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-16 relative"
              >
                <h1 className="text-[56px] lg:text-[92px] font-black tracking-[-0.06em] font-display leading-[0.82] text-slate-950 dark:text-white drop-shadow-xl select-none">
                  Search <span className="text-slate-400 dark:text-slate-800 transition-all duration-700 hover:text-primary dark:hover:text-white hero-glow-text cursor-default">without</span><br/>
                  <span className="relative inline-block mt-2">
                    boundaries.
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -bottom-1 left-0 h-2 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                    />
                  </span>
                </h1>
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
              className="flex justify-center mt-8"
            >
              <div className="flex bg-white dark:bg-slate-900/60 backdrop-blur-md p-1 rounded-[16px] border border-slate-300 dark:border-white/10 shadow-lg relative overflow-hidden">
                {filters.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => {
                      setActiveFilter(f.name);
                      if (query) performDocSearch();
                    }}
                    className={`relative px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all group z-10`}
                  >
                    {activeFilter === f.name && (
                      <motion.div
                        layoutId="filter-active-pill"
                        transition={smoothSpring}
                        className="absolute inset-0 bg-slate-900 dark:bg-slate-800 shadow-md border border-slate-950 dark:border-white/10 rounded-xl"
                      />
                    )}
                    
                    <span className={`material-symbols-outlined text-[18px] relative z-20 transition-all duration-500 ${activeFilter === f.name ? 'text-primary' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-300'}`}>
                      {f.icon}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] relative z-20 transition-all duration-500 ${activeFilter === f.name ? 'text-white' : 'text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                      {f.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className={`mt-10 space-y-5 overflow-y-auto custom-scrollbar flex-1 px-2 ${isConversationActive ? 'pb-36' : 'pb-12'}`}>
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
                  ? 'bg-slate-900 dark:bg-primary/20 dark:border dark:border-primary/20 text-white p-5 rounded-[24px] rounded-tr-none shadow-xl border border-slate-950' 
                  : 'flex gap-4'
                }`}>
                  {msg.role === 'assistant' ? (
                    <>
                      <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center border border-primary/20 shrink-0 self-start shadow-md">
                         <span className="material-symbols-outlined text-xl font-bold">auto_awesome</span>
                      </div>
                      <div className="space-y-4 flex-1">
                        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[24px] rounded-tl-none shadow-md text-slate-800 dark:text-slate-200">
                          <p className="text-[14px] font-bold leading-relaxed">{msg.text}</p>
                        </div>
                        {msg.sources && (
                          <div className="flex flex-wrap gap-2.5 pt-0.5">
                            {msg.sources.map((s, idx) => (
                              <motion.div 
                                whileHover={{ scale: 1.02 }}
                                key={idx} 
                                onClick={() => navigate('/documents/d1')}
                                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-[10px] font-black uppercase tracking-tight text-slate-950 dark:text-white shadow-sm flex items-center gap-2 cursor-pointer hover:border-primary hover:text-primary transition-all"
                              >
                                <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                                {s.title}
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-[14px] font-bold tracking-tight">{msg.text}</p>
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
                className="grid grid-cols-1 gap-3.5 max-w-3xl mx-auto w-full"
              >
                 {docResults.length > 0 ? docResults.map(doc => (
                   <motion.div 
                     variants={{
                       hidden: { opacity: 0, x: -5 },
                       visible: { opacity: 1, x: 0 }
                     }}
                     key={doc.id} 
                     onClick={() => navigate(`/documents/${doc.id}`)}
                     className="p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/5 hover:border-primary hover:shadow-xl transition-all cursor-pointer group flex items-center gap-4 shadow-sm"
                   >
                      <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary transition-colors border border-slate-200 dark:border-white/5">
                        <span className="material-symbols-outlined text-slate-600 group-hover:text-white transition-colors text-2xl">
                          {doc.type === 'PDF' ? 'picture_as_pdf' : doc.type === 'SQL' ? 'database' : 'description'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[14px] font-black text-slate-950 dark:text-white uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{doc.name}</h4>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[8px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-widest border border-slate-300 dark:border-white/5">{doc.type}</span>
                           <span className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest">{doc.lastUpdated}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 dark:text-slate-700 group-hover:text-primary group-hover:translate-x-1 transition-all text-sm">arrow_forward_ios</span>
                   </motion.div>
                 )) : (
                   <div className="text-center py-20">
                     <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-800 mb-4">search_off</span>
                     <p className="text-slate-600 font-black uppercase tracking-[0.25em] text-[12px]">No records found in current mesh</p>
                   </div>
                 )}
              </motion.div>
            )}

            {isProcessing && (
              <div className="flex justify-center py-10">
                <div className="flex flex-col items-center gap-4 text-primary">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="size-8 rounded-full border-[3px] border-primary border-t-transparent shadow-lg"
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] animate-pulse">Scanning Neural Mesh</span>
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
            className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-workspace-bg dark:from-slate-950 via-workspace-bg/95 dark:via-slate-950/95 to-transparent z-50 pointer-events-none"
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isFocusMode ? 0.3 : 0.9, y: 0 }}
        whileHover={{ opacity: 1 }}
        className="fixed bottom-8 right-8 z-[100] flex items-center gap-5 group transition-opacity"
      >
        <AnimatedThemeToggler />
        <FlipClock time={currentTime} />
      </motion.div>
    </div>
  );
};

export default Home;
