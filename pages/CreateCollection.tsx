
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCollection: React.FC = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState('Private');

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-full">
      <header className="h-16 flex items-center justify-between px-8 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border-light">
        <nav className="flex items-center gap-2 text-sm font-medium">
          <button onClick={() => navigate('/collections')} className="text-text-muted hover:text-text-main">Collections</button>
          <span className="material-symbols-outlined text-text-muted text-sm">chevron_right</span>
          <span className="text-text-main">New Collection</span>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="h-9 px-4 text-sm font-semibold text-text-main bg-white border border-border-light rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Discard
          </button>
          <button className="h-9 px-4 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Create Collection
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-10 px-8 pb-32 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden mb-8">
          <div className="relative w-full h-48 bg-slate-50 group border-b border-border-light">
            <div className="w-full h-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-100 transition-all">
              <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-text-main transition-colors">
                <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Upload Cover Photo</span>
              </div>
            </div>
            <div className="absolute -bottom-10 left-8">
              <div className="size-24 rounded-full bg-white p-1 shadow-2xl group/avatar cursor-pointer">
                <div className="w-full h-full rounded-full bg-slate-100 border border-border-light flex items-center justify-center overflow-hidden hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-text-muted group-hover/avatar:text-text-main text-2xl">photo_camera</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-10 px-10 space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Collection Name</label>
                <input 
                  className="w-full text-3xl font-extrabold border-b border-border-light focus:border-primary border-t-0 border-l-0 border-r-0 rounded-none px-0 py-2 focus:ring-0 placeholder:text-slate-200 text-text-main tracking-tight bg-transparent" 
                  placeholder="Name your knowledge base..." 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Description</label>
                <textarea 
                  className="w-full text-sm font-medium border border-border-light rounded-xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300 text-text-main min-h-[100px] resize-none" 
                  placeholder="What is this collection about?"
                ></textarea>
              </div>
            </div>

            <div className="pt-4 border-t border-border-light">
              <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4">Collection Visibility</h3>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-border-light">
                {['Private', 'Shared', 'Public'].map(v => (
                  <button 
                    key={v}
                    onClick={() => setVisibility(v)}
                    className={`h-9 px-6 text-xs rounded-lg flex items-center gap-2 transition-all font-bold uppercase tracking-tight ${visibility === v ? 'bg-white text-text-main shadow-sm border border-border-light' : 'text-text-muted hover:text-text-main border-transparent'}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{v === 'Private' ? 'lock' : v === 'Shared' ? 'group' : 'public'}</span>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Personality Config Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100 space-y-6 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 pointer-events-none group-hover:scale-[1.7] transition-transform duration-500">
             <span className="material-symbols-outlined text-9xl text-accent-ai">auto_awesome</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent-ai flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="material-symbols-outlined text-white text-[22px]">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-text-main tracking-tight">AI Assistant Personality</h3>
              <p className="text-[10px] text-accent-ai font-bold uppercase tracking-wider">Configure how Nexus interacts with this data</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex justify-between">
              System Prompt Instructions
              <span className="normal-case font-medium text-indigo-400">Contextual behavior control</span>
            </label>
            <textarea 
              className="w-full bg-slate-50 border border-indigo-100 rounded-xl p-4 text-sm font-medium focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all placeholder:text-slate-300" 
              placeholder="e.g. You are a senior research scientist. Summarize results in bullet points with technical precision." 
              rows={3}
            ></textarea>
          </div>
        </section>

        {/* Initial Knowledge Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 border border-border-light space-y-6">
          <div>
            <h3 className="text-base font-extrabold text-text-main tracking-tight">Initial Knowledge Base</h3>
            <p className="text-xs text-text-muted mt-1 font-medium">Jumpstart this collection by importing documents.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {[
               { icon: 'upload_file', label: 'Computer', sub: 'PDF, DOCX, MD' },
               { icon: 'add_to_drive', label: 'Google Drive', sub: 'Cloud Sync' },
               { icon: 'cloud_download', label: 'OneDrive', sub: 'Microsoft 365' }
             ].map(source => (
               <button key={source.label} className="p-6 rounded-xl border border-border-light hover:border-primary/40 hover:bg-slate-50 transition-all group flex flex-col items-center text-center gap-3">
                  <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center border border-border-light group-hover:bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-2xl">{source.icon}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-text-main">{source.label}</span>
                    <span className="text-[10px] text-text-muted uppercase font-bold tracking-tight">{source.sub}</span>
                  </div>
               </button>
             ))}
          </div>
        </section>
      </div>

      <footer className="sticky bottom-0 left-0 right-0 py-5 px-10 border-t border-border-light bg-white/80 backdrop-blur-md flex items-center justify-between z-40 mt-auto">
        <div className="flex items-center gap-8 text-[10px] font-bold text-text-muted uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 rounded border border-border-light bg-slate-50 text-text-main shadow-sm">CMD S</kbd>
            <span>Save Draft</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 rounded border border-border-light bg-slate-50 text-text-main shadow-sm">ESC</kbd>
            <span>Close</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          Changes synced locally
        </div>
      </footer>
    </div>
  );
};

export default CreateCollection;
