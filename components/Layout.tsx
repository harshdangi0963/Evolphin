
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItems = [
    { name: 'Workspace', path: '/', icon: 'dashboard' },
    { name: 'Collections', path: '/collections', icon: 'folder_open' },
    { name: 'Team', path: '/collaborators', icon: 'groups' },
    { name: 'History', path: '/history', icon: 'history' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-workspace-bg dark:bg-slate-950 font-display transition-colors duration-500">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 78 : 240 }}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 bg-slate-950 border-r border-white/10 flex flex-col lg:relative lg:translate-x-0 overflow-hidden"
      >
        {/* Logo Section */}
        <div className="flex items-center h-20 px-5 shrink-0 overflow-hidden border-b border-white/5">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl font-bold">blur_on</span>
          </motion.div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-4"
              >
                <h1 className="text-[13px] font-black leading-none text-white uppercase tracking-tight whitespace-nowrap">Nexus KM</h1>
                <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-1 whitespace-nowrap">OS.4.0 NEURAL</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2 mt-6 overflow-hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center h-11 px-[10px] rounded-xl transition-all group relative ${
                isActive(item.path)
                  ? 'bg-primary text-white shadow-xl shadow-primary/30 border border-primary/50'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            >
              <div className="size-9 flex items-center justify-center shrink-0">
                <span className={`material-symbols-outlined text-[24px] ${isActive(item.path) ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 text-[13px] font-bold whitespace-nowrap uppercase tracking-tight"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {isCollapsed && (
                 <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[11px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] shadow-2xl translate-x-2 group-hover:translate-x-0 border border-white/20">
                    {item.name}
                 </div>
              )}
            </Link>
          ))}
          
          <div className="h-px bg-white/10 my-8 mx-2"></div>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-white/10 mt-auto bg-slate-900/50">
          <div className="flex items-center h-14 px-1 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group overflow-hidden border border-transparent hover:border-white/10">
            <div className="size-10 rounded-full border-2 border-white/10 p-0.5 overflow-hidden shrink-0 shadow-inner bg-slate-800">
              <img src="https://picsum.photos/seed/user1/64/64" className="w-full h-full object-cover rounded-full" alt="User" />
            </div>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-3 flex-1 flex items-center justify-between"
              >
                <div className="truncate pr-2">
                  <p className="text-[11px] font-black truncate text-white uppercase tracking-tight">Alex Rivera</p>
                  <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-1">Operator</p>
                </div>
                <span className="material-symbols-outlined text-slate-500 text-sm">unfold_more</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-y-auto custom-scrollbar">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-slate-300 dark:border-white/10 flex items-center justify-between px-6 bg-white dark:bg-slate-900 backdrop-blur-md sticky top-0 z-40 transition-colors">
           <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 -ml-2 text-slate-950 dark:text-white">
             <span className="material-symbols-outlined">menu</span>
           </button>
           <h2 className="text-[12px] font-black uppercase tracking-widest dark:text-white">Nexus KM</h2>
           <div className="size-9 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-white/10"></div>
        </div>
        {children}
      </main>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-40 lg:hidden"
        ></motion.div>
      )}
    </div>
  );
};

export default Layout;
