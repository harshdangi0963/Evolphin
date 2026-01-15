
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentReader: React.FC = () => {
  const navigate = useNavigate();
  const [isAiMinimized, setIsAiMinimized] = useState(false);

  return (
    <div className="flex-1 flex w-full h-full relative overflow-hidden bg-bg">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-bg-muted">
        <div className="h-full bg-accent transition-all duration-300" style={{ width: '35%' }}></div>
      </div>

      {/* Left Annotations */}
      <aside className="hidden xl:flex flex-col items-end pt-32 pr-8 w-24 gap-6 sticky top-0 h-screen">
        <div className="group relative cursor-pointer">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-bg text-[10px] font-bold">JS</div>
          <div className="absolute right-full mr-4 top-0 w-56 p-4 rounded-xl bg-bg-elevated border border-edge opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-lg">
            <p className="text-sm text-content-secondary leading-relaxed">"Important point about Q3 governance."</p>
            <p className="text-caption mt-2 text-content-muted">Jane Smith · 2h ago</p>
          </div>
        </div>
        <button className="text-content-muted hover:text-accent transition-colors p-2 rounded-lg hover:bg-bg-subtle">
          <span className="material-symbols-outlined text-xl">bookmark</span>
        </button>
      </aside>

      {/* Main Content */}
      <article className="flex-1 flex flex-col items-center pt-20 pb-32 px-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="w-full max-w-[640px] mb-8 flex justify-between items-center text-sm text-content-muted">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-content transition-colors p-2 -ml-2 rounded-lg hover:bg-bg-subtle">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back
          </button>
          <div className="flex items-center gap-3 text-xs text-content-muted">
            <span>March 14, 2024</span>
            <span className="size-1 bg-edge rounded-full"></span>
            <span>12 min read</span>
          </div>
        </header>

        {/* Document */}
        <div className="w-full max-w-[640px] space-y-8 animate-fade-in">
          <h1 className="text-display text-content">
            The Ethics of Autonomous Systems
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 py-4 border-y border-edge">
            <div className="flex -space-x-2">
              <img className="w-10 h-10 rounded-full border-2 border-bg-elevated" src="https://picsum.photos/seed/a1/40/40" alt="" />
              <img className="w-10 h-10 rounded-full border-2 border-bg-elevated" src="https://picsum.photos/seed/a2/40/40" alt="" />
            </div>
            <div>
              <p className="text-sm text-content-muted">
                By <span className="text-content font-medium">Dr. Aris Thorne</span>
              </p>
              <p className="text-xs text-content-muted">Defense Research Institute</p>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-6">
            <p className="text-body text-content-secondary leading-relaxed">
              Autonomous systems are increasingly becoming a cornerstone of modern strategic defense. The shift from <span className="bg-accent/10 text-accent border-b border-accent/30 px-1 rounded">human-in-the-loop to human-on-the-loop</span> systems presents unique challenges.
            </p>

            <h2 className="text-title text-content pt-6">The Accountability Gap</h2>
            <p className="text-body text-content-secondary leading-relaxed">
              When an autonomous system performs an action that results in unintended consequences, who is responsible? The developer who wrote the code? The commander who deployed the system?
            </p>

            {/* Quote */}
            <blockquote className="relative my-8 pl-6 border-l-2 border-accent/40 py-4">
              <p className="text-subtitle text-content italic leading-relaxed">
                "The delegation of lethal force to non-human actors represents the single most significant shift in the philosophy of conflict."
              </p>
              <cite className="block mt-4 text-caption text-accent uppercase not-italic">
                — Global Ethics Summit, 2023
              </cite>
            </blockquote>

            <p className="text-body text-content-secondary leading-relaxed">
              This dilemma is compounded by the "black box" nature of deep learning models. As neural networks become more complex, the path to a specific decision becomes less transparent.
            </p>
          </div>
        </div>
      </article>

      {/* AI Sidebar */}
      <aside className={`hidden lg:flex flex-col border-l border-edge sticky top-0 h-screen transition-all duration-200 ease-smooth ${isAiMinimized ? 'w-16' : 'w-80 bg-bg-elevated'}`}>
        <div className="h-14 px-4 border-b border-edge flex items-center justify-between shrink-0">
          {!isAiMinimized && (
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="material-symbols-outlined text-bg text-base">auto_awesome</span>
              </div>
              <span className="text-sm font-medium text-content">AI Assistant</span>
            </div>
          )}
          <button onClick={() => setIsAiMinimized(!isAiMinimized)} className="btn btn-ghost btn-icon-sm">
            <span className="material-symbols-outlined text-base">{isAiMinimized ? 'chevron_left' : 'chevron_right'}</span>
          </button>
        </div>

        {!isAiMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <div className="p-4 card">
                <p className="text-sm text-content-secondary">I've analyzed this document. How can I help?</p>
              </div>

              {['Summarize key points', 'Explain terminology', 'Find related docs'].map((action, idx) => (
                <button key={idx} className="w-full btn btn-secondary justify-start">
                  {action}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-edge">
              <div className="relative">
                <textarea className="input min-h-[56px] py-3 pr-12 resize-none" placeholder="Ask about this document..."></textarea>
                <button className="absolute right-2 bottom-2 btn btn-accent btn-icon-sm">
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default DocumentReader;
