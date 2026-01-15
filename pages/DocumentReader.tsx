
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentReader: React.FC = () => {
  const navigate = useNavigate();
  const [isAiMinimized, setIsAiMinimized] = useState(false);

  return (
    <div className="flex-1 flex w-full h-full relative overflow-hidden bg-white">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div className="h-full bg-primary" style={{ width: '35%' }}></div>
      </div>

      {/* Mini Left Sidebar */}
      <aside className="hidden xl:flex flex-col items-end pt-40 pr-12 w-32 gap-10 sticky top-0 h-screen">
        <div className="group relative cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shadow-sm">JS</div>
          <div className="absolute right-full mr-4 top-0 w-48 p-3 rounded-lg bg-white border border-slate-100 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            <p className="text-[11px] leading-relaxed text-slate-600">"Crucial point on human-on-the-loop governance for Q3."</p>
            <p className="text-[9px] mt-2 font-bold text-slate-400 uppercase">Jane Smith • 2h ago</p>
          </div>
        </div>
        <div className="group relative cursor-pointer text-slate-300 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">bookmark</span>
        </div>
        <div className="group relative cursor-pointer text-slate-300 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">share</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <article className="flex-1 flex flex-col items-center pt-16 pb-32 px-10 overflow-y-auto custom-scrollbar">
        <header className="w-full max-w-[680px] mb-8 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
           <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-sm">arrow_back</span>
             Back
           </button>
           <div className="flex items-center gap-3">
             <span>March 14, 2024</span>
             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
             <span>12 min read</span>
           </div>
        </header>

        <div className="w-full max-w-[680px] space-y-12">
          <h1 className="text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            The Ethics of Autonomous Systems in Modern Strategic Defense
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-slate-100">
            <div className="flex -space-x-1.5">
              <img alt="Author" className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100" src="https://picsum.photos/seed/a1/32/32"/>
              <img alt="Author" className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100" src="https://picsum.photos/seed/a2/32/32"/>
            </div>
            <p className="text-xs text-slate-500 font-medium">By <span className="text-slate-900 font-bold">Dr. Aris Thorne</span> and 2 others</p>
          </div>

          <div className="document-text space-y-8">
            <p className="text-xl text-slate-800 font-light leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
              Autonomous systems are increasingly becoming a cornerstone of modern strategic defense. The shift from <span className="bg-primary/5 text-primary border-b border-primary/30 px-1">human-in-the-loop to human-on-the-loop</span> systems presents a unique set of challenges and opportunities for ethical governance. As we approach the mid-century, the reliance on algorithmic decision-making has transitioned from a tactical advantage to a strategic necessity.
            </p>

            <h2 className="text-2xl font-bold mt-16 text-slate-900 font-display">The Accountability Gap</h2>
            <p>
              One of the primary concerns among ethicists is what is known as the "Accountability Gap." When an autonomous system performs an action that results in unintended consequences, who is responsible? The developer who wrote the code? The commander who deployed the system? Or the algorithm itself?
            </p>

            <blockquote className="relative my-14 pl-8 border-l-4 border-primary/20 bg-slate-50/50 py-4 pr-4 rounded-r-xl">
              <p className="text-2xl italic font-medium text-slate-700 leading-snug">
                "The delegation of lethal force to non-human actors represents the single most significant shift in the philosophy of conflict since the invention of gunpowder."
              </p>
              <cite className="block mt-6 text-xs font-bold tracking-widest text-primary uppercase not-italic font-display">— Global Ethics Summit, 2023</cite>
            </blockquote>

            <p>
              This dilemma is compounded by the "black box" nature of deep learning models. As neural networks become more complex, the path to a specific decision becomes less transparent, even to the creators of the system. This lack of interpretability is not just a technical hurdle; it is a fundamental moral crisis.
            </p>

            <h2 className="text-2xl font-bold mt-16 text-slate-900 font-display">Algorithmic Bias in Targeting</h2>
            <p>
              Beyond the high-level philosophical questions, practical concerns regarding data bias persist. If the training data for a target recognition system is skewed toward specific geographic or cultural markers, the system will inherently reproduce those biases in the field.
            </p>

            <div className="relative py-4 group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center bg-slate-900 text-white rounded-full px-2 py-1 shadow-2xl gap-0.5 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="flex items-center gap-1.5 px-4 py-2 hover:bg-white/10 rounded-full transition-colors text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span> Ask AI
                </button>
                <div className="w-px h-3 bg-white/20 mx-1"></div>
                <button className="flex items-center gap-1.5 px-4 py-2 hover:bg-white/10 rounded-full transition-colors text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">add_comment</span> Annotate
                </button>
              </div>
              <p className="border-b-2 border-primary/10 bg-primary/5 p-2 rounded">
                Ensuring objective "ground truth" in military datasets remains an unsolved problem, as the definition of a threat is often contextual and dynamic rather than static and binary.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Right Sidebar - Contextual Assistant */}
      <aside className={`hidden lg:flex flex-col border-l border-slate-100 sticky top-0 h-screen transition-all duration-300 ${isAiMinimized ? 'w-16' : 'w-[400px] bg-slate-50'}`}>
        <div className="p-6 border-b border-slate-200/50 flex items-center justify-between">
          {!isAiMinimized && (
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">temp_preferences_custom</span>
              </div>
              <h3 className="font-bold text-xs tracking-tight uppercase text-slate-600">Contextual Assistant</h3>
            </div>
          )}
          <button 
            onClick={() => setIsAiMinimized(!isAiMinimized)}
            className="p-1.5 hover:bg-slate-200/50 rounded-md transition-colors text-slate-400"
          >
            <span className="material-symbols-outlined text-lg">{isAiMinimized ? 'unfold_more' : 'unfold_less'}</span>
          </button>
        </div>

        {!isAiMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-xs leading-relaxed text-slate-500">
                    I've parsed the document. How can I help you navigate these ethical complexities?
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="text-left p-3.5 rounded-xl border border-slate-200/60 bg-white hover:border-primary/30 hover:bg-primary/[0.02] transition-all text-[11px] font-semibold text-slate-600 flex items-center justify-between group">
                    Summarize key ethical risks
                    <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                  </button>
                  <button className="text-left p-3.5 rounded-xl border border-slate-200/60 bg-white hover:border-primary/30 hover:bg-primary/[0.02] transition-all text-[11px] font-semibold text-slate-600 flex items-center justify-between group">
                    Explain 'Human-on-the-loop'
                    <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-md bg-primary flex items-center justify-center text-[9px] font-bold text-white uppercase">KF</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Analysis</span>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm text-[13px] leading-relaxed text-slate-700">
                  The <span className="font-bold text-slate-900">Accountability Gap</span> (Section 2) is central to the author's argument. Dr. Thorne posits that as the decision cycle speeds up, the human ability to intervene becomes symbolic rather than functional.
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-[9px] px-2 py-1 bg-slate-100 text-slate-500 rounded font-bold uppercase">Ref: Page 4</span>
                    <span className="text-[9px] px-2 py-1 bg-slate-100 text-slate-500 rounded font-bold uppercase">Legal Liability</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200/50 bg-white/50">
              <div className="relative">
                <textarea 
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-5 pr-12 text-[13px] focus:ring-2 focus:ring-primary/10 focus:border-primary min-h-[56px] max-h-32 resize-none placeholder:text-slate-400 transition-all shadow-sm" 
                  placeholder="Ask about the text..."
                ></textarea>
                <button className="absolute right-2.5 bottom-2.5 p-2 bg-slate-900 text-white rounded-xl hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">arrow_upward</span>
                </button>
              </div>
              <div className="flex items-center justify-between mt-4 px-1">
                <div className="flex gap-4">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">attachment</span>
                  </button>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">keyboard_voice</span>
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Model 4.0</span>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Flow State FAB */}
      <div className="fixed bottom-8 left-8 flex items-center gap-4">
        <button className="p-4 rounded-full bg-slate-900 text-white shadow-2xl flex items-center gap-3 font-bold text-xs hover:scale-105 transition-transform active:scale-95 group">
          <span className="material-symbols-outlined text-xl">blur_on</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300">Flow State</span>
        </button>
      </div>
    </div>
  );
};

export default DocumentReader;
