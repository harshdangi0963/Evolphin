
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Particles } from '../components/ui/Particles';

const History: React.FC = () => {
  const navigate = useNavigate();

  const silkyTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 transition-colors duration-500 h-full relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 hero-mask opacity-30 dark:opacity-10" />
      </div>

      <header className="px-8 py-5 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={silkyTransition}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 w-fit">
            <span className="material-symbols-outlined text-[12px] font-bold">history</span>
            Temporal Ledger
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-tight">
            Version <span className="text-slate-300 dark:text-slate-700">/</span> <span className="text-primary/40">History</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold text-[13px] max-w-lg leading-snug">
            Audit structural evolution with bit-perfect precision.
          </p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={silkyTransition}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-3 bg-slate-950 dark:bg-white dark:text-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-3 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-lg">settings_backup_restore</span>
          Rollback to Node
        </motion.button>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <aside className="w-72 border-r border-slate-100 dark:border-white/5 flex flex-col bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-sm overflow-hidden">
           <div className="p-5 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-slate-900/60">
             <div className="flex items-center justify-between mb-3">
               <h1 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Stream</h1>
               <span className="text-[7px] bg-primary/10 px-1.5 py-0.5 rounded font-black text-primary uppercase">12 Nodes</span>
             </div>
             <div className="relative">
               <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base">search</span>
               <input className="w-full h-9 bg-slate-100/50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg px-9 text-[11px] font-bold text-slate-900 dark:text-white focus:ring-0 focus:border-primary transition-all" placeholder="Search snapshot..." />
             </div>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
             <motion.div 
               initial={{ x: -10, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.1, ...silkyTransition }}
               className="group flex flex-col gap-1.5 p-4 rounded-[20px] bg-white dark:bg-slate-900 border border-primary shadow-lg shadow-primary/5 cursor-pointer relative"
             >
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                   <p className="text-[10px] font-black text-slate-950 dark:text-white uppercase tracking-tight">Active State</p>
                 </div>
                 <span className="text-[7px] text-primary font-black uppercase tracking-widest">Now</span>
               </div>
               <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold leading-tight">System synchronization...</p>
             </motion.div>

             {[1, 2, 3, 4].map(i => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, x: -5 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 + (i * 0.05), ...silkyTransition }}
                 className="group flex flex-col gap-1.5 p-4 rounded-[20px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-none cursor-pointer transition-all"
               >
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[14px] text-slate-400 group-hover:text-primary transition-colors">schedule</span>
                     <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{i * 2}h ago</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 mt-0.5">
                   <div className="size-4 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                     <img src={`https://picsum.photos/seed/user${i}/32/32`} className="w-full h-full object-cover grayscale" />
                   </div>
                   <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold">Metadata Sync</p>
                 </div>
               </motion.div>
             ))}
           </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950">
          <div className="flex flex-wrap items-center justify-between px-8 py-4 bg-white/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-md bg-primary/5 dark:bg-primary/10 text-primary text-[9px] font-black uppercase tracking-tight border border-primary/10 dark:border-primary/20">Active Node</span>
              <span className="material-symbols-outlined text-slate-200 dark:text-slate-700 text-sm">arrow_right_alt</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-tight border border-slate-100 dark:border-white/5">Snapshot 0412</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[8px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/20">
                 <span className="material-symbols-outlined text-xs">add</span>
                 420 Lines
               </div>
               <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 rounded-lg text-[8px] font-black uppercase tracking-widest border border-rose-100 dark:border-rose-900/20">
                 <span className="material-symbols-outlined text-xs">remove</span>
                 12 Blocks
               </div>
            </div>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-slate-50/30 dark:bg-slate-900/10 border-r border-slate-100 dark:border-white/5 p-12 custom-scrollbar">
              <div className="max-w-xl mx-auto space-y-6 opacity-40 grayscale pointer-events-none">
                <div className="inline-flex items-center gap-2 text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em] pb-3 border-b border-slate-200 dark:border-slate-800 w-full mb-3">
                  Legacy (0412)
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">The Future of Neural Networks</h1>
                <p className="text-[13px] font-bold leading-relaxed text-slate-600 dark:text-slate-400">
                   Large language models significantly altered how we approach knowledge management.
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 p-12 custom-scrollbar transition-colors">
               <div className="max-w-xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.25em] pb-3 border-b border-slate-100 dark:border-white/5 w-full mb-3">
                  Active (Current)
                </div>
                <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-none">The Future of Neural <span className="text-primary">Intelligence</span></h1>
                <p className="text-[13px] font-bold leading-relaxed text-slate-800 dark:text-slate-300">
                   Large language models significantly altered how we approach <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-1 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30 font-black">collaborative</span> knowledge management.
                </p>
                <div className="relative pt-2">
                  <div className="absolute left-[-1.5rem] top-0 bottom-0 w-1 bg-emerald-400 dark:bg-emerald-600 rounded-full" />
                  <p className="text-[13px] font-bold leading-relaxed text-slate-900 dark:text-white bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm">
                    By implementing a <span className="text-primary">distributed caching layer</span>, we reduced latency by 85%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
