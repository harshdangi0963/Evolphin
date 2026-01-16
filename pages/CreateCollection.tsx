
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateCollection: React.FC = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState('Private');

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 min-h-full transition-colors duration-500 overflow-x-hidden">
      {/* Top sticky action bar */}
      <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-30 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-100 dark:border-white/5">
        <nav className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          <button onClick={() => navigate('/collections')} className="hover:text-primary transition-colors">Collections</button>
          <span className="material-symbols-outlined text-[14px] opacity-40">chevron_right</span>
          <span className="text-slate-900 dark:text-white">New Workspace</span>
        </nav>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="h-11 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            Discard
          </button>
          <motion.button 
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="h-11 px-6 bg-slate-950 dark:bg-white dark:text-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-3 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Create Workspace
          </motion.button>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto py-12 px-8 pb-32 w-full space-y-8"
      >
        {/* Main Identity Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
          <div className="relative w-full h-56 bg-slate-100 dark:bg-slate-800 group border-b border-slate-100 dark:border-white/5">
            <div className="w-full h-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all">
              <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Upload Cover Photo</span>
              </div>
            </div>
            
            <div className="absolute -bottom-12 left-10">
              <div className="size-28 rounded-3xl bg-white dark:bg-slate-900 p-1.5 shadow-2xl ring-4 ring-slate-50 dark:ring-slate-950">
                <div className="w-full h-full rounded-[22px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group/avatar cursor-pointer">
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover/avatar:text-primary text-3xl">photo_camera</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-10 space-y-12">
            <div className="space-y-8">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Knowledge Base Name</label>
                <input 
                  className="w-full text-4xl font-black border-none focus:ring-0 px-0 py-2 placeholder:text-slate-200 dark:placeholder:text-slate-800 text-slate-950 dark:text-white tracking-tighter bg-transparent" 
                  placeholder="The Nexus Project..." 
                  type="text"
                />
                <div className="h-px w-full bg-slate-100 dark:bg-white/5"></div>
              </div>
              
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Intelligence Overview</label>
                <textarea 
                  className="w-full text-[13px] font-bold border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 text-slate-800 dark:text-slate-200 min-h-[120px] resize-none outline-none shadow-inner" 
                  placeholder="Define the scope and objectives of this neural workspace..."
                ></textarea>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 dark:border-white/5">
              <h3 className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-5">Access Protocols</h3>
              <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-white/5">
                {['Private', 'Shared', 'Public'].map(v => (
                  <button 
                    key={v}
                    onClick={() => setVisibility(v)}
                    className={`h-11 px-8 text-[10px] rounded-xl flex items-center gap-2 transition-all font-black uppercase tracking-widest ${visibility === v ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-md border border-slate-100 dark:border-white/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{v === 'Private' ? 'lock' : v === 'Shared' ? 'group' : 'public'}</span>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Personality Config Section - Purple Neural Branding */}
        <section className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm p-10 border border-primary/10 dark:border-primary/20 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.04] dark:opacity-[0.02] scale-150 pointer-events-none group-hover:scale-[1.7] transition-transform duration-700">
             <span className="material-symbols-outlined text-[200px] text-primary">blur_on</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-[24px]">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">AI Integration Mode</h3>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.15em] mt-1.5">Configure system response behavior</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] flex justify-between ml-1">
              System Directives
              <span className="normal-case font-bold text-primary/60">Neural context alignment</span>
            </label>
            <textarea 
              className="w-full bg-slate-50 dark:bg-primary/5 border border-primary/10 dark:border-primary/20 rounded-2xl p-5 text-[13px] font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 text-slate-900 dark:text-slate-200 outline-none" 
              placeholder="e.g. You are a senior forensic researcher. Provide exact citations and highlight discrepancies in data patterns." 
              rows={4}
            ></textarea>
          </div>
        </section>

        {/* Knowledge Ingestion */}
        <section className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm p-10 border border-slate-100 dark:border-white/5 space-y-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Provision Knowledge</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-bold">Import initial assets to populate the neural mesh.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
             {[
               { icon: 'upload_file', label: 'Local Disk', sub: 'PDF, DOCX, SQL' },
               { icon: 'add_to_drive', label: 'Google Cloud', sub: 'Neural Sync' },
               { icon: 'cloud_download', label: 'Nexus Node', sub: 'Encrypted Fetch' }
             ].map(source => (
               <button key={source.label} className="p-7 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30 hover:border-primary/30 dark:hover:border-primary/40 hover:bg-white dark:hover:bg-slate-800 transition-all group flex flex-col items-center text-center gap-4">
                  <div className="size-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 group-hover:scale-110 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-primary text-[28px]">{source.icon}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-black text-slate-900 dark:text-white">{source.label}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mt-1">{source.sub}</span>
                  </div>
               </button>
             ))}
          </div>
        </section>
      </motion.div>

      {/* Global Bottom sticky status bar */}
      <footer className="sticky bottom-0 left-0 right-0 py-6 px-10 border-t border-slate-100 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl flex items-center justify-between z-40 mt-auto">
        <div className="flex items-center gap-10 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em]">
          <div className="flex items-center gap-2.5">
            <kbd className="px-2 py-1 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-sans">⌘ S</kbd>
            <span>Auto Save</span>
          </div>
          <div className="flex items-center gap-2.5">
            <kbd className="px-2 py-1 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-sans">ESC</kbd>
            <span>Close Node</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2.5 text-[9px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.2em] bg-emerald-50 dark:bg-emerald-400/5 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-400/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Mesh Synchronized
        </div>
      </footer>
    </div>
  );
};

export default CreateCollection;
