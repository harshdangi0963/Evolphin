
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_COLLECTIONS, MOCK_DOCS, MOCK_ACTIVITIES } from '../constants';

const CollectionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const collection = MOCK_COLLECTIONS.find(c => c.id === id) || MOCK_COLLECTIONS[0];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-x-hidden">
      {/* Header with Cover */}
      <div className="relative w-full">
        {/* Banner Container */}
        <div className="h-64 w-full bg-slate-900 relative">
          <img 
            alt="Cover" 
            className="w-full h-full object-cover opacity-60" 
            src={`https://picsum.photos/seed/${id}/1200/400`} 
          />
          {/* Bottom Gradient for smoother transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          
          {/* Inner Header Content (Breadcrumbs & Title - purely decorative overlap) */}
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
        
        {/* Floating Profile Action Bar */}
        <div className="max-w-7xl mx-auto w-full px-8 relative z-20">
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
            {/* Avatar (DP) - Large overlap */}
            <div className="size-32 rounded-3xl bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex-shrink-0 group transition-transform hover:scale-[1.02]">
              <div className="w-full h-full rounded-2xl bg-slate-800 flex items-center justify-center text-white border border-slate-700">
                <span className="material-symbols-outlined text-5xl group-hover:scale-110 transition-transform">{collection.icon}</span>
              </div>
            </div>
            
            {/* Title and Actions - Cleanly placed on the white shelf */}
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full pb-4 gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-text-main tracking-tighter drop-shadow-sm">{collection.name}</h1>
                <p className="text-sm font-medium text-text-muted flex items-center justify-center md:justify-start gap-2">
                  <span className="material-symbols-outlined text-lg">public</span>
                  {collection.visibility} Workspace • {collection.itemCount} Documents
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-6 h-12 bg-white border border-border-light rounded-2xl text-text-main text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 group">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary transition-colors">share</span>
                  Share
                </button>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 flex items-center gap-3 hover:bg-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Add Document
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto w-full px-8 pt-12 pb-24 grid grid-cols-12 gap-10">
        {/* Main Docs Section */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.25em]">Central Repository</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input 
                  type="text" 
                  placeholder="Filter assets..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/10 w-48 transition-all focus:w-64"
                />
              </div>
              <button className="p-2.5 bg-slate-50 text-text-muted hover:text-text-main rounded-xl transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-border-light rounded-[2rem] overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-border-light">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Asset Name</th>
                  <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Metadata</th>
                  <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Stakeholder</th>
                  <th className="px-8 py-5 text-[10px] font-extrabold text-text-muted uppercase tracking-widest text-right">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_DOCS.map(doc => (
                  <tr 
                    key={doc.id}
                    onClick={() => navigate(`/documents/${doc.id}`)}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-[20px]">article</span>
                        </div>
                        <span className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-md bg-white border border-border-light text-[9px] font-extrabold text-text-muted uppercase tracking-tighter">{doc.type}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-full bg-slate-100 border border-border-light overflow-hidden">
                          <img src={`https://picsum.photos/seed/${doc.owner}/40/40`} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                        <span className="text-xs text-text-main font-bold">{doc.owner}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[11px] text-text-muted text-right font-bold uppercase tracking-tight">{doc.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 bg-slate-50/20 border-t border-border-light flex justify-center">
               <button className="text-[10px] font-extrabold text-text-muted hover:text-text-main transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                 Show More Records
                 <span className="material-symbols-outlined text-sm">expand_more</span>
               </button>
            </div>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="p-8 bg-slate-50/50 border border-border-light rounded-[2.5rem] space-y-6">
            <h2 className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.25em]">Collection Intelligence</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-white border border-border-light rounded-2xl shadow-sm">
                 <p className="text-xs leading-relaxed text-text-muted">
                   <span className="font-bold text-text-main">Neural Scan:</span> This collection has seen a <span className="text-emerald-600 font-bold">12% increase</span> in contributor activity this week. Product Roadmap 2024 is currently the most referenced asset.
                 </p>
              </div>
              <button className="w-full py-3 bg-white border border-border-light rounded-xl text-[11px] font-bold text-text-main hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                Synthesize Insights
              </button>
            </div>

            <div className="pt-6 border-t border-border-light">
              <h3 className="text-[10px] font-extrabold text-text-muted uppercase tracking-[0.2em] mb-6">Live Feed</h3>
              <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border-light">
                {MOCK_ACTIVITIES.map((activity, i) => (
                  <div key={activity.id} className="relative group">
                    <div className={`absolute -left-[23px] top-1 size-3.5 rounded-full border-2 border-white ring-4 ring-white shadow-sm transition-colors ${i === 0 ? 'bg-primary' : 'bg-slate-300 group-hover:bg-primary/50'}`}></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{activity.time}</span>
                      <p className="text-sm text-text-main font-semibold leading-snug">
                        {activity.action === 'uploaded' ? 'New Asset:' : 'Updated:'} <span className="text-primary font-extrabold">{activity.target}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="px-4">
             <button className="w-full py-4 rounded-2xl border border-dashed border-slate-200 text-[10px] font-bold text-text-muted uppercase tracking-widest hover:border-slate-400 hover:text-text-main transition-all flex items-center justify-center gap-2">
               <span className="material-symbols-outlined text-lg">settings</span>
               Collection Settings
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
