
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS } from '../constants';

const Collections: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-10 bg-slate-50 min-h-full">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main">Collections</h1>
          <p className="text-text-muted mt-2 font-medium">Browse organized knowledge bases for your team.</p>
        </div>
        <button 
          onClick={() => navigate('/collections/new')}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Collection
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COLLECTIONS.map((col) => (
          <div 
            key={col.id}
            onClick={() => navigate(`/collections/${col.id}`)}
            className="group relative bg-white border border-border-light p-8 rounded-2xl hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/10 group-hover:bg-primary transition-colors"></div>
            <div className="flex items-start justify-between mb-8">
              <div className="size-14 rounded-2xl bg-slate-50 border border-border-light flex items-center justify-center text-text-main group-hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined text-3xl">{col.icon}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${col.visibility === 'Public' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {col.visibility}
                </span>
                <span className="text-[10px] text-text-muted mt-2 font-bold uppercase tracking-tight">Updated 2h ago</span>
              </div>
            </div>
            
            <h3 className="text-xl font-extrabold text-text-main mb-2 tracking-tight">{col.name}</h3>
            <p className="text-sm text-text-muted mb-6 leading-relaxed">
              Knowledge base containing centralized information for {col.name.toLowerCase()}.
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-main">{col.itemCount} Documents</span>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="size-6 rounded-full border-2 border-white bg-slate-200"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => navigate('/collections/new')}
          className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-text-muted hover:border-primary/40 hover:bg-white hover:text-primary transition-all group"
        >
          <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Create New</span>
        </button>
      </div>
    </div>
  );
};

export default Collections;
