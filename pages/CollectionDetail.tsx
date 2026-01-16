
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_COLLECTIONS, MOCK_DOCS, MOCK_ACTIVITIES } from '../constants';

const CollectionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const collection = MOCK_COLLECTIONS.find(c => c.id === id) || MOCK_COLLECTIONS[0];

  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<'local' | 'drive' | 'onedrive' | 'dropbox' | 'nexus'>('local');

  const cloudSources = [
    { id: 'drive', name: 'Google Drive', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', color: '#4285F4' },
    { id: 'onedrive', name: 'OneDrive', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Microsoft_Office_OneDrive_logo_%282019%E2%80%93present%29.svg', color: '#0078d4' },
    { id: 'dropbox', name: 'Dropbox', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg', color: '#0061FF' },
    { id: 'nexus', name: 'Nexus Node', icon: 'blur_on', isMaterial: true, color: '#4f46e5' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-workspace-bg dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      {/* Header with Cover */}
      <div className="relative w-full">
        <div className="h-64 w-full bg-slate-900 relative">
          <img 
            alt="Cover" 
            className="w-full h-full object-cover opacity-60" 
            src={`https://picsum.photos/seed/${id}/1200/400`} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-workspace-bg dark:from-slate-950 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-16 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-8">
               <div className="flex items-center gap-2 text-white/70 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-3">
                <span className="hover:text-white cursor-pointer" onClick={() => navigate('/collections')}>Collections</span>
                <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
                <span>Workspace</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full px-8 relative z-20">
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
            <div className="size-32 rounded-3xl bg-white dark:bg-slate-900 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none flex-shrink-0 group transition-transform hover:scale-[1.02] border border-slate-300 dark:border-white/10">
              <div className="w-full h-full rounded-2xl bg-slate-800 dark:bg-slate-800 flex items-center justify-center text-white border border-slate-700 dark:border-white/10">
                <span className="material-symbols-outlined text-5xl group-hover:scale-110 transition-transform">{collection.icon}</span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full pb-4 gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tighter drop-shadow-sm leading-none">{collection.name}</h1>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-400 flex items-center justify-center md:justify-start gap-2">
                  <span className="material-symbols-outlined text-lg">public</span>
                  {collection.visibility} Workspace • {collection.itemCount} Documents
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-6 h-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-2xl text-slate-950 dark:text-white text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 group">
                  <span className="material-symbols-outlined text-[20px] text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">share</span>
                  Share
                </button>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsAddDocModalOpen(true)}
                  className="px-6 py-3 bg-slate-950 dark:bg-white dark:text-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  Add Document
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto w-full px-8 pt-12 pb-24 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-[0.25em]">Central Repository</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">search</span>
                <input 
                  type="text" 
                  placeholder="Filter assets..." 
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-8 focus:ring-primary/5 focus:border-primary w-48 transition-all focus:w-64"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-300 dark:border-white/5">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-widest">Asset Name</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-widest">Metadata</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-widest">Stakeholder</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-widest text-right">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {MOCK_DOCS.map(doc => (
                  <tr 
                    key={doc.id}
                    onClick={() => navigate(`/documents/${doc.id}`)}
                    className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-[20px]">article</span>
                        </div>
                        <span className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-primary transition-colors">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/5 text-[9px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-tighter">{doc.type}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/5 overflow-hidden">
                          <img src={`https://picsum.photos/seed/${doc.owner}/40/40`} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                        <span className="text-xs text-slate-950 dark:text-slate-300 font-bold">{doc.owner}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[11px] text-slate-600 dark:text-slate-500 text-right font-bold uppercase tracking-tight">{doc.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/5 rounded-[2.5rem] space-y-6 shadow-sm">
            <h2 className="text-[10px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-[0.25em]">Collection Intelligence</h2>
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl">
                 <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-400 font-bold">
                   <span className="text-primary uppercase tracking-widest text-[10px]">Neural Scan:</span> This collection has seen a <span className="text-emerald-600 dark:text-emerald-400">12% increase</span> in activity. Product Roadmap 2024 is the primary node.
                 </p>
              </div>
              <button className="w-full py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[11px] font-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                Synthesize Insights
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Document Modal */}
      <AnimatePresence>
        {isAddDocModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-2xl" 
              onClick={() => setIsAddDocModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl border border-slate-300 dark:border-white/10 overflow-hidden relative z-10 p-0"
            >
              <div className="p-8 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-2xl font-bold">add_task</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight leading-none">Add Document</h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest mt-1.5">Ingest new knowledge node into workspace</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAddDocModalOpen(false)}
                  className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Source Selection */}
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-400 ml-1">Knowledge Source</label>
                   <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <button 
                        onClick={() => setSelectedSource('local')}
                        className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${selectedSource === 'local' ? 'bg-primary/5 border-primary text-primary shadow-inner' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-400'}`}
                      >
                        <span className="material-symbols-outlined text-2xl">upload_file</span>
                        <span className="text-[9px] font-black uppercase">Local</span>
                      </button>
                      {cloudSources.map(source => (
                        <button 
                          key={source.id}
                          onClick={() => setSelectedSource(source.id as any)}
                          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${selectedSource === source.id ? 'bg-primary/5 border-primary shadow-inner' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-400'}`}
                        >
                          {source.isMaterial ? (
                            <span className="material-symbols-outlined text-2xl" style={{ color: selectedSource === source.id ? source.color : 'inherit' }}>{source.icon}</span>
                          ) : (
                            <img src={source.icon} className="size-6 object-contain" alt={source.name} />
                          )}
                          <span className="text-[9px] font-black uppercase">{source.name.split(' ')[0]}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {selectedSource === 'local' ? (
                      <div className="w-full h-48 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary transition-all">
                        <div className="size-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                          <span className="material-symbols-outlined text-3xl">upload</span>
                        </div>
                        <div className="text-center">
                          <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Drop files here</p>
                          <p className="text-[9px] font-bold text-slate-500 mt-1">PDF, DOCX, SQL (Max 20MB)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                         <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center gap-4 text-center">
                            <img src={cloudSources.find(s => s.id === selectedSource)?.icon} className="size-16" alt="" />
                            <div>
                               <p className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-widest">Connect to {cloudSources.find(s => s.id === selectedSource)?.name}</p>
                               <p className="text-[10px] font-bold text-slate-500 mt-1 leading-relaxed">Authorize Nexus KM to access your documents for neural indexing.</p>
                            </div>
                            <button className="px-6 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-primary transition-all">
                               Authorize Connection
                            </button>
                         </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-400 ml-1">Document Name</label>
                      <input 
                        className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 focus:ring-8 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-950 dark:text-white transition-all outline-none placeholder:text-slate-400 shadow-sm" 
                        placeholder="Untitled Node" 
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-400 ml-1">Processing Type</label>
                      <select className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 focus:ring-8 focus:ring-primary/5 focus:border-primary text-sm font-bold text-slate-950 dark:text-white transition-all outline-none appearance-none shadow-sm">
                        <option>Full Semantic Index</option>
                        <option>Summary & Entities Only</option>
                        <option>Table Data Extraction</option>
                        <option>OCR (Visual Scan)</option>
                      </select>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary/[0.04] dark:bg-primary/5 border border-primary/20 space-y-4">
                      <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined text-xl">auto_awesome</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">Neural Directives</span>
                      </div>
                      <textarea 
                        className="w-full bg-transparent border-none p-0 text-xs font-bold text-slate-800 dark:text-slate-300 focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-600 h-28 resize-none" 
                        placeholder="Hint the AI on how to interpret this document (e.g. 'This is a legal contract, focus on liabilities and expiry dates')..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-white/5 flex gap-4">
                <button 
                  onClick={() => setIsAddDocModalOpen(false)} 
                  className="flex-1 px-6 py-4 rounded-2xl border border-slate-300 dark:border-white/10 font-black text-[11px] uppercase tracking-[0.2em] text-slate-700 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button className="flex-[2] px-6 py-4 rounded-2xl bg-slate-950 dark:bg-white dark:text-slate-950 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all">
                  Initialize Sync
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionDetail;
