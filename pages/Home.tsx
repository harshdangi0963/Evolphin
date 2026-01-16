
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_DOCS } from '../constants';
import { Document } from '../types';
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
  const isAi = searchMode === 'AskAI';
  
  // Refined "Human-Like" Typing Effect Logic
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [showCursor, setShowCursor] = useState(true);

  const searchSuggestions = useMemo(() => [
    "Find the 2024 Roadmap",
    "Search 'Engineering' docs",
    "Look for Alex Rivera's files",
    "Find SQL schema definitions",
    "Search for PDF assets"
  ], []);

  const aiSuggestions = useMemo(() => [
    "Summarize the ethics document",
    "Explain 'accountability gaps'",
    "What are the Q4 risks?",
    "Synthesize recent uploads",
    "Check for naming conflicts"
  ], []);

  const suggestions = isAi ? aiSuggestions : searchSuggestions;

  // Handle Typing
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % suggestions.length;
      const fullText = suggestions[i];

      if (isDeleting) {
        setDisplayText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(35); // Faster deleting
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        // Add random jitter for human feel (60ms - 120ms)
        setTypingSpeed(60 + Math.random() * 60);
      }

      // Transition Logic
      if (!isDeleting && displayText === fullText) {
        setTypingSpeed(2000); // Wait at the end of phrase
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
        setTypingSpeed(500); // Brief pause before next phrase
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, suggestions, typingSpeed]);

  // Cursor Blinking Logic (only blinks when not typing)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const springConfig = {
    type: 'spring',
    stiffness: 400,
    damping: 40,
    mass: 1
  };

  return (
    <motion.div 
      layout
      layoutId="search-console-container"
      transition={springConfig}
      className={`w-full max-w-4xl px-6 mx-auto ${stickyBottom ? 'absolute bottom-8 inset-x-0 z-50' : 'relative mt-2'}`}
    >
      <motion.form 
        layout
        layoutId="search-console-form"
        onSubmit={handleSearchSubmit}
        animate={{
          boxShadow: isAi 
            ? '0 30px 60px -15px rgba(79, 70, 229, 0.25)'
            : '0 30px 60px -15px rgba(0,0,0,0.1)',
          borderColor: isAi ? '#4f46e5' : '#cbd5e1',
          opacity: 1
        }}
        className="relative flex items-center p-2 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 transition-colors duration-500"
      >
        <BorderBeam 
          size={isAi ? 400 : 250} 
          duration={isAi ? 8 : 15} 
          colorFrom={isAi ? "#4f46e5" : "#94a3b8"} 
          borderRadius={28}
          borderWidth={isAi ? 2 : 1}
          className={isAi ? "opacity-100" : "opacity-30"}
        />
        
        <div className="flex bg-slate-100 dark:bg-slate-800/80 rounded-[20px] p-1.5 shrink-0 w-[180px] relative h-14 items-center border border-slate-200 dark:border-white/5 font-sans">
          <motion.div 
            animate={{ x: searchMode === 'Search' ? 0 : 84 }}
            transition={springConfig}
            className="absolute top-1.5 bottom-1.5 w-[84px] bg-white dark:bg-slate-950 rounded-[14px] shadow-sm z-0 border border-slate-200 dark:border-white/10"
          />
          <button 
            type="button"
            onClick={() => setSearchMode('Search')}
            className={`relative z-10 flex-1 h-full text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${searchMode === 'Search' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Search
          </button>
          <button 
            type="button"
            onClick={() => setSearchMode('AskAI')}
            className={`relative z-10 flex-1 h-full text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${searchMode === 'AskAI' ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Ask AI
          </button>
        </div>

        <div className="flex-1 flex items-center h-14 ml-2 font-sans relative overflow-hidden">
          <input 
            className="flex-1 bg-transparent border-none px-4 text-[16px] font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-0 h-full relative z-10"
            placeholder={!query ? `${displayText}${showCursor ? '|' : ' '}` : ''}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          type="submit"
          className={`h-14 px-8 rounded-[20px] flex items-center gap-3 transition-all disabled:opacity-30 disabled:pointer-events-none group shrink-0 font-sans ${
            isAi 
            ? 'bg-primary shadow-xl hover:bg-slate-950 dark:hover:bg-slate-700' 
            : 'bg-slate-900 dark:bg-slate-800 hover:bg-primary dark:hover:bg-primary shadow-lg'
          }`}
          disabled={!query.trim() && !isProcessing}
        >
          <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
            {isProcessing ? 'Thinking' : (searchMode === 'Search' ? 'Execute' : 'Synthesize')}
          </span>
          {!isProcessing && (
            <motion.span 
              animate={isAi ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 3 }}
              className="material-symbols-outlined text-[20px] text-white/80 group-hover:text-white transition-colors"
            >
              {searchMode === 'Search' ? 'bolt' : 'auto_awesome'}
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
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
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
    { name: 'All', icon: 'grid_view' },
    { name: 'PDF', icon: 'picture_as_pdf' },
    { name: 'DOCX', icon: 'article' },
    { name: 'SQL', icon: 'database' }
  ];

  const handleSetSearchMode = (mode: 'Search' | 'AskAI') => {
    setSearchMode(mode);
    setDocResults(null);
    if (mode === 'Search') setChatHistory([]);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full relative bg-workspace-bg dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ opacity: isFocusMode ? 0.2 : 0.5 }}
          className="absolute inset-0 fine-dotted-mesh text-slate-400/80 dark:text-slate-800/60 hero-mask"
        />
        
        <motion.div 
          animate={{ opacity: isFocusMode ? 0.1 : 0.4 }}
          className="absolute inset-0 hero-mask bg-gradient-to-b from-primary/5 to-transparent"
        />
        <motion.div 
          animate={{ 
            top: isFocusMode ? '0%' : '15%',
            opacity: isFocusMode ? 0.1 : 0.6
          }}
          className="absolute left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-primary/10 blur-[150px] rounded-full"
        />
      </div>

      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto relative z-10 px-6 overflow-hidden">
        <motion.div 
          layout
          className={`flex-1 flex flex-col relative ${isConversationActive ? 'pt-8' : 'pt-24'}`}
        >
          <AnimatePresence mode="wait">
            {!isFocusMode && (
              <motion.div 
                key="hero-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-20 relative"
              >
                <h1 className="text-[64px] lg:text-[104px] font-extrabold tracking-[-0.04em] font-display leading-[0.85] select-none">
                  <span className="text-shimmer">Search </span>
                  <span className="relative inline-block group cursor-default">
                    <span className="text-slate-300 dark:text-slate-800 transition-all duration-700 group-hover:text-primary group-hover:blur-0 blur-[3px] dark:group-hover:text-white">without</span>
                    <motion.div className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <br/>
                  <span className="text-shimmer relative inline-block mt-3">
                    boundaries
                    <span className="text-primary">.</span>
                  </span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-10 flex flex-col items-center font-sans"
                >
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] max-w-lg mx-auto leading-relaxed">
                    Intelligence Mesh <span className="text-slate-300 dark:text-slate-700">/</span> v4.0.22
                  </p>
                  <div className="h-10 w-px bg-gradient-to-b from-primary/30 to-transparent mt-6" />
                </motion.div>
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
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mt-10"
            >
              <div className="flex bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-1 rounded-[18px] border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden scale-95 font-sans">
                {filters.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => {
                      setActiveFilter(f.name);
                      if (query) performDocSearch();
                    }}
                    className={`relative px-5 py-2.5 rounded-[14px] flex items-center gap-2 transition-all group z-10`}
                  >
                    {activeFilter === f.name && (
                      <motion.div
                        layoutId="filter-active-pill"
                        transition={{ type: 'spring', stiffness: 500, damping: 50 }}
                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 shadow-[0_0_0_1px_rgba(79,70,229,0.15)] rounded-[14px]"
                      />
                    )}
                    
                    <span className={`material-symbols-outlined text-[18px] relative z-20 transition-all duration-500 ${activeFilter === f.name ? 'text-primary font-bold' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'}`}>
                      {f.icon}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] relative z-20 transition-all duration-500 ${activeFilter === f.name ? 'text-primary' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                      {f.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className={`mt-12 space-y-6 overflow-y-auto custom-scrollbar flex-1 px-2 ${isConversationActive ? 'pb-40' : 'pb-24'} font-sans`}>
            {searchMode === 'AskAI' && chatHistory.map((msg, i) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 dark:bg-primary/20 dark:border dark:border-primary/20 text-white p-6 rounded-[28px] rounded-tr-none shadow-xl border border-slate-950' 
                  : 'flex gap-5'
                }`}>
                  {msg.role === 'assistant' ? (
                    <>
                      <div className="size-11 rounded-2xl bg-primary text-white flex items-center justify-center border border-primary/20 shrink-0 self-start shadow-xl">
                         <span className="material-symbols-outlined text-2xl font-bold">auto_awesome</span>
                      </div>
                      <div className="space-y-4 flex-1">
                        <div className="p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[28px] rounded-tl-none shadow-sm text-slate-800 dark:text-slate-200">
                          <p className="text-[15px] font-medium leading-relaxed">{msg.text}</p>
                        </div>
                        {msg.sources && (
                          <div className="flex flex-wrap gap-3 pt-1">
                            {msg.sources.map((s, idx) => (
                              <motion.div 
                                whileHover={{ scale: 1.02, y: -2 }}
                                key={idx} 
                                onClick={() => navigate('/documents/d1')}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-950 dark:text-white shadow-sm flex items-center gap-2.5 cursor-pointer hover:border-primary hover:text-primary transition-all"
                              >
                                <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                                {s.title}
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-[15px] font-medium tracking-tight leading-relaxed">{msg.text}</p>
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
                  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                }}
                className="grid grid-cols-1 gap-4 max-w-3xl mx-auto w-full"
              >
                 {docResults.length > 0 ? docResults.map(doc => (
                   <motion.div 
                     variants={{
                       hidden: { opacity: 0, x: -10 },
                       visible: { opacity: 1, x: 0 }
                     }}
                     key={doc.id} 
                     onClick={() => navigate(`/documents/${doc.id}`)}
                     className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 cursor-pointer group flex items-center gap-5 shadow-sm"
                   >
                      <div className="size-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary transition-all duration-500 border border-slate-100 dark:border-white/5">
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors text-3xl">
                          {doc.type === 'PDF' ? 'picture_as_pdf' : doc.type === 'SQL' ? 'database' : 'article'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-bold text-slate-950 dark:text-white uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{doc.name}</h4>
                        <div className="flex items-center gap-4 mt-2.5">
                           <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/10">{doc.type}</span>
                           <span className="text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{doc.lastUpdated}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 group-hover:text-primary group-hover:translate-x-1.5 transition-all text-sm">arrow_forward_ios</span>
                   </motion.div>
                 )) : (
                   <div className="text-center py-24">
                     <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-800 mb-6">search_off</span>
                     <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[13px]">Null result at current mesh node</p>
                   </div>
                 )}
              </motion.div>
            )}

            {isProcessing && (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center gap-5 text-primary">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="size-10 rounded-full border-[3.5px] border-primary border-t-transparent shadow-lg shadow-primary/10"
                  />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] animate-pulse">Syncing Neural Context</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <AnimatePresence>
            {isConversationActive && (
              <motion.div
                key="sticky-console"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute bottom-0 inset-x-0 p-8 pt-20 bg-gradient-to-t from-workspace-bg dark:from-slate-950 via-workspace-bg/95 dark:via-slate-950/95 to-transparent z-50 pointer-events-none"
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
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isFocusMode ? 0.3 : 0.9, y: 0 }}
        whileHover={{ opacity: 1 }}
        className="fixed bottom-8 right-8 z-[100] flex items-center gap-6 group transition-opacity"
      >
        <AnimatedThemeToggler />
        <FlipClock time={currentTime} />
      </motion.div>
    </div>
  );
};

export default Home;
