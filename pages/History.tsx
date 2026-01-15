
import React from 'react';
import { useNavigate } from 'react-router-dom';

const History: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-bg h-full overflow-hidden">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-edge shrink-0">
        <h1 className="text-subtitle text-content">History</h1>
        <button className="btn btn-primary">
          <span className="material-symbols-outlined text-base">restore</span>
          Restore
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Timeline */}
        <aside className="w-64 border-r border-edge flex flex-col overflow-hidden shrink-0 bg-bg-elevated">
          <div className="p-4 border-b border-edge">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-content-muted text-base">search</span>
              <input className="input h-9 pl-9" placeholder="Filter..." />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {/* Current */}
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-accent">Current</span>
                <span className="text-micro text-accent bg-accent/10 px-1.5 py-0.5 rounded">Active</span>
              </div>
              <p className="text-xs text-content-muted">Editing now</p>
            </div>

            {/* Past */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 rounded-lg hover:bg-bg-subtle cursor-pointer transition-colors">
                <span className="text-sm font-medium text-content-secondary">{i * 2}h ago</span>
                <p className="text-xs text-content-muted mt-0.5">by Alex Rivera</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Diff */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-12 px-6 flex items-center justify-between border-b border-edge shrink-0">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent font-medium">Today 10:42 AM</span>
              <span className="material-symbols-outlined text-content-muted text-base">compare_arrows</span>
              <span className="text-content-muted">Oct 12, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-micro font-medium text-success bg-success-bg px-2 py-1 rounded">+420</span>
              <span className="text-micro font-medium text-danger bg-danger-bg px-2 py-1 rounded">-12</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Old */}
            <div className="flex-1 overflow-y-auto bg-bg-subtle border-r border-edge p-8">
              <div className="max-w-md mx-auto">
                <div className="text-caption text-content-muted uppercase mb-4">Previous</div>
                <h2 className="text-title text-content mb-4">The Future of Neural Networks</h2>
                <p className="text-small text-content-secondary leading-relaxed mb-4">
                  The introduction of large language models has significantly altered how we approach knowledge management.
                </p>
                <p className="text-small bg-danger-bg text-danger line-through p-3 rounded-lg border border-danger-border">
                  One major challenge was the latency in retrieving vector embeddings.
                </p>
              </div>
            </div>

            {/* New */}
            <div className="flex-1 overflow-y-auto bg-bg p-8">
              <div className="max-w-md mx-auto">
                <div className="text-caption text-accent uppercase mb-4">Current</div>
                <h2 className="text-title text-content mb-4">The Future of Neural Networks & Knowledge</h2>
                <p className="text-small text-content leading-relaxed mb-4">
                  The introduction of large language models has significantly altered how we approach <span className="bg-success-bg text-success font-medium px-1 rounded">collaborative</span> knowledge management.
                </p>
                <p className="text-small bg-success-bg/50 text-content p-3 rounded-lg border border-success-border">
                  By implementing a distributed caching layer, we reduced latency by 85%.
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
