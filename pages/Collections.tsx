
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS } from '../constants';

const Collections: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8 bg-bg min-h-full">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-10">
        <div className="flex justify-between items-center gap-6">
          <div>
            <h1 className="text-heading text-content mb-1">Collections</h1>
            <p className="text-small text-content-secondary">Organize your knowledge bases</p>
          </div>
          <button onClick={() => navigate('/collections/new')} className="btn btn-primary">
            <span className="material-symbols-outlined text-base">add</span>
            New
          </button>
        </div>
      </header>

      {/* Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_COLLECTIONS.map((col, idx) => (
          <button
            key={col.id}
            onClick={() => navigate(`/collections/${col.id}`)}
            style={{ animationDelay: `${idx * 40}ms` }}
            className="group card-interactive p-5 text-left animate-fade-in"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="size-11 rounded-lg bg-bg-muted flex items-center justify-center text-content-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                <span className="material-symbols-outlined text-xl">{col.icon}</span>
              </div>
              <span className={`text-micro px-2 py-1 rounded ${col.visibility === 'Public'
                  ? 'bg-success-bg text-success'
                  : col.visibility === 'Shared'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-bg-muted text-content-muted'
                }`}>
                {col.visibility}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-content mb-1 group-hover:text-accent transition-colors">{col.name}</h3>
            <p className="text-xs text-content-muted">{col.itemCount} items</p>
          </button>
        ))}

        {/* Create New */}
        <button
          onClick={() => navigate('/collections/new')}
          className="p-5 border-2 border-dashed border-edge rounded-lg flex flex-col items-center justify-center text-content-muted hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all animate-fade-in"
          style={{ animationDelay: `${MOCK_COLLECTIONS.length * 40}ms` }}
        >
          <span className="material-symbols-outlined text-2xl mb-2">add</span>
          <span className="text-sm font-medium">New Collection</span>
        </button>
      </div>
    </div>
  );
};

export default Collections;
