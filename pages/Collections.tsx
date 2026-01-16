
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_COLLECTIONS } from '../constants';

const Collections: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      <header className="px-8 py-5 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 w-fit">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
            Intelligence Mesh Active
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-tight">
            Collections <span className="text-slate-300 dark:text-slate-700">/</span> <span className="text-primary/40">Workspaces</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold text-[13px] max-w-lg leading-snug">
            Knowledge silos organized by neural relevance and project affinity.
          </p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/collections/new')}
          className="px-5 py-3 bg-slate-950 dark:bg-white dark:text-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-3 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Create Workspace
        </motion.button>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-auto p-8 relative z-10 custom-scrollbar"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
          {MOCK_COLLECTIONS.map((col) => (
            <motion.div 
              key={col.id}
              variants={itemVariants}
              onClick={() => navigate(`/collections/${col.id}`)}
              className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-6 rounded-[28px] hover:border-primary/20 dark:hover:border-primary/40 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] transition-all cursor-pointer overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="size-14 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary/5 dark:group-hover:bg-primary/10 group-hover:border-primary/10 transition-all duration-500">
                    <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform duration-500">{col.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm ring-2 ring-emerald-50 dark:ring-emerald-900/20"></div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border transition-colors ${
                    col.visibility === 'Public' 
                    ? 'bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/20' 
                    : 'bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary border-primary/10 dark:border-primary/20'
                  }`}>
                    {col.visibility}
                  </span>
                  <span className="text-[8px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-tight">Act v.4.0</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5 tracking-tight group-hover:text-primary transition-colors">{col.name}</h3>
                <p className="text-[12px] text-slate-400 dark:text-slate-500 font-bold leading-relaxed mb-6 line-clamp-2">
                  Distributed records for {col.name.toLowerCase()} operations.
                </p>
              </div>

              <div className="pt-5 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                     <span className="text-xs font-black text-slate-900 dark:text-white">{col.itemCount}</span>
                     <span className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Docs</span>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 60 + 20}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                
                <div className="flex -space-x-2.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="size-7 rounded-lg border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-sm">
                       <img src={`https://picsum.photos/seed/col${col.id}${i}/32/32`} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-3 right-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                 <div className="size-7 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-[14px] font-bold">arrow_forward</span>
                 </div>
              </div>
            </motion.div>
          ))}
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.01, borderColor: '#6366f1' }}
            onClick={() => navigate('/collections/new')}
            className="border-2 border-dashed border-slate-100 dark:border-white/10 rounded-[28px] flex flex-col items-center justify-center p-6 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group min-h-[220px]"
          >
            <div className="size-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm border border-slate-100 dark:border-white/5">
              <span className="material-symbols-outlined text-2xl group-hover:text-white transition-colors">add_task</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">Provision Node</span>
          </motion.button>
        </div>

        <footer className="mt-4 border-t border-slate-100 dark:border-white/5 pt-6 flex items-center justify-between pb-8">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Assets</span>
              <span className="text-base font-black text-slate-900 dark:text-white leading-none mt-1">12.4k</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Storage</span>
              <span className="text-base font-black text-slate-900 dark:text-white leading-none mt-1">84%</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/20">Synchronized</span>
        </footer>
      </motion.div>
    </div>
  );
};

export default Collections;
