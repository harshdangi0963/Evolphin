
import React from 'react';
import { useNavigate } from 'react-router-dom';

const History: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white h-full overflow-hidden">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 py-3 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="size-6 text-primary">
              <span className="material-symbols-outlined">history</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Version History</h2>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
          <div className="hidden lg:flex items-center gap-6">
            <a className="text-sm font-medium leading-normal hover:text-primary transition-colors text-slate-600" href="#">Documents</a>
            <a className="text-sm font-medium leading-normal hover:text-primary transition-colors text-slate-600" href="#">Drafts</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            <span className="truncate">Restore this Version</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Comparison Metadata */}
        <aside className="w-80 border-r border-slate-200 flex flex-col bg-slate-50 overflow-hidden">
           <div className="p-4 border-b border-slate-200 bg-white">
             <div className="flex items-center justify-between mb-4">
               <h1 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Timeline</h1>
               <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">12 Snapshots</span>
             </div>
             <div className="relative">
               <input className="w-full h-9 bg-slate-100 rounded-lg border-none px-4 text-sm focus:ring-0" placeholder="Filter history..." />
             </div>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
             <div className="group flex flex-col gap-1 px-3 py-3 rounded-xl bg-primary/5 border border-primary/10 cursor-pointer relative shadow-sm">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"></div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-[18px] text-primary">history</span>
                   <p className="text-sm font-bold text-slate-900">Current Draft</p>
                 </div>
                 <span className="text-[10px] text-primary font-bold uppercase">Active</span>
               </div>
               <p className="text-xs text-slate-500 pl-7 italic">Editing now...</p>
             </div>
             {[1, 2, 3].map(i => (
               <div key={i} className="group flex flex-col gap-1 px-3 py-3 rounded-xl hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[18px] text-slate-400">schedule</span>
                     <p className="text-sm font-medium text-slate-700">{i * 2} hours ago</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 pl-7 mt-1">
                   <div className="size-4 rounded-full bg-slate-300"></div>
                   <p className="text-xs text-slate-500">User: Minor update</p>
                 </div>
               </div>
             ))}
           </div>
        </aside>

        {/* Diff Viewer Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm">Comparison: </span>
              <span className="text-primary text-sm font-bold">Today 10:42 AM</span>
              <span className="text-slate-400 text-sm">vs</span>
              <span className="text-slate-500 text-sm font-medium">Oct 12, 2023</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">+420 words</div>
               <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-100">-12 lines</div>
            </div>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-slate-50/50 border-r border-slate-200 p-12">
              <div className="max-w-2xl mx-auto space-y-6 opacity-60 grayscale">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold border-b border-slate-200 pb-2 block mb-8">Previous Version (Oct 12)</span>
                <h1 className="text-3xl font-bold text-slate-800">The Future of Neural Networks</h1>
                <p className="leading-relaxed text-slate-600">
                   The introduction of large language models has significantly altered how we approach knowledge management. In the early stages, users were focused on simple storage.
                </p>
                <p className="leading-relaxed bg-red-50 text-red-800 line-through p-1 rounded">
                   One major challenge was the latency in retrieving vector embeddings for high-dimensional semantic search.
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-white p-12">
               <div className="max-w-2xl mx-auto space-y-6">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold border-b border-slate-200 pb-2 block mb-8">Selected Snapshot (Current)</span>
                <h1 className="text-3xl font-bold text-slate-900">The Future of Neural Networks & Knowledge Flows</h1>
                <p className="leading-relaxed text-slate-800">
                   The introduction of large language models has significantly altered how we approach <span className="bg-green-50 text-green-800 font-bold px-1 rounded">collaborative</span> knowledge management.
                </p>
                <p className="leading-relaxed text-slate-800">
                   By implementing a distributed caching layer, we reduced latency by 85%, ensuring that semantic search feels instantaneous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
