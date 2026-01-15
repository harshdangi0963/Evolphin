
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCollection: React.FC = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState('Private');

  return (
    <div className="flex-1 flex flex-col bg-bg min-h-full">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-edge shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => navigate('/collections')} className="text-content-muted hover:text-content transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Collections
          </button>
          <span className="text-edge">/</span>
          <span className="text-content font-medium">New</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">
            <span className="material-symbols-outlined text-base">add</span>
            Create
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-xl mx-auto py-10 px-6 w-full space-y-8">
        {/* Basic Info */}
        <section className="space-y-5">
          <div>
            <label className="text-sm font-medium text-content block mb-1.5">Name</label>
            <input className="input" placeholder="Collection name" type="text" />
          </div>

          <div>
            <label className="text-sm font-medium text-content block mb-1.5">Description</label>
            <textarea
              className="input min-h-[80px] py-3 resize-none"
              placeholder="What is this collection about?"
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-medium text-content block mb-2">Visibility</label>
            <div className="flex p-1 bg-bg-muted rounded-lg w-fit border border-edge">
              {['Private', 'Shared', 'Public'].map(v => (
                <button
                  key={v}
                  onClick={() => setVisibility(v)}
                  className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${visibility === v ? 'bg-bg-elevated text-content' : 'text-content-muted hover:text-content'
                    }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* AI Section */}
        <section className="p-5 bg-accent/5 border border-accent/20 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-bg text-base">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-content">AI Configuration</h3>
              <p className="text-xs text-content-muted">Optional system instructions</p>
            </div>
          </div>

          <textarea
            className="input min-h-[80px] py-3 resize-none bg-bg-elevated border-accent/20 focus:border-accent"
            placeholder="e.g. You are a technical writer. Be concise..."
          ></textarea>
        </section>

        {/* Upload */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-content">Add Documents</h3>

          <button className="w-full p-6 border-2 border-dashed border-edge rounded-xl flex flex-col items-center text-center gap-3 hover:border-accent/40 hover:bg-accent/5 transition-all group">
            <div className="size-12 rounded-xl bg-bg-muted flex items-center justify-center text-content-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
              <span className="material-symbols-outlined text-2xl">upload_file</span>
            </div>
            <div>
              <p className="text-sm font-medium text-content">Upload files</p>
              <p className="text-xs text-content-muted">PDF, DOCX, MD, TXT</p>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default CreateCollection;
